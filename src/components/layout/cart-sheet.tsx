"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { trackRemoveFromCart } from "@/lib/analytics/ecommerce";
import type { CartItem } from "@/types";

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, subtotal } =
    useCartStore();

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

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="size-5" />
            Your Bag ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="text-muted-foreground size-10" strokeWidth={1} />
            <p className="text-muted-foreground text-sm">
              Your bag is empty.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-5">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4">
                    <div className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="font-heading text-sm leading-tight hover:text-almera-gold"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleRemove(item)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-foreground shrink-0"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {item.sizeMl}ml
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="border-input flex items-center rounded-full border">
                          <button
                            className="flex size-7 items-center justify-center disabled:opacity-40"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            className="flex size-7 items-center justify-center disabled:opacity-40"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stockQuantity}
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading text-base">
                  {formatPrice(subtotal())}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                Shipping and cash on delivery calculated at checkout.
              </p>
              <Separator />
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" onClick={() => setOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                  asChild
                >
                  <Link href="/cart">View Bag</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
