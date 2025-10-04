import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { User, Info } from 'lucide-react';
import { getMarketplaceItems, slugifyAuthor, deslugifyAuthor, type MarketplaceItemSummary } from '@/lib/marketplace';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import ItemsGrid from '@/components/marketplace/items-grid';
import { FavoritesProvider } from '@/lib/favorites-context';

export const revalidate = 3600;

type AuthorPageProps = {
  params: Promise<{
    author: string;
  }>;
};

async function getAuthorItems(authorSlug: string): Promise<MarketplaceItemSummary[]> {
  const allItems = await getMarketplaceItems();
  // Match by comparing slugified versions (handles special chars, hyphens, spaces)
  return allItems.filter((item) =>
    item.author && slugifyAuthor(item.author) === authorSlug.toLowerCase()
  );
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { author } = await params;
  const items = await getAuthorItems(author);
  const authorName = items[0]?.author || deslugifyAuthor(author);

  return {
    title: `${authorName} – Marketplace`,
    description: `Browse all marketplace items created by ${authorName}.`,
    openGraph: {
      title: `${authorName} – Marketplace`,
      description: `Browse all marketplace items created by ${authorName}.`,
      type: 'website',
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author } = await params;
  const items = await getAuthorItems(author);

  if (items.length === 0) {
    notFound();
  }

  // Get actual author name from first item (preserves original capitalization and hyphens)
  const authorName = items[0]?.author || deslugifyAuthor(author);

  // Create a simple collection name map for the grid
  const collectionNameMap = new Map<string, string>();

  return (
    <FavoritesProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
        <MarketplaceBreadcrumb type="author" authorName={authorName} />

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{authorName}</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            This page is automatically generated based on the author name. Items are grouped by
            matching author names, which may occasionally include unrelated items with similar
            names.
          </p>
        </div>

        <div className="space-y-4">
          <ItemsGrid items={items} collectionNameMap={collectionNameMap} />
        </div>
      </div>
    </FavoritesProvider>
  );
}
