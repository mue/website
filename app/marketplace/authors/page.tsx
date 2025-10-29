import { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb';
import { getMarketplaceItems, getMarketplaceTypeLabel, slugifyAuthor } from '@/lib/marketplace';
import { User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authors – Marketplace',
  description: 'Browse all authors in the Mue marketplace.',
  openGraph: {
    title: 'Authors – Marketplace',
    description: 'Browse all authors in the Mue marketplace.',
    type: 'website',
    url: 'https://mue.app/marketplace/authors',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authors – Marketplace',
    description: 'Browse all authors in the Mue marketplace.',
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function AuthorsPage() {
  const items = await getMarketplaceItems();

  // Group items by author
  const authorMap = new Map<string, { items: typeof items; types: Set<string> }>();

  items.forEach((item) => {
    if (!item.author) return;

    if (!authorMap.has(item.author)) {
      authorMap.set(item.author, { items: [], types: new Set() });
    }

    const authorData = authorMap.get(item.author)!;
    authorData.items.push(item);
    authorData.types.add(item.type);
  });

  // Convert to array and calculate metadata
  const authorsWithMetadata = Array.from(authorMap.entries()).map(([name, data]) => ({
    name,
    slug: slugifyAuthor(name),
    itemCount: data.items.length,
    contentTypes: Array.from(data.types),
  }));

  // Sort by item count (most items first), then alphabetically
  const sortedAuthors = authorsWithMetadata.sort((a, b) => {
    if (b.itemCount !== a.itemCount) {
      return b.itemCount - a.itemCount;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-12 lg:px-8">
      <MarketplaceBreadcrumb type="authors" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          All Authors
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Browse {sortedAuthors.length} talented creator{sortedAuthors.length !== 1 ? 's' : ''} in
          the marketplace.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedAuthors.map((author) => (
          <Link
            key={author.slug}
            href={`/marketplace/author/${encodeURIComponent(author.slug)}`}
            className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-border/60 bg-muted">
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>

              <div className="text-center space-y-2 w-full">
                <h2 className="text-lg font-semibold leading-tight text-foreground line-clamp-2">
                  {author.name}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {author.itemCount} {author.itemCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              {author.contentTypes.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5 w-full">
                  {author.contentTypes.slice(0, 3).map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {getMarketplaceTypeLabel(type)}
                    </Badge>
                  ))}
                  {author.contentTypes.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{author.contentTypes.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
