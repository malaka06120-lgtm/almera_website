"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import type { Product } from "@/types";

export function ProductCarouselSection({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const node = scrollerRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <FadeUp className="mb-10 flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <span className="text-almera-gold text-xs tracking-luxury uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="font-heading mt-2 text-3xl sm:text-4xl">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-3 max-w-md text-sm">
              {subtitle}
            </p>
          )}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </FadeUp>

      <StaggerGroup
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <StaggerItem
            key={product.id}
            className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23%]"
          >
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg" asChild>
          <Link href={viewAllHref}>View All</Link>
        </Button>
      </div>
    </section>
  );
}
