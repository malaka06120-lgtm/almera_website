"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances..."
            className="h-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}
