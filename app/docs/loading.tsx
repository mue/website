import { Skeleton } from '@/components/ui/skeleton';

export default function DocsLoading() {
  return (
    <div className="space-y-10">
      {/* Header — matches DocsShell border-b pb-6 */}
      <div className="border-b pb-6 space-y-6">
        <Skeleton className="h-4 w-28" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-xl" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* "Pick a storyline" — 3-col card grid */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-2xl border bg-card/70 p-6">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="mt-auto h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* "All documentation" — section cards grid */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col rounded-2xl border bg-card/70 p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-4 w-14" />
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-9 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
