import type { ReactNode } from 'react';

import { DocsToc } from '@/components/docs/toc';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              <BreadcrumbItem key={`${item.label}-${index}`}>
                {item.href && index !== breadcrumb.length - 1 ? (
                  <>
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        {header && <div className="mt-6">{header}</div>}
      </div>

      <div
        className={cn(
          'gap-10',
          hasToc ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_240px] xl:items-start' : 'flex flex-col',
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
