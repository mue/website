import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker';
import {
  getMarketplaceCollections,
  getMarketplaceItems,
  getMarketplaceTypeLabel,
} from '@/lib/marketplace';

export const metadata: Metadata = {
  title: 'Collections – Marketplace',
  description: 'Browse all collections in the Mue marketplace.',
  openGraph: {
    title: 'Collections – Marketplace',
    description: 'Browse all collections in the Mue marketplace.',
    type: 'website',
    url: 'https://mue.app/marketplace/collections',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections – Marketplace',
    description: 'Browse all collections in the Mue marketplace.',
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ embed?: string }>;
}) {
  const sp = await searchParams;
  const isEmbed = sp?.embed === 'true';
  const [collections, items] = await Promise.all([
    getMarketplaceCollections(),
    getMarketplaceItems(),
  ]);

  // Calculate content types and item count for each collection
  const collectionsWithMetadata = collections.map((collection) => {
    const collectionItems = items.filter((item) => item.in_collections.includes(collection.name));
    const types = [...new Set(collectionItems.map((item) => item.type))];
    return {
      ...collection,
      contentTypes: types,
      itemCount: collectionItems.length,
    };
  });

  // Filter out collections with no items and sort by item count (most items first), then alphabetically
  const sortedCollections = collectionsWithMetadata
    .filter((collection) => collection.itemCount > 0)
    .sort((a, b) => {
      if (b.itemCount !== a.itemCount) {
        return b.itemCount - a.itemCount;
      }
      return a.display_name.localeCompare(b.display_name);
    });

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 ${
        isEmbed ? 'px-4 py-6' : 'px-6 py-12 lg:px-8'
      }`}
    >
      {!isEmbed && <MarketplaceBreadcrumb type="collections" />}
      <BreadcrumbTracker
        breadcrumbs={[
          { label: 'Marketplace', href: '/marketplace' },
          { label: 'Collections' },
        ]}
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
            href={`/marketplace/collection/${encodeURIComponent(collection.name)}`}
            className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {collection.img ? (
                <Image
                  src={collection.img}
                  alt={collection.display_name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition group-hover:scale-105"
                  unoptimized
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
