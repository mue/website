'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LayoutGrid, Layers, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && photos.length > 1) {
      nextImage();
    }
    if (isRightSwipe && photos.length > 1) {
      prevImage();
    }
  };

  const currentPhoto = photos[lightboxIndex];
  const currentPhotoUrl = currentPhoto?.url?.default ?? Object.values(currentPhoto?.url ?? {})[0];

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex, photos.length, nextImage, prevImage]);

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
                    <button
                      onClick={() => openLightbox(index)}
                      className="relative h-64 w-full max-w-4xl overflow-hidden rounded-xl border border-border/60 shadow-md md:h-96 mx-auto cursor-zoom-in hover:opacity-90 transition"
                    >
                      <Image
                        src={photoUrl}
                        alt={photo.location ?? photo.photographer ?? itemName}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                    </button>
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
          {photos.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, index) => {
            const photoUrl = photo.url?.default ?? Object.values(photo.url ?? {})[0];
            if (!photoUrl) return null;

            return (
              <button
                key={`${photoUrl}-${index}`}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border/60 shadow-sm transition hover:shadow-md cursor-zoom-in"
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
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && currentPhotoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-10 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-10 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}

          <div className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={currentPhotoUrl}
                alt={currentPhoto?.location ?? currentPhoto?.photographer ?? itemName}
                fill
                sizes="(max-width: 640px) 100vw, 90vw"
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </div>

          {(currentPhoto?.photographer || currentPhoto?.location) && (
            <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 max-w-[90vw] rounded-lg bg-black/70 px-3 py-2 sm:px-4 text-white text-center">
              {currentPhoto.photographer && (
                <p className="text-xs sm:text-sm font-medium truncate">📷 {currentPhoto.photographer}</p>
              )}
              {currentPhoto.location && (
                <p className="text-xs sm:text-sm truncate">📍 {currentPhoto.location}</p>
              )}
            </div>
          )}

          {photos.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white text-xs sm:text-sm bg-black/50 px-2 sm:px-3 py-1 rounded-full">
              {lightboxIndex + 1} / {photos.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
