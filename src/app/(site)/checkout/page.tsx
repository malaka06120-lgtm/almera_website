"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations";
import { createOrder } from "@/lib/actions/orders";
import { DELIVERY_FEE_GROUPS, calculateDeliveryFee } from "@/lib/delivery-areas";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics/ecommerce";
import type { CartItem } from "@/types";

function toEcommerceProducts(cartItems: CartItem[]) {
  return cartItems.map((item) => ({
    item_id: item.productId,
    item_name: item.name,
    item_category: item.category,
    price: item.price,
    quantity: item.quantity,
  }));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, hasHydrated } = useCartStore();
  const sub = subtotal();
  const beginCheckoutFired = React.useRef(false);

  React.useEffect(() => {
    if (!hasHydrated || items.length === 0 || beginCheckoutFired.current) return;
    beginCheckoutFired.current = true;
    trackBeginCheckout(toEcommerceProducts(items));
  }, [hasHydrated, items]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryArea: "", notes: "" },
  });

  const deliveryArea = watch("deliveryArea");
  const deliveryFee = calculateDeliveryFee(deliveryArea, sub) ?? 0;

  async function onSubmit(values: CheckoutFormValues) {
    const result = await createOrder(
      values,
      items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }))
    );

    if (result.success) {
      trackPurchase(result.orderNumber, toEcommerceProducts(items), sub + deliveryFee);
      clearCart();
      router.push(`/order-success/${result.orderId}`);
    } else {
      toast.error(result.error);
    }
  }

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-10 h-10 w-40" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-36 text-center">
        <h1 className="font-heading text-2xl">Your bag is empty</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Add something beautiful before checking out.
        </p>
        <Button size="lg" className="mt-2" asChild>
          <Link href="/shop">Shop the Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="text-almera-gold text-xs tracking-luxury uppercase">
        Almost There
      </span>
      <h1 className="font-heading mt-2 mb-12 text-4xl">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]"
      >
        <div className="shadow-luxury-sm flex flex-col gap-6 rounded-2xl border border-border/70 bg-white p-7 sm:p-9">
          <div>
            <h2 className="font-heading mb-4 text-xl">Delivery Details</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              We currently deliver across Egypt only, with cash on delivery.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} placeholder="e.g. Sara Ahmed" />
            {errors.fullName && (
              <p className="text-destructive text-xs">{errors.fullName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register("phone")} placeholder="01012345678" />
            {errors.phone && (
              <p className="text-destructive text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Delivery Area</Label>
              <Select
                value={deliveryArea}
                onValueChange={(value) => setValue("deliveryArea", value, { shouldValidate: true })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your delivery area" />
                </SelectTrigger>
                <SelectContent>
                  {DELIVERY_FEE_GROUPS.map((group, i) => (
                    <SelectGroup key={group.fee}>
                      {i > 0 && <SelectSeparator />}
                      <SelectLabel>{formatPrice(group.fee)} Delivery</SelectLabel>
                      {group.areas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              {errors.deliveryArea && (
                <p className="text-destructive text-xs">{errors.deliveryArea.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} placeholder="e.g. Nasr City" />
              {errors.city && (
                <p className="text-destructive text-xs">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              rows={3}
              {...register("address")}
              placeholder="Street, building, floor, apartment..."
            />
            {errors.address && (
              <p className="text-destructive text-xs">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Order Notes (optional)</Label>
            <Textarea
              id="notes"
              rows={2}
              {...register("notes")}
              placeholder="Delivery instructions, landmark, etc."
            />
          </div>

          <div className="border-almera-border bg-almera-blush-soft rounded-xl border p-4 text-sm">
            <span className="font-medium">Payment Method:</span> Cash on
            Delivery — pay when your order arrives.
          </div>
        </div>

        <div className="shadow-luxury-sm h-fit rounded-2xl border border-border/70 bg-white p-7">
          <h2 className="font-heading text-xl">Order Summary</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.variantId} className="flex gap-4">
                <div className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-xl">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.sizeMl}ml &times; {item.quantity}
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(sub)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>
                {!deliveryArea ? "—" : deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
              </span>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="flex justify-between">
            <span className="font-heading text-lg">Total</span>
            <span className="font-heading text-almera-gold text-lg">
              {formatPrice(sub + deliveryFee)}
            </span>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full">
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
