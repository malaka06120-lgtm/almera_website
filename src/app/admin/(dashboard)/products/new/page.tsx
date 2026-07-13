import type { Metadata } from "next";

import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="font-heading mb-8 text-3xl">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
