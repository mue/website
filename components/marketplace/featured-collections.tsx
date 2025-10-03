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

type CollectionWithTypes = MarketplaceCollection & { contentTypes: string[] };

interface FeaturedCollectionsProps {
  randomCollections: CollectionWithTypes[];
}

export default function FeaturedCollections({ randomCollections }: FeaturedCollectionsProps) {
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
            <article className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[220px]">
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
                <div className="flex flex-col gap-4 p-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {collection.contentTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {getMarketplaceTypeLabel(type)}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {collection.display_name}
                    </h2>
                    {collection.description && (
                      <p className="text-muted-foreground text-sm md:text-base line-clamp-3">
                        {collection.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      href={`/marketplace/collection/${encodeURIComponent(collection.name)}`}
                      className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
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
