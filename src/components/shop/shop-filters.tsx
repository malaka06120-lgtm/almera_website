"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { GENDER_LABELS } from "@/lib/constants";
import type { Category } from "@/types";

const MAX_PRICE = 5000;

export function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeGender = searchParams.get("gender");
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? MAX_PRICE);
  const [priceRange, setPriceRange] = React.useState([minPrice, maxPrice]);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="shadow-luxury-sm flex flex-col gap-8 rounded-2xl border border-border/70 bg-white p-6">
      <div>
        <h3 className="text-almera-gold font-heading mb-4 text-xs tracking-luxury uppercase">
          Category
        </h3>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={activeCategory === cat.slug}
                onCheckedChange={(checked) =>
                  updateParams({ category: checked ? cat.slug : null })
                }
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-almera-gold font-heading mb-4 text-xs tracking-luxury uppercase">
          Gender
        </h3>
        <div className="flex flex-col gap-3">
          {Object.entries(GENDER_LABELS).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2.5 text-sm">
              <Checkbox
                checked={activeGender === value}
                onCheckedChange={(checked) =>
                  updateParams({ gender: checked ? value : null })
                }
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-almera-gold font-heading mb-4 text-xs tracking-luxury uppercase">
          Price
        </h3>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(value) =>
            updateParams({
              minPrice: String(value[0]),
              maxPrice: String(value[1]),
            })
          }
        />
        <div className="text-muted-foreground mt-3 flex justify-between text-xs">
          <span>EGP {priceRange[0]}</span>
          <span>EGP {priceRange[1]}</span>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setPriceRange([0, MAX_PRICE]);
          router.push(pathname);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );
}
