import { Skeleton } from '@/components/ui/skeleton';

export default function DocsLoading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-10">
        {/* Mobile Menu skeleton */}
        <div className="mb-6 lg:hidden">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Desktop Sidebar skeleton */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <Skeleton className="mb-6 h-10 w-full" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <div className="ml-4 space-y-1">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-5 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content skeleton */}
        <div className="min-w-0 flex-1">
          {/* Breadcrumb skeleton */}
          <Skeleton className="mb-6 h-5 w-64" />

          {/* Header skeleton */}
          <div className="mb-12 space-y-4">
            <Skeleton className="h-10 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-xl" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Content sections skeleton */}
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                {i % 2 === 0 && <Skeleton className="h-32 w-full rounded-xl" />}
              </div>
            ))}
          </div>

          {/* Navigation skeleton */}
          <div className="mt-12 grid gap-4 border-t pt-6 md:grid-cols-2">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
