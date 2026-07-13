import { createClient } from "@/lib/supabase/server";
import type { Product, SortOption } from "@/types";

const PRODUCT_SELECT = `*, category:categories(*), variants:product_variants(*)`;

export interface ProductFilters {
  search?: string;
  category?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  featuredOnly?: boolean;
  bestSellerOnly?: boolean;
}

function sortVariants(product: Product): Product {
  return {
    ...product,
    variants: [...(product.variants ?? [])].sort((a, b) => a.size_ml - b.size_ml),
  };
}

export async function getProducts(filters: ProductFilters = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true);

  if (filters.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }
  if (filters.gender) {
    query = query.eq("gender", filters.gender);
  }
  if (filters.featuredOnly) {
    query = query.eq("is_featured", true);
  }
  if (filters.bestSellerOnly) {
    query = query.eq("is_best_seller", true);
  }

  switch (filters.sort) {
    case "best-selling":
      query = query.order("is_best_seller", { ascending: false }).order("created_at", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) throw error;

  let products = (data as unknown as Product[]).map(sortVariants);

  // Category slug filter safety-net (in case the relational filter above is ignored by PostgREST)
  if (filters.category) {
    products = products.filter((p) => p.category?.slug === filters.category);
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    products = products.filter((p) => {
      const price = p.variants?.[0]?.price ?? 0;
      if (filters.minPrice !== undefined && price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
      return true;
    });
  }

  if (filters.sort === "price-asc") {
    products = products.sort(
      (a, b) => (a.variants?.[0]?.price ?? 0) - (b.variants?.[0]?.price ?? 0)
    );
  } else if (filters.sort === "price-desc") {
    products = products.sort(
      (a, b) => (b.variants?.[0]?.price ?? 0) - (a.variants?.[0]?.price ?? 0)
    );
  }

  return products;
}

export async function getFeaturedProducts(limit = 8) {
  return (await getProducts({ featuredOnly: true })).slice(0, limit);
}

export async function getBestSellers(limit = 8) {
  return (await getProducts({ bestSellerOnly: true })).slice(0, limit);
}

export async function getNewArrivals(limit = 8) {
  return (await getProducts({ sort: "newest" })).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(`${PRODUCT_SELECT}, reviews(*)`)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return sortVariants(data as unknown as Product);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("category_id", product.category_id ?? "")
    .neq("id", product.id)
    .limit(limit);

  if (error) throw error;
  return (data as unknown as Product[]).map(sortVariants);
}
