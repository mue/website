import { Skeleton } from '@/components/ui/skeleton';

export default function MarketplaceLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-5 w-64" />

      {/* Header skeleton */}
      <div className="mb-6 text-center">
        <Skeleton className="mx-auto mb-4 h-12 w-full max-w-2xl" />
        <Skeleton className="mx-auto h-6 w-full max-w-xl" />
      </div>

      {/* Featured collections skeleton */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-2xl" />
        ))}
      </div>

      {/* Filters and search skeleton */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-10 w-full lg:w-64" />
      </div>

      {/* Items grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/70 p-4">
            <Skeleton className="mb-4 h-24 w-24 rounded-xl" />
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
