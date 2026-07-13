"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";

export function WishlistButton({
  product,
  className,
}: {
  product: Pick<Product, "id" | "name" | "slug" | "images"> & {
    price?: number;
  };
  className?: string;
}) {
  const hasHydrated = useWishlistStore((s) => s.hasHydrated);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id)) && hasHydrated;
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle({
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image: product.images?.[0] ?? "",
          price: product.price ?? 0,
        });
        toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
      }}
      className={cn(
        "glass flex size-9 items-center justify-center rounded-full shadow-luxury-sm transition-all duration-300 hover:scale-110",
        className
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isWishlisted ? "fill-almera-gold text-almera-gold" : "text-foreground"
        )}
      />
    </button>
  );
}
