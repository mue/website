import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Hero card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card/80">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <Skeleton className="aspect-[4/3] w-full rounded-none lg:aspect-auto lg:min-h-[220px]" />
          <div className="flex flex-col gap-5 p-8">
            <div className="space-y-3">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-9 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
            <div className="mt-auto flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Items section header */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-52" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border bg-card/70 p-4 lg:gap-4 lg:p-6">
            <div className="flex items-center justify-center lg:justify-start">
              <Skeleton className="h-16 w-16 rounded-xl lg:h-20 lg:w-20" />
            </div>
            <div className="space-y-2 text-center lg:text-left">
              <Skeleton className="mx-auto h-5 w-3/4 lg:mx-0" />
              <Skeleton className="mx-auto h-4 w-1/2 lg:mx-0" />
            </div>
            <div className="hidden gap-2 lg:flex">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}
