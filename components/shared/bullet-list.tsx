import type { ReactNode } from 'react';

type BulletListProps = {
  items: (string | ReactNode)[];
};

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="mt-4 space-y-2 text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-[9px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
