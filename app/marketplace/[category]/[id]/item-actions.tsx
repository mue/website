'use client';

import { Flag, Heart, Share2, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareModal } from '@/components/marketplace/share-modal';
import { useFavoritesContext } from '@/lib/favorites-context';
import { useEmbed } from '@/lib/embed-context';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { useState, useEffect } from 'react';

interface ItemActionsProps {
  itemId: string;
  displayName: string;
  description?: string;
  category: string;
  itemType?: string;
  itemData?: any; // Full item data for postMessage
  isPreview?: boolean;
}

export function ItemActions({ itemId, displayName, description, category, itemType, itemData, isPreview }: ItemActionsProps) {
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const { isEmbed, sendMessage } = useEmbed();
  const isItemFavorited = isFavorite(category, itemId);
  const [isInstalled, setIsInstalled] = useState(false);

  // Listen for installation status updates from parent
  useEffect(() => {
    if (!isEmbed) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'marketplace:item:installed') {
        if (event.data.payload.id === itemId) {
          setIsInstalled(event.data.payload.installed);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Request current installation status
    sendMessage('marketplace:item:check-installed', {
      id: itemId,
      type: itemType,
    });

    return () => window.removeEventListener('message', handleMessage);
  }, [isEmbed, itemId, itemType, sendMessage]);

  const handleInstall = () => {
    sendMessage('marketplace:item:install', {
      item: itemData || {
        id: itemId,
        type: itemType,
        display_name: displayName,
        name: itemId,
      },
    });
    setIsInstalled(true);
  };

  const handleUninstall = () => {
    sendMessage('marketplace:item:uninstall', {
      item: itemData || {
        id: itemId,
        type: itemType,
        display_name: displayName,
        name: itemId,
      },
    });
    setIsInstalled(false);
  };

  const handleReport = () => {
    const reportUrl = `https://github.com/mue/marketplace/issues/new?assignees=&labels=item%2Creport&projects=&template=item_issue_report.yml&title=%5BItem+Report%5D+${encodeURIComponent(displayName)}`;
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  // Get the current page URL (client-side only)
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="flex flex-col gap-2">
      {isEmbed ? (
        isPreview ? (
          <div className="rounded-md bg-muted px-3 py-2 text-center text-sm text-muted-foreground">
            Install unavailable in preview
          </div>
        ) : isInstalled ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleUninstall}
            className="flex w-full items-center justify-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Uninstall
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={handleInstall}
            className="flex w-full items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Install
          </Button>
        )
      ) : (
        <Button
          variant="default"
          size="sm"
          asChild
          className="flex w-full items-center justify-center gap-2"
        >
          <a
            href={`https://demo.muetab.com/#marketplace/${itemId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo width={16} height={16} className="h-4 w-4" />
            Open in Mue
          </a>
        </Button>
      )}

      <Button
        variant={isItemFavorited ? 'default' : 'outline'}
        size="sm"
        onClick={() => toggleFavorite(category, itemId)}
        className={cn(
          'flex w-full items-center justify-center gap-2 transition-all',
          isItemFavorited && 'bg-red-500 hover:bg-red-600 text-white',
        )}
      >
        <Heart className={cn('h-4 w-4', isItemFavorited && 'fill-current')} />
        {isItemFavorited ? 'Favorited' : 'Add to Favorites'}
      </Button>

      <div className="flex gap-2">
        <ShareModal
          url={url}
          title={`${displayName} - Mue Marketplace`}
          description={description || `Check out ${displayName} on Mue Marketplace`}
          isEmbed={isEmbed}
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="flex flex-1 items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          }
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleReport}
          className="flex flex-1 items-center justify-center gap-2"
        >
          <Flag className="h-4 w-4" />
          Report
        </Button>
      </div>
    </div>
  );
}
