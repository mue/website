import { Skeleton } from '@/components/ui/skeleton';

export default function BlogLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.28)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <Skeleton className="mx-auto mb-6 h-8 w-64" />
          <Skeleton className="mx-auto mb-4 h-12 w-full max-w-3xl sm:h-16" />
          <Skeleton className="mx-auto h-6 w-full max-w-2xl" />
        </header>

        {/* Filter skeleton */}
        <div className="mb-8 flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>

        {/* Blog posts grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="mb-4 aspect-[21/9] w-full rounded-2xl" />
              <div className="mb-2 flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="mb-3 h-7 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-4/5" />
              <div className="mt-auto flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
