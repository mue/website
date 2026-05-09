import { Link } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';

import { getMarketplaceTypeLabel } from '@/lib/marketplace';
import type { MarketplaceCollection } from '@/lib/marketplace';

import { cn } from '@/lib/utils';
import { useEmbed } from '@/lib/embed-context';

type CollectionWithTypes = MarketplaceCollection & { contentTypes: string[] };

interface FeaturedCollectionsProps {
  randomCollections: CollectionWithTypes[];
  isEmbed?: boolean;
}

export default function FeaturedCollections({
  randomCollections,
  isEmbed: isEmbedProp = false,
}: FeaturedCollectionsProps) {
  const { isEmbed: isEmbedContext, buildEmbedUrl } = useEmbed();
  const isEmbed = isEmbedProp || isEmbedContext;

  if (!randomCollections.length) return null;

  return (
    <Carousel
      opts={{ align: 'start', loop: true }}
      plugins={[Autoplay({ delay: 5000 })]}
      className="w-full"
    >
      <CarouselContent>
        {randomCollections.map((collection) => (
          <CarouselItem key={collection.name}>
            <article
              className={cn(
                'overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm',
                isEmbed && 'rounded-lg',
              )}
            >
              <div
                className={cn(
                  'grid grid-cols-[140px_1fr] lg:grid-cols-[2fr_3fr]',
                  isEmbed && 'gap-2 lg:gap-3 lg:grid-cols-[80px_1fr]',
                )}
              >
                <div
                  className={cn(
                    'relative min-h-[140px] lg:aspect-auto lg:min-h-[220px]',
                    isEmbed && 'hidden lg:block lg:aspect-square lg:min-h-0 lg:h-20 lg:w-20',
                  )}
                >
                  {collection.img ? (
                    <img
                      src={collection.img}
                      alt={collection.display_name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>

                <div
                  className={cn(
                    'flex flex-col gap-3 p-4 pr-12 lg:gap-4 lg:p-6 lg:pr-14',
                    isEmbed && 'gap-2 p-3 pr-12 lg:p-4 lg:pr-14',
                  )}
                >
                  <div className={cn('space-y-1.5 lg:space-y-2', isEmbed && 'space-y-1')}>
                    <div className="flex flex-wrap gap-1.5">
                      {collection.contentTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className={cn('text-xs', isEmbed && 'text-xs')}
                        >
                          {getMarketplaceTypeLabel(type)}
                        </Badge>
                      ))}
                    </div>
                    <h2
                      className={cn(
                        'text-base font-semibold tracking-tight lg:text-2xl',
                        isEmbed && 'text-lg lg:text-xl',
                      )}
                    >
                      {collection.display_name}
                    </h2>
                    {collection.description && (
                      <p
                        className={cn(
                          'text-muted-foreground text-xs line-clamp-2 lg:text-base lg:line-clamp-3',
                          isEmbed && 'text-xs lg:text-sm line-clamp-2',
                        )}
                      >
                        {collection.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      to={
                        buildEmbedUrl(
                          `/marketplace/collection/${encodeURIComponent(collection.name)}`,
                        ) as any
                      }
                      className={cn(
                        'cursor-pointer rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 lg:px-4 lg:py-2 lg:text-sm',
                        isEmbed && 'px-3 py-1.5 text-xs',
                      )}
                    >
                      Explore collection
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm border-border/60 hover:bg-background" />
      <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm border-border/60 hover:bg-background" />
    </Carousel>
  );
}
