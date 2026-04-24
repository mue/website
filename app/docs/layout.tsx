import { Suspense } from 'react';
import type { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { DocsSearch } from '@/components/docs/search';
import { DocsSidebar } from '@/components/docs/sidebar';
import { DocsMobileMenu } from '@/components/docs/mobile-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllDocsMeta, getDocsTree } from '@/lib/docs';

export const revalidate = 3600;

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-16">
        <Suspense fallback={<SidebarSkeleton />}>
          <DocsSidebarServer />
        </Suspense>
        <div className="min-w-0 flex-1 pb-16 lg:pb-0">{children}</div>
      </div>
    </div>
  );
}

async function DocsSidebarServer() {
  const [tree, docsMeta] = await Promise.all([getDocsTree(), getAllDocsMeta()]);
  return (
    <>
      <DocsMobileMenu tree={tree} docsMeta={docsMeta} activeHref="" />
      <aside className="hidden w-64 shrink-0 lg:block lg:sticky lg:top-28 lg:self-start">
        <ScrollArea className="pr-4 lg:max-h-[calc(100vh-9rem)]">
          <DocsSearch docs={docsMeta} />
          <div className="mt-6 space-y-4">
            <DocsSidebar tree={tree} />
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}

function SidebarSkeleton() {
  return (
    <>
      <div className="mb-6 lg:hidden">
        <Skeleton className="h-10 w-full" />
      </div>
      <aside className="hidden w-64 shrink-0 lg:block">
        <Skeleton className="h-10 w-full" />
        <div className="mt-6 space-y-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
      </aside>
    </>
  );
}
