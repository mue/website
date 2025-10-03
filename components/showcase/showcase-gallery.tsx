'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';
import { type ShowcaseItem } from '@/lib/showcase';
import { ShowcaseLightbox } from './showcase-lightbox';
import { Badge } from '@/components/ui/badge';

type ShowcaseGalleryProps = {
  items: ShowcaseItem[];
};

export function ShowcaseGallery({ items }: ShowcaseGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={item.thumbnailUrl || item.imageUrl}
                alt={`Mue setup by ${item.author}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-foreground">{item.author}</span>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {item.tags[0]}
                  </Badge>
                )}
              </div>

              {item.description && (
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <ShowcaseLightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
