import "server-only";
import { Resend } from "resend";

import { formatPrice } from "@/lib/utils";

interface OrderNotificationItem {
  product_name: string;
  size_ml: number;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface OrderNotificationInput {
  orderNumber: string;
  fullName: string;
  phone: string;
  email?: string | null;
  governorate: string;
  city: string;
  address: string;
  notes?: string | null;
  items: OrderNotificationItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

/**
 * Emails the admin about a new order. Never throws — a notification failure
 * must never take down the checkout request after the order is already saved,
 * so every failure path here just logs and returns.
 */
export async function sendOrderNotificationEmail(order: OrderNotificationInput) {
  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    console.error(
      "ADMIN_EMAIL is not configured — skipping new order notification email."
    );
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error(
      "RESEND_API_KEY is not configured — skipping new order notification email."
    );
    return;
  }

  const orderDate = new Date().toLocaleString("en-EG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  });

  const itemsList = order.items
    .map(
      (item) =>
        `- ${item.product_name} (${item.size_ml}ml)\n` +
        `  Quantity: ${item.quantity} x ${formatPrice(item.unit_price)} = ${formatPrice(item.line_total)}`
    )
    .join("\n\n");

  const bodyLines = [
    `Order ID: ${order.orderNumber}`,
    `Customer Name: ${order.fullName}`,
    `Phone Number: ${order.phone}`,
    `Email: ${order.email || "Not provided"}`,
    `Delivery Address: ${order.address}, ${order.city}, ${order.governorate}`,
    order.notes ? `Notes: ${order.notes}` : null,
    `Payment Method: Cash on Delivery`,
    `Order Date: ${orderDate}`,
    "",
    "Ordered Products:",
    itemsList,
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Shipping: ${order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}`,
    `Total: ${formatPrice(order.total)}`,
  ].filter((line): line is string => line !== null);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Almera <onboarding@resend.dev>",
      to: adminEmails,
      subject: `🛍️ New Order - #${order.orderNumber}`,
      text: bodyLines.join("\n"),
    });

    if (error) {
      console.error("Resend failed to send order notification email:", error);
    }
  } catch (err) {
    console.error("Unexpected error sending order notification email:", err);
  }
}
