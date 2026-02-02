const MARKETPLACE_BASE_URL = 'https://api.muetab.com/v2/marketplace';

const MARKETPLACE_TYPE_LABELS: Record<string, string> = {
  preset_settings: 'Preset Settings',
  photo_packs: 'Photo Packs',
  quote_packs: 'Quote Packs',
  // Detail endpoint returns singular versions
  photos: 'Photo Packs',
  quotes: 'Quote Packs',
  settings: 'Preset Settings',
};

type MarketplaceResponse<T> = {
  data: T;
};

export type MarketplaceCollection = {
  name: string;
  display_name: string;
  img?: string;
  description?: string;
  news?: boolean;
  news_link?: string;
};

export type MarketplaceItemSummary = {
  id: string;
  name: string;
  display_name: string;
  icon_url?: string;
  colour?: string;
  author?: string;
  language?: string;
  in_collections: string[];
  type: string;
  updated_at?: string;
  created_at?: string;
  views?: number;
  downloads?: number;
};

export type MarketplaceCollectionDetail = MarketplaceCollection & {
  items: MarketplaceItemSummary[];
};

export type MarketplaceItemDetail = {
  id: string;
  display_name: string;
  name: string;
  description?: string;
  icon_url?: string;
  screenshot_url?: string;
  type?: string;
  version?: string;
  author?: string;
  language?: string;
  views?: number;
  photos?: Array<{
    photographer?: string;
    location?: string;
    url: Record<string, string>;
  }>;
  quotes?: Array<{
    quote: string;
    author?: string;
  }>;
  colour?: string;
  updated_at?: string;
  created_at?: string;
  in_collections?: Array<MarketplaceCollection>;
  // API-enabled photo pack fields
  api_enabled?: boolean;
  api_provider?: string;
  requires_api_key?: boolean;
  settings_schema?: Array<{
    key: string;
    type: string;
    label: string;
    default?: unknown;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    secure?: boolean;
    help_text?: string;
    dynamic?: boolean;
    options_source?: string;
  }>;
  [key: string]: unknown;
};

async function fetchMarketplace<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${MARKETPLACE_BASE_URL}/${path}`, {
    ...init,
    // Temporarily disable cache to see new items
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`Marketplace request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getMarketplaceTypeLabel(type: string): string {
  return MARKETPLACE_TYPE_LABELS[type] ?? type.replace(/_/g, ' ');
}

export function formatCollectionName(name: string): string {
  // Replace underscores with spaces and capitalize first letter of each word
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Map API types to URL categories
export function getItemCategory(type: string): 'packs' | 'presets' {
  if (type === 'preset_settings') return 'presets';
  return 'packs'; // photo_packs, quote_packs
}

// Reverse mapping: category to API types
export function getCategoryTypes(category: string): string[] {
  if (category === 'presets') return ['preset_settings'];
  if (category === 'packs') return ['photo_packs', 'quote_packs'];
  return [];
}

// Get display name for category
export function getCategoryLabel(category: string): string {
  if (category === 'presets') return 'Presets';
  if (category === 'packs') return 'Packs';
  return category;
}

// Normalize type to filter parameter (convert singular to plural)
export function normalizeTypeForFilter(type: string): string {
  const mapping: Record<string, string> = {
    photos: 'photo_packs',
    quotes: 'quote_packs',
    settings: 'preset_settings',
  };
  return mapping[type] || type;
}

// Slugify author name for URLs (lowercase, spaces to hyphens, normalize special chars)
export function slugifyAuthor(author: string): string {
  return author
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// De-slugify author name for display/lookup (hyphens to spaces, title case)
export function deslugifyAuthor(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getMarketplaceCollections(): Promise<MarketplaceCollection[]> {
  const payload =
    await fetchMarketplace<MarketplaceResponse<MarketplaceCollection[]>>('collections');
  return payload.data;
}

export async function getMarketplaceItems(includeAnalytics: boolean = false): Promise<MarketplaceItemSummary[]> {
  const params = includeAnalytics ? '?include_analytics=true' : '';
  const payload =
    await fetchMarketplace<MarketplaceResponse<MarketplaceItemSummary[]>>(`items/all${params}`);
  return payload.data;
}

export async function getTrendingItems(
  limit: number = 100,
  category?: string,
): Promise<MarketplaceItemSummary[]> {
  const params = new URLSearchParams();
  params.set('limit', limit.toString());
  if (category) {
    params.set('category', category);
  }
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceItemSummary[]>>(
    `trending?${params.toString()}`,
  );
  return payload.data;
}

export async function getMarketplaceItem(
  category: 'packs' | 'presets',
  id: string,
): Promise<MarketplaceItemDetail> {
  // API now supports ID-based lookup!
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceItemDetail>>(`item/${id}`);
  return payload.data;
}

export async function getMarketplaceCollection(name: string): Promise<MarketplaceCollectionDetail> {
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceCollectionDetail>>(
    `collection/${name}`,
  );
  return payload.data;
}
