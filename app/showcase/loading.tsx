import { Skeleton } from '@/components/ui/skeleton';

export default function ShowcaseLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="mx-auto mb-6 h-8 w-48" />
          <Skeleton className="mx-auto mb-4 h-12 w-full max-w-3xl sm:h-16" />
          <Skeleton className="mx-auto mb-8 h-6 w-full max-w-2xl" />
          <div className="flex justify-center gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>

        {/* Gallery grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-video w-full rounded-2xl"
              style={{
                height: i % 3 === 0 ? '400px' : i % 3 === 1 ? '300px' : '350px',
              }}
            />
          ))}
        </div>

        {/* Load more skeleton */}
        <div className="mt-12 text-center">
          <Skeleton className="mx-auto h-11 w-40" />
        </div>
      </div>
    </div>
  );
}
