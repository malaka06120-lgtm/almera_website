import { createClient } from "@/lib/supabase/server";
import type { Order, Product } from "@/types";

const PRODUCT_SELECT = `*, category:categories(*), variants:product_variants(*)`;

export async function getAdminProducts(search?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as unknown as Product[];
}

export async function getAdminProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as unknown as Product | null;
}

export interface AdminOrderFilters {
  search?: string;
  status?: string;
}

export async function getAdminOrders(
  filters: AdminOrderFilters = {}
): Promise<Order[]> {
  const supabase = await createClient();
  let query = supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.search) {
    query = query.or(
      `order_number.ilike.%${filters.search}%,full_name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: totalProducts },
    { count: pendingOrders },
    { count: totalOrders },
    { data: recentOrders },
    { data: lowStockVariants },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("product_variants")
      .select("id, size_ml, stock_quantity, product:products(name)")
      .lte("stock_quantity", 5)
      .order("stock_quantity", { ascending: true })
      .limit(5),
  ]);

  const { data: revenueData } = await supabase
    .from("orders")
    .select("total")
    .neq("status", "cancelled");

  const totalRevenue = (revenueData ?? []).reduce(
    (sum, o) => sum + Number(o.total),
    0
  );

  return {
    totalProducts: totalProducts ?? 0,
    pendingOrders: pendingOrders ?? 0,
    totalOrders: totalOrders ?? 0,
    totalRevenue,
    recentOrders: (recentOrders ?? []) as Order[],
    lowStockVariants: lowStockVariants ?? [],
  };
}
