"use client";

/**
 * Reusable GA4 ecommerce event helpers. Event names follow GA4's official
 * ecommerce naming (view_item, add_to_cart, remove_from_cart,
 * begin_checkout, purchase); each item in the payload carries GA4's
 * standard item_id, item_name, item_category, price, and quantity
 * parameters, with currency and a total value at the top level.
 *
 * Every helper no-ops safely if gtag hasn't loaded (NEXT_PUBLIC_GA_ID
 * unset, ad blockers, or during SSR) — callers never need to guard.
 */

export interface EcommerceProduct {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
}

const DEFAULT_CURRENCY = "EGP";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function toGtagItem(product: EcommerceProduct) {
  return {
    item_id: product.item_id,
    item_name: product.item_name,
    item_category: product.item_category,
    price: product.price,
    quantity: product.quantity,
  };
}

function totalValue(products: EcommerceProduct[]) {
  return products.reduce((sum, p) => sum + p.price * p.quantity, 0);
}

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Fires GA4's `view_item` event for a single product. */
export function trackProductViewed(
  product: EcommerceProduct,
  currency: string = DEFAULT_CURRENCY
) {
  sendEvent("view_item", {
    currency,
    value: product.price * product.quantity,
    items: [toGtagItem(product)],
  });
}

/** Fires GA4's `add_to_cart` event for a single product. */
export function trackAddToCart(
  product: EcommerceProduct,
  currency: string = DEFAULT_CURRENCY
) {
  sendEvent("add_to_cart", {
    currency,
    value: product.price * product.quantity,
    items: [toGtagItem(product)],
  });
}

/** Fires GA4's `remove_from_cart` event for a single product. */
export function trackRemoveFromCart(
  product: EcommerceProduct,
  currency: string = DEFAULT_CURRENCY
) {
  sendEvent("remove_from_cart", {
    currency,
    value: product.price * product.quantity,
    items: [toGtagItem(product)],
  });
}

/** Fires GA4's `begin_checkout` event once for the whole cart. */
export function trackBeginCheckout(
  products: EcommerceProduct[],
  currency: string = DEFAULT_CURRENCY
) {
  if (products.length === 0) return;
  sendEvent("begin_checkout", {
    currency,
    value: totalValue(products),
    items: products.map(toGtagItem),
  });
}

/** Fires GA4's `purchase` event once for the completed order. */
export function trackPurchase(
  transactionId: string,
  products: EcommerceProduct[],
  value: number,
  currency: string = DEFAULT_CURRENCY
) {
  if (products.length === 0) return;
  sendEvent("purchase", {
    transaction_id: transactionId,
    currency,
    value,
    items: products.map(toGtagItem),
  });
}
