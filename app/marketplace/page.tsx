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
  const randomCollection = highlightCandidates.length
    ? highlightCandidates[
        Math.floor(Math.random() * highlightCandidates.length)
      ]
    : null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:px-8">
      <header className="space-y-4 text-center lg:text-left">
        <Badge className="mx-auto w-fit lg:mx-0">Mue Marketplace</Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Discover community-curated packs, quotes, and presets.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Search across the entire marketplace catalogue, explore a featured
          collection, and dive into individual items for more details.
        </p>
      </header>

      <MarketplaceExplorer
        items={items}
        collections={collections}
        randomCollection={randomCollection}
      />
    </div>
  );
}
