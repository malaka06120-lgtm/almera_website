import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/types";

export async function getTestimonials(limit = 6): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
