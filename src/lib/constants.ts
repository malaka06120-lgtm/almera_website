export const SITE_NAME = "Almera";

export const SITE_DESCRIPTION =
  "Almera is a house of luxury fragrances crafted in Egypt.";

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const ORDER_STATUS_FLOW = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
] as const;

export const GENDER_LABELS: Record<string, string> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
};

export const INSTAGRAM_HANDLE = "@almera_eg";
export const INSTAGRAM_URL = "https://instagram.com/almera_eg";

export const FACEBOOK_HANDLE = "Almera";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61576716705686";
