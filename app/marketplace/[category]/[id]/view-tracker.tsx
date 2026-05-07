'use client';

import { useEffect, useState } from 'react';

import { Eye, Download } from 'lucide-react';

import { useEmbed } from '@/lib/embed-context';

interface ViewTrackerProps {
  itemId: string;
  initialViews?: number;
  initialDownloads?: number;
  itemType?: string;
  itemDisplayName?: string;
}

export function ViewTracker({
  itemId,
  initialViews = 0,
  initialDownloads = 0,
  itemType,
  itemDisplayName,
}: ViewTrackerProps) {
  const [views, setViews] = useState<number | null>(initialViews || null);
  const [downloads, setDownloads] = useState<number | null>(initialDownloads || null);

  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

  const { isEmbed, sendMessage } = useEmbed();

  useEffect(() => {
    // only track once per page load
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

          if (data.views !== undefined) {
            setViews(data.views);
          }

          if (data.downloads !== undefined) {
            setDownloads(data.downloads);
          }
        }
      } catch (error) {
        console.debug('View tracking unavailable:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackView();
    setHasTracked(true);

    // send postMessage event in embed mode
    if (isEmbed && itemType && itemDisplayName) {
      sendMessage('marketplace:item:view', {
        id: itemId,
        type: itemType,
        displayName: itemDisplayName,
      });
    }
  }, [itemId, hasTracked, isEmbed, sendMessage, itemType, itemDisplayName]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <Eye className="h-4 w-4" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>

        <div className="flex items-center gap-3">
          <Download className="h-4 w-4" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (views === null && downloads === null) return null;

  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      {views !== null && (
        <div className="flex items-center gap-3">
          <Eye className="h-4 w-4" />
          <span>
            {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
          </span>
        </div>
      )}

      {downloads !== null && (
        <div className="flex items-center gap-3">
          <Download className="h-4 w-4" />
          <span>
            {downloads.toLocaleString()} {downloads === 1 ? 'download' : 'downloads'}
          </span>
        </div>
      )}
    </div>
  );
}
