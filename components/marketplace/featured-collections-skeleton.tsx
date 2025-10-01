'use client';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedCollectionsSkeleton() {
  return (
    <div className="w-full">
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr] overflow-hidden rounded-2xl border border-border bg-card/50 p-0">
        <div className="relative min-h-[220px]">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="mt-auto flex gap-3">
            <Skeleton className="h-9 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
