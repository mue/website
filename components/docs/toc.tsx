'use client';

import { useEffect, useRef, useState } from 'react';

import type { TocItem } from '@/lib/docs';
import { cn } from '@/lib/utils';

const SCROLL_OFFSET = 120; // accounts for sticky navbar

type DocsTocProps = {
  toc: TocItem[];
};

export function DocsToc({ toc }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(toc[0]?.id ?? null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const headingEls = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    const updateActive = () => {
      let current = headingEls[0];
      for (const el of headingEls) {
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = el;
        }
      }
      setActiveId(current.id);
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, [toc]);

  // Scroll the active TOC item into view within the list
  useEffect(() => {
    if (!activeId) return;
    const el = itemRefs.current.get(activeId);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  if (toc.length === 0) return null;

  return (
    <aside>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
        On this page
      </h2>
      <ul
        ref={listRef}
        className="mt-4 max-h-[calc(100vh-11rem)] space-y-1 overflow-y-auto pr-2 text-sm"
      >
        {toc.map((item) => (
          <li
            key={item.id}
            className={cn({
              'pl-0': item.depth === 2,
              'pl-4': item.depth === 3,
              'pl-7': item.depth >= 4,
            })}
          >
            <a
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
                else itemRefs.current.delete(item.id);
              }}
              href={`#${item.id}`}
              className={cn(
                'block rounded-md px-2 py-1 transition-colors',
                activeId === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
