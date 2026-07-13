import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProductGallery } from "@/components/product/product-gallery";
import { NotesPyramid } from "@/components/product/notes-pyramid";
import { AddToCartForm } from "@/components/product/add-to-cart-form";
import { ProductReviews } from "@/components/product/product-reviews";
import { WishlistButton } from "@/components/product/wishlist-button";
import { ProductGrid } from "@/components/product/product-grid";
import { FadeUp } from "@/components/shared/motion";
import { GENDER_LABELS } from "@/lib/constants";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product);
  const minPrice = Math.min(...(product.variants ?? []).map((v) => v.price));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        <FadeUp>
          <ProductGallery images={product.images} name={product.name} />
        </FadeUp>

        <FadeUp delay={0.1} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            {product.is_best_seller && <Badge variant="gold">Best Seller</Badge>}
            {product.is_featured && <Badge>Featured</Badge>}
            <span className="text-muted-foreground text-xs tracking-luxury uppercase">
              {GENDER_LABELS[product.gender]}
              {product.category && ` · ${product.category.name}`}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <h1 className="font-heading text-4xl leading-tight">
              {product.name}
            </h1>
            <WishlistButton
              product={{ ...product, price: minPrice }}
              className="static shrink-0 opacity-100"
            />
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.description}
          </p>

          <Separator />

          <AddToCartForm product={product} />

          <Separator />

          <NotesPyramid
            topNotes={product.top_notes}
            middleNotes={product.middle_notes}
            baseNotes={product.base_notes}
          />
        </FadeUp>
      </div>

      <Tabs defaultValue="reviews" className="mt-24">
        <TabsList>
          <TabsTrigger value="reviews">
            Reviews ({product.reviews?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="max-w-2xl py-8">
          <ProductReviews reviews={product.reviews ?? []} />
        </TabsContent>
        <TabsContent value="shipping" className="max-w-2xl py-8">
          <div className="text-muted-foreground flex flex-col gap-4 text-sm leading-relaxed">
            <p>
              We currently ship across Egypt only, with cash on delivery
              available in every governorate.
            </p>
            <p>
              Orders are typically prepared within 24 hours and delivered
              within 2–5 business days depending on your location.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <FadeUp>
            <span className="text-almera-gold text-xs tracking-luxury uppercase">
              Complete the Ritual
            </span>
            <h2 className="font-heading mt-2 mb-10 text-3xl">
              You May Also Like
            </h2>
          </FadeUp>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
