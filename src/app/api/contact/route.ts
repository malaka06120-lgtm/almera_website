import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error:
          parsed.error.issues[0]?.message ??
          "Please check your details and try again.",
      },
      { status: 400 }
    );
  }

  const { fullName, email, message } = parsed.data;

  const adminEmails = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (adminEmails.length === 0) {
    console.error("ADMIN_EMAIL is not configured.");
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Almera <onboarding@resend.dev>",
      to: adminEmails,
      replyTo: email,
      subject: "New Contact Form - Almera",
      text: `Name: ${fullName}\n\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend failed to send contact email:", error);
      return NextResponse.json(
        { success: false, error: "Something went wrong." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong." },
      { status: 502 }
    );
  }

  // Best-effort persistence alongside the email — the email above is the
  // primary delivery channel, so a storage hiccup here shouldn't fail the
  // request once the message has already reached the inbox.
  try {
    const supabase = await createClient();
    await supabase
      .from("contact_messages")
      .insert({ name: fullName, email, message });
  } catch (err) {
    console.error("Failed to store contact message in Supabase:", err);
  }

  return NextResponse.json({ success: true });
}
