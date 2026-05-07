import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Globe, Package } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { slugifyAuthor, type MarketplaceItemDetail } from '@/lib/marketplace';

import { ItemActions } from './item-actions';
import { ViewTracker } from './view-tracker';

type ItemSidebarProps = {
  data: MarketplaceItemDetail;
  id: string;
  category: string;
  isEmbed: boolean;
  isPreview: boolean;
  formattedCreatedAt: string | null;
  formattedUpdatedAt: string | null;
};

function embedUrl(path: string, isEmbed: boolean, isPreview: boolean, hasExistingParams = false) {
  if (!isEmbed) return path;
  const sep = hasExistingParams ? '&' : '?';
  const qs = isPreview ? 'embed=true&preview=true' : 'embed=true';
  return `${path}${sep}${qs}`;
}

export function ItemSidebar({
  data,
  id,
  category,
  isEmbed,
  isPreview,
  formattedCreatedAt,
  formattedUpdatedAt,
}: ItemSidebarProps) {
  return (
    <aside className="space-y-4 lg:space-y-6">
      <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
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
              {!isEmbed && (
                <Link href={embedUrl(`/marketplace?type=${data.type}`, isEmbed, isPreview, true)}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer text-xs capitalize transition hover:bg-primary/10 hover:text-primary"
                  >
                    {data.type!.replace(/_/g, ' ')}
                  </Badge>
                </Link>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3 text-sm">
            {data.author && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="h-4 w-4" />
                <Link
                  href={embedUrl(
                    `/marketplace/author/${slugifyAuthor(data.author)}`,
                    isEmbed,
                    isPreview,
                  )}
                  className="hover:text-primary hover:underline transition"
                >
                  {data.author}
                </Link>
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
                  {new Intl.DisplayNames([data.language], { type: 'language' }).of(data.language) ||
                    data.language.toUpperCase()}
                </span>
              </div>
            )}

            {formattedCreatedAt && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created {formattedCreatedAt}</span>
              </div>
            )}

            {formattedUpdatedAt && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated {formattedUpdatedAt}</span>
              </div>
            )}

            <ViewTracker
              itemId={id}
              initialViews={data.views}
              itemType={data.type}
              itemDisplayName={data.display_name}
            />
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

          <ItemActions
            itemId={id}
            displayName={data.display_name}
            description={data.description}
            category={category}
            itemType={data.type}
            itemData={data}
            isPreview={isPreview}
          />
        </div>

        {data.in_collections && data.in_collections.length > 0 && (
          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Collections
            </h2>

            <div className="flex flex-wrap gap-2">
              {data.in_collections.map((collection) => (
                <Link
                  key={collection.name}
                  href={embedUrl(
                    `/marketplace/collection/${encodeURIComponent(collection.name)}`,
                    isEmbed,
                    isPreview,
                  )}
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
  );
}
