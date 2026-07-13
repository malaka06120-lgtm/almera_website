import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <Skeleton className="h-96 w-full" />
        </aside>
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
