"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/image-uploader";
import { TagInput } from "@/components/admin/tag-input";
import { VariantFields } from "@/components/admin/variant-fields";
import { productSchema, type ProductFormValues } from "@/lib/validations";
import { createProduct, updateProduct } from "@/lib/actions/products";
import { slugify } from "@/lib/utils";
import { GENDER_LABELS } from "@/lib/constants";
import type { Category, Product } from "@/types";

const NO_CATEGORY = "none";

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const isEditing = !!product;
  const [slugTouched, setSlugTouched] = React.useState(isEditing);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          gender: product.gender,
          categoryId: product.category_id,
          images: product.images,
          topNotes: product.top_notes,
          middleNotes: product.middle_notes,
          baseNotes: product.base_notes,
          isFeatured: product.is_featured,
          isBestSeller: product.is_best_seller,
          isActive: product.is_active,
          variants: (product.variants ?? []).map((v) => ({
            id: v.id,
            sizeMl: v.size_ml,
            price: v.price,
            stockQuantity: v.stock_quantity,
          })),
        }
      : {
          name: "",
          slug: "",
          description: "",
          gender: "unisex",
          categoryId: null,
          images: [],
          topNotes: [],
          middleNotes: [],
          baseNotes: [],
          isFeatured: false,
          isBestSeller: false,
          isActive: true,
          variants: [{ sizeMl: 50, price: 0, stockQuantity: 0 }],
        },
  });

  const images = watch("images");

  async function onSubmit(values: ProductFormValues) {
    const result = isEditing
      ? await updateProduct(product.id, values)
      : await createProduct(values);

    if (result.success) {
      toast.success(isEditing ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-3xl flex-col gap-8">
      <section className="flex flex-col gap-5">
        <h2 className="font-heading text-lg">Basic Information</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            {...register("name")}
            onChange={(e) => {
              setValue("name", e.target.value);
              if (!slugTouched) setValue("slug", slugify(e.target.value));
            }}
            placeholder="Almera Rose Noir"
          />
          {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            {...register("slug")}
            onChange={(e) => {
              setSlugTouched(true);
              setValue("slug", e.target.value);
            }}
            placeholder="almera-rose-noir"
          />
          {errors.slug && <p className="text-destructive text-xs">{errors.slug.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} {...register("description")} />
          {errors.description && (
            <p className="text-destructive text-xs">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Gender</Label>
            <Select
              value={watch("gender")}
              onValueChange={(value) =>
                setValue("gender", value as ProductFormValues["gender"])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GENDER_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              value={watch("categoryId") ?? NO_CATEGORY}
              onValueChange={(value) =>
                setValue("categoryId", value === NO_CATEGORY ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_CATEGORY}>No category</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg">Images</h2>
        <ImageUploader images={images} onChange={(v) => setValue("images", v, { shouldValidate: true })} />
        {errors.images && <p className="text-destructive text-xs">{errors.images.message}</p>}
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="font-heading text-lg">Fragrance Notes</h2>
        <div className="flex flex-col gap-2">
          <Label>Top Notes</Label>
          <TagInput value={watch("topNotes")} onChange={(v) => setValue("topNotes", v)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Middle Notes</Label>
          <TagInput value={watch("middleNotes")} onChange={(v) => setValue("middleNotes", v)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Base Notes</Label>
          <TagInput value={watch("baseNotes")} onChange={(v) => setValue("baseNotes", v)} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg">Sizes, Price & Stock</h2>
        <VariantFields control={control} register={register} errors={errors} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-lg">Visibility</h2>
        <label className="flex items-center justify-between border border-border/70 p-4">
          <div>
            <p className="text-sm font-medium">Featured Product</p>
            <p className="text-muted-foreground text-xs">Show in the homepage Featured section</p>
          </div>
          <Switch
            checked={watch("isFeatured")}
            onCheckedChange={(v) => setValue("isFeatured", v)}
          />
        </label>
        <label className="flex items-center justify-between border border-border/70 p-4">
          <div>
            <p className="text-sm font-medium">Best Seller Badge</p>
            <p className="text-muted-foreground text-xs">Show in the homepage Best Sellers section</p>
          </div>
          <Switch
            checked={watch("isBestSeller")}
            onCheckedChange={(v) => setValue("isBestSeller", v)}
          />
        </label>
        <label className="flex items-center justify-between border border-border/70 p-4">
          <div>
            <p className="text-sm font-medium">Active</p>
            <p className="text-muted-foreground text-xs">Visible on the storefront</p>
          </div>
          <Switch
            checked={watch("isActive")}
            onCheckedChange={(v) => setValue("isActive", v)}
          />
        </label>
      </section>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-fit">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isEditing ? "Save Changes" : "Create Product"}
      </Button>
    </form>
  );
}
