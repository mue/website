import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { NoCollectionItemsEmptyState } from '@/components/marketplace/empty-state';
import { getMarketplaceCollection, type MarketplaceCollectionDetail } from '@/lib/marketplace';
import { FavoritesProvider } from '@/lib/favorites-context';
import ItemsGrid from '@/components/marketplace/items-grid';

export const revalidate = 3600; // Revalidate every hour (ISR)

type MarketplaceCollectionPageProps = {
  params: Promise<{
    collection: string;
  }>;
};

async function resolveCollection(name: string): Promise<MarketplaceCollectionDetail> {
  try {
    return await getMarketplaceCollection(name);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: MarketplaceCollectionPageProps): Promise<Metadata> {
  const { collection } = await params;

  try {
    const data = await getMarketplaceCollection(collection);
    return {
      title: `${data.display_name} – Marketplace collection`,
      description:
        data.description ??
        `Browse all items inside the ${data.display_name} collection on the Mue marketplace.`,
      openGraph: {
        title: `${data.display_name} – Marketplace collection`,
        description:
          data.description ??
          `Browse all items inside the ${data.display_name} collection on the Mue marketplace.`,
        type: 'website',
        url: `https://mue.app/marketplace/collection/${encodeURIComponent(data.name)}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.display_name} – Marketplace collection`,
        description:
          data.description ??
          `Browse all items inside the ${data.display_name} collection on the Mue marketplace.`,
      },
    };
  } catch {
    return {
      title: 'Marketplace collection',
    };
  }
}

export default async function MarketplaceCollectionPage({
  params,
}: MarketplaceCollectionPageProps) {
  const { collection } = await params;
  const data = await resolveCollection(collection);

  const items = data.items ?? [];
  const hasItems = items.length > 0;

  // Create collection name map for the grid
  const collectionNameMap = new Map<string, string>();

  return (
    <FavoritesProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
        <MarketplaceBreadcrumb type="collection" collectionName={data.display_name} />

        <header className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px]">
              {data.img ? (
                <Image
                  src={data.img}
                  alt={data.display_name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>
            <div className="flex flex-col gap-5 p-8">
              <div className="space-y-3">
                <Badge variant="secondary">Collection</Badge>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {data.display_name}
                </h1>
                {data.description && (
                  <p className="text-muted-foreground text-base md:text-lg">{data.description}</p>
                )}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {hasItems
                    ? `${items.length} ${items.length === 1 ? 'item' : 'items'}`
                    : 'No items yet'}
                </span>
                {data.news && <Badge variant="outline">Latest update</Badge>}
                {data.news_link && (
                  <Link
                    href={data.news_link}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Read announcement
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {hasItems ? (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">Included marketplace items</h2>
              <span className="text-sm text-muted-foreground">Sorted alphabetically</span>
            </div>

            <ItemsGrid
              items={items.slice().sort((a, b) => a.display_name.localeCompare(b.display_name))}
              collectionNameMap={collectionNameMap}
            />
          </section>
        ) : (
          <NoCollectionItemsEmptyState />
        )}

        <Separator />

        <div className="pb-12 text-sm text-muted-foreground">
          Want to expand this collection? Contribute on the{' '}
          <Link
            href="https://github.com/mue/marketplace"
            className="text-primary underline-offset-4 hover:underline"
          >
            Mue GitHub
          </Link>
          .
        </div>
      </div>
    </FavoritesProvider>
  );
}
