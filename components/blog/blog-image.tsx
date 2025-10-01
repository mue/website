'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients';

type BlogImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  skeleton?: boolean; // enable shimmer while loading (default true)
  shape?: 'square' | 'rounded' | 'circle'; // border radius variant
  aspectRatio?: string; // e.g. '16/9', '4/3', '1/1' (limited to predefined set for utility classes)
  blurDataURL?: string; // base64 placeholder
  placeholder?: 'empty' | 'blur';
};

export function BlogImage({
  src,
  alt,
  fill,
  priority,
  className,
  sizes,
  skeleton = true,
  shape = 'rounded',
  aspectRatio,
  blurDataURL,
  placeholder = blurDataURL ? 'blur' : 'empty',
}: BlogImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const identifier = alt || src;
  const gradClass = useMemo(
    () => BLOG_IMAGE_GRADIENTS[blogImageGradientIndex(identifier)],
    [identifier],
  );
  // Keep derivedInitial for potential external use; no direct overlay usage here currently.

  // Wrapper classes for layout when using fill vs standard layout
  const radiusClass =
    shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-none' : 'rounded-xl';

  const ratioClass = useMemo(() => {
    if (!aspectRatio) return null;
    // Map common aspect ratios to Tailwind arbitrary values using bracket syntax.
    // If an unsupported ratio is passed, fallback to no ratio styling.
    const allowed = new Set(['16/9', '4/3', '1/1', '3/2', '2/3', '21/9']);
    if (!allowed.has(aspectRatio)) return null;
    // Tailwind arbitrary value syntax: aspect-[16/9]
    return `aspect-[${aspectRatio}]`;
  }, [aspectRatio]);

  const baseWrapper = cn(
    'relative overflow-hidden',
    radiusClass,
    ratioClass && !fill && 'w-full',
    fill ? 'absolute inset-0' : 'block',
  );

  return (
    <div
      className={cn(
        baseWrapper,
        ratioClass,
        gradClass, // gradient always present to avoid flash
        'bg-cover bg-center',
      )}
      aria-label={error ? `Image placeholder for ${alt}` : undefined}
      data-state={error ? 'error' : loaded ? 'loaded' : 'loading'}
    >
      {skeleton && !loaded && !error && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center animate-pulse backdrop-blur-[1px]',
            'bg-black/5 dark:bg-black/20',
          )}
          aria-hidden
        >
          <span className="text-xs font-medium tracking-wide text-white/70 dark:text-white/60 select-none">
            Loading
          </span>
        </div>
      )}
      {!error && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn(
            'object-cover transition-opacity duration-500',
            !loaded && 'opacity-0',
            loaded && 'opacity-100',
            radiusClass,
            className,
          )}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
        />
      )}
      {error && <div className="absolute inset-0 flex items-center justify-center"></div>}
    </div>
  );
}
