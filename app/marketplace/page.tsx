import { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { MarketplaceExplorer } from "@/components/marketplace/explorer";
import {
  getMarketplaceCollections,
  getMarketplaceItems,
} from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Browse the full catalogue of Mue marketplace packs, presets, and quotes.",
};

export const revalidate = 3600;

export default async function MarketplacePage() {
  const [collections, items] = await Promise.all([
    getMarketplaceCollections(),
    getMarketplaceItems(),
  ]);

  const highlightCandidates = collections.filter(
    (collection) => collection.img
  );

  const shuffled = [...highlightCandidates].sort(() => Math.random() - 0.5);
  const randomCollections = shuffled.slice(0, 3);

  // Calculate content types for each collection
  const collectionsWithTypes = randomCollections.map((collection) => {
    const collectionItems = items.filter((item) =>
      item.in_collections.includes(collection.name)
    );
    const types = [...new Set(collectionItems.map((item) => item.type))];
    return { ...collection, contentTypes: types };
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
      {/* <header className="space-y-4 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Discover community-curated packs, quotes, and presets.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Search across the entire marketplace catalogue, explore a featured
          collection, and dive into individual items for more details.
        </p>
      </header> */}

      <MarketplaceExplorer
        items={items}
        collections={collections}
        randomCollections={collectionsWithTypes}
      />
    </div>
  );
}
