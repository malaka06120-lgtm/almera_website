import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full sm:aspect-[4/5]" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
