"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AdminError({
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-3xl">Dashboard Error</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        Something went wrong loading the admin dashboard.
      </p>
      <Button size="lg" onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
