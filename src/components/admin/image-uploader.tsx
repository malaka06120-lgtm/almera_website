"use client";

import * as React from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={src} className="group relative size-24 shrink-0 overflow-hidden rounded-xl border border-border">
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "border-almera-border hover:border-almera-gold flex size-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-xs transition-colors disabled:opacity-50"
          )}
        >
          {uploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          Upload
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
