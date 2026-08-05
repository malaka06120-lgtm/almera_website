import Link from "next/link";
import { MapPin } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InstagramIcon, FacebookIcon } from "@/components/shared/social-icons";
import { AlmeraLogo } from "@/components/shared/almera-logo";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  FACEBOOK_HANDLE,
  FACEBOOK_URL,
} from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-almera-black text-white mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <AlmeraLogo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              A house of luxury fragrances crafted for those who leave an
              impression. Cash on delivery, anywhere in Egypt.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-almera-gold hover:text-almera-gold"
              >
                <InstagramIcon className="size-4" />
              </Link>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-almera-gold hover:text-almera-gold"
              >
                <FacebookIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-almera-gold font-heading text-xs tracking-luxury uppercase">
              Explore
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-white/60">
              <li><Link href="/shop" className="transition-colors hover:text-white">Shop All</Link></li>
              <li><Link href="/categories" className="transition-colors hover:text-white">Categories</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-white">About Almera</Link></li>
              <li><Link href="/policy" className="transition-colors hover:text-white">Our Policy</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
              <li><Link href="/wishlist" className="transition-colors hover:text-white">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-almera-gold font-heading text-xs tracking-luxury uppercase">
              Get in Touch
            </h3>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-white/60">
              <li>
                <Link
                  href={INSTAGRAM_URL}
                  target="_blank"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <InstagramIcon className="size-4 shrink-0" /> {INSTAGRAM_HANDLE}
                </Link>
              </li>
              <li>
                <Link
                  href={FACEBOOK_URL}
                  target="_blank"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <FacebookIcon className="size-4 shrink-0" /> {FACEBOOK_HANDLE}
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0" /> Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-almera-gold font-heading text-xs tracking-luxury uppercase">
            Join the Almera Circle
          </h3>
          <p className="mt-3 max-w-md text-sm text-white/60">
            Be the first to know about new arrivals and exclusive offers.
          </p>
          <form className="mt-5 flex max-w-md gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="rounded-full border-white/20 bg-white/5 text-white placeholder:text-white/40"
            />
            <Button
              type="submit"
              className="shrink-0 rounded-full bg-white text-almera-black hover:border-almera-gold hover:bg-white"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="my-12 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Almera. All rights reserved.</p>
          <p className="tracking-wide">Made in Egypt &middot; Cash on Delivery only</p>
        </div>
      </div>
    </footer>
  );
}
