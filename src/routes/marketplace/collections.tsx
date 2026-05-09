import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker';

import {
  getMarketplaceCollections,
  getMarketplaceItems,
  getMarketplaceTypeLabel,
} from '@/lib/marketplace';
import { SITE_URL } from '@/lib/constants/site';

export const Route = createFileRoute('/marketplace/collections')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
    preview: search.preview as string | undefined,
  }),
  loader: async () => {
    const [collections, items] = await Promise.all([
      getMarketplaceCollections(),
      getMarketplaceItems(),
    ]);

    const collectionsWithMetadata = collections.map((collection) => {
      const collectionItems = items.filter((item) => item.in_collections.includes(collection.name));
      const types = [...new Set(collectionItems.map((item) => item.type))];
      return { ...collection, contentTypes: types, itemCount: collectionItems.length };
    });

    const sortedCollections = collectionsWithMetadata
      .filter((c) => c.itemCount > 0)
      .sort((a, b) => {
        if (b.itemCount !== a.itemCount) return b.itemCount - a.itemCount;
        return a.display_name.localeCompare(b.display_name);
      });

    return { sortedCollections };
  },
  head: () => ({
    meta: [
      { title: 'Collections – Marketplace | Mue' },
      { name: 'description', content: 'Browse all collections in the Mue marketplace.' },
      { property: 'og:title', content: 'Collections – Marketplace' },
      { property: 'og:description', content: 'Browse all collections in the Mue marketplace.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE_URL}/marketplace/collections` },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { sortedCollections } = Route.useLoaderData();
  const { embed, preview } = Route.useSearch();
  const isEmbed = embed === 'true';
  const isPreview = preview === 'true';

  const buildEmbedUrl = (path: string) => {
    if (!isEmbed) return path;
    const params = isPreview ? 'embed=true&preview=true' : 'embed=true';
    return `${path}?${params}`;
  };

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 ${
        isEmbed ? 'px-4 py-6' : 'px-6 py-12 lg:px-8'
      }`}
    >
      {!isEmbed && <MarketplaceBreadcrumb type="collections" />}
      <BreadcrumbTracker
        breadcrumbs={[{ label: 'Marketplace', href: '/marketplace' }, { label: 'Collections' }]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          All Collections
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Browse {sortedCollections.length} curated collections of marketplace items.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCollections.map((collection) => (
          <Link
            key={collection.name}
            to={
              buildEmbedUrl(`/marketplace/collection/${encodeURIComponent(collection.name)}`) as any
            }
            className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {collection.img ? (
                <img
                  src={collection.img}
                  alt={collection.display_name}
                  className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground/30">
                    {collection.display_name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 p-4 lg:p-5">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold leading-tight text-foreground line-clamp-2">
                  {collection.display_name}
                </h2>
                {collection.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">
                  {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}
                </span>
                {collection.contentTypes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {collection.contentTypes.slice(0, 3).map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {getMarketplaceTypeLabel(type)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
