'use client';

import { useState } from 'react';
import { Share2, Flag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemActionsProps {
  itemName: string;
  displayName: string;
  type: string;
}

export function ItemActions({ itemName, displayName, type }: ItemActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: displayName,
          text: `Check out ${displayName} on Mue Marketplace`,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
        if (err instanceof Error && err.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReport = () => {
    const reportUrl = `https://github.com/mue/marketplace/issues/new?assignees=&labels=item%2Creport&projects=&template=item_issue_report.yml&title=%5BItem+Report%5D+${encodeURIComponent(displayName)}`;
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex flex-1 items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            Share
          </>
        )}
      </Button>
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
  );
}
