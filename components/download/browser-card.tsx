import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IconType } from 'react-icons';
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
      className={`group relative overflow-hidden rounded-3xl border p-8 text-left shadow-[0_20px_70px_-40px_rgba(12,12,40,0.8)] backdrop-blur transition-all ${
        isDetected
          ? 'border-[#FF5C25]/60 bg-background/95 shadow-[0_25px_90px_-35px_rgba(255,92,37,0.6)] ring-2 ring-[#FF5C25]/30'
          : 'border-white/10 bg-background/80 hover:border-[#FF5C25]/40 hover:shadow-[0_25px_90px_-35px_rgba(12,12,40,0.95)]'
      }`}
    >
      <div
        className={`absolute inset-x-0 -top-24 h-48 bg-gradient-to-b ${gradient} opacity-[0.08] blur-3xl transition-opacity group-hover:opacity-[0.14]`}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
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

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {version}
        </div>

        <Button
          size="lg"
          className="mt-8 w-full shadow-[0_20px_50px_-25px_var(--tw-shadow-color)] shadow-primary/40"
          asChild
        >
          <Link href={url} target="_blank" rel="noreferrer">
            Add to {name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
