'use client';

import { useState } from 'react';

import { Check, Copy, Share2 } from 'lucide-react';

import { FaFacebook, FaReddit, FaXTwitter } from 'react-icons/fa6';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ShareModalProps {
  url: string;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  isEmbed?: boolean;
}

export function ShareModal({ url, title, description, trigger, isEmbed = false }: ShareModalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        setOpen(false);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // embed fallback
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch (fallbackError) {
        console.error('Copy failed:', fallbackError);
      }
    }
  };

  const shareToSocial = (platform: 'twitter' | 'facebook' | 'reddit') => {
    const urlWithUtm = new URL(url);
    urlWithUtm.searchParams.set('utm_source', platform);
    urlWithUtm.searchParams.set('utm_medium', 'social');
    urlWithUtm.searchParams.set('utm_campaign', 'marketplace_share');

    const encodedUrl = encodeURIComponent(urlWithUtm.toString());
    const encodedTitle = encodeURIComponent(title);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    };

    window.open(urls[platform], '_blank');
  };

  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={isEmbed ? 'top-[10%] translate-y-0' : ''}>
        <DialogHeader className="text-left">
          <DialogTitle>Share this item</DialogTitle>
          <DialogDescription className="line-clamp-2">
            Share with others via social media or copy the link.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-auto">
          {/* cannot use native on embed */}
          {hasNativeShare && !isEmbed && (
            <Button onClick={handleNativeShare} className="w-full gap-2" variant="default">
              <Share2 className="h-4 w-4" />
              Share via...
            </Button>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md border border-border bg-muted px-3 py-2 text-sm truncate">
              {url}
            </div>
            <Button
              onClick={handleCopyLink}
              size="sm"
              variant={copied ? 'default' : 'outline'}
              className="gap-2 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Share on social media</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => shareToSocial('twitter')}
                variant="outline"
                className="gap-1.5 text-xs h-9"
                size="sm"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
                X (Twitter)
              </Button>
              <Button
                onClick={() => shareToSocial('facebook')}
                variant="outline"
                className="gap-1.5 text-xs h-9"
                size="sm"
              >
                <FaFacebook className="h-3.5 w-3.5" />
                Facebook
              </Button>
              <Button
                onClick={() => shareToSocial('reddit')}
                variant="outline"
                className="gap-1.5 text-xs h-9"
                size="sm"
              >
                <FaReddit className="h-3.5 w-3.5" />
                Reddit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
