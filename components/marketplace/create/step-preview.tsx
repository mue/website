import { AddonMetadata, AddonType, Photo, Quote } from './types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getMarketplaceTypeLabel } from '@/lib/marketplace';

interface StepPreviewProps {
  addonType: AddonType;
  metadata: AddonMetadata;
  photos: Photo[];
  quotes: Quote[];
  settingsJson: string;
  onNext: () => void;
  onBack: () => void;
}

export function StepPreview({
  addonType,
  metadata,
  photos,
  quotes,
  settingsJson,
  onNext,
  onBack,
}: StepPreviewProps) {
  const getContentCount = () => {
    if (addonType === 'photos') {
      return photos.filter((p) => p.photographer && p.location && p.url.default).length;
    }
    if (addonType === 'quotes') {
      return quotes.filter((q) => q.quote && q.author).length;
    }
    if (addonType === 'settings') {
      try {
        const parsed = JSON.parse(settingsJson);
        return Object.keys(parsed).length;
      } catch {
        return 0;
      }
    }
    return 0;
  };

  const getContentPreview = () => {
    if (addonType === 'photos') {
      const validPhotos = photos.filter((p) => p.photographer && p.location && p.url.default);
      return validPhotos.slice(0, 3);
    }
    if (addonType === 'quotes') {
      const validQuotes = quotes.filter((q) => q.quote && q.author);
      return validQuotes.slice(0, 3);
    }
    return [];
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Eye className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Marketplace Preview</h2>
        <p className="text-muted-foreground">
          See how your addon will appear in the Mue Marketplace
        </p>
      </div>

      {/* Simulated Marketplace Card */}
      <div className="mx-auto max-w-md">
        <div className="mb-4 text-center text-sm text-muted-foreground">
          This is how users will see your addon in the marketplace:
        </div>

        {/* Marketplace Item Card - matching the actual design */}
        <div className="group relative flex h-full cursor-pointer flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 lg:gap-4 lg:p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative h-16 w-16 lg:h-14 lg:w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
              {metadata.icon_url ? (
                <Image
                  src={metadata.icon_url}
                  alt={metadata.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-muted-foreground/80">
                  {metadata.name.slice(0, 2)}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-sm lg:text-xl font-semibold leading-tight text-foreground line-clamp-2">
              {metadata.name}
            </h3>
            {metadata.author && (
              <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                By {metadata.author}
              </p>
            )}
          </div>

          <div className="hidden lg:flex items-center flex-wrap gap-2">
            <Badge
              className={cn(
                'flex flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition',
                'hover:bg-primary/10 hover:text-primary',
              )}
            >
              {getMarketplaceTypeLabel(addonType)}
            </Badge>
          </div>

          {/* Mobile view badge */}
          <div className="flex lg:hidden items-center justify-center gap-2">
            <Badge
              className={cn(
                'flex flex-row gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground',
              )}
            >
              {getMarketplaceTypeLabel(addonType)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Additional Preview Info */}
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Stats */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-3 font-semibold">Addon Details</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Version:</span>
              <span className="font-medium">{metadata.version}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {addonType === 'photos'
                  ? 'Photos:'
                  : addonType === 'quotes'
                    ? 'Quotes:'
                    : 'Settings:'}
              </span>
              <span className="font-medium">{getContentCount()}</span>
            </div>
            {metadata.description && (
              <div className="sm:col-span-2 text-sm">
                <span className="text-muted-foreground">Description:</span>
                <p className="mt-1">{metadata.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Preview */}
        {addonType === 'photos' && getContentPreview().length > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-3 font-semibold">Sample Photos</h4>
            <div className="grid grid-cols-3 gap-2">
              {(getContentPreview() as Photo[]).map((photo, idx) => (
                <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg">
                  {photo.url.default && (
                    <Image
                      src={photo.url.default}
                      alt={photo.location}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute bottom-2 left-2 text-xs text-white">
                      <p className="font-medium">{photo.location}</p>
                      <p className="text-white/80">{photo.photographer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {addonType === 'quotes' && getContentPreview().length > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-3 font-semibold">Sample Quotes</h4>
            <div className="space-y-2">
              {(getContentPreview() as Quote[]).map((quote, idx) => (
                <div key={idx} className="rounded-lg border bg-muted/50 p-3 text-sm">
                  <p className="italic">&ldquo;{quote.quote}&rdquo;</p>
                  <p className="mt-1 text-xs text-muted-foreground">— {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {addonType === 'settings' && (
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-3 font-semibold">Settings Configuration</h4>
            <p className="text-sm text-muted-foreground">
              Contains {getContentCount()} customized settings that will be applied to Mue Tab
            </p>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 <strong>Tip:</strong> Make sure your icon and screenshot URLs are working correctly. If
          the preview doesn&apos;t look right, go back and update your metadata.
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Edit
        </Button>
        <Button onClick={onNext} className="gap-2">
          Looks Good!
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
