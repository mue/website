'use client';

import { Menu } from 'lucide-react';
import type { DocTreeNode, DocMeta } from '@/lib/docs';

import { DocsSearch } from '@/components/docs/search';
import { DocsSidebar } from '@/components/docs/sidebar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Documentation</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
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
