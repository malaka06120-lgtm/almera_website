/**
 * Single source of truth for delivery areas and their fees. Edit the fee
 * numbers or move an area between groups here — every place that shows or
 * charges a delivery fee (checkout, order emails, admin dashboard) reads
 * from this file.
 */
export interface DeliveryFeeGroup {
  fee: number;
  areas: string[];
}

export const DELIVERY_FEE_GROUPS: DeliveryFeeGroup[] = [
  {
    fee: 70,
    areas: [
      "New Cairo",
      "El Rehab",
      "October",
      "Helwan",
      "Maadi",
      "Haram",
      "Hadayek Al Ahram",
      "Faisal",
      "Dokki",
      "Mohandessin",
      "Agouza",
      "Zamalek",
      "Shubra",
      "Salam City",
      "El Marg",
      "Shera El Salam",
      "Madinaty",
      "El Obour",
      "El Shorouk",
      "Badr City",
      "Mostakbal City",
      "Abu Rawash",
      "Kerdasa",
    ],
  },
  {
    fee: 75,
    areas: [
      "Alexandria",
      "Dakahlia",
      "Gharbia",
      "Monufia",
      "Qalyubia",
      "Kafr El Sheikh",
      "Damietta",
      "Sharqia",
      "Ismailia",
      "Suez",
      "Port Said",
      "Beheira",
      "Fayoum",
      "Beni Suef",
    ],
  },
  {
    fee: 80,
    areas: ["Borg El Arab", "Amreya", "Agami", "King Mariout", "North Coast (near Alexandria)"],
  },
  {
    fee: 85,
    areas: ["Minya", "Assiut", "Sohag"],
  },
  {
    fee: 95,
    areas: ["Qena", "Luxor", "Aswan"],
  },
  {
    fee: 135,
    areas: ["New Valley", "Red Sea", "Marsa Matrouh", "North Coast"],
  },
];

export interface DeliveryArea {
  name: string;
  fee: number;
}

export const DELIVERY_AREAS: DeliveryArea[] = DELIVERY_FEE_GROUPS.flatMap((group) =>
  group.areas.map((name) => ({ name, fee: group.fee }))
);

const DELIVERY_FEE_BY_AREA = new Map(DELIVERY_AREAS.map((area) => [area.name, area.fee]));

export const DELIVERY_AREA_NAMES = new Set(DELIVERY_AREAS.map((area) => area.name));

/**
 * Orders with a subtotal at or above this amount ship free, regardless of
 * delivery area. Change this one number to retune the free-shipping promo
 * advertised sitewide ("Free shipping over EGP 3000").
 */
export const FREE_SHIPPING_THRESHOLD = 3000;

/** Returns the area's base delivery fee, or undefined if the area isn't recognized. */
export function getDeliveryFee(area: string): number | undefined {
  return DELIVERY_FEE_BY_AREA.get(area);
}

/**
 * Returns the delivery fee actually charged for an order: 0 once the
 * subtotal clears FREE_SHIPPING_THRESHOLD, otherwise the area's base fee.
 * Undefined if the area isn't recognized. This is the single place that
 * combines area fee + free-shipping logic — checkout, the order server
 * action, and anywhere else charging delivery should all call this rather
 * than re-deriving the rule themselves.
 */
export function calculateDeliveryFee(area: string, subtotal: number): number | undefined {
  const areaFee = getDeliveryFee(area);
  if (areaFee === undefined) return undefined;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : areaFee;
}
