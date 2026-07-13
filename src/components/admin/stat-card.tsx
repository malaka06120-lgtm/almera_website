import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div className="shadow-luxury-sm flex items-center gap-4 rounded-2xl border border-border/70 bg-white p-5 transition-shadow duration-300 hover:shadow-luxury">
      <div className="bg-almera-blush-soft flex size-12 shrink-0 items-center justify-center rounded-full">
        <Icon className="text-almera-gold size-5" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-muted-foreground text-xs tracking-wide uppercase">
          {label}
        </p>
        <p className="font-heading text-2xl">{value}</p>
      </div>
    </div>
  );
}
