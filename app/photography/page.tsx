import { Metadata } from 'next';
import { Camera, Upload, Heart, Globe, Users, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PhotoShowcase } from '@/components/photography/photo-showcase';

export const metadata: Metadata = {
  title: 'Photography Showcase',
  description:
    'Discover stunning photography from talented creators around the world. Every image in Mue comes from real photographers sharing their vision.',
  openGraph: {
    title: 'Photography Showcase | Mue',
    description:
      'Discover stunning photography from talented creators around the world. Every image in Mue comes from real photographers sharing their vision.',
  },
};

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function PhotographyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.12)_0%,_transparent_50%)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
            <Camera className="h-3 w-3" />
            <span>Photography</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Showcase</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Every tab tells a story
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Behind every beautiful Mue background is a talented photographer capturing the world
            through their lens. Explore our curated collection of stunning imagery from creators
            worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#contribute">
                <Upload className="mr-2 h-4 w-4" />
                Become a Contributor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href="https://docs.muetab.com/api/endpoints#images"
                target="_blank"
                rel="noreferrer"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                API Documentation
              </Link>
            </Button>
          </div>
        </header>

        {/* Stats Section */}
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-semibold text-foreground">Worldwide</p>
            <p className="mt-1 text-sm text-muted-foreground">
              From photographers across the globe
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-semibold text-foreground">Community Driven</p>
            <p className="mt-1 text-sm text-muted-foreground">Built by passionate creators</p>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6 text-center backdrop-blur">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-semibold text-foreground">Always Free</p>
            <p className="mt-1 text-sm text-muted-foreground">Open source and accessible to all</p>
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoShowcase />

        {/* Contribution Section */}
        <div id="contribute" className="mt-24 scroll-mt-24">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card/80 to-card/40 p-8 backdrop-blur sm:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
                <Camera className="h-3 w-3" />
                <span>Join Us</span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Share your vision with millions
              </h2>

              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                We&apos;re always looking for talented photographers to contribute to Mue&apos;s
                background collection. Your work will be seen by thousands of users every day, with
                full credit and attribution.
              </p>

              <div className="mt-8 space-y-6">
                <div className="grid gap-4 text-left sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background/60 p-5">
                    <h3 className="mb-2 font-semibold text-foreground">
                      What we&apos;re looking for
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>High-resolution images (minimum 1920x1080)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Original photography you own the rights to</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Landscapes, nature, urban scenes, and more</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Images that inspire focus and creativity</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-background/60 p-5">
                    <h3 className="mb-2 font-semibold text-foreground">What you get</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Full photographer credit on every image</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Exposure to thousands of daily users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Listed in our public API and documentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">•</span>
                        <span>Join a community of creative contributors</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/50 p-5">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Ready to contribute?</span> Get
                    in touch with us on{' '}
                    <Link
                      href="https://discord.gg/zv8C9F8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Discord
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="https://github.com/mue/mue"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      GitHub
                    </Link>
                    . We&apos;ll walk you through the submission process and help you get your work
                    featured in Mue.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button asChild size="lg">
                    <Link href="https://discord.gg/zv8C9F8" target="_blank" rel="noreferrer">
                      Join Discord Community
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="https://github.com/mue/mue" target="_blank" rel="noreferrer">
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground">Experience these photos in Mue</h2>
          <p className="mt-2 text-muted-foreground">
            Download Mue and see beautiful photography with every new tab.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/download">Download Mue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
