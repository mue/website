import { Skeleton } from '@/components/ui/skeleton';

export default function DocsArticleLoading() {
  return (
    <div className="space-y-10">
      {/* header */}
      <div className="border-b pb-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-3" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-24 xl:hidden" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-9 w-2/3 max-w-md" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* content + contents */}
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_240px] xl:items-start gap-10">
        <div className="space-y-12">
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                {i % 2 === 0 && <Skeleton className="h-6 w-2/5" />}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                {i === 1 && <Skeleton className="mt-2 h-32 w-full rounded-lg" />}
              </div>
            ))}
          </div>

          {/* prev/next nav */}
          <div className="grid gap-4 border-t pt-6 md:grid-cols-2">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>

          {/* cta */}
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>

        {/* contents */}
        <div className="hidden xl:block space-y-3">
          <Skeleton className="h-4 w-28" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-3" style={{ width: `${65 + i * 7}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
