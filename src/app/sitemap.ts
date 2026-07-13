import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/shop",
    "/categories",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: product.updated_at,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/shop?category=${category.slug}`,
    lastModified: category.created_at,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
