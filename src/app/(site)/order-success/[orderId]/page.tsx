import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { getOrderById } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

interface OrderSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="bg-almera-blush-soft flex size-20 items-center justify-center rounded-full">
          <CheckCircle2 className="text-almera-gold size-10" strokeWidth={1.25} />
        </div>
        <h1 className="font-heading mt-7 text-3xl sm:text-4xl">
          Thank You, {order.full_name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md text-sm">
          Your order has been placed successfully. We&apos;ll call you to
          confirm before it&apos;s out for delivery.
        </p>
        <div className="bg-almera-blush-soft mt-8 rounded-full px-7 py-3 font-heading text-lg tracking-wide">
          Order #{order.order_number}
        </div>
      </div>

      <div className="shadow-luxury-sm mt-14 rounded-2xl border border-border/70 bg-white p-7 sm:p-9">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl">Order Details</h2>
          <span className="border-almera-gold text-almera-gold rounded-full border px-3 py-1 text-xs tracking-wide uppercase">
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {order.items?.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>
                {item.product_name} ({item.size_ml}ml) &times; {item.quantity}
              </span>
              <span>{formatPrice(item.line_total)}</span>
            </li>
          ))}
        </ul>

        <Separator className="my-5" />

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>{order.delivery_fee === 0 ? "Free" : formatPrice(order.delivery_fee)}</span>
          </div>
          <div className="flex justify-between font-heading text-lg">
            <span>Total (Cash on Delivery)</span>
            <span className="text-almera-gold">{formatPrice(order.total)}</span>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="text-muted-foreground text-sm leading-relaxed">
          <p className="text-foreground font-medium">Delivery Address</p>
          <p>{order.full_name} &middot; {order.phone}</p>
          <p>
            {order.address}, {order.city}, {order.delivery_area}
          </p>
        </div>
      </div>

      <Button size="lg" className="mt-10 w-full" asChild>
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
}
