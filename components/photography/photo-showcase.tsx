'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PhotoData = {
  category: string;
  file: string;
  photographer: string;
  location?: string;
  camera?: string;
};

type CategoryFilter = 'all' | string;

export function PhotoShowcase() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [photographers, setPhotographers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories and photographers
        const [categoriesRes, photographersRes] = await Promise.all([
          fetch('https://api.muetab.com/images/categories'),
          fetch('https://api.muetab.com/images/photographers'),
        ]);

        if (!categoriesRes.ok || !photographersRes.ok) {
          throw new Error('Failed to fetch data from API');
        }

        const categoriesData = await categoriesRes.json();
        const photographersData = await photographersRes.json();

        setCategories(categoriesData);
        setPhotographers(photographersData);

        // Fetch multiple random images (let's get 24 to fill the grid)
        const photoPromises = Array.from({ length: 24 }, () =>
          fetch('https://api.muetab.com/images/random').then((res) => res.json()),
        );

        const photosData = await Promise.all(photoPromises);
        setPhotos(photosData);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentPhoto = filteredPhotos[lightboxIndex];

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
  }, [lightboxOpen, lightboxIndex, filteredPhotos.length]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading beautiful photography...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <p className="mt-4 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Categories
        </Button>
        {categories.slice(0, 8).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <span>
            <strong className="text-foreground">{photographers.length}+</strong> photographers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>
            <strong className="text-foreground">{categories.length}</strong> categories
          </span>
        </div>
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={`${photo.file}-${index}`}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 shadow-sm transition hover:shadow-lg cursor-zoom-in"
            >
              <Image
                src={photo.file}
                alt={photo.location || `Photo by ${photo.photographer}`}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-start gap-2">
                    <Camera className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-medium">{photo.photographer}</p>
                      {photo.location && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs opacity-90">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </p>
                      )}
                      <p className="mt-1 text-xs opacity-75">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-sm text-muted-foreground">
            No photos found in this category. Try selecting a different one.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}

          <div className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={currentPhoto.file}
                alt={currentPhoto.location || `Photo by ${currentPhoto.photographer}`}
                fill
                sizes="(max-width: 640px) 100vw, 90vw"
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Photo Details */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90vw] rounded-lg bg-black/80 px-4 py-3 text-white backdrop-blur">
            <div className="flex items-start gap-3">
              <Camera className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{currentPhoto.photographer}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm opacity-90">
                  {currentPhoto.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {currentPhoto.location}
                    </span>
                  )}
                  <span className="text-xs opacity-75">{currentPhoto.category}</span>
                  {currentPhoto.camera && (
                    <span className="text-xs opacity-75">{currentPhoto.camera}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {filteredPhotos.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1.5 rounded-full">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
