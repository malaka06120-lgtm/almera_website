"use client";

/**
 * Meta Pixel event helpers, mirroring the structure of
 * src/lib/analytics/ecommerce.ts (the GA4 helper) so both trackers stay
 * consistent. Only the base pixel + PageView is wired up right now (see
 * src/app/layout.tsx) — these functions are ready to call once we're ready
 * to fire product-level events, but nothing currently calls them.
 *
 * Every helper no-ops safely if fbq hasn't loaded (NEXT_PUBLIC_META_PIXEL_ID
 * unset, ad blockers, or during SSR) — callers never need to guard.
 */

export interface MetaPixelProduct {
  content_id: string;
  content_name: string;
  content_category?: string;
  value: number;
  quantity?: number;
}

const DEFAULT_CURRENCY = "EGP";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fire(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Fires Meta's `ViewContent` event for a single product. */
export function trackViewContent(
  product: MetaPixelProduct,
  currency: string = DEFAULT_CURRENCY
) {
  fire("ViewContent", {
    content_type: "product",
    content_ids: [product.content_id],
    content_name: product.content_name,
    content_category: product.content_category,
    value: product.value,
    currency,
  });
}

/** Fires Meta's `AddToCart` event for a single product. */
export function trackAddToCart(
  product: MetaPixelProduct,
  currency: string = DEFAULT_CURRENCY
) {
  fire("AddToCart", {
    content_type: "product",
    content_ids: [product.content_id],
    content_name: product.content_name,
    content_category: product.content_category,
    value: product.value,
    currency,
  });
}

/** Fires Meta's `InitiateCheckout` event once for the whole cart. */
export function trackInitiateCheckout(
  products: MetaPixelProduct[],
  value: number,
  currency: string = DEFAULT_CURRENCY
) {
  if (products.length === 0) return;
  fire("InitiateCheckout", {
    content_type: "product",
    content_ids: products.map((p) => p.content_id),
    contents: products.map((p) => ({ id: p.content_id, quantity: p.quantity ?? 1 })),
    num_items: products.length,
    value,
    currency,
  });
}

/**
 * Fires Meta's `Purchase` event once for a completed order. Only call this
 * after an order has actually been saved successfully — never optimistically.
 */
export function trackPurchase(
  transactionId: string,
  products: MetaPixelProduct[],
  value: number,
  currency: string = DEFAULT_CURRENCY
) {
  if (products.length === 0) return;
  fire("Purchase", {
    content_type: "product",
    content_ids: products.map((p) => p.content_id),
    contents: products.map((p) => ({ id: p.content_id, quantity: p.quantity ?? 1 })),
    value,
    currency,
    // Not a standard Meta parameter, but harmless to include for your own
    // debugging/dedup — Meta ignores unrecognized custom parameters.
    order_id: transactionId,
  });
}
