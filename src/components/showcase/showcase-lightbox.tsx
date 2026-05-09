import { useEffect, useCallback, useState, useRef } from 'react';

import { X, ChevronLeft, ChevronRight, User, Calendar, Tag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { type ShowcaseItem } from '@/lib/showcase';

type ShowcaseLightboxProps = {
  item: ShowcaseItem | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export function ShowcaseLightbox({
  item,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ShowcaseLightboxProps) {
  const [visible, setVisible] = useState(false);
  const [displayItem, setDisplayItem] = useState<ShowcaseItem | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (item) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setVisible(false);
      setDisplayItem(item);

      openTimer.current = setTimeout(() => setVisible(true), 16);
    } else {
      if (openTimer.current) clearTimeout(openTimer.current);
      setVisible(false);

      closeTimer.current = setTimeout(() => setDisplayItem(null), 250);
    }

    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [item]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
      else if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      else if (e.key === 'Escape') onClose();
    },
    [hasPrevious, hasNext, onPrevious, onNext, onClose],
  );

  useEffect(() => {
    if (!item) return;
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, handleKeyDown]);

  if (!displayItem) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-250 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {hasPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-background"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <div
        className={`flex h-full items-center justify-center p-4 transition-all duration-250 ${visible ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'}`}
      >
        <div className="w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <img
              src={displayItem.imageUrl}
              alt={`Mue setup by ${displayItem.author}`}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>

          <div className="mt-4 rounded-xl bg-background/80 p-6 backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>
                    {displayItem.discordUsername ? (
                      <>
                        <span className="font-medium text-foreground">{displayItem.author}</span>
                        <span className="ml-2 text-xs">({displayItem.discordUsername})</span>
                      </>
                    ) : (
                      <span className="font-medium text-foreground">{displayItem.author}</span>
                    )}
                  </span>
                </div>

                {displayItem.description && (
                  <p className="text-sm text-muted-foreground">{displayItem.description}</p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(displayItem.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {displayItem.tags && displayItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {displayItem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
