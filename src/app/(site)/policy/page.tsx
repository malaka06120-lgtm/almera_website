import type { Metadata } from "next";
import { PackageSearch, ShieldOff } from "lucide-react";

import { FadeUp } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Our Policy",
  description:
    "Almera's inspection and returns policy for cash-on-delivery orders across Egypt.",
};

export default function PolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeUp className="mb-16 text-center">
        <span className="text-almera-gold text-xs tracking-luxury uppercase">
          Almera Assurance
        </span>
        <h1 className="font-heading mt-3 text-4xl sm:text-5xl">Our Policy</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
          What to expect when your order arrives.
        </p>
      </FadeUp>

      <FadeUp className="flex flex-col gap-8">
        <div className="flex items-start gap-4">
          <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
            <PackageSearch className="text-almera-gold size-4.5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-heading text-lg">Inspection Before Payment</h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              Customers are welcome to inspect their order with the courier
              before making payment.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="border-almera-border bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full border">
            <ShieldOff className="text-almera-gold size-4.5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-heading text-lg">No Returns or Exchanges</h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              Due to the nature of our products, we do not accept returns or
              exchanges after the order has been accepted and paid for.
            </p>
          </div>
        </div>
      </FadeUp>

      <FadeUp
        delay={0.1}
        className="shadow-luxury-sm mt-14 flex flex-col gap-4 rounded-2xl border border-border/70 bg-white p-8 text-sm leading-relaxed text-muted-foreground sm:p-9"
      >
        <p>
          If the customer is not satisfied with the product during
          inspection, they may refuse the order and return it immediately
          with the courier before payment.
        </p>
        <p>
          Once payment has been completed and the courier has left, the
          order is considered accepted and cannot be returned, refunded, or
          exchanged.
        </p>
      </FadeUp>
    </div>
  );
}
