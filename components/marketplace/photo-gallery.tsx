'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LayoutGrid, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type Photo = {
  url?: Record<string, string>;
  photographer?: string;
  location?: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
  itemName: string;
};

export function PhotoGallery({ photos, itemName }: PhotoGalleryProps) {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-border bg-background p-1">
          <Button
            variant={viewMode === 'carousel' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('carousel')}
            className="gap-2"
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Carousel</span>
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </Button>
        </div>
      </div>

      {viewMode === 'carousel' ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent className="ml-0">
            {photos.map((photo, index) => {
              const photoUrl = photo.url?.default ?? Object.values(photo.url ?? {})[0];
              if (!photoUrl) return null;

              return (
                <CarouselItem key={`${photoUrl}-${index}`} className="pl-0">
                  <div className="space-y-4">
                    <div className="relative h-64 w-full max-w-4xl overflow-hidden rounded-xl border border-border/60 shadow-md md:h-96 mx-auto">
                      <Image
                        src={photoUrl}
                        alt={photo.location ?? photo.photographer ?? itemName}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    {(photo.photographer || photo.location) && (
                      <div className="text-center space-y-1">
                        {photo.photographer && (
                          <p className="text-sm font-medium text-foreground">
                            📷 {photo.photographer}
                          </p>
                        )}
                        {photo.location && (
                          <p className="text-sm text-muted-foreground">📍 {photo.location}</p>
                        )}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, index) => {
            const photoUrl = photo.url?.default ?? Object.values(photo.url ?? {})[0];
            if (!photoUrl) return null;

            return (
              <div
                key={`${photoUrl}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 shadow-sm transition hover:shadow-md"
              >
                <Image
                  src={photoUrl}
                  alt={photo.location ?? photo.photographer ?? itemName}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition group-hover:scale-105"
                  unoptimized
                />
                {(photo.photographer || photo.location) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      {photo.photographer && (
                        <p className="text-xs font-medium truncate">📷 {photo.photographer}</p>
                      )}
                      {photo.location && (
                        <p className="text-xs truncate">📍 {photo.location}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
