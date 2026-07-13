"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-32 text-center">
      <h1 className="font-heading text-3xl">Something Went Wrong</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        We hit a snag loading this page. Please try again.
      </p>
      <Button size="lg" onClick={() => reset()} className="mt-2">
        Try Again
      </Button>
    </div>
  );
}
