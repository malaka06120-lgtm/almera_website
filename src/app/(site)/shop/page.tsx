import type { Metadata } from "next";

import { ProductGrid } from "@/components/product/product-grid";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopSort } from "@/components/shop/shop-sort";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { FadeUp } from "@/components/shared/motion";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import type { SortOption } from "@/types";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse the full Almera collection of luxury perfumes for men, women, and unisex.",
};

interface ShopPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    gender?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    featured?: string;
    bestseller?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({
      search: params.search,
      category: params.category,
      gender: params.gender,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      sort: (params.sort as SortOption) ?? "newest",
      featuredOnly: params.featured === "true",
      bestSellerOnly: params.bestseller === "true",
    }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeUp className="mb-14 text-center">
        <span className="text-almera-gold text-xs tracking-luxury uppercase">
          The Collection
        </span>
        <h1 className="font-heading mt-3 text-4xl sm:text-5xl">Shop All</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
          {params.search
            ? `Results for "${params.search}"`
            : "Explore the full Almera collection of luxury fragrances."}
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <ShopFilters categories={categories} />
        </aside>

        <div>
          <div className="mb-10 flex items-center justify-between gap-4">
            <MobileFilters categories={categories} />
            <span className="text-muted-foreground hidden text-sm sm:block">
              {products.length} fragrance{products.length !== 1 && "s"}
            </span>
            <ShopSort />
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
