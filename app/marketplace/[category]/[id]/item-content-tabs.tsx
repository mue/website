import Image from 'next/image';
import { Images, Camera, MapPin, MessageSquareQuote, Users, Type } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresetSettingsTable } from '@/components/marketplace/preset-settings-table';
import { QuotesTable } from '@/components/marketplace/quotes-table';
import { PhotoGallery } from '@/components/marketplace/photo-gallery';
import { NoContentEmptyState } from '@/components/marketplace/empty-state';

import { type MarketplaceItemDetail } from '@/lib/marketplace';

type ItemContentTabsProps = {
  data: MarketplaceItemDetail;
  isPhotoPack: boolean;
  isQuotePack: boolean;
  isPresetSettings: boolean;
  presetSettings: [string, unknown][];
  providerNames: Record<string, string>;
};

function parseDescription(description: string) {
  const lines = description.split(/\\n|\n/);

  return lines.map((line, lineIndex) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return (
      <span key={lineIndex}>
        {parts.map((part, partIndex) =>
          urlRegex.test(part) ? (
            <a
              key={partIndex}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {part}
            </a>
          ) : (
            part
          ),
        )}
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

export function ItemContentTabs({
  data,
  isPhotoPack,
  isQuotePack,
  isPresetSettings,
  presetSettings,
  providerNames,
}: ItemContentTabsProps) {
  return (
    <main className="min-h-[400px] lg:min-h-[600px] overflow-hidden">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 lg:mb-6">
          <TabsTrigger value="overview" className="text-sm">
            Overview
          </TabsTrigger>

          <TabsTrigger value="content" className="text-sm">
            {isPhotoPack && 'Photos'}
            {isQuotePack && 'Quotes'}
            {isPresetSettings && 'Preset Settings'}
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
              <div className="mt-4 sm:mt-6 rounded-xl border border-border bg-card/50 divide-y sm:divide-y-0 sm:divide-x divide-border overflow-hidden flex flex-col sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <Images className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {data.photos.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total {data.photos.length === 1 ? 'Photo' : 'Photos'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <Camera className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {new Set(data.photos.map((p) => p.photographer).filter(Boolean)).size}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Set(data.photos.map((p) => p.photographer).filter(Boolean)).size === 1
                        ? 'Photographer'
                        : 'Photographers'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {new Set(data.photos.map((p) => p.location).filter(Boolean)).size}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Set(data.photos.map((p) => p.location).filter(Boolean)).size === 1
                        ? 'Location'
                        : 'Locations'}
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
              <div className="mt-4 sm:mt-6 rounded-xl border border-border bg-card/50 divide-y sm:divide-y-0 sm:divide-x divide-border overflow-hidden flex flex-col sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <MessageSquareQuote className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {data.quotes.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total {data.quotes.length === 1 ? 'Quote' : 'Quotes'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {new Set(data.quotes.map((q) => q.author).filter(Boolean)).size}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Set(data.quotes.map((q) => q.author).filter(Boolean)).size === 1
                        ? 'Unique Author'
                        : 'Unique Authors'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3 px-5 py-4">
                  <Type className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="text-xl font-semibold text-foreground">
                      {Math.round(
                        data.quotes.reduce((acc, q) => acc + q.quote.length, 0) /
                          data.quotes.length,
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">Avg. Characters</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4 sm:space-y-6">
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

          {isPhotoPack &&
            (!data.photos || data.photos.length === 0) &&
            (data.api_enabled ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Images className="h-10 w-10 mb-3 opacity-40" />
                <p className="text-sm">
                  Photos are fetched live from the{' '}
                  {(data.api_provider && providerNames[data.api_provider]) ?? data.api_provider} API
                  and are not previewed here.
                </p>
              </div>
            ) : (
              <NoContentEmptyState />
            ))}

          {isQuotePack && (!data.quotes || data.quotes.length === 0) && <NoContentEmptyState />}
          {isPresetSettings && presetSettings.length === 0 && <NoContentEmptyState />}
        </TabsContent>
      </Tabs>
    </main>
  );
}
