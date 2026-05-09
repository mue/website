import { useState, useMemo } from 'react';

import { cn } from '@/lib/utils';
import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients';

type BlogImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  shape?: 'square' | 'rounded' | 'circle';
  aspectRatio?: string;
  blurDataURL?: string;
  placeholder?: 'empty' | 'blur';
};

export function BlogImage({
  src,
  alt,
  fill,
  priority,
  className,
  sizes,
  shape = 'rounded',
  aspectRatio,
  blurDataURL,
  placeholder,
}: BlogImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const identifier = alt || src;
  const gradClass = useMemo(
    () => BLOG_IMAGE_GRADIENTS[blogImageGradientIndex(identifier)],
    [identifier],
  );

  const radiusClass =
    shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-none' : 'rounded-xl';

  const ratioClass = useMemo(() => {
    if (!aspectRatio) return null;
    const allowed = new Set(['16/9', '4/3', '1/1', '3/2', '2/3', '21/9']);
    if (!allowed.has(aspectRatio)) return null;
    return `aspect-[${aspectRatio}]`;
  }, [aspectRatio]);

  const baseWrapper = cn(
    'relative overflow-hidden',
    radiusClass,
    ratioClass && !fill && 'w-full',
    fill ? 'absolute inset-0' : 'block',
  );

  const showBlur = placeholder === 'blur' && blurDataURL && !loaded && !error;

  return (
    <div
      className={cn(baseWrapper, ratioClass, gradClass, 'bg-cover bg-center')}
      style={showBlur ? { backgroundImage: `url(${blurDataURL})` } : undefined}
      aria-label={error ? `Image placeholder for ${alt}` : undefined}
      data-state={error ? 'error' : 'loaded'}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
            radiusClass,
            className,
            !loaded && 'opacity-0',
          )}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
