'use client';

import { useMemo, useRef, useState, useEffect } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  MarketplaceCollection,
  MarketplaceItemSummary,
  getMarketplaceTypeLabel,
} from '@/lib/marketplace';

import { useFavoritesContext } from '@/lib/favorites-context';
import { useEmbed } from '@/lib/embed-context';

export const DEFAULT_PER_PAGE = 12;

const SORT_MIGRATION: Record<string, string> = {
  newest: 'trending',
  updated: 'trending',
  'name-asc': 'recommended',
  'name-desc': 'recommended',
  'least-viewed': 'hidden-gems',
};

function migrateSort(sort: string | null): string | null {
  if (!sort) return null;
  return SORT_MIGRATION[sort] ?? sort;
}

function stableHash(str: string, seed: number): number {
  let h = seed;

  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }

  return h;
}

export function useMarketplaceExplorer(
  items: MarketplaceItemSummary[],
  collections: MarketplaceCollection[],
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { favorites, isFavorite, loaded: favoritesLoaded } = useFavoritesContext();
  const { isEmbed, isPreview, sendMessage, config } = useEmbed();

  const randomSeed = useMemo(() => {
    if (typeof window === 'undefined') return 0;

    const currentHour = Math.floor(Date.now() / (1000 * 60 * 60));
    const stored = sessionStorage.getItem('mkt_random_seed');
    const storedHour = sessionStorage.getItem('mkt_random_seed_hour');

    if (stored && storedHour && parseInt(storedHour, 10) === currentHour) {
      return parseInt(stored, 10);
    }
  
    const newSeed = currentHour % 10000;

    sessionStorage.setItem('mkt_random_seed', String(newSeed));
    sessionStorage.setItem('mkt_random_seed_hour', String(currentHour));

    return newSeed;
  }, []);

  const initialParams = useMemo(() => {
    const s = searchParams?.get('q') ?? searchParams?.get('search') ?? '';
    const t = searchParams?.get('type') ?? 'all';
    const c = searchParams?.get('collection') ?? null;
    const so = migrateSort(searchParams?.get('sort') ?? null);
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
    if (initialParams.so) return initialParams.so;

    if (typeof window !== 'undefined') {
      const stored = migrateSort(window.localStorage.getItem('mkt_sort'));

      if (stored) {
        window.localStorage.setItem('mkt_sort', stored);
        return stored;
      }
    }
    return 'recommended';
  });

  const [currentPage, setCurrentPage] = useState(initialParams.p > 0 ? initialParams.p : 1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (initialParams.ppParam > 0) return initialParams.ppParam;
    if (typeof window !== 'undefined') {
      const stored = parseInt(window.localStorage.getItem('mkt_pp') || '', 10);
      if (stored && stored > 0) return stored;
    }
    return DEFAULT_PER_PAGE;
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

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

  useEffect(() => {
    if (typeof window !== 'undefined' && !isEmbed) {
      const stored = window.localStorage.getItem('mkt_view') as 'grid' | 'list' | null;
      if (stored === 'grid' || stored === 'list') setViewMode(stored);
    }
  }, [isEmbed]);

  useEffect(() => {
    if (config.viewMode) setViewMode(config.viewMode);
    if (config.filters?.type) setTypeFilter(config.filters.type);
    if (config.filters?.collection) setCollectionFilter(config.filters.collection);
  }, [config]);

  const collectionNameMap = useMemo(
    () => new Map(collections.map((c) => [c.name, c.display_name])),
    [collections],
  );

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

  const suggestions = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery || trimmedQuery.length < 2) return [];

    return items
      .filter(
        (item) =>
          item.display_name.toLowerCase().includes(trimmedQuery) ||
          item.author?.toLowerCase().includes(trimmedQuery),
      )
      .slice(0, 5);
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
          const aScore = (a.views || 0) * 0.3 + (a.downloads || 0) * 0.7;
          const bScore = (b.views || 0) * 0.3 + (b.downloads || 0) * 0.7;
          return aScore !== bScore ? bScore - aScore : a.display_name.localeCompare(b.display_name);
        }

        case 'most-downloaded': {
          const diff = (b.downloads || 0) - (a.downloads || 0);
          return diff !== 0 ? diff : a.display_name.localeCompare(b.display_name);
        }

        case 'most-viewed': {
          const diff = (b.views || 0) - (a.views || 0);
          return diff !== 0 ? diff : a.display_name.localeCompare(b.display_name);
        }

        case 'hidden-gems': {
          const diff = (a.views || 0) - (b.views || 0);
          return diff !== 0 ? diff : a.display_name.localeCompare(b.display_name);
        }

        case 'recommended':
        default:
          return stableHash(a.name, randomSeed) - stableHash(b.name, randomSeed);
      }
    });
  }, [collectionFilter, items, query, typeFilter, sortBy, randomSeed, showFavoritesOnly, isFavorite]);

  useEffect(() => {
    if (isEmbed && query) {
      sendMessage('marketplace:search', { query, resultsCount: filteredItems.length });
    }
  }, [query, filteredItems.length, isEmbed, sendMessage]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage((prev) => {
      if (prev < 1) return 1;
      if (prev > totalPages) return totalPages;

      return prev;
    });
  }, [totalPages]);

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
      const eased =
        progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
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

  const resetFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setCollectionFilter(null);
    setSortBy('recommended');
    setShowFavoritesOnly(false);
    changePage(1, { scroll: false });
  };

  const isSearching = query.trim().length > 0;

  const paginatedItems = useMemo(() => {
    if (isSearching) return filteredItems;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage, isSearching]);

  useEffect(() => {
    try {
      if (itemsPerPage !== DEFAULT_PER_PAGE) {
        window.localStorage.setItem('mkt_pp', String(itemsPerPage));
      } else {
        window.localStorage.removeItem('mkt_pp');
      }
    } catch {
      /* ignore */
    }
  }, [itemsPerPage]);

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

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handle);
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedQuery) params.set('q', debouncedQuery);
    if (typeFilter && typeFilter !== 'all') params.set('type', typeFilter);
    if (collectionFilter) params.set('collection', collectionFilter);
    if (sortBy && sortBy !== 'name-asc') params.set('sort', sortBy);
    if (currentPage && currentPage > 1) params.set('page', String(currentPage));
    if (itemsPerPage !== DEFAULT_PER_PAGE) params.set('pp', String(itemsPerPage));
    if (isEmbed) params.set('embed', 'true');
    if (isPreview) params.set('preview', 'true');

    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    try {
      router.replace(url);
    } catch {
      /* ignore */
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

  // reset to page 1 when filter results change
  const prevFilteredLength = useMemo(() => filteredItems.length, [filteredItems.length]);
  if (prevFilteredLength !== filteredItems.length && currentPage > 1) {
    setCurrentPage(1);
  }

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hasActiveFilters = !!(
    query ||
    typeFilter !== 'all' ||
    collectionFilter ||
    sortBy !== 'recommended' ||
    showFavoritesOnly
  );

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

  return {
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
    favoritesCount: favorites.length,
    favoritesLoaded,
    isEmbed,
    resetFilters,
    changePage,
    smoothScrollTo,
  };
}
