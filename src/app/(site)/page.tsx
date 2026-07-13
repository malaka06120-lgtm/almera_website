import { Hero } from "@/components/home/hero";
import { ProductCarouselSection } from "@/components/home/product-carousel-section";
import { WhyChooseAlmera } from "@/components/home/why-choose-almera";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import {
  getBestSellers,
  getFeaturedProducts,
  getNewArrivals,
} from "@/lib/data/products";
import { getTestimonials } from "@/lib/data/reviews";

export default async function HomePage() {
  const [featured, bestSellers, newArrivals, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getNewArrivals(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />

      <ProductCarouselSection
        eyebrow="Signature Edit"
        title="Featured Fragrances"
        subtitle="Hand-picked selections that define the Almera signature."
        products={featured}
        viewAllHref="/shop?featured=true"
      />

      <ProductCarouselSection
        eyebrow="Customer Favorites"
        title="Best Sellers"
        subtitle="The fragrances our customers keep coming back for."
        products={bestSellers}
        viewAllHref="/shop?bestseller=true"
      />

      <ProductCarouselSection
        eyebrow="Just Landed"
        title="New Arrivals"
        subtitle="The latest additions to the Almera collection."
        products={newArrivals}
        viewAllHref="/shop?sort=newest"
      />

      <WhyChooseAlmera />
      <Testimonials reviews={testimonials} />
      <InstagramGallery />
    </>
  );
}
