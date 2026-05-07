'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Plus, Search, FunnelX } from 'lucide-react';

import { MarketplaceCollection, MarketplaceItemSummary } from '@/lib/marketplace';
import { FavoritesProvider } from '@/lib/favorites-context';
import { Button } from '@/components/ui/button';

import { FeaturedCollectionsSkeleton } from './featured-collections-skeleton';
import { ItemsGridSkeleton } from './items-grid-skeleton';

import { useMarketplaceExplorer } from './explorer/use-marketplace-explorer';
import { SearchBar } from './explorer/search-bar';
import { FilterChips } from './explorer/filter-chips';
import { ExplorerControls } from './explorer/explorer-controls';
import { ExplorerPagination } from './explorer/pagination';

const FeaturedCollectionsLazy = dynamic(
  () => import(/* webpackChunkName: "featured-collections" */ './featured-collections'),
  { ssr: false, loading: () => <FeaturedCollectionsSkeleton /> },
);

const ItemsGridLazy = dynamic(
  () => import(/* webpackChunkName: "items-grid" */ './items-grid'),
  { ssr: false, loading: () => <ItemsGridSkeleton /> },
);

const ItemsListLazy = dynamic(
  () => import(/* webpackChunkName: "items-list" */ './items-list'),
  { ssr: false, loading: () => <ItemsGridSkeleton /> },
);

type CollectionWithTypes = MarketplaceCollection & {
  contentTypes: string[];
};

type MarketplaceExplorerProps = {
  items: MarketplaceItemSummary[];
  collections: MarketplaceCollection[];
  randomCollections: CollectionWithTypes[];
};

export function MarketplaceExplorer({
  items,
  collections,
  randomCollections,
}: MarketplaceExplorerProps) {
  return (
    <FavoritesProvider>
      <MarketplaceExplorerContent
        items={items}
        collections={collections}
        randomCollections={randomCollections}
      />
    </FavoritesProvider>
  );
}

function MarketplaceExplorerContent({
  items,
  collections,
  randomCollections,
}: MarketplaceExplorerProps) {
  const {
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    collectionFilter,
    setCollectionFilter,
    sortBy,
    setSortBy,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    viewMode,
    setViewMode,
    showFavoritesOnly,
    setShowFavoritesOnly,
    showSuggestions,
    setShowSuggestions,
    selectedSuggestionIndex,
    setSelectedSuggestionIndex,
    showBackToTop,
    searchInputRef,
    containerRef,
    suggestions,
    filteredItems,
    paginatedItems,
    availableTypes,
    collectionNameMap,
    collectionFilterLabel,
    totalPages,
    isSearching,
    hasActiveFilters,
    displayStart,
    displayEnd,
    prefersReducedMotion,
    favoritesCount,
    favoritesLoaded,
    isEmbed,
    resetFilters,
    changePage,
    smoothScrollTo,
  } = useMarketplaceExplorer(items, collections);

  return (
    <>
      <section ref={containerRef} className="space-y-6">
        <div className="flex flex-row justify-between items-start gap-2">
          <SearchBar
            query={query}
            setQuery={setQuery}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            selectedSuggestionIndex={selectedSuggestionIndex}
            setSelectedSuggestionIndex={setSelectedSuggestionIndex}
            suggestions={suggestions}
            filteredCount={filteredItems.length}
            searchInputRef={searchInputRef}
          />
          <Link
            href="/marketplace/create"
            className="shrink-0"
            {...(isEmbed ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Button className="gap-2 h-12" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Addon</span>
              <span className="sm:hidden">Create</span>
            </Button>
          </Link>
        </div>

        <FilterChips
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={() => {
            setShowFavoritesOnly(!showFavoritesOnly);
            changePage(1, { scroll: false });
          }}
          favoritesCount={favoritesCount}
          favoritesLoaded={favoritesLoaded}
          availableTypes={availableTypes}
          typeFilter={typeFilter}
          onTypeFilter={(type) => {
            setTypeFilter(typeFilter === type ? 'all' : type);
            changePage(1, { scroll: false });
          }}
          collectionFilter={collectionFilter}
          collectionFilterLabel={collectionFilterLabel}
          onClearCollection={() => setCollectionFilter(null)}
          isEmbed={isEmbed}
        />

        {!isSearching && randomCollections.length > 0 && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Featured Collections</h2>
                {!isEmbed && (
                  <Link
                    href="/marketplace/collections"
                    className="text-sm text-primary hover:underline underline-offset-4 transition"
                  >
                    View all
                  </Link>
                )}
              </div>
              <Suspense fallback={<FeaturedCollectionsSkeleton />}>
                <FeaturedCollectionsLazy randomCollections={randomCollections} isEmbed={isEmbed} />
              </Suspense>
            </div>
            {!isEmbed && (
              <div className="mt-16 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Browse by Author</h2>
                <Link
                  href="/marketplace/authors"
                  className="text-sm text-primary hover:underline underline-offset-4 transition"
                >
                  View all
                </Link>
              </div>
            )}
          </>
        )}

        <ExplorerControls
          viewMode={viewMode}
          onViewMode={setViewMode}
          itemsPerPage={itemsPerPage}
          onItemsPerPage={(n) => {
            setItemsPerPage(n);
            changePage(1, { scroll: false });
          }}
          typeFilter={typeFilter}
          onTypeFilter={(t) => {
            setTypeFilter(t);
            changePage(1, { scroll: false });
          }}
          availableTypes={availableTypes}
          sortBy={sortBy}
          onSortBy={(s) => {
            setSortBy(s);
            changePage(1, { scroll: false });
          }}
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
          isEmbed={isEmbed}
          displayStart={displayStart}
          displayEnd={displayEnd}
          filteredCount={filteredItems.length}
        />

        <div className="space-y-4">
          <Suspense fallback={<ItemsGridSkeleton count={itemsPerPage} />}>
            {viewMode === 'grid' ? (
              <ItemsGridLazy items={paginatedItems} collectionNameMap={collectionNameMap} />
            ) : (
              <ItemsListLazy items={paginatedItems} collectionNameMap={collectionNameMap} />
            )}
          </Suspense>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-gradient-to-br from-muted/30 to-muted/10 p-12 text-center">
              <div className="mb-4 rounded-full bg-muted/50 p-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">No items found</h3>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                {isSearching
                  ? `No results for "${query}". Try adjusting your search or filters.`
                  : 'No items match your current filters.'}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={resetFilters} className="gap-2">
                  <FunnelX className="h-4 w-4" />
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          <ExplorerPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={changePage}
            isSearching={isSearching}
            filteredCount={filteredItems.length}
          />
        </div>
      </section>

      {showBackToTop && !isEmbed && (
        <button
          type="button"
          onClick={() => {
            if (containerRef.current) {
              if (prefersReducedMotion) {
                containerRef.current.scrollIntoView();
              } else {
                smoothScrollTo(containerRef.current);
              }
            } else {
              window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
          }}
          className="fixed bottom-6 right-6 z-40 cursor-pointer rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 h-11 w-11 flex items-center justify-center"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
