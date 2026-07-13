import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground flex field-sizing-content min-h-20 w-full rounded-lg border bg-white px-4 py-2.5 text-sm shadow-none transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-almera-gold focus-visible:ring-almera-gold/25 focus-visible:ring-2",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
