import type { ReactNode } from 'react';
import { List } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { DocsToc } from '@/components/docs/toc';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import type { TocItem } from '@/lib/docs';
import { cn } from '@/lib/utils';

export type DocsShellProps = {
  toc?: TocItem[];
  breadcrumb: Array<{ label: string; href?: string }>;
  children: ReactNode;
  header?: ReactNode;
};

export function DocsShell({ toc = [], breadcrumb, children, header }: DocsShellProps) {
  const hasToc = toc.length > 0;
  return (
    <div className="space-y-10">
      <div className="border-b pb-6">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <BreadcrumbItem key={`${item.label}-${index}`}>
                  {item.href && index !== breadcrumb.length - 1 ? (
                    <>
                      <BreadcrumbLink asChild>
                        <Link to={item.href as any}>{item.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {hasToc && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="xl:hidden shrink-0">
                  <List className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Contents</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-80 flex-col gap-0 p-0 [&>[data-slot='sheet-close']]:top-[10px] [&>[data-slot='sheet-close']]:right-[10px] [&>[data-slot='sheet-close']]:flex [&>[data-slot='sheet-close']]:h-9 [&>[data-slot='sheet-close']]:w-9 [&>[data-slot='sheet-close']]:items-center [&>[data-slot='sheet-close']]:justify-center [&>[data-slot='sheet-close']]:rounded-lg [&>[data-slot='sheet-close']]:border [&>[data-slot='sheet-close']]:border-foreground/20 [&>[data-slot='sheet-close']]:opacity-100 [&>[data-slot='sheet-close']_svg]:size-4"
              >
                <SheetHeader className="flex h-14 shrink-0 flex-row items-center border-b border-border px-4">
                  <SheetTitle className="text-sm font-semibold">Table of Contents</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <DocsToc toc={toc} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        {header && <div className="mt-6">{header}</div>}
      </div>

      <div
        className={cn(
          'gap-16',
          hasToc ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start' : 'flex flex-col',
        )}
      >
        <div className="space-y-12">{children}</div>
        {hasToc && (
          <div className="hidden xl:block xl:sticky xl:top-28 xl:self-start">
            <DocsToc toc={toc} />
          </div>
        )}
      </div>
    </div>
  );
}
