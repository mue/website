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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md ${index === items.length - 1 && items.length % 3 === 1 ? 'lg:col-start-2' : ''}`}
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

      <ShowcaseLightbox
        item={selectedItem}
        onClose={() => setSelectedIndex(null)}
        onPrevious={() => setSelectedIndex((i) => i !== null && i > 0 ? i - 1 : i)}
        onNext={() => setSelectedIndex((i) => i !== null && i < items.length - 1 ? i + 1 : i)}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
        hasNext={selectedIndex !== null && selectedIndex < items.length - 1}
      />
    </>
  );
}
