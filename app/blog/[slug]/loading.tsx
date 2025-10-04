import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />

      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* Back button skeleton */}
        <Skeleton className="mb-8 h-9 w-32" />

        <header className="mb-12">
          {/* Featured image skeleton */}
          <Skeleton className="mb-8 aspect-[21/9] w-full rounded-2xl" />

          <div className="space-y-4">
            {/* Tags skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-12 w-full sm:h-14" />
            <Skeleton className="h-12 w-4/5 sm:h-14" />

            {/* Meta info skeleton */}
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Description skeleton */}
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </header>

        {/* Content skeleton */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              {i % 3 === 0 && <Skeleton className="my-6 h-6 w-2/3" />}
            </div>
          ))}
        </div>

        {/* Navigation skeleton */}
        <div className="mt-16 grid gap-4 border-t pt-8 md:grid-cols-2">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        {/* CTA skeleton */}
        <Skeleton className="mt-12 h-48 w-full rounded-2xl" />
      </article>
    </div>
  );
}
