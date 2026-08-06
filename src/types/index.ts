export type Gender = "men" | "women" | "unisex";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size_ml: number;
  price: number;
  stock_quantity: number;
  sku: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  gender: Gender;
  category_id: string | null;
  images: string[];
  top_notes: string[];
  middle_notes: string[];
  base_notes: string[];
  is_featured: boolean;
  is_best_seller: boolean;
  is_original: boolean;
  is_tester: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  variants?: ProductVariant[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  product_id: string | null;
  customer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  full_name: string;
  phone: string;
  delivery_area: string;
  city: string;
  address: string;
  notes: string | null;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_name: string;
  size_ml: number;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

/** Client-side cart line item (persisted in localStorage, not the DB). */
export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  sizeMl: number;
  price: number;
  quantity: number;
  stockQuantity: number;
}

export type SortOption =
  | "newest"
  | "best-selling"
  | "price-asc"
  | "price-desc";
