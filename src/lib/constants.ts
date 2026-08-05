export const SITE_NAME = "Almera";

export const SITE_DESCRIPTION =
  "Almera is a house of luxury fragrances crafted in Egypt.";

export const EGYPT_GOVERNORATES = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Qalyubia",
  "Sharqia",
  "Dakahlia",
  "Beheira",
  "Gharbia",
  "Monufia",
  "Kafr El Sheikh",
  "Damietta",
  "Port Said",
  "Ismailia",
  "Suez",
  "North Sinai",
  "South Sinai",
  "Beni Suef",
  "Fayoum",
  "Minya",
  "Assiut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
  "Red Sea",
  "New Valley",
  "Matrouh",
] as const;

export const SHIPPING_FEE = 70;
export const FREE_SHIPPING_THRESHOLD = 3000;

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
