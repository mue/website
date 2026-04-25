import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Experience Mue Tab in action. Try out the demo to see how Mue can transform your browsing experience.',
  openGraph: {
    title: 'Demo | Mue',
    description:
      'Experience Mue Tab in action. Try out the demo to see how Mue can transform your browsing experience.',
  },
};

export default function DemoPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-6 py-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.06]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-white/40 hover:bg-white/10 hover:text-white/70"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <span className="text-xs font-medium text-white/40">Try Mue</span>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-1.5 text-xs text-white/50">
              <Lock className="h-3 w-3 shrink-0" />
              demo.muetab.com
            </div>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-white/40 hover:bg-white/10 hover:text-white/70"
                asChild
              >
                <a href="https://demo.muetab.com?nointro=true" target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative h-[78vh] w-full">
            <iframe
              src="https://demo.muetab.com?nointro=true"
              title="Mue Tab Demo"
              className="absolute inset-0 h-full w-full"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Ready to make Mue your daily companion?
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Install Mue as your new tab page and enjoy a mindful browsing experience every day.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
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
