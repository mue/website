'use client';

import { useEffect, useState } from 'react';

import type { TocItem } from '@/lib/docs';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type DocsTocProps = {
  toc: TocItem[];
};

export function DocsToc({ toc }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Number(a.target.getAttribute('data-depth')) -
              Number(b.target.getAttribute('data-depth')),
          );

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        element.setAttribute('data-depth', item.depth.toString());
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <aside>
      <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        On this page
      </h2>
      <ScrollArea className="mt-4 max-h-[calc(100vh-11rem)] pr-2">
        <ul className="space-y-2 text-sm">
          {toc.map((item) => (
            <li
              key={item.id}
              className={cn({
                'pl-0': item.depth === 2,
                'pl-4': item.depth === 3,
                'pl-8': item.depth >= 4,
              })}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  'block rounded-md px-2 py-1 transition-colors',
                  activeId === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
