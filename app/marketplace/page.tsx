import { Suspense } from 'react';

import { Metadata } from 'next';

import { MarketplaceExplorer } from '@/components/marketplace/explorer';
import { MarketplaceLoadingSkeleton } from '@/components/marketplace/marketplace-loading-skeleton';

import { getMarketplaceCollections, getMarketplaceItems } from '@/lib/marketplace';

// Simple string hash (FNV-1a variant) for deterministic seeding
function hashString(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Deterministic Fisher-Yates shuffle using a linear congruential generator (LCG)
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296; // LCG
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Browse the full catalogue of Mue marketplace packs, presets, and quotes.',
  openGraph: {
    title: 'Marketplace | Mue',
    description: 'Browse the full catalogue of Mue marketplace packs, presets, and quotes.',
  },
};

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams?: Promise<{ embed?: string }>;
}) {
  const [collections, items, sp] = await Promise.all([
    getMarketplaceCollections(),
    getMarketplaceItems(true),
    searchParams,
  ]);

  const isEmbed = sp?.embed === 'true';

  const highlightCandidates = collections.filter((collection) => collection.img);

  // Rotate hourly: seed based on current UTC date + hour so all users see the same
  // set within the hour, and it changes predictably each hour.
  const now = new Date();
  const seedKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}`;
  const seed = hashString(seedKey);
  const shuffled = seededShuffle(highlightCandidates, seed);
  const randomCollections = shuffled.slice(0, 3);

  // Calculate content types for each collection
  const collectionsWithTypes = randomCollections.map((collection) => {
    const collectionItems = items.filter((item) => item.in_collections.includes(collection.name));
    const types = [...new Set(collectionItems.map((item) => item.type))];
    return { ...collection, contentTypes: types };
  });

  return (
    <div
      className={`mx-auto flex w-full max-w-7xl flex-col ${
        isEmbed ? 'h-screen gap-6 px-4 py-6' : 'min-h-screen gap-12 px-6 py-12 lg:px-8'
      }`}
    >
      {/* preload featured */}
      {collectionsWithTypes.map((c) =>
        c.img ? (
          <link
            key={c.name}
            rel="preload"
            as="image"
            // Using raw URL; if remote domains need config ensure they're in next.config
            href={c.img}
          />
        ) : null,
      )}

      <Suspense fallback={<MarketplaceLoadingSkeleton />}>
        <MarketplaceExplorer
          items={items}
          collections={collections}
          randomCollections={collectionsWithTypes}
        />
      </Suspense>
    </div>
  );
}
