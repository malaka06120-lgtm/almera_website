import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 py-32 text-center">
      <span className="font-heading text-6xl">404</span>
      <h1 className="font-heading text-2xl">This scent has evaporated</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        We couldn&apos;t find the page you were looking for. Let&apos;s get
        you back to the collection.
      </p>
      <Button asChild size="lg" className="mt-4">
        <Link href="/shop">Return to Shop</Link>
      </Button>
    </div>
  );
}
