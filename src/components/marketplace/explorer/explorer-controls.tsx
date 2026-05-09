'use client';

import { FunnelX, LayoutGrid, List } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { getMarketplaceTypeLabel } from '@/lib/marketplace';

type ExplorerControlsProps = {
  viewMode: 'grid' | 'list';
  onViewMode: (v: 'grid' | 'list') => void;
  itemsPerPage: number;
  onItemsPerPage: (n: number) => void;
  typeFilter: string;
  onTypeFilter: (t: string) => void;
  availableTypes: string[];
  sortBy: string;
  onSortBy: (s: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
  isEmbed: boolean;
  displayStart: number;
  displayEnd: number;
  filteredCount: number;
};

export function ExplorerControls({
  viewMode,
  onViewMode,
  itemsPerPage,
  onItemsPerPage,
  typeFilter,
  onTypeFilter,
  availableTypes,
  sortBy,
  onSortBy,
  hasActiveFilters,
  onReset,
  isEmbed,
  displayStart,
  displayEnd,
  filteredCount,
}: ExplorerControlsProps) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground">
          Showing{' '}
          <strong className="text-foreground">
            {displayStart > 0 ? `${displayStart}-${displayEnd}` : '0'}
          </strong>{' '}
          of <strong className="text-foreground">{filteredCount}</strong> items
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-md p-1 shrink-0">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewMode('grid')}
              className="h-8 w-8 p-0"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onViewMode('list')}
              className="h-8 w-8 p-0"
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <label
              className="hidden sm:inline text-sm font-medium text-muted-foreground"
              htmlFor="per-page"
            >
              Per page
            </label>

            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => onItemsPerPage(parseInt(val, 10) || 12)}
            >
              <SelectTrigger
                id="per-page"
                className="w-20 rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {[12, 24, 48].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isEmbed && (
            <div className="flex flex-1 sm:flex-none items-center gap-2">
              <label
                className="hidden sm:inline text-sm font-medium text-muted-foreground shrink-0"
                htmlFor="type-filter"
              >
                Type
              </label>

              <Select value={typeFilter} onValueChange={onTypeFilter}>
                <SelectTrigger
                  id="type-filter"
                  className="w-full sm:w-auto rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <SelectValue placeholder="All" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {availableTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {getMarketplaceTypeLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-1 sm:flex-none items-center gap-2">
            <label
              className="hidden sm:inline text-sm font-medium text-muted-foreground shrink-0"
              htmlFor="sort-by"
            >
              Sort
            </label>

            <Select value={sortBy} onValueChange={onSortBy}>
              <SelectTrigger
                id="sort-by"
                className="w-full sm:w-auto rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <SelectValue placeholder="Sort" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="most-downloaded">Most Downloaded</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="hidden-gems">Hidden Gems</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onReset}
          className="self-start rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
        >
          <FunnelX />
          Reset filters
        </Button>
      )}
    </>
  );
}
