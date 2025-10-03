'use client';

import Image from 'next/image';
import { X, User, Calendar, Tag } from 'lucide-react';
import { type ShowcaseItem } from '@/lib/showcase';
import { Badge } from '@/components/ui/badge';

type ShowcaseLightboxProps = {
  item: ShowcaseItem | null;
  onClose: () => void;
};

export function ShowcaseLightbox({ item, onClose }: ShowcaseLightboxProps) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition hover:bg-background"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="flex h-full items-center justify-center p-4">
        <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={item.imageUrl}
              alt={`Mue setup by ${item.author}`}
              fill
              className="object-contain"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
          </div>

          <div className="mt-4 rounded-lg bg-background/80 p-6 backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>
                    {item.discordUsername ? (
                      <>
                        <span className="font-medium text-foreground">{item.author}</span>
                        <span className="ml-2 text-xs">({item.discordUsername})</span>
                      </>
                    ) : (
                      <span className="font-medium text-foreground">{item.author}</span>
                    )}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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
