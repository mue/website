'use client';
import { Skeleton } from '@/components/ui/skeleton';

export function ItemsGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/50 p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex flex-wrap gap-2 mt-auto">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
