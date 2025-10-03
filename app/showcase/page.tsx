import { Metadata } from 'next';
import { Sparkles, Upload } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { getShowcaseItems } from '@/lib/showcase';
import { ShowcaseGallery } from '@/components/showcase/showcase-gallery';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community Showcase',
  description:
    'Discover beautiful Mue setups from our community. Get inspired by creative customizations and share your own.',
  openGraph: {
    title: 'Community Showcase | Mue',
    description:
      'Discover beautiful Mue setups from our community. Get inspired by creative customizations and share your own.',
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function ShowcasePage() {
  const items = getShowcaseItems();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
            <Sparkles className="h-3 w-3" />
            <span>Community</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Showcase</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            See Mue in action
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Explore creative setups from our community. Each one is unique, personalized, and built
            with Mue&apos;s powerful customization features.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="outline">
              <Link href="https://discord.gg/zv8C9F8" target="_blank" rel="noreferrer">
                <FaDiscord className="mr-2 h-4 w-4" />
                Join Discord
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://discord.gg/zv8C9F8" target="_blank" rel="noreferrer">
                <Upload className="mr-2 h-4 w-4" />
                Submit Your Setup
              </Link>
            </Button>
          </div>
        </header>

        {/* Info Banner */}
        <div className="mb-12 rounded-2xl border border-border bg-muted/50 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Want to be featured?</span> Share your
            Mue setup in our{' '}
            <Link
              href="https://discord.gg/zv8C9F8"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Discord community
            </Link>{' '}
            and it might appear here!
          </p>
        </div>

        {/* Gallery */}
        {items.length > 0 ? (
          <ShowcaseGallery items={items} />
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No showcase items yet. Be the first to share your setup!
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground">Got inspired?</h2>
          <p className="mt-2 text-muted-foreground">
            Download Mue and create your own personalized new tab experience.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/download">Download Mue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
