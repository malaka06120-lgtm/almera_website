import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "@/components/shared/social-icons";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";

const GALLERY_IMAGES = [
  "/placeholders/gallery-1.svg",
  "/placeholders/gallery-2.svg",
  "/placeholders/gallery-3.svg",
  "/placeholders/gallery-4.svg",
  "/placeholders/gallery-5.svg",
  "/placeholders/gallery-6.svg",
];

export function InstagramGallery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <FadeUp className="mb-12 text-center">
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

        <StaggerGroup className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <StaggerItem key={i}>
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                className="group bg-muted relative block aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={src}
                  alt="Almera on Instagram"
                  fill
                  sizes="(min-width: 640px) 16vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
