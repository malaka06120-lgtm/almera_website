"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = React.useState(0);
  const gallery = images;

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse">
      <div className="bg-muted shadow-luxury relative aspect-square w-full overflow-hidden rounded-2xl sm:aspect-[4/5]">
        {gallery[active] && (
          <Image
            src={gallery[active]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="animate-fade-in object-cover"
            key={gallery[active]}
          />
        )}
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={cn(
                "bg-muted relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:size-20",
                active === i ? "border-almera-gold" : "border-transparent"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
