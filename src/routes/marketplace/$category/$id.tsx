import { createFileRoute, notFound } from '@tanstack/react-router';
import { AlertCircle, Key } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker';
import ItemsGrid from '@/components/marketplace/items-grid';
import { ItemSidebar } from '@/components/marketplace/item-sidebar';
import { ItemContentTabs } from '@/components/marketplace/item-content-tabs';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/json-ld';

import { getMarketplaceItem, getMarketplaceItems } from '@/lib/marketplace';
import { FavoritesProvider } from '@/lib/favorites-context';
import { SITE_URL } from '@/lib/constants/site';

const PROVIDER_NAMES: Record<string, string> = {
  mue: 'MUE',
  unsplash: 'Unsplash',
  pexels: 'Pexels',
  pixabay: 'Pixabay',
  flickr: 'Flickr',
};

export const Route = createFileRoute('/marketplace/$category/$id')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
    preview: search.preview as string | undefined,
  }),
  loader: async ({ params }) => {
    const { category, id } = params;

    let data;
    try {
      data = await getMarketplaceItem(category as 'packs' | 'presets', id);
    } catch {
      throw notFound();
    }

    const collectionNames = data.in_collections?.map((c) => (typeof c === 'string' ? c : c.name));

    const allItems = await getMarketplaceItems();
    const relatedItems = allItems
      .filter((item) => {
        if (item.name === data.name) return false;
        if (data.author && item.author?.toLowerCase() === data.author.toLowerCase()) return true;
        if (collectionNames && collectionNames.length > 0) {
          return item.in_collections.some((col) => collectionNames.includes(col));
        }
        return false;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    return { data, relatedItems, category, id };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { data, category, id } = loaderData;
    const description =
      data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`;
    return {
      meta: [
        { title: `${data.display_name} – Marketplace | Mue` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${data.display_name} – Marketplace` },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(id)}`,
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${data.display_name} – Marketplace` },
        { name: 'twitter:description', content: description },
      ],
      links: [
        {
          rel: 'canonical',
          href: `${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(id)}`,
        },
      ],
    };
  },
  pendingComponent: MarketplaceItemLoading,
  component: MarketplaceItemPage,
});

function MarketplaceItemPage() {
  const { data, relatedItems, category, id } = Route.useLoaderData();
  const { embed, preview } = Route.useSearch();
  const isEmbed = embed === 'true';
  const isPreview = preview === 'true';

  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path;
    const sep = hasExistingParams ? '&' : '?';
    const qs = isPreview ? 'embed=true&preview=true' : 'embed=true';
    return `${path}${sep}${qs}`;
  };

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
          url={`${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(id)}`}
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
              item: `${SITE_URL}/marketplace/${encodeURIComponent(category)}/${encodeURIComponent(id)}`,
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
              <a href="https://github.com/mue" className="font-medium text-primary hover:underline">
                Visit Mue on GitHub
              </a>
            </p>
          </>
        )}
      </div>
    </FavoritesProvider>
  );
}

function MarketplaceItemLoading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      <Skeleton className="h-5 w-96" />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
        <aside className="space-y-4 lg:space-y-6">
          <div className="rounded-2xl border border-border bg-card/80 p-6">
            <div className="mb-6 flex flex-col items-center gap-4 text-center">
              <Skeleton className="h-24 w-24 rounded-2xl" />
              <div className="w-full space-y-2">
                <Skeleton className="mx-auto h-7 w-40" />
                <Skeleton className="mx-auto h-5 w-24 rounded-full" />
              </div>
            </div>
            <div className="my-6 h-px bg-border" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            <div className="my-6 h-px bg-border" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="my-6 h-px bg-border" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/80 p-6">
            <Skeleton className="mb-4 h-5 w-32" />
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </aside>
        <main className="min-h-[400px]">
          <div className="mb-6 grid grid-cols-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <Skeleton className="mb-4 h-8 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
