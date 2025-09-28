import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getMarketplaceItem,
  type MarketplaceItemDetail,
} from "@/lib/marketplace";

export const revalidate = 3600;

type MarketplaceItemPageProps = {
  params: Promise<{
    type: string;
    item: string;
  }>;
};

async function resolveItem(
  type: string,
  item: string
): Promise<MarketplaceItemDetail> {
  try {
    return await getMarketplaceItem(type, item);
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: MarketplaceItemPageProps): Promise<Metadata> {
  const { type, item } = await params;

  try {
    const data = await getMarketplaceItem(type, item);
    return {
      title: `${data.display_name} – Marketplace`,
      description:
        data.description ??
        `Learn more about ${data.display_name} on the Mue marketplace.`,
    };
  } catch {
    return {
      title: "Marketplace item",
    };
  }
}

export default async function MarketplaceItemPage({
  params,
}: MarketplaceItemPageProps) {
  const { type, item } = await params;
  const data = await resolveItem(type, item);

  const hasMedia = Boolean(
    data.photos?.length || data.screenshot_url || data.icon_url
  );
  const formattedUpdatedAt = data.updated_at
    ? new Date(data.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 py-12 lg:px-8">
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <header className="flex flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border/60 bg-muted">
              {data.icon_url ? (
                <Image
                  src={data.icon_url}
                  alt={data.display_name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-semibold uppercase text-muted-foreground/80">
                  {data.display_name.slice(0, 2)}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {data.display_name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{type.replace(/_/g, " ")}</Badge>
                {data.version && <span>Version {data.version}</span>}
                {data.author && <span>by {data.author}</span>}
                {data.language && (
                  <span>Language: {data.language.toUpperCase()}</span>
                )}
                {formattedUpdatedAt && (
                  <span>Updated {formattedUpdatedAt}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {data.description && (
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
            {data.description}
          </p>
        )}
      </header>

      <section className="space-y-6 rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Overview</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          {data.in_collections && data.in_collections.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">Collections:</span>
              {data.in_collections.map((collection) => (
                <Link
                  key={collection.name}
                  href={`/marketplace/collection/${encodeURIComponent(
                    collection.name
                  )}`}
                  className="inline-flex"
                >
                  <Badge variant="outline">{collection.display_name}</Badge>
                </Link>
              ))}
            </div>
          )}

          {!data.in_collections?.length && (
            <p>This item is not part of any public collections.</p>
          )}
        </div>
      </section>

      {hasMedia && (
        <section className="space-y-6 rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
            {data.photos?.length && (
              <span className="text-sm text-muted-foreground">
                {data.photos.length}{" "}
                {data.photos.length === 1 ? "entry" : "entries"}
              </span>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {data.screenshot_url && (
              <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src={data.screenshot_url}
                  alt={`${data.display_name} screenshot`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {data.photos?.map((photo, index) => {
              const photoUrl =
                photo.url?.default ?? Object.values(photo.url ?? {})[0];
              if (!photoUrl) return null;

              return (
                <figure
                  key={`${photoUrl}-${index}`}
                  className="relative flex h-56 w-full flex-col overflow-hidden rounded-2xl border border-border/60"
                >
                  <Image
                    src={photoUrl}
                    alt={
                      photo.location ?? photo.photographer ?? data.display_name
                    }
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                  {(photo.photographer || photo.location) && (
                    <figcaption className="relative mt-auto bg-gradient-to-t from-black/70 to-transparent p-4 text-xs text-white">
                      <div className="font-medium">{photo.photographer}</div>
                      {photo.location && (
                        <div className="text-white/80">{photo.location}</div>
                      )}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {data.quotes && data.quotes.length > 0 && (
        <section className="space-y-6 rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Quotes</h2>
          <div className="space-y-4">
            {data.quotes.map((quote, index) => (
              <blockquote
                key={`${quote.quote}-${index}`}
                className="rounded-2xl border border-border/60 bg-background/80 p-6 text-sm text-foreground shadow-sm"
              >
                <p className="text-base italic text-foreground">
                  “{quote.quote}”
                </p>
                {quote.author && (
                  <footer className="mt-3 text-sm font-medium text-muted-foreground">
                    — {quote.author}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {!hasMedia && (!data.quotes || data.quotes.length === 0) && (
        <section className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
          No additional media is available for this item yet.
        </section>
      )}

      <Separator />

      <div className="pb-12 text-sm text-muted-foreground">
        Want to add to this item? Contribute on the{" "}
        <Link href="https://github.com/mue">Mue GitHub</Link>.
      </div>
    </div>
  );
}
