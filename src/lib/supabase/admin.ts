import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row Level Security entirely.
 * Server-only: never import this file from a Client Component.
 * Used for customer checkout writes (orders/order_items) so prices are
 * always recomputed from trusted product/variant data, never from the client.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
