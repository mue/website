import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, Info } from 'lucide-react';
import { getMarketplaceItems, type MarketplaceItemSummary } from '@/lib/marketplace';
import ItemsGrid from '@/components/marketplace/items-grid';

export const revalidate = 3600;

type AuthorPageProps = {
  params: Promise<{
    author: string;
  }>;
};

async function getAuthorItems(author: string): Promise<MarketplaceItemSummary[]> {
  const allItems = await getMarketplaceItems();
  const decodedAuthor = decodeURIComponent(author);
  return allItems.filter(
    (item) => item.author?.toLowerCase() === decodedAuthor.toLowerCase(),
  );
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { author } = await params;
  const decodedAuthor = decodeURIComponent(author);

  return {
    title: `${decodedAuthor} – Marketplace`,
    description: `Browse all marketplace items created by ${decodedAuthor}.`,
    openGraph: {
      title: `${decodedAuthor} – Marketplace`,
      description: `Browse all marketplace items created by ${decodedAuthor}.`,
      type: 'website',
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author } = await params;
  const decodedAuthor = decodeURIComponent(author);
  const items = await getAuthorItems(author);

  if (items.length === 0) {
    notFound();
  }

  // Create a simple collection name map for the grid
  const collectionNameMap = new Map<string, string>();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/marketplace"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{decodedAuthor}</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/50 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          This page is automatically generated based on the author name. Items are grouped by
          matching author names, which may occasionally include unrelated items with similar names.
        </p>
      </div>

      <div className="space-y-4">
        <ItemsGrid items={items} collectionNameMap={collectionNameMap} />
      </div>
    </div>
  );
}
