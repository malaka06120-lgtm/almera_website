"use client";

import * as React from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { trackAddToCart } from "@/lib/analytics/ecommerce";
import type { Product } from "@/types";

export function AddToCartForm({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = React.useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = variants.find((v) => v.id === variantId);
  const inStock = (selectedVariant?.stock_quantity ?? 0) > 0;

  React.useEffect(() => {
    setQuantity(1);
  }, [variantId]);

  function handleAddToCart() {
    if (!selectedVariant) return;
    const category = product.category?.name ?? "Uncategorized";
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] ?? "",
      category,
      sizeMl: selectedVariant.size_ml,
      price: selectedVariant.price,
      quantity,
      stockQuantity: selectedVariant.stock_quantity,
    });
    trackAddToCart({
      product_id: product.id,
      product_name: product.name,
      category,
      price: selectedVariant.price,
      quantity,
    });
    toast.success(`${product.name} added to your bag`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-muted-foreground mb-3 block text-xs tracking-luxury uppercase">
          Size
        </span>
        <div className="flex flex-wrap gap-2.5">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setVariantId(variant.id)}
              disabled={variant.stock_quantity === 0}
              className={cn(
                "rounded-lg border px-5 py-2.5 text-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40",
                variantId === variant.id
                  ? "border-almera-black bg-almera-black text-white"
                  : "border-almera-border hover:border-almera-gold"
              )}
            >
              {variant.size_ml}ml
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-heading text-3xl">
          {selectedVariant ? formatPrice(selectedVariant.price) : "—"}
        </span>
        {!inStock && selectedVariant && (
          <span className="text-destructive text-sm">Out of stock</span>
        )}
        {inStock && selectedVariant && selectedVariant.stock_quantity <= 5 && (
          <span className="text-almera-gold text-sm">
            Only {selectedVariant.stock_quantity} left
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="border-almera-border flex items-center rounded-full border">
          <button
            className="flex size-11 items-center justify-center disabled:opacity-40"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            className="flex size-11 items-center justify-center disabled:opacity-40"
            onClick={() =>
              setQuantity((q) =>
                Math.min(q + 1, selectedVariant?.stock_quantity ?? 1)
              )
            }
            disabled={quantity >= (selectedVariant?.stock_quantity ?? 0)}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="size-4" />
          {inStock ? "Add to Bag" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
