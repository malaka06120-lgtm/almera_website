"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/delivery-areas";
import { trackRemoveFromCart } from "@/lib/analytics/ecommerce";
import type { CartItem } from "@/types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, hasHydrated } = useCartStore();
  const sub = subtotal();
  const qualifiesForFreeShipping = sub >= FREE_SHIPPING_THRESHOLD;

  function handleRemove(item: CartItem) {
    trackRemoveFromCart({
      item_id: item.productId,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    });
    removeItem(item.variantId);
  }

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-10 h-10 w-48" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-36 text-center">
        <ShoppingBag className="text-almera-gold size-12" strokeWidth={1} />
        <h1 className="font-heading text-2xl">Your bag is empty</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Discover fragrances that leave an impression.
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
        {items.length} Item{items.length !== 1 && "s"}
      </span>
      <h1 className="font-heading mt-2 mb-12 text-4xl">Your Bag</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-6 py-7 first:pt-0">
              <div className="bg-muted relative size-28 shrink-0 overflow-hidden rounded-2xl">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-heading text-lg transition-colors hover:text-almera-gold"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm">{item.sizeMl}ml</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="border-almera-border flex items-center rounded-full border">
                    <button
                      className="flex size-9 items-center justify-center disabled:opacity-40"
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      className="flex size-9 items-center justify-center disabled:opacity-40"
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stockQuantity}
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <span className="font-heading text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="shadow-luxury-sm h-fit rounded-2xl border border-border/70 bg-white p-7">
          <h2 className="font-heading text-xl">Order Summary</h2>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(sub)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-muted-foreground text-xs">
                {qualifiesForFreeShipping ? "Free" : "Calculated at checkout"}
              </span>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex justify-between">
            <span className="font-heading text-lg">Estimated Total</span>
            <span className="font-heading text-almera-gold text-lg">
              {formatPrice(sub)}
            </span>
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            {qualifiesForFreeShipping
              ? "You qualify for free shipping."
              : `Free shipping over ${formatPrice(FREE_SHIPPING_THRESHOLD)}. Delivery fee is added at checkout based on your area.`}
          </p>
          <Button size="lg" className="mt-7 w-full" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button variant="outline" size="lg" className="mt-3 w-full" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
