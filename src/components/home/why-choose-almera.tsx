import { Gem, Leaf, ShieldCheck, Truck } from "lucide-react";

import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/motion";

const REASONS = [
  {
    icon: Gem,
    title: "Rare, Long-Lasting Notes",
    description:
      "Every fragrance is composed with rare ingredients for exceptional depth and longevity.",
  },
  {
    icon: Truck,
    title: "Cash on Delivery",
    description:
      "Order with confidence — pay only when your Almera fragrance arrives at your door.",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description:
      "Crafted and bottled in-house, every Almera bottle is guaranteed authentic.",
  },
  {
    icon: Leaf,
    title: "Cruelty-Free",
    description:
      "Our fragrances are never tested on animals, without compromising on quality.",
  },
];

export function WhyChooseAlmera() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeUp className="mb-16 text-center">
          <span className="text-almera-gold text-xs tracking-luxury uppercase">
            Our Promise
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl">
            Why Choose Almera
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm">
            Every detail, from bottle to note, is considered — because luxury
            is in the details.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <StaggerItem
              key={title}
              className="flex flex-col items-center text-center"
            >
              <div className="border-almera-border bg-almera-blush-soft mb-6 flex size-16 items-center justify-center rounded-full border transition-transform duration-300 hover:scale-105">
                <Icon className="text-almera-gold size-6" strokeWidth={1.25} />
              </div>
              <h3 className="font-heading text-lg">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
