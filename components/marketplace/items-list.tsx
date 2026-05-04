'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import {
  getMarketplaceTypeLabel,
  getItemCategory,
  slugifyAuthor,
  MarketplaceItemSummary,
} from '@/lib/marketplace';

import { Library as LibraryIcon, Heart } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { useFavoritesContext } from '@/lib/favorites-context';
import { useEmbed } from '@/lib/embed-context';

interface ItemsListProps {
  items: MarketplaceItemSummary[];
  collectionNameMap: Map<string, string>;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ItemsList({ items, collectionNameMap }: ItemsListProps) {
  const router = useRouter();
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const { buildEmbedUrl } = useEmbed();

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={item.id || `${item.type}-${item.name}`}
          href={buildEmbedUrl(
            `/marketplace/${getItemCategory(item.type)}/${encodeURIComponent(item.id)}`,
          )}
          className="group relative flex cursor-pointer flex-row items-center gap-4 overflow-hidden rounded-xl border border-border bg-card/70 p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
        >
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavorite(item.type, item.name);
            }}
            className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-background/80 backdrop-blur-sm p-2 transition hover:bg-background hover:scale-110"
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

          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted">
            {item.icon_url && !failedImages.has(item.id) ? (
              <Image
                src={item.icon_url}
                alt={item.display_name}
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
                onError={() => setFailedImages((prev) => new Set(prev).add(item.id))}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-foreground">
                {getInitials(item.display_name)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-base font-semibold leading-tight text-foreground line-clamp-1">
              {item.display_name}
            </h3>

            {item.author && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                By{' '}
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (item.author) {
                      router.push(
                        buildEmbedUrl(`/marketplace/author/${slugifyAuthor(item.author)}`),
                      );
                    }
                  }}
                  className="hover:text-primary hover:underline transition"
                >
                  {item.author}
                </button>
              </p>
            )}
          </div>

          <div className="hidden sm:flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                router.push(buildEmbedUrl(`/marketplace?type=${item.type}`, true));
              }}
              className={cn(
                'flex flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition',
                'hover:bg-primary/10 hover:text-primary cursor-pointer',
              )}
            >
              {getMarketplaceTypeLabel(item.type)}
            </button>

            {item.in_collections.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.in_collections.slice(0, 2).map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      router.push(
                        buildEmbedUrl(`/marketplace/collection/${encodeURIComponent(collection)}`),
                      );
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
                {item.in_collections.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{item.in_collections.length - 2} more
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
