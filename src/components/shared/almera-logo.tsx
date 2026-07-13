import { cn } from "@/lib/utils";

/** Text-based brand wordmark: the tracked "ALMERA" name. */
export function AlmeraLogo({
  className,
  wordmarkClassName,
  tone = "dark",
}: {
  className?: string;
  wordmarkClassName?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <span
        className={cn(
          "font-heading text-xl tracking-[0.32em]",
          tone === "dark" ? "text-almera-black" : "text-white",
          wordmarkClassName
        )}
      >
        ALMERA
      </span>
    </div>
  );
}

/** Large standalone monogram — for hero watermarks, login screens, loading states. */
export function AlmeraMonogram({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "font-heading italic leading-none",
        tone === "dark" ? "text-almera-black" : "text-white",
        className
      )}
      aria-hidden
    >
      A
    </span>
  );
}
