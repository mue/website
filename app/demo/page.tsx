'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ArrowLeft, ExternalLink, Lock, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default function DemoPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-6 py-6">
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm dark:border-white/10 dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] dark:ring-1 dark:ring-white/[0.06]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <TooltipProvider delayDuration={300}>
                <Tooltip content="Go back to home">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
                    asChild
                  >
                    <Link href="/" aria-label="Go back to home">
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-white/50">
              <Lock className="h-3 w-3 shrink-0" />
              demo.muetab.com
            </div>

            <div className="flex justify-end">
              <TooltipProvider delayDuration={300}>
                <Tooltip content="Open in new tab">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
                    asChild
                  >
                    <a href="https://demo.muetab.com?nointro=true" target="_blank" rel="noreferrer" aria-label="Open demo in new tab">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {isMobile ? (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <Monitor className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Desktop only</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The Mue demo is designed for desktop. Visit on your computer to try it out.
                </p>
              </div>
              <Button asChild>
                <Link href="/download">Learn more</Link>
              </Button>
            </div>
          ) : (
            <div className="relative h-[78vh] w-full">
              <iframe
                src="https://demo.muetab.com?nointro=true"
                title="Mue Tab Demo"
                className="absolute inset-0 h-full w-full"
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-white/10">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Ready to make Mue your daily companion?
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Install Mue as your new tab page and enjoy a unique browsing experience each day.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3 sm:justify-start">
            <Button asChild>
              <Link href="/download">Download Mue</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
