import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeUp } from "@/components/shared/motion";

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
              <Phone className="text-almera-gold size-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-lg">Call Us</h3>
              <p className="text-muted-foreground text-sm">+20 100 000 0000</p>
              <p className="text-muted-foreground text-sm">
                Sat–Thu, 10am–8pm (Cairo time)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
              <Mail className="text-almera-gold size-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-lg">Email Us</h3>
              <p className="text-muted-foreground text-sm">hello@almera.com</p>
              <p className="text-muted-foreground text-sm">
                We reply within 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
              <MapPin className="text-almera-gold size-4.5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-lg">Visit Us</h3>
              <p className="text-muted-foreground text-sm">
                Cairo, Egypt — showroom by appointment
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
