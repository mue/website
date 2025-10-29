'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface BrandColorCardProps {
  name: string;
  hex: string;
  description: string;
}

export function BrandColorCard({ name, hex, description }: BrandColorCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur transition hover:border-primary/40 hover:shadow-md">
      <div
        className="h-32 w-full transition group-hover:scale-105"
        style={{ backgroundColor: hex }}
      />
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <button
            onClick={copyToClipboard}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground cursor-pointer"
            aria-label={`Copy ${hex} to clipboard`}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <p className="mb-2 font-mono text-sm text-muted-foreground">{hex}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
