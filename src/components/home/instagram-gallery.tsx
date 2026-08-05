import Link from "next/link";

import { InstagramIcon } from "@/components/shared/social-icons";
import { FadeUp } from "@/components/shared/motion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";

export function InstagramGallery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <span className="text-almera-gold text-xs tracking-luxury uppercase">
            Follow Along
          </span>
          <h2 className="font-heading mt-3 text-3xl sm:text-4xl">
            Follow Almera
          </h2>
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            className="text-muted-foreground mt-3 inline-flex items-center gap-2 text-sm transition-colors hover:text-almera-gold"
          >
            <InstagramIcon className="size-4" /> {INSTAGRAM_HANDLE}
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
