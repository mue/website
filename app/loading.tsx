import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-16 w-full max-w-3xl" />
          <Skeleton className="h-6 w-full max-w-2xl" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card/70 p-6">
              <Skeleton className="mb-4 h-40 w-full rounded-lg" />
              <Skeleton className="mb-3 h-6 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
