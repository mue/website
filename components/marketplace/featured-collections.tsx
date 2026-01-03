'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getMarketplaceTypeLabel, MarketplaceCollection } from '@/lib/marketplace';
import { cn } from '@/lib/utils';

type CollectionWithTypes = MarketplaceCollection & { contentTypes: string[] };

interface FeaturedCollectionsProps {
  randomCollections: CollectionWithTypes[];
  isEmbed?: boolean;
}

export default function FeaturedCollections({ randomCollections, isEmbed = false }: FeaturedCollectionsProps) {
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
            <article className={cn(
              "overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm",
              isEmbed && "rounded-lg"
            )}>
              <div className={cn(
                "grid gap-6 lg:grid-cols-[2fr_3fr]",
                isEmbed && "gap-2 lg:gap-3 lg:grid-cols-[80px_1fr]"
              )}>
                <div className={cn(
                  "relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px]",
                  isEmbed && "hidden lg:block lg:aspect-square lg:min-h-0 lg:h-20 lg:w-20"
                )}>
                  {collection.img ? (
                    <Image
                      src={collection.img}
                      alt={collection.display_name}
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
                <div className={cn(
                  "flex flex-col gap-4 p-6",
                  isEmbed && "gap-2 p-3 lg:p-4"
                )}>
                  <div className={cn(
                    "space-y-2",
                    isEmbed && "space-y-1"
                  )}>
                    <div className="flex flex-wrap gap-2">
                      {collection.contentTypes.map((type) => (
                        <Badge key={type} variant="secondary" className={cn(isEmbed && "text-xs")}>
                          {getMarketplaceTypeLabel(type)}
                        </Badge>
                      ))}
                    </div>
                    <h2 className={cn(
                      "text-2xl font-semibold tracking-tight",
                      isEmbed && "text-lg lg:text-xl"
                    )}>
                      {collection.display_name}
                    </h2>
                    {collection.description && (
                      <p className={cn(
                        "text-muted-foreground text-sm md:text-base line-clamp-3",
                        isEmbed && "text-xs lg:text-sm line-clamp-2"
                      )}>
                        {collection.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      href={`/marketplace/collection/${encodeURIComponent(collection.name)}${isEmbed ? '?embed=true' : ''}`}
                      className={cn(
                        "cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90",
                        isEmbed && "px-3 py-1.5 text-xs"
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
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
