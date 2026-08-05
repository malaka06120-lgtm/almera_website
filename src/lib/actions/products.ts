"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { productSchema, type ProductFormValues } from "@/lib/validations";

type ActionResult =
  | { success: true; productId: string }
  | { success: false; error: string };

function mapProductRow(values: ProductFormValues) {
  return {
    name: values.name,
    slug: values.slug,
    description: values.description,
    gender: values.gender,
    category_id: values.categoryId,
    images: values.images,
    top_notes: values.topNotes,
    middle_notes: values.middleNotes,
    base_notes: values.baseNotes,
    is_featured: values.isFeatured,
    is_best_seller: values.isBestSeller,
    is_original: values.isOriginal,
    is_active: values.isActive,
  };
}

async function syncVariants(
  supabase: Awaited<ReturnType<typeof createClient>>,
  productId: string,
  variants: ProductFormValues["variants"]
) {
  await supabase.from("product_variants").delete().eq("product_id", productId);
  const { error } = await supabase.from("product_variants").insert(
    variants.map((v) => ({
      product_id: productId,
      size_ml: v.sizeMl,
      price: v.price,
      stock_quantity: v.stockQuantity,
    }))
  );
  return error;
}

export async function createProduct(
  values: ProductFormValues
): Promise<ActionResult> {
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the product details and try again." };
  }

  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .insert(mapProductRow(parsed.data))
    .select("id")
    .single();

  if (error || !product) {
    return {
      success: false,
      error: error?.code === "23505"
        ? "A product with this slug already exists."
        : "We couldn't create this product. Please try again.",
    };
  }

  const variantsError = await syncVariants(supabase, product.id, parsed.data.variants);
  if (variantsError) {
    return { success: false, error: "Product created, but sizes failed to save." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true, productId: product.id };
}

export async function updateProduct(
  id: string,
  values: ProductFormValues
): Promise<ActionResult> {
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Please check the product details and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update(mapProductRow(parsed.data))
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.code === "23505"
        ? "A product with this slug already exists."
        : "We couldn't update this product. Please try again.",
    };
  }

  const variantsError = await syncVariants(supabase, id, parsed.data.variants);
  if (variantsError) {
    return { success: false, error: "Product updated, but sizes failed to save." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${parsed.data.slug}`);
  return { success: true, productId: id };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { success: false as const, error: "We couldn't delete this product." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true as const };
}
