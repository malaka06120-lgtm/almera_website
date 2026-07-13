import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center font-sans">
        <span className="text-6xl">404</span>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          The page you were looking for doesn&apos;t exist.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/">Return Home</Link>
        </Button>
      </body>
    </html>
  );
}
