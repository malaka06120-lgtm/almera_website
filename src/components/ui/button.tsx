import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 border",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-transparent shadow-luxury-sm hover:border-almera-gold hover:shadow-luxury",
        destructive:
          "bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90",
        outline:
          "border-almera-black/80 bg-transparent text-foreground hover:bg-almera-black hover:text-white hover:border-almera-black",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:border-almera-gold",
        ghost:
          "border-transparent hover:bg-almera-blush-soft hover:text-accent-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-2 rounded-lg",
        sm: "h-9 px-4 rounded-lg text-xs",
        lg: "h-13 px-9 rounded-lg text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
