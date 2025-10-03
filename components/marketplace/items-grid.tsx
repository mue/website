'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getMarketplaceTypeLabel, MarketplaceItemSummary } from '@/lib/marketplace';
import { Library as LibraryIcon, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFavoritesContext } from '@/lib/favorites-context';

interface ItemsGridProps {
  items: MarketplaceItemSummary[];
  collectionNameMap: Map<string, string>;
}

export default function ItemsGrid({ items, collectionNameMap }: ItemsGridProps) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  return (
    <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.name}`}
          href={`/marketplace/${encodeURIComponent(item.type)}/${encodeURIComponent(item.name)}`}
          className="group relative flex h-full cursor-pointer flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 lg:gap-4 lg:p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavorite(item.type, item.name);
            }}
            className="absolute top-3 right-3 z-10 rounded-full bg-background/80 backdrop-blur-sm p-2 transition hover:bg-background hover:scale-110"
            aria-label="Toggle favorite"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition',
                isFavorite(item.type, item.name)
                  ? 'fill-red-500 text-red-500'
                  : 'text-muted-foreground hover:text-red-500',
              )}
            />
          </button>
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative h-16 w-16 lg:h-14 lg:w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
              {item.icon_url ? (
                <Image
                  src={item.icon_url}
                  alt={item.display_name}
                  fill
                  sizes="64px"
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

          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-sm lg:text-xl font-semibold leading-tight text-foreground line-clamp-2">
              {item.display_name}
            </h3>
            {item.author && (
              <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                By{' '}
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (item.author) {
                      router.push(`/marketplace/author/${encodeURIComponent(item.author)}`);
                    }
                  }}
                  className="hover:text-primary hover:underline transition"
                >
                  {item.author}
                </button>
              </p>
            )}
          </div>

          <div className="hidden lg:flex items-center flex-wrap gap-2">
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
