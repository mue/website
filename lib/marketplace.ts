const MARKETPLACE_BASE_URL = 'https://api.muetab.com/v2/marketplace';

const MARKETPLACE_TYPE_LABELS: Record<string, string> = {
  preset_settings: 'Preset Settings',
  photo_packs: 'Photo Pack',
  quote_packs: 'Quote Pack',
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
  name: string;
  display_name: string;
  icon_url?: string;
  colour?: string;
  author?: string;
  language?: string;
  in_collections: string[];
  type: string;
};

export type MarketplaceCollectionDetail = MarketplaceCollection & {
  items: MarketplaceItemSummary[];
};

export type MarketplaceItemDetail = {
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
  category: string,
  item: string,
): Promise<MarketplaceItemDetail> {
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceItemDetail>>(
    `item/${category}/${item}`,
  );
  return payload.data;
}

export async function getMarketplaceCollection(name: string): Promise<MarketplaceCollectionDetail> {
  const payload = await fetchMarketplace<MarketplaceResponse<MarketplaceCollectionDetail>>(
    `collection/${name}`,
  );
  return payload.data;
}
