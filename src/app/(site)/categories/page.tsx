import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Shop Almera fragrances by category.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeUp className="mb-14 text-center">
        <span className="text-almera-gold text-xs tracking-luxury uppercase">
          Fragrance Families
        </span>
        <h1 className="font-heading mt-3 text-4xl sm:text-5xl">Categories</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
          Find your signature scent, organized by fragrance family.
        </p>
      </FadeUp>

      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <StaggerItem key={category.id}>
            <Link
              href={`/shop?category=${category.slug}`}
              className="group shadow-luxury-sm relative flex aspect-[3/4] items-end overflow-hidden rounded-2xl bg-almera-black transition-shadow duration-500 hover:shadow-luxury"
            >
              {category.image_url && (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative z-10 p-7 text-white">
                <h2 className="font-heading text-2xl">{category.name}</h2>
                {category.description && (
                  <p className="mt-1.5 text-xs text-white/70">
                    {category.description}
                  </p>
                )}
                <span className="text-almera-gold mt-3 inline-block text-xs tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
