import { Skeleton } from '@/components/ui/skeleton';

export default function MarketplaceItemLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-5 w-96" />

      <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Left Column - Info Card */}
        <aside className="space-y-4 lg:space-y-6">
          <div className="rounded-2xl border border-border bg-card/80 p-6">
            {/* Icon skeleton */}
            <div className="mb-6 flex flex-col items-center gap-4 text-center">
              <Skeleton className="h-24 w-24 rounded-2xl" />
              <div className="w-full space-y-2">
                <Skeleton className="mx-auto h-7 w-40" />
                <Skeleton className="mx-auto h-5 w-24 rounded-full" />
              </div>
            </div>

            {/* Separator */}
            <div className="my-6 h-px bg-border" />

            {/* Metadata skeleton */}
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="my-6 h-px bg-border" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Separator */}
            <div className="my-6 h-px bg-border" />

            {/* Actions skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Collections card skeleton */}
          <div className="rounded-2xl border border-border bg-card/80 p-6">
            <Skeleton className="mb-4 h-5 w-32" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column - Content */}
        <main className="min-h-[400px]">
          {/* Tabs skeleton */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <Skeleton className="mb-4 h-8 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Stats skeleton */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
