import { Star } from "lucide-react";

import type { Review } from "@/types";

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No reviews yet for this fragrance.
      </p>
    );
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="font-heading text-3xl">{average.toFixed(1)}</span>
        <div>
          <div className="flex gap-0.5 text-almera-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4"
                fill={i < Math.round(average) ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-xs">
            Based on {reviews.length} review{reviews.length !== 1 && "s"}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-border/70 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {review.customer_name}
              </span>
              <div className="flex gap-0.5 text-almera-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5"
                    fill={i < review.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              {review.comment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
