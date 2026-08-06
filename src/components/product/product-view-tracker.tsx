"use client";

import * as React from "react";

import { trackProductViewed, type EcommerceProduct } from "@/lib/analytics/ecommerce";

/** Fires GA4's view_item event once when a product detail page mounts. */
export function ProductViewTracker({ product }: { product: EcommerceProduct }) {
  React.useEffect(() => {
    trackProductViewed(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.item_id]);

  return null;
}
