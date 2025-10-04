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
  in_collections?: Array<MarketplaceCollection>;
  [key: string]: unknown;
};

async function fetchMarketplace<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${MARKETPLACE_BASE_URL}/${path}`, {
    ...init,
    // cache marketplace data for an hour to avoid rate limits
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Marketplace request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getMarketplaceTypeLabel(type: string): string {
  return MARKETPLACE_TYPE_LABELS[type] ?? type.replace(/_/g, ' ');
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

export async function getMarketplaceCollections(): Promise<MarketplaceCollection[]> {
  const payload =
    await fetchMarketplace<MarketplaceResponse<MarketplaceCollection[]>>('collections');
  return payload.data;
}

export async function getMarketplaceItems(): Promise<MarketplaceItemSummary[]> {
  const payload =
    await fetchMarketplace<MarketplaceResponse<MarketplaceItemSummary[]>>('items/all');
  return payload.data;
}

export async function getMarketplaceItem(
  category: 'packs' | 'presets',
  id: string,
): Promise<MarketplaceItemDetail> {
  // TODO: When API supports ID-based lookup, change this to:
  // const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceItemDetail>>(
  //   `item/${id}`,
  // );

  // For now, we need to look up the name from the ID
  const allItems = await getMarketplaceItems();
  const validTypes = getCategoryTypes(category);
  const item = allItems.find((i) => i.id === id && validTypes.includes(i.type));

  if (!item) {
    throw new Error(`Item not found: ${id} in category: ${category}`);
  }

  // Fetch using the actual type and name (current API requirement)
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceItemDetail>>(
    `item/${item.type}/${item.name}`,
  );
  return payload.data;
}

export async function getMarketplaceCollection(name: string): Promise<MarketplaceCollectionDetail> {
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceCollectionDetail>>(
    `collection/${name}`,
  );
  return payload.data;
}
