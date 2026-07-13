"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

export function Hero() {
  return (
    <section className="from-almera-blush via-almera-blush to-almera-blush-soft relative w-full overflow-hidden bg-gradient-to-b">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-36 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:pt-40 lg:pb-24 xl:px-8">
        <div className="order-2 flex flex-col items-start gap-6 text-left lg:order-1">
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="text-almera-gold text-xs tracking-luxury uppercase"
          >
            The Almera Collection
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="max-w-xl font-heading text-5xl leading-[1.08] text-balance text-almera-black sm:text-6xl lg:text-[4.2rem]"
          >
            Elegance That Empowers
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="max-w-md text-balance text-base leading-relaxed text-almera-black/60"
          >
            Discover Almera&apos;s house of luxury fragrances — soft, radiant
            compositions crafted for those who wear their presence quietly.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="mt-2 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" asChild className="rounded-lg">
              <Link href="/shop">Shop the Collection</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-lg">
              <Link href="/about">Discover Almera</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="shadow-luxury relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/4]"
          >
            <Image
              src="/placeholders/hero.svg"
              alt="Almera signature fragrance"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
