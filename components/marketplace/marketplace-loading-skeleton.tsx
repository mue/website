import { Skeleton } from '@/components/ui/skeleton';
import { FeaturedCollectionsSkeleton } from './featured-collections-skeleton';

export function MarketplaceLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-busy="true" aria-label="Loading marketplace">

      {/* Search bar + Create Addon button */}
      <div className="flex flex-row items-start justify-between gap-2">
        <Skeleton className="h-12 max-w-2xl flex-1 rounded-lg" />
        <Skeleton className="h-12 w-32 shrink-0 rounded-lg" />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      {/* Featured Collections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <FeaturedCollectionsSkeleton />
      </div>

      {/* Browse by Author — just a heading row, no cards */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Items header controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-4 lg:gap-4 lg:p-6">
            <div className="flex items-center justify-center lg:justify-start">
              <Skeleton className="h-16 w-16 rounded-xl lg:h-20 lg:w-20" />
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <Skeleton className="mx-auto h-5 w-3/4 lg:mx-0" />
              <Skeleton className="mx-auto h-4 w-1/2 lg:mx-0" />
            </div>
            <div className="hidden gap-2 lg:flex">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
