"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export async function submitContactMessage(values: ContactFormValues) {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false as const, error: "Please check your details and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  if (error) {
    return { success: false as const, error: "Something went wrong. Please try again." };
  }

  return { success: true as const };
}
