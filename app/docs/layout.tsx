import type { ReactNode } from 'react';

import { DocsSearch } from '@/components/docs/search';
import { DocsSidebar } from '@/components/docs/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllDocsMeta, getDocsTree } from '@/lib/docs';

export const dynamic = 'force-static';
export const dynamicParams = false;

type DocsLayoutProps = {
  children: ReactNode;
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const { slug = [] } = await params;
  const normalizedSlug = slug.filter(Boolean);
  const activeHref = normalizedSlug.length > 0 ? `/docs/${normalizedSlug.join('/')}` : '/docs';
  const [tree, docsMeta] = await Promise.all([getDocsTree(), getAllDocsMeta()]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/40">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-10">
        <aside className="hidden w-64 shrink-0 lg:block lg:sticky lg:top-28 lg:self-start">
          <ScrollArea className="pr-4 lg:max-h-[calc(100vh-9rem)]">
            <DocsSearch docs={docsMeta} />
            <div className="mt-6 space-y-4">
              <DocsSidebar tree={tree} activeHref={activeHref} />
            </div>
          </ScrollArea>
        </aside>
        <div className="min-w-0 flex-1 pb-16 lg:pb-0">{children}</div>
      </div>
    </div>
  );
}
