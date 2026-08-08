"use client";

import * as React from "react";

import { trackProductViewed, type EcommerceProduct } from "@/lib/analytics/ecommerce";
import { trackViewContent } from "@/lib/analytics/meta-pixel";

/** Fires GA4's view_item and Meta's ViewContent once when a product detail page mounts. */
export function ProductViewTracker({ product }: { product: EcommerceProduct }) {
  React.useEffect(() => {
    trackProductViewed(product);
    trackViewContent({
      content_id: product.item_id,
      content_name: product.item_name,
      content_category: product.item_category,
      value: product.price * product.quantity,
      quantity: product.quantity,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.item_id]);

  return null;
}
