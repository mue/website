'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import {
  MarketplaceCollection,
  MarketplaceItemSummary,
  getMarketplaceTypeLabel,
  getItemCategory,
} from '@/lib/marketplace';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FunnelX, Plus, Search, X, LayoutGrid, List, Heart } from 'lucide-react';
import { FeaturedCollectionsSkeleton } from './featured-collections-skeleton';
import { ItemsGridSkeleton } from './items-grid-skeleton';
import { FavoritesProvider, useFavoritesContext } from '@/lib/favorites-context';
import { cn } from '@/lib/utils';
import { useEmbed } from '@/lib/embed-context';

// Lazy components with explicit webpack comments for better chunk naming
const FeaturedCollectionsLazy = dynamic(
  () => import(/* webpackChunkName: "featured-collections" */ './featured-collections'),
  {
    ssr: false,
    loading: () => <FeaturedCollectionsSkeleton />,
  },
);

const ItemsGridLazy = dynamic(() => import(/* webpackChunkName: "items-grid" */ './items-grid'), {
  ssr: false,
  loading: () => <ItemsGridSkeleton />,
});

const ItemsListLazy = dynamic(() => import(/* webpackChunkName: "items-list" */ './items-list'), {
  ssr: false,
  loading: () => <ItemsGridSkeleton />,
});

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
// (Carousel related imports removed after modularization)

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { favorites, isFavorite, loaded: favoritesLoaded } = useFavoritesContext();
  const { isEmbed, isPreview, sendMessage, config, buildEmbedUrl } = useEmbed();

  // Create a stable random seed that changes every hour (matching marketplace cache revalidation)
  const randomSeed = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const currentHour = Math.floor(Date.now() / (1000 * 60 * 60)); // Hour since epoch
    const stored = sessionStorage.getItem('mkt_random_seed');
    const storedHour = sessionStorage.getItem('mkt_random_seed_hour');

    if (stored && storedHour && parseInt(storedHour, 10) === currentHour) {
      return parseInt(stored, 10);
    }

    // Generate new seed based on current hour for consistency across tabs
    const newSeed = currentHour % 10000;
    sessionStorage.setItem('mkt_random_seed', String(newSeed));
    sessionStorage.setItem('mkt_random_seed_hour', String(currentHour));
    return newSeed;
  }, []);

  // Parse initial params synchronously to avoid flicker
  const initialParams = useMemo(() => {
    // Support legacy 'search' while migrating to canonical 'q'
    const s = searchParams?.get('q') ?? searchParams?.get('search') ?? '';
    const t = searchParams?.get('type') ?? 'all';
    const c = searchParams?.get('collection') ?? null;
    const so = searchParams?.get('sort') ?? null; // Let useState handle the default
    const p = parseInt(searchParams?.get('page') ?? '1', 10) || 1;
    const ppParam = parseInt(searchParams?.get('pp') ?? '0', 10) || 0;
    return { s, t, c, so, p, ppParam };
  }, [searchParams]);

  const [query, setQuery] = useState(initialParams.s);
  const [typeFilter, setTypeFilter] = useState<string>(() => {
    if (initialParams.t !== 'all') return initialParams.t;
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('mkt_type');
      if (stored) return stored;
    }
    return 'all';
  });
  const [collectionFilter, setCollectionFilter] = useState<string | null>(initialParams.c);
  const [sortBy, setSortBy] = useState<string>(() => {
    let initialSort = initialParams.so;

    // Migrate legacy sort values
    const sortMigrationMap: Record<string, string> = {
      newest: 'trending',
      updated: 'trending',
      'name-asc': 'recommended',
      'name-desc': 'recommended',
      'least-viewed': 'hidden-gems',
    };

    if (initialSort && sortMigrationMap[initialSort]) {
      initialSort = sortMigrationMap[initialSort];
    }

    // Priority: URL param > localStorage > default 'recommended'
    if (initialSort) return initialSort;

    if (typeof window !== 'undefined') {
      let stored = window.localStorage.getItem('mkt_sort');
      // Also migrate stored values
      if (stored && sortMigrationMap[stored]) {
        stored = sortMigrationMap[stored];
        window.localStorage.setItem('mkt_sort', stored);
      }
      if (stored) return stored;
    }
    return 'recommended';
  });
  const [currentPage, setCurrentPage] = useState(initialParams.p > 0 ? initialParams.p : 1);
  // Determine initial itemsPerPage: URL param > localStorage > default 12
  const defaultPerPage = 12;
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (initialParams.ppParam > 0) return initialParams.ppParam;
    if (typeof window !== 'undefined') {
      const stored = parseInt(window.localStorage.getItem('mkt_pp') || '', 10);
      if (stored && stored > 0) return stored;
    }
    return defaultPerPage;
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync URL params to state when searchParams change (for navigation from other pages)
  useEffect(() => {
    const urlType = searchParams?.get('type') ?? 'all';
    const urlCollection = searchParams?.get('collection') ?? null;
    const urlQuery = searchParams?.get('q') ?? searchParams?.get('search') ?? '';
    const urlSort = searchParams?.get('sort');
    const urlPage = parseInt(searchParams?.get('page') ?? '1', 10) || 1;

    setTypeFilter(urlType);
    setCollectionFilter(urlCollection);
    setQuery(urlQuery);
    if (urlSort) setSortBy(urlSort);
    setCurrentPage(urlPage);
  }, [searchParams]);

  // Hydrate viewMode from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined' && !isEmbed) {
      const stored = window.localStorage.getItem('mkt_view') as 'grid' | 'list' | null;
      if (stored === 'grid' || stored === 'list') {
        setViewMode(stored);
      }
    }
  }, [isEmbed]);

  // Apply config from parent when it changes (embed mode)
  useEffect(() => {
    if (config.viewMode) setViewMode(config.viewMode);
    if (config.filters?.type) setTypeFilter(config.filters.type);
    if (config.filters?.collection) setCollectionFilter(config.filters.collection);
  }, [config]);

  const collectionNameMap = useMemo(() => {
    return new Map(collections.map((collection) => [collection.name, collection.display_name]));
  }, [collections]);

  const collectionFilterLabel = useMemo(() => {
    if (!collectionFilter) return null;
    return collectionNameMap.get(collectionFilter) ?? collectionFilter.replace(/_/g, ' ');
  }, [collectionFilter, collectionNameMap]);

  const availableTypes = useMemo(() => {
    const unique = new Set(items.map((item) => item.type));
    return Array.from(unique).sort((a, b) =>
      getMarketplaceTypeLabel(a).localeCompare(getMarketplaceTypeLabel(b)),
    );
  }, [items]);

  // Generate search suggestions
  const suggestions = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery || trimmedQuery.length < 2) return [];

    const matches = items
      .filter(
        (item) =>
          item.display_name.toLowerCase().includes(trimmedQuery) ||
          item.author?.toLowerCase().includes(trimmedQuery),
      )
      .slice(0, 5);

    return matches;
  }, [query, items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesCollection = !collectionFilter || item.in_collections.includes(collectionFilter);
      const matchesFavorites = !showFavoritesOnly || isFavorite(item.type, item.id);

      if (!matchesType || !matchesCollection || !matchesFavorites) return false;

      if (!normalizedQuery) return true;

      return [item.display_name, item.name, item.author]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'trending': {
          // Weighted score: views × 0.3 + downloads × 0.7
          const aViews = a.views || 0;
          const aDownloads = a.downloads || 0;
          const bViews = b.views || 0;
          const bDownloads = b.downloads || 0;

          const aScore = aViews * 0.3 + aDownloads * 0.7;
          const bScore = bViews * 0.3 + bDownloads * 0.7;

          if (aScore !== bScore) {
            return bScore - aScore; // Descending
          }
          return a.display_name.localeCompare(b.display_name);
        }

        case 'most-downloaded': {
          const aDownloads = a.downloads || 0;
          const bDownloads = b.downloads || 0;
          if (aDownloads !== bDownloads) {
            return bDownloads - aDownloads; // Descending
          }
          return a.display_name.localeCompare(b.display_name);
        }

        case 'most-viewed': {
          const aViews = a.views || 0;
          const bViews = b.views || 0;
          if (aViews !== bViews) {
            return bViews - aViews; // Descending
          }
          return a.display_name.localeCompare(b.display_name);
        }

        case 'hidden-gems': {
          // Sort by views (ascending) to show lesser-known items
          const aViews = a.views || 0;
          const bViews = b.views || 0;
          if (aViews !== bViews) {
            return aViews - bViews; // Ascending
          }
          return a.display_name.localeCompare(b.display_name);
        }

        case 'recommended':
        default: {
          // Stable random order using session seed + item name
          const hash = (str: string, seed: number) => {
            let h = seed;
            for (let i = 0; i < str.length; i++) {
              h = ((h << 5) - h + str.charCodeAt(i)) | 0;
            }
            return h;
          };
          return hash(a.name, randomSeed) - hash(b.name, randomSeed);
        }
      }
    });
  }, [
    collectionFilter,
    items,
    query,
    typeFilter,
    sortBy,
    randomSeed,
    showFavoritesOnly,
    isFavorite,
  ]);

  // Send search events in embed mode
  useEffect(() => {
    if (isEmbed && query) {
      sendMessage('marketplace:search', {
        query,
        resultsCount: filteredItems.length,
      });
    }
  }, [query, filteredItems.length, isEmbed, sendMessage]);

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setCollectionFilter(null);
    setSortBy('recommended');
    setShowFavoritesOnly(false);
    changePage(1, { scroll: false });
  };

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  // Clamp page if out of range due to manual URL edits
  useEffect(() => {
    setCurrentPage((prev) => {
      if (prev < 1) return 1;
      if (prev > totalPages) return totalPages;
      return prev;
    });
  }, [totalPages]);

  const paginatedItems = useMemo(() => {
    const isSearchingLocal = query.trim().length > 0;
    if (isSearchingLocal) return filteredItems;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage, query]);

  // Container ref so we can scroll the explorer back into view when changing pages
  const containerRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Back to top visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScrollTo = (el: HTMLElement) => {
    if (prefersReducedMotion) {
      el.scrollIntoView();
      return;
    }
    const startY = window.scrollY;
    const targetY = el.getBoundingClientRect().top + window.scrollY - 8;
    const distance = targetY - startY;
    const duration = 400;
    let startTime: number | null = null;
    function step(ts: number) {
      if (startTime === null) startTime = ts;
      const progress = Math.min(1, (ts - startTime) / duration);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; // easeInOutQuad
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const changePage = (page: number, opts?: { scroll?: boolean }) => {
    setCurrentPage(page);
    if (opts?.scroll === false) return;
    if (containerRef.current) {
      try {
        smoothScrollTo(containerRef.current);
      } catch {
        /* ignore */
      }
    }
  };

  // Persist itemsPerPage to localStorage whenever it changes (if not default)
  useEffect(() => {
    try {
      if (itemsPerPage !== defaultPerPage) {
        window.localStorage.setItem('mkt_pp', String(itemsPerPage));
      } else {
        window.localStorage.removeItem('mkt_pp');
      }
    } catch {
      // ignore storage errors
    }
  }, [itemsPerPage]);

  // Persist type & sort preferences
  useEffect(() => {
    try {
      if (typeFilter === 'all') window.localStorage.removeItem('mkt_type');
      else window.localStorage.setItem('mkt_type', typeFilter);
    } catch {}
  }, [typeFilter]);

  useEffect(() => {
    try {
      if (sortBy === 'recommended') window.localStorage.removeItem('mkt_sort');
      else window.localStorage.setItem('mkt_sort', sortBy);
    } catch {}
  }, [sortBy]);

  useEffect(() => {
    try {
      window.localStorage.setItem('mkt_view', viewMode);
    } catch {}
  }, [viewMode]);

  // Debounce the query param writing to URL to reduce history churn while typing
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handle);
  }, [query]);

  // Sync state -> URL (canonical 'q' param)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);
    if (typeFilter && typeFilter !== 'all') params.set('type', typeFilter);
    if (collectionFilter) params.set('collection', collectionFilter);
    if (sortBy && sortBy !== 'name-asc') params.set('sort', sortBy);
    if (currentPage && currentPage > 1) params.set('page', String(currentPage));
    if (itemsPerPage !== defaultPerPage) params.set('pp', String(itemsPerPage));
    if (isEmbed) params.set('embed', 'true');
    if (isPreview) params.set('preview', 'true');

    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    try {
      router.replace(url);
    } catch {
      // ignore
    }
  }, [
    debouncedQuery,
    typeFilter,
    collectionFilter,
    sortBy,
    currentPage,
    itemsPerPage,
    pathname,
    router,
    isEmbed,
    isPreview,
  ]);

  // Reset to page 1 when filters change
  const prevFilteredLength = useMemo(() => filteredItems.length, [filteredItems.length]);

  if (prevFilteredLength !== filteredItems.length && currentPage > 1) {
    setCurrentPage(1);
  }

  const isSearching = query.trim().length > 0;
  const hasActiveFilters =
    query ||
    typeFilter !== 'all' ||
    collectionFilter ||
    sortBy !== 'recommended' ||
    showFavoritesOnly;

  // Compute display range for the "Showing x-y of z items" UI.
  const displayStart = isSearching
    ? filteredItems.length > 0
      ? 1
      : 0
    : filteredItems.length > 0
      ? (currentPage - 1) * itemsPerPage + 1
      : 0;

  const displayEnd = isSearching
    ? filteredItems.length
    : Math.min(currentPage * itemsPerPage, filteredItems.length);

  return (
    <>
      <section ref={containerRef} className="space-y-10">
        {/* Create Addon Button */}
        {/* Enhanced Search Bar */}
        <div className="flex flex-row justify-between items-start gap-2">
          <div className="flex-1 relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search by name or author..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowSuggestions(true);
                  setSelectedSuggestionIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay to allow click on suggestion
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={(event) => {
                  if (!showSuggestions || suggestions.length === 0) return;

                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setSelectedSuggestionIndex((prev) =>
                      prev < suggestions.length - 1 ? prev + 1 : prev,
                    );
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
                  } else if (event.key === 'Enter' && selectedSuggestionIndex >= 0) {
                    event.preventDefault();
                    const suggestion = suggestions[selectedSuggestionIndex];
                    const category = getItemCategory(suggestion.type);
                    router.push(
                      buildEmbedUrl(
                        `/marketplace/${category}/${encodeURIComponent(suggestion.id)}`,
                      ),
                    );
                  } else if (event.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                className="h-12 pl-12 pr-12 text-base shadow-sm transition focus:shadow-md"
                aria-label="Search marketplace items"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setShowSuggestions(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden">
                <div className="px-5 py-3 text-sm text-muted-foreground border-b border-border">
                  Found <strong className="text-foreground">{filteredItems.length}</strong> result
                  {filteredItems.length !== 1 ? 's' : ''}
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    type="button"
                    onClick={() => {
                      const category = getItemCategory(suggestion.type);
                      router.push(
                        buildEmbedUrl(
                          `/marketplace/${category}/${encodeURIComponent(suggestion.id)}`,
                        ),
                      );
                      setShowSuggestions(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 text-left transition hover:bg-muted',
                      selectedSuggestionIndex === index && 'bg-muted',
                    )}
                  >
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-border/60 bg-muted">
                      {suggestion.icon_url ? (
                        <Image
                          src={suggestion.icon_url}
                          alt={suggestion.display_name}
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground/80">
                          {suggestion.display_name.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{suggestion.display_name}</div>
                      {suggestion.author && (
                        <div className="text-xs text-muted-foreground truncate">
                          By {suggestion.author}
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getMarketplaceTypeLabel(suggestion.type)}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/marketplace/create"
            className="shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2 h-12" size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Addon</span>
              <span className="sm:hidden">Create</span>
            </Button>
          </Link>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant={showFavoritesOnly ? 'default' : 'outline'}
            className="cursor-pointer transition hover:bg-primary/10 hover:text-primary flex items-center gap-1"
            onClick={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              changePage(1, { scroll: false });
            }}
          >
            <Heart className={`h-3 w-3 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites {favoritesLoaded && favorites.length > 0 && `(${favorites.length})`}
          </Badge>
          {!isEmbed &&
            availableTypes.map((type) => (
              <Badge
                key={type}
                variant={typeFilter === type ? 'default' : 'outline'}
                className="cursor-pointer transition hover:bg-primary/10 hover:text-primary"
                onClick={() => {
                  setTypeFilter(typeFilter === type ? 'all' : type);
                  changePage(1, { scroll: false });
                }}
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
              onClick={() => setCollectionFilter(null)}
            >
              Clear
            </button>
          </div>
        )}

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
                    View all collections
                  </Link>
                )}
              </div>
              <Suspense fallback={<FeaturedCollectionsSkeleton />}>
                <FeaturedCollectionsLazy randomCollections={randomCollections} isEmbed={isEmbed} />
              </Suspense>
            </div>
            {!isEmbed && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Browse by Author</h2>
                  <Link
                    href="/marketplace/authors"
                    className="text-sm text-primary hover:underline underline-offset-4 transition"
                  >
                    View all authors
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-muted-foreground">
              Showing{' '}
              <strong className="text-foreground">
                {displayStart > 0 ? `${displayStart}-${displayEnd}` : '0'}
              </strong>{' '}
              of <strong className="text-foreground">{filteredItems.length}</strong> items
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 border border-border rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
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
                  onValueChange={(val) => {
                    const num = parseInt(val, 10) || defaultPerPage;
                    setItemsPerPage(num);
                    changePage(1, { scroll: false });
                  }}
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
                <div className="flex items-center gap-2">
                  <label
                    className="hidden sm:inline text-sm font-medium text-muted-foreground"
                    htmlFor="type-filter"
                  >
                    Type
                  </label>
                  <Select
                    value={typeFilter}
                    onValueChange={(val) => {
                      setTypeFilter(val);
                      changePage(1, { scroll: false });
                    }}
                  >
                    <SelectTrigger
                      id="type-filter"
                      className="w-32 sm:w-auto rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
              <div className="flex items-center gap-2">
                <label
                  className="hidden sm:inline text-sm font-medium text-muted-foreground"
                  htmlFor="sort-by"
                >
                  Sort
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(val) => {
                    setSortBy(val);
                    changePage(1, { scroll: false });
                  }}
                >
                  <SelectTrigger
                    id="sort-by"
                    className="w-32 sm:w-auto rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
              onClick={resetFilters}
              className="self-start rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            >
              <FunnelX />
              Reset filters
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <strong className="text-foreground">{filteredItems.length}</strong>{" "}
            of <strong className="text-foreground">{items.length}</strong> items
          </span>
        </div> */}

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

          {filteredItems.length > 0 && totalPages > 1 && !isSearching && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsis =
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2);

                  if (showEllipsis) {
                    return (
                      <span key={page} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => changePage(page)}
                      className="min-w-[2.5rem]"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
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
