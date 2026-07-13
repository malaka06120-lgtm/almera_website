import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { getAdminProductById } from "@/lib/data/admin";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = { title: "Edit Product" };

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-heading mb-8 text-3xl">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
