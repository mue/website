import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorsLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      {/* breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* header */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-72" />
      </div>

      {/* authors grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/70 p-6"
          >
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="flex flex-col items-center gap-2 w-full">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
