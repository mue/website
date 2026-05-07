import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertCircle, Key } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker';
import ItemsGrid from '@/components/marketplace/items-grid';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';

import {
  getMarketplaceItem,
  getMarketplaceItems,
  getItemCategory,
  type MarketplaceItemDetail,
  type MarketplaceItemSummary,
} from '@/lib/marketplace';
import { FavoritesProvider } from '@/lib/favorites-context';
import { SITE_URL } from '@/lib/constants/site';

import { ItemSidebar } from './item-sidebar';
import { ItemContentTabs } from './item-content-tabs';

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getMarketplaceItems();
  return items.map((item) => ({
    category: getItemCategory(item.type),
    id: item.id,
  }));
}

const PROVIDER_NAMES: Record<string, string> = {
  mue: 'MUE',
  unsplash: 'Unsplash',
  pexels: 'Pexels',
  pixabay: 'Pixabay',
  flickr: 'Flickr',
};

type MarketplaceItemPageProps = {
  params: Promise<{ category: string; id: string }>;
  searchParams?: Promise<{ embed?: string; preview?: string }>;
};

async function resolveItem(
  category: 'packs' | 'presets',
  id: string,
): Promise<MarketplaceItemDetail> {
  try {
    return await getMarketplaceItem(category, id);
  } catch {
    notFound();
  }
}

async function getRelatedItems(
  currentItemName: string,
  author?: string,
  collections?: string[],
): Promise<MarketplaceItemSummary[]> {
  const allItems = await getMarketplaceItems();
  const related = allItems.filter((item) => {
    if (item.name === currentItemName) return false;
    if (author && item.author?.toLowerCase() === author.toLowerCase()) return true;
    if (collections && collections.length > 0) {
      return item.in_collections.some((col) => collections.includes(col));
    }
    return false;
  });
  return related.sort(() => Math.random() - 0.5).slice(0, 6);
}

export async function generateMetadata({ params }: MarketplaceItemPageProps): Promise<Metadata> {
  const { category, id } = await params;
  try {
    const data = await getMarketplaceItem(category as 'packs' | 'presets', id);
    const description =
      data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`;
    return {
      title: `${data.display_name} – Marketplace`,
      description,
      openGraph: {
        title: `${data.display_name} – Marketplace`,
        description,
        type: 'website',
        url: `${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(data.id)}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.display_name} – Marketplace`,
        description,
      },
    };
  } catch {
    return { title: 'Marketplace item' };
  }
}

export default async function MarketplaceItemPage({
  params,
  searchParams,
}: MarketplaceItemPageProps) {
  const { category, id } = await params;
  const sp = await searchParams;
  const isEmbed = sp?.embed === 'true';
  const isPreview = sp?.preview === 'true';

  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path;
    const sep = hasExistingParams ? '&' : '?';
    const qs = isPreview ? 'embed=true&preview=true' : 'embed=true';
    return `${path}${sep}${qs}`;
  };

  const data = await resolveItem(category as 'packs' | 'presets', id);

  const collectionNames = data.in_collections?.map((c) => (typeof c === 'string' ? c : c.name));
  const relatedItems = await getRelatedItems(data.name, data.author, collectionNames);

  const formattedUpdatedAt = data.updated_at
    ? new Date(data.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const formattedCreatedAt = data.created_at
    ? new Date(data.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const isPhotoPack = data.type === 'photo_packs' || data.type === 'photos';
  const isQuotePack = data.type === 'quote_packs' || data.type === 'quotes';
  const isPresetSettings = data.type === 'preset_settings' || data.type === 'settings';

  const presetSettings = isPresetSettings
    ? (() => {
        const excluded = [
          'display_name',
          'name',
          'description',
          'icon_url',
          'screenshot_url',
          'type',
          'version',
          'author',
          'language',
          'photos',
          'quotes',
          'colour',
          'updated_at',
          'created_at',
          'in_collections',
        ];
        if (data.settings && typeof data.settings === 'object') {
          return Object.entries(data.settings);
        }
        return Object.entries(data).filter(([key]) => !excluded.includes(key));
      })()
    : [];

  return (
    <FavoritesProvider>
      <div
        className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 ${
          isEmbed ? 'px-4 py-6' : 'px-6 py-12 lg:px-8'
        }`}
      >
        <ProductJsonLd
          name={data.display_name}
          description={data.description}
          image={data.icon_url || data.screenshot_url}
          url={`${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(data.id)}`}
          brand={data.author}
          category={data.type?.replace(/_/g, ' ')}
          datePublished={data.created_at}
          dateModified={data.updated_at}
        />
        <BreadcrumbJsonLd
          items={[
            { position: 1, name: 'Home', item: `${SITE_URL}/` },
            { position: 2, name: 'Marketplace', item: `${SITE_URL}/marketplace` },
            {
              position: 3,
              name: data.type?.replace(/_/g, ' ') || 'Item',
              item: `${SITE_URL}/marketplace?type=${data.type}`,
            },
            {
              position: 4,
              name: data.display_name,
              item: `${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(data.id)}`,
            },
          ]}
        />

        {!isEmbed && (
          <MarketplaceBreadcrumb type="item" itemType={data.type!} itemName={data.display_name} />
        )}
        <BreadcrumbTracker
          breadcrumbs={[
            { label: 'Marketplace', href: '/marketplace' },
            {
              label: data.type?.replace(/_/g, ' ') || 'Item',
              href: buildEmbedUrl(`/marketplace?type=${data.type}`, true),
            },
            { label: data.display_name },
          ]}
        />

        {data.api_enabled && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API-Powered Photo Pack</AlertTitle>
            <AlertDescription>
              This pack dynamically fetches fresh photos from{' '}
              {(data.api_provider && PROVIDER_NAMES[data.api_provider]) ?? data.api_provider} API.
              {data.requires_api_key && (
                <>
                  {' '}
                  <Key className="inline h-3 w-3 ml-1 mr-1" />
                  Requires API key configuration after installation.
                </>
              )}
              <br />
              An internet connection is required. Photos are cached for offline use.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
          <ItemSidebar
            data={data}
            id={id}
            category={category}
            isEmbed={isEmbed}
            isPreview={isPreview}
            formattedCreatedAt={formattedCreatedAt}
            formattedUpdatedAt={formattedUpdatedAt}
          />

          <ItemContentTabs
            data={data}
            isPhotoPack={isPhotoPack}
            isQuotePack={isQuotePack}
            isPresetSettings={isPresetSettings}
            presetSettings={presetSettings}
            providerNames={PROVIDER_NAMES}
          />
        </div>

        {relatedItems.length > 0 && (
          <>
            <Separator className="my-2" />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">You might also like</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Similar items {data.author && `by ${data.author} or `}from the same collections
              </p>
              <ItemsGrid items={relatedItems} collectionNameMap={new Map()} />
            </div>
          </>
        )}

        {!isEmbed && (
          <>
            <Separator className="my-2" />
            <p className="text-center text-sm text-muted-foreground">
              Want to contribute?{' '}
              <Link
                href="https://github.com/mue"
                className="font-medium text-primary hover:underline"
              >
                Visit Mue on GitHub
              </Link>
            </p>
          </>
        )}
      </div>
    </FavoritesProvider>
  );
}
