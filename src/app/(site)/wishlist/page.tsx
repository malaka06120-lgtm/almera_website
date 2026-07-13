"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";

import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, remove, hasHydrated } = useWishlistStore();

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="mb-10 h-10 w-56" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-36 text-center">
        <Heart className="text-almera-gold size-12" strokeWidth={1} />
        <h1 className="font-heading text-2xl">Your wishlist is empty</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Save the fragrances you love and come back to them anytime.
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
        Saved for Later
      </span>
      <h1 className="font-heading mt-2 mb-12 text-4xl">Your Wishlist</h1>

      <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.productId} className="group relative">
            <Link href={`/product/${item.slug}`} className="block">
              <div className="bg-muted shadow-luxury-sm relative aspect-[3/4] overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-luxury">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-5 flex flex-col gap-1 text-center">
                <h3 className="font-heading text-base transition-colors group-hover:text-almera-gold">
                  {item.name}
                </h3>
                <span className="text-muted-foreground text-sm">
                  {item.price > 0 ? `From ${formatPrice(item.price)}` : ""}
                </span>
              </div>
            </Link>
            <button
              onClick={() => remove(item.productId)}
              aria-label="Remove from wishlist"
              className="glass shadow-luxury-sm absolute top-4 right-4 flex size-9 items-center justify-center rounded-full transition-transform hover:scale-110"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
