import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Order } from "@/types";

/**
 * Fetches a single order by id for the (unauthenticated) order-success page.
 * Safe because the URL uses the order's random UUID, never the human-friendly
 * order_number, so it can't be enumerated.
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}
