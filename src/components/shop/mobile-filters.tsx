"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopFilters } from "@/components/shop/shop-filters";
import type { Category } from "@/types";

export function MobileFilters({ categories }: { categories: Category[] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs overflow-y-auto">
        <SheetHeader className="border-b">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-6 py-4">
          <ShopFilters categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
