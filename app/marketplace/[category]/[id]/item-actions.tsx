'use client';

import { Flag, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareModal } from '@/components/marketplace/share-modal';
import { useFavoritesContext } from '@/lib/favorites-context';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

interface ItemActionsProps {
  itemId: string;
  displayName: string;
  description?: string;
  category: string;
}

export function ItemActions({ itemId, displayName, description, category }: ItemActionsProps) {
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const isItemFavorited = isFavorite(category, itemId);

  const handleReport = () => {
    const reportUrl = `https://github.com/mue/marketplace/issues/new?assignees=&labels=item%2Creport&projects=&template=item_issue_report.yml&title=%5BItem+Report%5D+${encodeURIComponent(displayName)}`;
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  // Get the current page URL (client-side only)
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="flex flex-col gap-2">
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
