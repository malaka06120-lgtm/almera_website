"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations";
import { generateOrderNumber } from "@/lib/utils";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { sendOrderNotificationEmail } from "@/lib/email/order-notification";

export interface CheckoutCartItem {
  variantId: string;
  quantity: number;
}

type CreateOrderResult =
  | { success: true; orderId: string; orderNumber: string }
  | { success: false; error: string };

export async function createOrder(
  values: CheckoutFormValues,
  cartItems: CheckoutCartItem[]
): Promise<CreateOrderResult> {
  const parsed = checkoutSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check your delivery details and try again." };
  }

  if (cartItems.length === 0) {
    return { success: false, error: "Your bag is empty." };
  }

  const supabase = createAdminClient();

  const variantIds = cartItems.map((i) => i.variantId);
  const { data: variants, error: variantsError } = await supabase
    .from("product_variants")
    .select("id, size_ml, price, stock_quantity, product:products(id, name, is_active)")
    .in("id", variantIds);

  if (variantsError || !variants) {
    return { success: false, error: "We couldn't verify your items. Please try again." };
  }

  const orderItemsToInsert: {
    product_id: string;
    variant_id: string;
    product_name: string;
    size_ml: number;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[] = [];

  let subtotal = 0;

  for (const cartItem of cartItems) {
    const variant = variants.find((v) => v.id === cartItem.variantId);
    const product = Array.isArray(variant?.product)
      ? variant?.product[0]
      : variant?.product;

    if (!variant || !product || !product.is_active) {
      return { success: false, error: "One of the items in your bag is no longer available." };
    }
    if (variant.stock_quantity < cartItem.quantity) {
      return {
        success: false,
        error: `${product.name} (${variant.size_ml}ml) only has ${variant.stock_quantity} left in stock.`,
      };
    }

    const lineTotal = variant.price * cartItem.quantity;
    subtotal += lineTotal;

    orderItemsToInsert.push({
      product_id: product.id,
      variant_id: variant.id,
      product_name: product.name,
      size_ml: variant.size_ml,
      unit_price: variant.price,
      quantity: cartItem.quantity,
      line_total: lineTotal,
    });
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  let orderId: string | null = null;
  let orderNumber = "";

  for (let attempt = 0; attempt < 5 && !orderId; attempt++) {
    orderNumber = generateOrderNumber();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        full_name: parsed.data.fullName,
        phone: parsed.data.phone,
        governorate: parsed.data.governorate,
        city: parsed.data.city,
        address: parsed.data.address,
        notes: parsed.data.notes || null,
        subtotal,
        shipping_fee: shippingFee,
        total,
      })
      .select("id")
      .single();

    if (order) {
      orderId = order.id;
    } else if (orderError?.code !== "23505") {
      return { success: false, error: "We couldn't place your order. Please try again." };
    }
  }

  if (!orderId) {
    return { success: false, error: "We couldn't place your order. Please try again." };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    orderItemsToInsert.map((item) => ({ ...item, order_id: orderId }))
  );

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", orderId);
    return { success: false, error: "We couldn't place your order. Please try again." };
  }

  for (const item of orderItemsToInsert) {
    const variant = variants.find((v) => v.id === item.variant_id);
    if (!variant) continue;
    await supabase
      .from("product_variants")
      .update({ stock_quantity: variant.stock_quantity - item.quantity })
      .eq("id", item.variant_id)
      .gte("stock_quantity", item.quantity);
  }

  // The order is fully saved at this point. Notification is a side effect —
  // sendOrderNotificationEmail never throws, so it can't affect this result.
  await sendOrderNotificationEmail({
    orderNumber,
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    governorate: parsed.data.governorate,
    city: parsed.data.city,
    address: parsed.data.address,
    notes: parsed.data.notes,
    items: orderItemsToInsert,
    subtotal,
    shippingFee,
    total,
  });

  return { success: true, orderId, orderNumber };
}
