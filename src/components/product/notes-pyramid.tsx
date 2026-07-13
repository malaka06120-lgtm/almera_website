const LEVELS = [
  { key: "top", label: "Top Notes" },
  { key: "middle", label: "Heart Notes" },
  { key: "base", label: "Base Notes" },
] as const;

export function NotesPyramid({
  topNotes,
  middleNotes,
  baseNotes,
}: {
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}) {
  const notesByLevel: Record<(typeof LEVELS)[number]["key"], string[]> = {
    top: topNotes,
    middle: middleNotes,
    base: baseNotes,
  };

  if (topNotes.length + middleNotes.length + baseNotes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <span className="text-almera-gold text-xs tracking-luxury uppercase">
        The Fragrance Notes
      </span>
      {LEVELS.map(({ key, label }) => {
        const notes = notesByLevel[key];
        if (notes.length === 0) return null;
        return (
          <div key={key} className="flex items-start gap-6">
            <span className="text-muted-foreground w-24 shrink-0 text-xs tracking-luxury uppercase">
              {label}
            </span>
            <div className="flex flex-wrap gap-2">
              {notes.map((note) => (
                <span
                  key={note}
                  className="border-almera-border bg-almera-blush-soft rounded-full border px-3.5 py-1 text-xs"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
