"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  MarketplaceCollection,
  MarketplaceItemSummary,
  getMarketplaceTypeLabel,
} from "@/lib/marketplace";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Library as LibraryIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type MarketplaceExplorerProps = {
  items: MarketplaceItemSummary[];
  collections: MarketplaceCollection[];
  randomCollection: MarketplaceCollection | null;
};

export function MarketplaceExplorer({
  items,
  collections,
  randomCollection,
}: MarketplaceExplorerProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);

  const collectionNameMap = useMemo(() => {
    return new Map(
      collections.map((collection) => [
        collection.name,
        collection.display_name,
      ])
    );
  }, [collections]);

  const collectionFilterLabel = useMemo(() => {
    if (!collectionFilter) return null;
    return (
      collectionNameMap.get(collectionFilter) ??
      collectionFilter.replace(/_/g, " ")
    );
  }, [collectionFilter, collectionNameMap]);

  const availableTypes = useMemo(() => {
    const unique = new Set(items.map((item) => item.type));
    return Array.from(unique).sort((a, b) =>
      getMarketplaceTypeLabel(a).localeCompare(getMarketplaceTypeLabel(b))
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items
      .filter((item) => {
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        const matchesCollection =
          !collectionFilter || item.in_collections.includes(collectionFilter);

        if (!matchesType || !matchesCollection) return false;

        if (!normalizedQuery) return true;

        return [item.display_name, item.name, item.author]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));
      })
      .sort((a, b) => a.display_name.localeCompare(b.display_name));
  }, [collectionFilter, items, query, typeFilter]);

  const resetFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setCollectionFilter(null);
  };

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <Input
            type="search"
            placeholder="Search by name or author"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="md:max-w-sm"
            aria-label="Search marketplace items"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label
              className="text-sm font-medium text-muted-foreground"
              htmlFor="type-filter"
            >
              Type
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger
                id="type-filter"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getMarketplaceTypeLabel(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {(query || typeFilter !== "all" || collectionFilter) && (
          <button
            type="button"
            onClick={resetFilters}
            className="self-start rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          >
            Reset filters
          </button>
        )}
      </div>

      {collectionFilter && collectionFilterLabel && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Filtering by collection:</span>
          <Badge variant="secondary">{collectionFilterLabel}</Badge>
          <button
            type="button"
            className="text-primary underline-offset-2 hover:underline"
            onClick={() => setCollectionFilter(null)}
          >
            Clear
          </button>
        </div>
      )}

      {randomCollection && (
        <article className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
            <div className="relative min-h-[220px]">
              {randomCollection.img ? (
                <Image
                  src={randomCollection.img}
                  alt={randomCollection.display_name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>
            <div className="flex flex-col gap-4 p-6">
              <div className="space-y-2">
                <Badge variant="outline">Featured collection</Badge>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {randomCollection.display_name}
                </h2>
                {randomCollection.description && (
                  <p className="text-muted-foreground text-sm md:text-base">
                    {randomCollection.description}
                  </p>
                )}
              </div>
              <div className="mt-auto flex items-center gap-3">
                <Link
                  href={`/marketplace/collection/${encodeURIComponent(
                    randomCollection.name
                  )}`}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  Open collection page
                </Link>
                <button
                  type="button"
                  onClick={() => setCollectionFilter(randomCollection.name)}
                  className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Filter items here
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <strong className="text-foreground">{filteredItems.length}</strong>{" "}
            of <strong className="text-foreground">{items.length}</strong> items
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <Link
              key={`${item.type}-${item.name}`}
              href={`/marketplace/${encodeURIComponent(
                item.type
              )}/${encodeURIComponent(item.name)}`}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
                  {item.icon_url ? (
                    <Image
                      src={item.icon_url}
                      alt={item.display_name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground/80">
                      {item.display_name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <Badge variant="outline">
                  {getMarketplaceTypeLabel(item.type)}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold leading-tight text-foreground">
                  {item.display_name}
                </h3>
                {item.author && (
                  <p className="text-sm text-muted-foreground">
                    By {item.author}
                  </p>
                )}
              </div>

              {item.in_collections.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.in_collections.slice(0, 3).map((collection) => (
                    <button
                      key={collection}
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        router.push(
                          `/marketplace/collection/${encodeURIComponent(
                            collection
                          )}`
                        );
                      }}
                      className={cn(
                        "flex flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition",
                        "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <LibraryIcon className="h-4 w-4" />
                      {collectionNameMap.get(collection) ??
                        collection.replace(/_/g, " ")}
                    </button>
                  ))}
                  {item.in_collections.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{item.in_collections.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            No items match your current filters.
          </div>
        )}
      </div>
    </section>
  );
}
