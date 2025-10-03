export function MarketplaceLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading marketplace">
      {/* Search bar skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-10 w-full rounded-xl bg-muted animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      {/* Featured collections carousel skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 rounded-md bg-muted animate-pulse" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px] bg-muted animate-pulse" />
            <div className="flex flex-col gap-4 p-6">
              <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
              <div className="mt-auto flex gap-2">
                <div className="h-6 w-24 rounded bg-muted animate-pulse" />
                <div className="h-6 w-32 rounded bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items grid skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 rounded bg-muted animate-pulse" />
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-4 lg:gap-4 lg:p-6 animate-pulse"
            >
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-xl bg-muted" />
              </div>
              <div className="space-y-2 text-center lg:text-left">
                <div className="h-5 w-3/4 mx-auto lg:mx-0 rounded bg-muted" />
                <div className="h-4 w-1/2 mx-auto lg:mx-0 rounded bg-muted" />
              </div>
              <div className="hidden lg:flex gap-2">
                <div className="h-6 w-20 rounded-full bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
