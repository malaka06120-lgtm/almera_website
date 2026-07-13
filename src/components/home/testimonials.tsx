import { Star } from "lucide-react";

import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import type { Review } from "@/types";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-almera-blush-soft">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeUp className="mb-16 text-center">
          <span className="text-almera-gold text-xs tracking-luxury uppercase">
            Testimonials
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl">
            Loved by Our Customers
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm">
            Real words from the Almera community across Egypt.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.id}>
              <figure className="shadow-luxury-sm flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-white p-7 transition-shadow duration-300 hover:shadow-luxury">
                <div className="text-almera-gold flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      fill={i < review.rating ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <blockquote className="text-foreground/90 text-sm leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>
                <figcaption className="text-muted-foreground mt-auto text-xs tracking-wide uppercase">
                  {review.customer_name}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
