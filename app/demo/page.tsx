import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

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
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://demo.muetab.com?nointro=true" target="_blank" rel="noreferrer">
              Open in new tab
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Try Mue Demo
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Experience Mue Tab in action. Interact with the demo below to see how Mue can transform
            your browsing experience.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.85)] ring-1 ring-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-white/75">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-400" />
              <span className="flex h-2 w-2 rounded-full bg-amber-400" />
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-3 text-white/70">demo.muetab.com</span>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium backdrop-blur">
              Live Demo
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full">
            <iframe
              src="https://demo.muetab.com?nointro=true"
              title="Mue Tab Demo"
              className="h-full w-full"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Ready to make Mue your daily companion?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Install Mue as your new tab page and enjoy a mindful browsing experience every time you
            open a new tab.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
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
