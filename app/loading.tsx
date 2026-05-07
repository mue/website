import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl dark:bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.25)_0%,_transparent_65%)]" />

      {/* hero */}
      <section className="relative pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
          <Skeleton className="h-14 w-3/4 max-w-xl sm:h-16 lg:h-20" />
          <Skeleton className="h-6 w-full max-w-lg" />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Skeleton className="h-12 w-36 rounded-lg" />
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>

          {/* screenshot */}
          <Skeleton className="aspect-video w-full rounded-2xl" />

          {/* stats row */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* browser pills */}
          <div className="flex flex-col items-center gap-5">
            <Skeleton className="h-3 w-32" />
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="border-t border-border py-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`flex flex-col gap-12 lg:flex-row lg:items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex flex-1 flex-col gap-4">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />

                <div className="flex flex-col gap-2 pt-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
              <Skeleton className="aspect-video flex-1 rounded-2xl" />
            </div>
          ))}
        </div>
      </section>

      {/* community */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-4/5 max-w-xl" />
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-12 w-44 rounded-lg" />
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>

          <div className="grid w-full gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border p-8"
              >
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
