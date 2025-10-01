'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getMarketplaceTypeLabel, MarketplaceItemSummary } from '@/lib/marketplace';
import { Library as LibraryIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ItemsGridProps {
  items: MarketplaceItemSummary[];
  collectionNameMap: Map<string, string>;
}

export default function ItemsGrid({ items, collectionNameMap }: ItemsGridProps) {
  const router = useRouter();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.name}`}
          href={`/marketplace/${encodeURIComponent(item.type)}/${encodeURIComponent(item.name)}`}
          className="group relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
              {item.icon_url ? (
                <Image
                  src={item.icon_url}
                  alt={item.display_name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground/80">
                  {item.display_name.slice(0, 2)}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight text-foreground">
              {item.display_name}
            </h3>
            {item.author && <p className="text-sm text-muted-foreground">By {item.author}</p>}
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Badge
              className={cn(
                'flex flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition',
                'hover:bg-primary/10 hover:text-primary',
              )}
            >
              {getMarketplaceTypeLabel(item.type)}
            </Badge>
            {item.in_collections.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.in_collections.slice(0, 3).map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      router.push(`/marketplace/collection/${encodeURIComponent(collection)}`);
                    }}
                    className={cn(
                      'flex cursor-pointer flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition',
                      'hover:bg-primary/10 hover:text-primary',
                    )}
                  >
                    <LibraryIcon className="h-4 w-4" />
                    {collectionNameMap.get(collection) ?? collection.replace(/_/g, ' ')}
                  </button>
                ))}
                {item.in_collections.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{item.in_collections.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
