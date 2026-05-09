import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { MarketplaceExplorer } from '@/components/marketplace/explorer';
import { MarketplaceLoadingSkeleton } from '@/components/marketplace/marketplace-loading-skeleton';

import { getMarketplaceCollections, getMarketplaceItems } from '@/lib/marketplace';

function hashString(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const Route = createFileRoute('/marketplace/')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
  }),
  loader: async () => {
    const [collections, items] = await Promise.all([
      getMarketplaceCollections(),
      getMarketplaceItems(true),
    ]);

    const highlightCandidates = collections.filter((c) => c.img);
    const now = new Date();
    const seedKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}`;
    const seed = hashString(seedKey);
    const shuffled = seededShuffle(highlightCandidates, seed);
    const randomCollections = shuffled.slice(0, 3).map((collection) => {
      const collectionItems = items.filter((item) => item.in_collections.includes(collection.name));
      const types = [...new Set(collectionItems.map((item) => item.type))];
      return { ...collection, contentTypes: types };
    });

    return { collections, items, randomCollections };
  },
  head: () => ({
    meta: [
      { title: 'Marketplace | Mue' },
      {
        name: 'description',
        content: 'Browse the full catalogue of Mue marketplace packs, presets, and quotes.',
      },
      { property: 'og:title', content: 'Marketplace | Mue' },
      {
        property: 'og:description',
        content: 'Browse the full catalogue of Mue marketplace packs, presets, and quotes.',
      },
    ],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const { collections, items, randomCollections } = Route.useLoaderData();
  const { embed } = Route.useSearch();
  const isEmbed = embed === 'true';

  return (
    <div
      className={`mx-auto flex w-full max-w-7xl flex-col ${
        isEmbed ? 'h-screen gap-6 px-4 py-6' : 'min-h-screen gap-12 px-6 py-12 lg:px-8'
      }`}
    >
      {randomCollections.map((c) =>
        c.img ? <link key={c.name} rel="preload" as="image" href={c.img} /> : null,
      )}
      <Suspense fallback={<MarketplaceLoadingSkeleton />}>
        <MarketplaceExplorer
          items={items}
          collections={collections}
          randomCollections={randomCollections}
        />
      </Suspense>
    </div>
  );
}
