import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  User,
  Globe,
  Package,
  MessageSquareQuote,
  Users,
  Type,
  Images,
  Camera,
  MapPin,
  Share2,
  Flag,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getMarketplaceItem, type MarketplaceItemDetail } from '@/lib/marketplace';
import { ItemActions } from './item-actions';
import { PresetSettingsTable } from '@/components/marketplace/preset-settings-table';
import { QuotesTable } from '@/components/marketplace/quotes-table';
import { PhotoGallery } from '@/components/marketplace/photo-gallery';

export const revalidate = 3600;

type MarketplaceItemPageProps = {
  params: Promise<{
    type: string;
    item: string;
  }>;
};

async function resolveItem(type: string, item: string): Promise<MarketplaceItemDetail> {
  try {
    return await getMarketplaceItem(type, item);
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: MarketplaceItemPageProps): Promise<Metadata> {
  const { type, item } = await params;

  try {
    const data = await getMarketplaceItem(type, item);
    return {
      title: `${data.display_name} – Marketplace`,
      description:
        data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`,
      openGraph: {
        title: `${data.display_name} – Marketplace`,
        description:
          data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`,
        type: 'website',
        url: `https://mue.app/marketplace/${encodeURIComponent(type)}/${encodeURIComponent(
          data.name,
        )}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${data.display_name} – Marketplace`,
        description:
          data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`,
      },
    };
  } catch {
    return {
      title: 'Marketplace item',
    };
  }
}

// Helper function to parse description with line breaks and clickable links
function parseDescription(description: string) {
  // Split by newlines
  const lines = description.split(/\\n|\n/);

  return lines.map((line, lineIndex) => {
    // Regex to detect URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return (
      <span key={lineIndex}>
        {parts.map((part, partIndex) => {
          if (urlRegex.test(part)) {
            return (
              <a
                key={partIndex}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
        {lineIndex < lines.length - 1 && (
          <>
            <br />
            <br />
          </>
        )}
      </span>
    );
  });
}

export default async function MarketplaceItemPage({ params }: MarketplaceItemPageProps) {
  const { type, item } = await params;
  const data = await resolveItem(type, item);

  const formattedUpdatedAt = data.updated_at
    ? new Date(data.updated_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const isPhotoPack = type === 'photo_packs';
  const isQuotePack = type === 'quote_packs';
  const isPresetSettings = type === 'preset_settings';

  // Get all preset settings (everything except photos, quotes, and standard fields)
  // Flatten nested settings object if it exists
  const presetSettings = isPresetSettings
    ? (() => {
        const excluded = [
          'display_name',
          'name',
          'description',
          'icon_url',
          'screenshot_url',
          'type',
          'version',
          'author',
          'language',
          'photos',
          'quotes',
          'colour',
          'updated_at',
          'in_collections',
        ];

        // Check if there's a settings object
        if (data.settings && typeof data.settings === 'object') {
          return Object.entries(data.settings);
        }

        // Otherwise use all non-excluded fields
        return Object.entries(data).filter(([key]) => !excluded.includes(key));
      })()
    : [];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/marketplace"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </Link>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Left Column - Info */}
        <aside className="space-y-4 lg:space-y-6">
          <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
            {/* Main Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-border/60 bg-muted shadow-md">
                  {data.icon_url ? (
                    <Image
                      src={data.icon_url}
                      alt={data.display_name}
                      fill
                      sizes="96px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold uppercase text-muted-foreground/80">
                      {data.display_name.slice(0, 2)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">{data.display_name}</h1>
                  <Link href={`/marketplace?category=${type}`}>
                    <Badge
                      variant="secondary"
                      className="cursor-pointer text-xs capitalize transition hover:bg-primary/10 hover:text-primary"
                    >
                      {type.replace(/_/g, ' ')}
                    </Badge>
                  </Link>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-3 text-sm">
                {data.author && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{data.author}</span>
                  </div>
                )}

                {data.version && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Version {data.version}</span>
                  </div>
                )}

                {data.language && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>
                      {new Intl.DisplayNames([data.language], {
                        type: 'language',
                      }).of(data.language) || data.language.toUpperCase()}
                    </span>
                  </div>
                )}

                {formattedUpdatedAt && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedUpdatedAt}</span>
                  </div>
                )}
              </div>

              {data.description && (
                <>
                  <Separator />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {data.description.split(/\\n|\n/)[0]}
                  </p>
                </>
              )}

              <Separator />

              <ItemActions itemName={item} displayName={data.display_name} type={type} />
            </div>

            {/* Collections Card */}
            {data.in_collections && data.in_collections.length > 0 && (
              <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Collections
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.in_collections.map((collection) => (
                    <Link
                      key={collection.name}
                      href={`/marketplace/collection/${encodeURIComponent(collection.name)}`}
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer transition hover:bg-primary/10 hover:text-primary"
                      >
                        {collection.display_name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Column - Content */}
        <main className="min-h-[400px] lg:min-h-[600px] overflow-hidden">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 lg:mb-6">
              <TabsTrigger value="overview" className="text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="text-sm">
                {isPhotoPack && 'Photos'}
                {isQuotePack && 'Quotes'}
                {isPresetSettings && 'Settings'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-6 lg:p-8 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold sm:mb-4 sm:text-2xl">About</h2>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {data.description ? (
                    <p className="text-muted-foreground">{parseDescription(data.description)}</p>
                  ) : (
                    <p className="text-muted-foreground">No description available for this item.</p>
                  )}
                </div>

                {isPhotoPack && data.photos && data.photos.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 sm:text-3xl">
                            {data.photos.length}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            Total {data.photos.length === 1 ? 'Photo' : 'Photos'}
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-emerald-500/20 p-2 sm:p-3">
                          <Images className="h-5 w-5 text-emerald-600 dark:text-emerald-400 sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 sm:text-3xl">
                            {new Set(data.photos.map((p) => p.photographer).filter(Boolean)).size}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            {new Set(data.photos.map((p) => p.photographer).filter(Boolean))
                              .size === 1
                              ? 'Photographer'
                              : 'Photographers'}
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-orange-500/20 p-2 sm:p-3">
                          <Camera className="h-5 w-5 text-orange-600 dark:text-orange-400 sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 sm:text-3xl">
                            {new Set(data.photos.map((p) => p.location).filter(Boolean)).size}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            {new Set(data.photos.map((p) => p.location).filter(Boolean)).size === 1
                              ? 'Location'
                              : 'Locations'}
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-cyan-500/20 p-2 sm:p-3">
                          <MapPin className="h-5 w-5 text-cyan-600 dark:text-cyan-400 sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isQuotePack && !isPhotoPack && data.screenshot_url && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-lg font-semibold">Preview</h3>
                    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border/60 shadow-md">
                      <Image
                        src={data.screenshot_url}
                        alt={`${data.display_name} preview`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {isQuotePack && data.quotes && data.quotes.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-primary sm:text-3xl">
                            {data.quotes.length}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            Total {data.quotes.length === 1 ? 'Quote' : 'Quotes'}
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-primary/20 p-2 sm:p-3">
                          <MessageSquareQuote className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
                            {new Set(data.quotes.map((q) => q.author).filter(Boolean)).size}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            {new Set(data.quotes.map((q) => q.author).filter(Boolean)).size === 1
                              ? 'Unique Author'
                              : 'Unique Authors'}
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-blue-500/20 p-2 sm:p-3">
                          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 sm:p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 sm:text-3xl">
                            {Math.round(
                              data.quotes.reduce((acc, q) => acc + q.quote.length, 0) /
                                data.quotes.length,
                            )}
                          </div>
                          <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                            Avg. Characters
                          </div>
                        </div>
                        <div className="flex-shrink-0 rounded-full bg-purple-500/20 p-2 sm:p-3">
                          <Type className="h-5 w-5 text-purple-600 dark:text-purple-400 sm:h-6 sm:w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 sm:space-y-6">
              {/* Photo Packs - Gallery */}
              {isPhotoPack && data.photos && data.photos.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Photo Gallery</h2>
                    <Badge variant="secondary">
                      {data.photos.length} {data.photos.length === 1 ? 'photo' : 'photos'}
                    </Badge>
                  </div>

                  <PhotoGallery photos={data.photos} itemName={data.display_name} />
                </div>
              )}

              {/* Quote Packs - Table */}
              {isQuotePack && data.quotes && data.quotes.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Quotes</h2>
                    <Badge variant="secondary">
                      {data.quotes.length} {data.quotes.length === 1 ? 'quote' : 'quotes'}
                    </Badge>
                  </div>

                  <QuotesTable quotes={data.quotes} />
                </div>
              )}

              {/* Preset Settings - Display */}
              {isPresetSettings && presetSettings.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-6 lg:p-8 shadow-sm">
                  <div className="mb-4 flex items-center justify-between sm:mb-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Preset Settings</h2>
                    <Badge variant="secondary">
                      {presetSettings.length} {presetSettings.length === 1 ? 'setting' : 'settings'}
                    </Badge>
                  </div>

                  <PresetSettingsTable settings={presetSettings} />
                </div>
              )}

              {/* No Content Available */}
              {((isPhotoPack && (!data.photos || data.photos.length === 0)) ||
                (isQuotePack && (!data.quotes || data.quotes.length === 0)) ||
                (isPresetSettings && presetSettings.length === 0)) && (
                <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
                  <p className="text-muted-foreground">No content available for this item yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <p className="text-center text-sm text-muted-foreground">
            Want to contribute?{' '}
            <Link
              href="https://github.com/mue"
              className="font-medium text-primary hover:underline"
            >
              Visit Mue on GitHub
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
