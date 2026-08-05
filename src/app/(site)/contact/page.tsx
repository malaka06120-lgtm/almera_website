import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeUp } from "@/components/shared/motion";
import { InstagramIcon, FacebookIcon } from "@/components/shared/social-icons";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  FACEBOOK_HANDLE,
  FACEBOOK_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Almera for order questions, wholesale inquiries, or fragrance advice.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeUp className="mb-16 text-center">
        <span className="text-almera-gold text-xs tracking-luxury uppercase">
          We&apos;d Love to Hear From You
        </span>
        <h1 className="font-heading mt-3 text-4xl sm:text-5xl">Get in Touch</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
          Questions about an order, a fragrance, or a partnership? We&apos;d
          love to hear from you.
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <FadeUp className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
              <InstagramIcon className="text-almera-gold size-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-lg">Instagram</h3>
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                className="text-muted-foreground text-sm transition-colors hover:text-almera-gold"
              >
                {INSTAGRAM_HANDLE}
              </Link>
              <p className="text-muted-foreground text-sm">
                DM us for the fastest response
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
              <FacebookIcon className="text-almera-gold size-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-lg">Facebook</h3>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                className="text-muted-foreground text-sm transition-colors hover:text-almera-gold"
              >
                {FACEBOOK_HANDLE}
              </Link>
              <p className="text-muted-foreground text-sm">
                Message us anytime
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="shadow-luxury-sm rounded-2xl border border-border/70 bg-white p-8 sm:p-9">
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  );
}
