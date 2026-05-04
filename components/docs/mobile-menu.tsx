'use client';

import { Menu } from 'lucide-react';
import type { DocTreeNode, DocMeta } from '@/lib/docs';

import { DocsSearch } from '@/components/docs/search';
import { DocsSidebar } from '@/components/docs/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type DocsMobileMenuProps = {
  tree: DocTreeNode[];
  docsMeta: DocMeta[];
  activeHref: string;
};

export function DocsMobileMenu({ tree, docsMeta, activeHref }: DocsMobileMenuProps) {
  return (
    <div className="mb-6 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
            <span className="ml-2">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-80 flex-col gap-0 p-0 [&>[data-slot='sheet-close']]:top-[10px] [&>[data-slot='sheet-close']]:right-[10px] [&>[data-slot='sheet-close']]:flex [&>[data-slot='sheet-close']]:h-9 [&>[data-slot='sheet-close']]:w-9 [&>[data-slot='sheet-close']]:items-center [&>[data-slot='sheet-close']]:justify-center [&>[data-slot='sheet-close']]:rounded-lg [&>[data-slot='sheet-close']]:border [&>[data-slot='sheet-close']]:border-foreground/20 [&>[data-slot='sheet-close']]:opacity-100 [&>[data-slot='sheet-close']_svg]:size-4"
        >
          <SheetHeader className="flex h-14 shrink-0 flex-row items-center border-b border-border px-4">
            <SheetTitle className="text-sm font-semibold">Documentation</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <DocsSearch docs={docsMeta} />
            <div className="mt-6 space-y-4">
              <DocsSidebar tree={tree} activeHref={activeHref} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
