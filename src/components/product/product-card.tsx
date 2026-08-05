import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/product/wishlist-button";
import { GENDER_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const prices = (product.variants ?? []).map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const primaryImage = product.images?.[0];
  const hoverImage = product.images?.[1];
  const totalStock = (product.variants ?? []).reduce(
    (sum, v) => sum + v.stock_quantity,
    0
  );

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-muted shadow-luxury-sm relative aspect-[3/4] overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-luxury">
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${
              hoverImage ? "group-hover:opacity-0" : ""
            }`}
          />
        )}
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="absolute inset-0 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
          />
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.is_best_seller && (
            <Badge variant="gold">Best Seller</Badge>
          )}
          {product.is_featured && <Badge>Featured</Badge>}
          {product.is_original && (
            <Badge variant="gold-outline" className="bg-white/90">
              Original
            </Badge>
          )}
          {totalStock === 0 && <Badge variant="destructive">Sold Out</Badge>}
        </div>

        <WishlistButton
          product={{ ...product, price: minPrice }}
          className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="mt-5 flex flex-col gap-1.5 text-center">
        <span className="text-almera-gold text-[11px] tracking-luxury uppercase">
          {GENDER_LABELS[product.gender]}
        </span>
        <h3 className="font-heading text-lg leading-tight transition-colors group-hover:text-almera-gold">
          {product.name}
        </h3>
        <span className="text-muted-foreground text-sm">
          {minPrice > 0 ? `From ${formatPrice(minPrice)}` : "—"}
        </span>
      </div>
    </Link>
  );
}
