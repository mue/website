import type { Metadata } from 'next';
import Link from 'next/link';

import { Palette, CheckCircle2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { BrandColorCard } from '@/components/branding/brand-color-card';
import { BrandAssetCard } from '@/components/branding/brand-asset-card';

export const metadata: Metadata = {
  title: 'Branding',
  description: 'Download Mue logos, learn about our brand colours, and discover usage guidelines.',
  openGraph: {
    title: 'Branding | Mue',
    description:
      'Download Mue logos, learn about our brand colours, and discover usage guidelines.',
  },
};

const brandColors = [
  {
    name: 'Primary Orange',
    hex: '#FF5C25',
    description: 'Main brand colour for primary actions and highlights',
  },
  {
    name: 'Deep Red',
    hex: '#D21A11',
    description: 'Gradient middle, used for depth and emphasis',
  },
  {
    name: 'Pink Accent',
    hex: '#FF456E',
    description: 'Gradient end, used for vibrant accents',
  },
  {
    name: 'Light Coral',
    hex: '#F18D91',
    description: 'Secondary colour for lighter backgrounds',
  },
  {
    name: 'Warm Beige',
    hex: '#FBD3C6',
    description: 'Tertiary colour for subtle backgrounds',
  },
];

const logoVariants = [
  {
    title: 'Full Color Logo',
    description: 'Primary logo with gradient. Use on light backgrounds.',
    isDark: false,
  },
  {
    title: 'Logo on Dark',
    description: 'Optimized for dark backgrounds with adjusted contrast.',
    isDark: true,
  },
];

const dos = [
  'Use the logo with adequate spacing around it',
  "Maintain the logo's aspect ratio when scaling",
  'Use the provided colour palette consistently',
  'Credit Mue when featuring our brand',
];

const donts = [
  'Modify the logo colours or gradient',
  'Distort, rotate, or alter the logo in any way',
  'Use the logo on busy or conflicting backgrounds',
  'Recreate or modify the logo yourself',
];

export default function BrandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.12)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
              <Palette className="h-6 w-6 text-[#FF5C25]" />
            </div>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Brand Guidelines
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Logos, colors, and usage guidelines for representing Mue consistently across all
            contexts.
          </p>
        </header>

        <div className="space-y-16">
          <section>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Logo</h2>
            <p className="mb-8 text-muted-foreground">
              Our logo represents Mue&apos;s core philosophy of customisation. The layered design
              symbolizes multiple elements coming together to create your perfect new tab
              experience.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {logoVariants.map((variant) => (
                <BrandAssetCard
                  key={variant.title}
                  title={variant.title}
                  description={variant.description}
                  isDark={variant.isDark}
                />
              ))}
            </div>
          </section>

          <div className="h-px bg-border" />

          <section>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Colour Palette</h2>
            <p className="mb-8 text-muted-foreground">
              Our vibrant palette is inspired by sunrises and new beginnings. Use these colours
              consistently across all Mue-related materials.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {brandColors.map((color) => (
                <BrandColorCard
                  key={color.hex}
                  name={color.name}
                  hex={color.hex}
                  description={color.description}
                />
              ))}
            </div>
          </section>

          <div className="h-px bg-border" />

          <section>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Typography</h2>
            <p className="mb-8 text-muted-foreground">
              We use purpose-chosen fonts that balance personality with readability.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Primary font
                </p>
                <p
                  className="mt-3 text-3xl font-semibold"
                  style={{ fontFamily: 'var(--font-lexend-deca)' }}
                >
                  Lexend Deca
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Headings and display text</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Body font
                </p>
                <p className="mt-3 text-3xl font-semibold">Inter</p>
                <p className="mt-2 text-sm text-muted-foreground">Body copy and UI elements</p>
              </div>
            </div>
          </section>

          <div className="h-px bg-border" />

          <section>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Usage Guidelines</h2>
            <p className="mb-8 text-muted-foreground">
              Follow these guidelines to keep the Mue brand consistent and recognizable.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Do
                </h3>
                <ul className="space-y-3">
                  {dos.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Don&apos;t
                </h3>
                <ul className="space-y-3">
                  {donts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="h-px bg-border" />

          <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground">Need something else?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              If you need additional brand assets or have questions about using our brand, reach
              out.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
