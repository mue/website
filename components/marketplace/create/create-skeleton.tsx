import { Skeleton } from '@/components/ui/skeleton';

export function CreateAddonSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 lg:px-8">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="hidden h-3 w-10 sm:block" />
            </div>
            {i < 5 && <Skeleton className="mx-2 mb-4 h-px flex-1" />}
          </div>
        ))}
      </div>

      {/* Welcome step content */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 py-8">
        {/* Hero */}
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Addon type cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-5">
              <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
              <Skeleton className="mb-1.5 h-4 w-24" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
