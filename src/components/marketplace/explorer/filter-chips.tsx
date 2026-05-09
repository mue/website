'use client';

import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { getMarketplaceTypeLabel } from '@/lib/marketplace';

type FilterChipsProps = {
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  favoritesLoaded: boolean;
  availableTypes: string[];
  typeFilter: string;
  onTypeFilter: (type: string) => void;
  collectionFilter: string | null;
  collectionFilterLabel: string | null;
  onClearCollection: () => void;
  isEmbed: boolean;
};

export function FilterChips({
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount,
  favoritesLoaded,
  availableTypes,
  typeFilter,
  onTypeFilter,
  collectionFilter,
  collectionFilterLabel,
  onClearCollection,
  isEmbed,
}: FilterChipsProps) {
  return (
    <>
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none sm:flex-wrap sm:overflow-visible sm:pb-0">
        <Badge
          variant={showFavoritesOnly ? 'default' : 'outline'}
          className={cn(
            'cursor-pointer transition flex items-center gap-1',
            showFavoritesOnly ? 'hover:bg-primary/80' : 'hover:bg-primary/10 hover:text-primary',
          )}
          onClick={onToggleFavorites}
        >
          <Heart className={`h-3 w-3 ${showFavoritesOnly ? 'fill-current' : ''}`} />
          Favorites {favoritesLoaded && favoritesCount > 0 && `(${favoritesCount})`}
        </Badge>

        {!isEmbed &&
          availableTypes.map((type) => (
            <Badge
              key={type}
              variant={typeFilter === type ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition',
                typeFilter === type
                  ? 'hover:bg-primary/80'
                  : 'hover:bg-primary/10 hover:text-primary',
              )}
              onClick={() => onTypeFilter(type)}
            >
              {getMarketplaceTypeLabel(type)}
            </Badge>
          ))}
      </div>

      {collectionFilter && collectionFilterLabel && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Filtering by collection:</span>
          <Badge variant="secondary">{collectionFilterLabel}</Badge>

          <button
            type="button"
            className="cursor-pointer text-primary underline-offset-2 hover:underline"
            onClick={onClearCollection}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
}
