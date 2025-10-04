import { Skeleton } from '@/components/ui/skeleton';

export default function PhotographyLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto mb-6 h-8 w-56" />
          <Skeleton className="mx-auto mb-4 h-12 w-full max-w-3xl sm:h-16" />
          <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
          <div className="flex justify-center gap-3">
            <Skeleton className="h-11 w-36" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>

        {/* Features skeleton */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>

        {/* Stats skeleton */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>

        {/* Photo showcase skeleton */}
        <div className="mb-16">
          <Skeleton className="mb-8 h-10 w-64" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA section skeleton */}
        <div className="rounded-3xl border border-border bg-card/70 p-12 text-center">
          <Skeleton className="mx-auto mb-4 h-10 w-2/3" />
          <Skeleton className="mx-auto mb-8 h-6 w-full max-w-xl" />
          <div className="flex justify-center gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
