import { Skeleton } from '@/components/ui/skeleton';

export default function DocsArticleLoading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-10">
        {/* Mobile Menu skeleton */}
        <div className="mb-6 lg:hidden">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Desktop Sidebar skeleton */}
        <aside className="hidden w-64 shrink-0 lg:block lg:sticky lg:top-28">
          <Skeleton className="mb-6 h-10 w-full" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </aside>

        {/* Main content skeleton */}
        <div className="min-w-0 flex-1 pb-16 lg:pb-0">
          {/* Breadcrumb skeleton */}
          <Skeleton className="mb-6 h-5 w-80" />

          {/* Header skeleton */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-10 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-xl" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Article content skeleton */}
          <div className="space-y-6">
            {/* Paragraph blocks */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                {i % 3 === 0 && <Skeleton className="mb-4 h-7 w-2/3" />}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                {i % 4 === 0 && <Skeleton className="my-6 h-48 w-full rounded-xl" />}
              </div>
            ))}

            {/* Code block skeleton */}
            <Skeleton className="h-64 w-full rounded-xl" />

            {/* More paragraphs */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Navigation skeleton */}
          <div className="mt-12 grid gap-4 border-t pt-6 md:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>

          {/* CTA skeleton */}
          <Skeleton className="mt-12 h-40 w-full rounded-2xl" />
        </div>

        {/* TOC sidebar skeleton (desktop only) */}
        <aside className="hidden w-64 shrink-0 xl:block xl:sticky xl:top-28">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
