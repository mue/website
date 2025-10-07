import { AddonMetadata, AddonType, Photo, Quote } from './types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Github, CheckCircle2, FileJson, Package, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface StepOutputProps {
  addonType: AddonType;
  metadata: AddonMetadata;
  photos: Photo[];
  quotes: Quote[];
  onDownload: () => void;
  onSubmit: () => void;
  onBack: () => void;
  onStartOver: () => void;
}

export function StepOutput({
  addonType,
  metadata,
  photos,
  quotes,
  onDownload,
  onSubmit,
  onBack,
  onStartOver,
}: StepOutputProps) {
  const [copied, setCopied] = useState(false);

  // Celebrate with confetti when reaching this step
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const getContentCount = () => {
    if (addonType === 'photos') {
      return photos.filter((p) => p.photographer && p.location && p.url.default).length;
    }

    if (addonType === 'quotes') {
      return quotes.filter((q) => q.quote && q.author).length;
    }

    return 0;
  };

  const getTypeLabel = () => {
    switch (addonType) {
      case 'photos':
        return 'Photo Pack';
      case 'quotes':
        return 'Quote Pack';
      case 'settings':
        return 'Preset Settings';
    }
  };

  const handleCopyToClipboard = async () => {
    // Generate the addon JSON
    const addonData: Record<string, unknown> = {
      name: metadata.name,
      description: metadata.description,
      author: metadata.author,
      version: metadata.version,
      icon_url: metadata.icon_url,
      screenshot_url: metadata.screenshot_url,
      type: addonType,
    };

    if (addonType === 'photos') {
      addonData.photos = photos.filter((p) => p.url.default);
    } else if (addonType === 'quotes') {
      addonData.quotes = quotes.filter((q) => q.quote && q.author);
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(addonData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Your Addon is Ready!</h2>
        <p className="text-muted-foreground">
          Review your addon details and download or submit to the marketplace
        </p>
      </div>

      <Card className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {metadata.icon_url && (
              <Image
                src={metadata.icon_url}
                alt={metadata.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg object-cover"
                unoptimized
              />
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{metadata.name}</h3>
                <Badge variant="outline">{getTypeLabel()}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{metadata.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  Version {metadata.version}
                </div>
                <div>By {metadata.author}</div>
              </div>
            </div>
          </div>

          {metadata.screenshot_url && (
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={metadata.screenshot_url}
                alt="Screenshot"
                width={800}
                height={450}
                className="w-full object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h4 className="mb-4 font-semibold">Content Summary</h4>
          <div className="space-y-3">
            {addonType === 'photos' && (
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">{getContentCount()} photos</span> included in this
                  pack
                </span>
              </div>
            )}
            {addonType === 'quotes' && (
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">{getContentCount()} quotes</span> included in this
                  pack
                </span>
              </div>
            )}
            {addonType === 'settings' && (
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Custom settings configuration ready</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Next Steps</h4>
        <ol className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
          <li className="flex gap-2">
            <span className="font-semibold">1.</span>
            <span>Download your addon as a JSON file to save it locally</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">2.</span>
            <span>
              Submit to the marketplace to share with the community (opens GitHub to create a pull
              request)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold">3.</span>
            <span>Once approved, your addon will be available for everyone to use in Mue Tab!</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={onStartOver}>
            Create Another
          </Button>
          <Button variant="outline" onClick={handleCopyToClipboard} className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4 animate-in zoom-in" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy JSON
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
          <Button onClick={onSubmit} className="gap-2">
            <Github className="h-4 w-4" />
            Submit to Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
}
