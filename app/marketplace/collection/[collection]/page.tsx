import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getMarketplaceCollection,
  getMarketplaceTypeLabel,
  type MarketplaceCollectionDetail,
} from "@/lib/marketplace";

export const revalidate = 3600;

export const runtime = "edge";

type MarketplaceCollectionPageProps = {
  params: Promise<{
    collection: string;
  }>;
};

async function resolveCollection(
  name: string
): Promise<MarketplaceCollectionDetail> {
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
    };
  } catch {
    return {
      title: "Marketplace collection",
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

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-8">
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <header className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="relative min-h-[220px]">
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
                <p className="text-muted-foreground text-base md:text-lg">
                  {data.description}
                </p>
              )}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>
                {hasItems
                  ? `${items.length} ${items.length === 1 ? "item" : "items"}`
                  : "No items yet"}
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
            <h2 className="text-xl font-semibold text-foreground">
              Included marketplace items
            </h2>
            <span className="text-sm text-muted-foreground">
              Sorted alphabetically
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items
              .slice()
              .sort((a, b) => a.display_name.localeCompare(b.display_name))
              .map((item) => (
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

                  {item.in_collections.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {item.in_collections
                        .filter((name) => name !== data.name)
                        .slice(0, 2)
                        .map((otherCollection) => (
                          <Badge key={otherCollection} variant="secondary">
                            {otherCollection.replace(/_/g, " ")}
                          </Badge>
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
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
          This collection does not currently list any downloadable items.
        </section>
      )}

      <Separator />

      <div className="pb-12 text-sm text-muted-foreground">
        Want to expand this collection? Contribute on the{" "}
        <Link
          href="https://github.com/mue"
          className="text-primary underline-offset-4 hover:underline"
        >
          Mue GitHub
        </Link>
        .
      </div>
    </div>
  );
}
