import { Metadata } from 'next';
import Link from 'next/link';

import { Upload } from 'lucide-react';

import { ShowcaseGallery } from '@/components/showcase/showcase-gallery';
import { Button } from '@/components/ui/button';

import { getShowcaseItems } from '@/lib/showcase';

export const metadata: Metadata = {
  title: 'Community Showcase',
  description:
    'Discover beautiful Mue setups from our community. Get inspired by creative customisations and share your own.',
  openGraph: {
    title: 'Community Showcase | Mue',
    description:
      'Discover beautiful Mue setups from our community. Get inspired by creative customisations and share your own.',
  },
};


export default function ShowcasePage() {
  const items = getShowcaseItems();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            See Mue in action
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Explore creative setups from our users. Each tab is a unique expression of how
            Mue can be customised to fit different aesthetics and workflows.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="outline">
              <Link href="https://discord.gg/zv8C9F8" target="_blank" rel="noreferrer">
                <Upload className="mr-2 h-4 w-4" />
                Submit Your Setup
              </Link>
            </Button>
          </div>
        </header>

        <ShowcaseGallery items={items} />

        <div className="mt-16 rounded-2xl border border-border bg-muted/30 px-8 py-14 text-center">
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Feel inspired?
          </h2>
          <p className="mx-auto mt-4 max-w-l text-base text-muted-foreground">
            Download Mue and create your own personalised new tab experience.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-[#c43d10] to-[#b02048] font-semibold text-white shadow-[0_20px_60px_-20px_rgba(255,92,37,0.4)] transition-all hover:scale-105 hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.5)]"
            >
              <Link href="/download">Download Mue</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link href="/demo">Try the demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
