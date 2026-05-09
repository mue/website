import { ArrowRight } from 'lucide-react';
import type { IconType } from 'react-icons';

import { Button } from '@/components/ui/button';

type BrowserCardProps = {
  name: string;
  icon: IconType;
  description: string;
  url: string;
  version: string;
  gradient: string;
  isDetected?: boolean;
};

export function BrowserCard({
  name,
  icon: Icon,
  description,
  url,
  version,
  gradient,
  isDetected = false,
}: BrowserCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-8 text-left backdrop-blur transition-all duration-300 ${
        isDetected
          ? 'border-[#FF5C25]/60 bg-background shadow-[0_25px_90px_-35px_rgba(255,92,37,0.4)] ring-2 ring-[#FF5C25]/30'
          : 'border-border bg-background shadow-sm hover:border-[#FF5C25]/40 hover:shadow-[0_20px_60px_-20px_rgba(255,92,37,0.2)] dark:border-white/10 dark:shadow-none dark:hover:shadow-[0_25px_90px_-35px_rgba(12,12,40,0.95)]'
      }`}
    >
      <div
        className={`absolute inset-x-0 -top-24 h-48 bg-gradient-to-b ${gradient} opacity-[0.06] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.12] dark:opacity-[0.08] dark:group-hover:opacity-[0.14]`}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/50 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5">
            <Icon className="h-8 w-8 text-foreground" />
          </div>
          {isDetected && (
            <span className="rounded-full border border-[#FF5C25]/40 bg-[#FF5C25]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF5C25]">
              Your Browser
            </span>
          )}
        </div>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">{name}</h3>

        <p className="mt-3 text-sm text-muted-foreground">{description}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground dark:border-white/10 dark:bg-white/5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {version}
        </div>

        <Button
          size="lg"
          className="mt-8 w-full shadow-[0_20px_50px_-25px_var(--tw-shadow-color)] shadow-primary/40"
          asChild
        >
          <a href={url} target="_blank" rel="noreferrer">
            Add to {name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
