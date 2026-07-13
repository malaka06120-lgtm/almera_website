import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/shared/motion";
import { AlmeraMonogram } from "@/components/shared/almera-logo";

export const metadata: Metadata = {
  title: "About Almera",
  description:
    "Discover the story behind Almera — a house of luxury fragrances crafted in Egypt.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex h-[65vh] min-h-[460px] items-center justify-center overflow-hidden bg-almera-black">
        <Image
          src="/placeholders/about-hero.svg"
          alt="Almera fragrance craftsmanship"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-almera-black/70" />
        <FadeUp className="relative z-10 px-6 text-center text-white">
          <span className="text-almera-gold text-xs tracking-luxury uppercase">
            Our Story
          </span>
          <h1 className="mt-4 font-heading text-4xl sm:text-6xl">
            The Art of Almera
          </h1>
        </FadeUp>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <AlmeraMonogram className="text-6xl" />
          <p className="mt-6 font-heading text-2xl leading-relaxed sm:text-3xl">
            &ldquo;Almera was founded on a single belief — that fragrance is
            the most intimate form of luxury.&rdquo;
          </p>
          <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
            Born in Egypt and inspired by the world&apos;s most storied perfume
            houses, Almera blends rare oud, delicate florals, and warm ambers
            into fragrances designed to be remembered. Every bottle is composed
            in small batches, tested for longevity, and finished with the same
            attention to detail you&apos;d expect from the ateliers of Paris —
            without ever leaving home.
          </p>
        </FadeUp>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeUp>
            <div className="bg-muted shadow-luxury relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/placeholders/about-craft.svg"
                alt="Almera craftsmanship"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <span className="text-almera-gold text-xs tracking-luxury uppercase">
              Craftsmanship
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl">
              Composed with Rare Ingredients
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Each Almera fragrance begins with a search for rare, ethically
              sourced ingredients — Turkish rose, Cambodian oud, Sicilian
              bergamot. Our perfumers layer top, heart, and base notes to
              create compositions that evolve gracefully over the day.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              We bottle in small batches to preserve quality, and every order
              is prepared with care, ready for cash-on-delivery across Egypt.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-almera-blush-soft mx-auto max-w-none px-4 py-24 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <h2 className="font-heading text-3xl sm:text-4xl">
            Ready to Find Your Signature Scent?
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
            Explore the full Almera collection, crafted for men, women, and
            those who wear both worlds.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </FadeUp>
      </section>
    </div>
  );
}
