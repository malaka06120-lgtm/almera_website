"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");

  function addTag() {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setDraft("");
  }

  return (
    <div className="border-input flex flex-wrap items-center gap-2 border p-2">
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            aria-label={`Remove ${tag}`}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
        placeholder={placeholder ?? "Type and press Enter"}
        className="h-8 flex-1 border-none px-1 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
