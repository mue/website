'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type BlogContentLightboxProps = {
  contentHtml: string;
};

export function BlogContentLightbox({ contentHtml }: BlogContentLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [allImages, setAllImages] = useState<HTMLImageElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Find all images in the blog content
    const images = document.querySelectorAll('.docs-prose img');
    const imageElements = Array.from(images) as HTMLImageElement[];
    setAllImages(imageElements);

    // Add click handlers to all images
    imageElements.forEach((img, index) => {
      img.style.cursor = 'zoom-in';
      img.onclick = () => {
        setLightboxSrc(img.src);
        setLightboxAlt(img.alt || '');
        setCurrentIndex(index);
        setLightboxOpen(true);
      };
    });

    return () => {
      // Cleanup click handlers
      imageElements.forEach((img) => {
        img.onclick = null;
      });
    };
  }, [contentHtml]);

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    if (allImages.length === 0) return;
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setLightboxSrc(allImages[newIndex].src);
    setLightboxAlt(allImages[newIndex].alt || '');
  }, [allImages, currentIndex]);

  const prevImage = useCallback(() => {
    if (allImages.length === 0) return;
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setLightboxSrc(allImages[newIndex].src);
    setLightboxAlt(allImages[newIndex].alt || '');
  }, [allImages, currentIndex]);

  // Keyboard navigation
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
  }, [lightboxOpen, currentIndex, allImages, nextImage, prevImage]);

  if (!lightboxOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
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

      {allImages.length > 1 && (
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
            src={lightboxSrc}
            alt={lightboxAlt}
            fill
            sizes="(max-width: 640px) 100vw, 90vw"
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-white text-xs sm:text-sm bg-black/50 px-2 sm:px-3 py-1 rounded-full">
          {currentIndex + 1} / {allImages.length}
        </div>
      )}
    </div>
  );
}
