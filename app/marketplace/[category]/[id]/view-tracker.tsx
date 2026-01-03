'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { useEmbed } from '@/lib/embed-context';

interface ViewTrackerProps {
  itemId: string;
  initialViews?: number;
  itemType?: string;
  itemDisplayName?: string;
}

export function ViewTracker({
  itemId,
  initialViews = 0,
  itemType,
  itemDisplayName,
}: ViewTrackerProps) {
  const [views, setViews] = useState<number | null>(initialViews || null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);
  const { isEmbed, sendMessage } = useEmbed();

  useEffect(() => {
    // Only track once per page load
    if (hasTracked) return;

    const trackView = async () => {
      try {
        const response = await fetch('/api/marketplace/view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId }),
        });

        if (response.ok) {
          const data = await response.json();
          // API returns {"views": number}
          if (data.views !== undefined) {
            setViews(data.views);
          }
        }
      } catch (error) {
        // Silently fail - view tracking is not critical
        console.debug('View tracking unavailable:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
    setHasTracked(true);

    // Send postMessage event in embed mode
    if (isEmbed && itemType && itemDisplayName) {
      sendMessage('marketplace:item:view', {
        id: itemId,
        type: itemType,
        displayName: itemDisplayName,
      });
    }
  }, [itemId, hasTracked, isEmbed, sendMessage, itemType, itemDisplayName]);

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  // Don't show view counter if we don't have any views data
  if (views === null) return null;

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>
        {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
      </span>
    </div>
  );
}
