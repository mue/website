import type { Metadata } from 'next';
import Link from 'next/link';
import { Palette, Download, CheckCircle2, XCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { ContentSection } from '@/components/shared/content-section';
import Logo from '@/components/logo';
import { BrandColorCard } from '@/components/branding/brand-color-card';
import { BrandAssetCard } from '@/components/branding/brand-asset-card';

export const metadata: Metadata = {
  title: 'Branding',
  description: 'Download Mue logos, learn about our brand colors, and discover usage guidelines.',
  openGraph: {
    title: 'Branding | Mue',
    description: 'Download Mue logos, learn about our brand colors, and discover usage guidelines.',
  },
};

const brandColors = [
  {
    name: 'Primary Orange',
    hex: '#FF5C25',
    description: 'Main brand color for primary actions and highlights',
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
    description: 'Secondary color for lighter backgrounds',
  },
  {
    name: 'Warm Beige',
    hex: '#FBD3C6',
    description: 'Tertiary color for subtle backgrounds',
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

export default function BrandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <PageHeader icon={Palette} title="Branding" subtitle="Assets and guidelines" />

        <div className="space-y-12">
          {/* Logo Section */}
          <ContentSection title="Logo">
            <p className="mb-8">
              Our logo represents Mue&apos;s core functionality of customization and organization.
              The layered design symbolizes multiple customizable elements coming together to create
              your perfect new tab experience.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {logoVariants.map((variant) => (
                <BrandAssetCard
                  key={variant.title}
                  title={variant.title}
                  description={variant.description}
                  isDark={variant.isDark}
                />
              ))}
            </div>
          </ContentSection>

          {/* Color Palette */}
          <ContentSection title="Color Palette">
            <p className="mb-8">
              Our vibrant color palette is inspired by sunrises and new beginnings. These colors
              should be used consistently across all Mue-related materials.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brandColors.map((color) => (
                <BrandColorCard
                  key={color.hex}
                  name={color.name}
                  hex={color.hex}
                  description={color.description}
                />
              ))}
            </div>
          </ContentSection>

          {/* Typography */}
          <ContentSection title="Typography">
            <p className="mb-6">
              We use system fonts for optimal performance and native feel across all platforms.
            </p>

            <div className="space-y-4 rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">PRIMARY FONT</h3>
                <p className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'var(--font-lexend-deca)' }}>
                  Lexend Deca
                </p>
                <p className="text-sm text-muted-foreground">Used for headings and display text</p>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground">BODY FONT</h3>
                <p className="mt-2 text-lg">System Font Stack</p>
                <p className="text-sm text-muted-foreground">
                  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
                </p>
              </div>
            </div>
          </ContentSection>

          {/* Usage Guidelines */}
          <ContentSection title="Usage Guidelines">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Do
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Use the logo with adequate spacing around it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Maintain the logo&apos;s aspect ratio when scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Use the provided color palette consistently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>Credit Mue when featuring our brand</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Don&apos;t
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                    <span>Modify the logo colors or gradient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                    <span>Distort, rotate, or alter the logo in any way</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                    <span>Use the logo on busy or conflicting backgrounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                    <span>Recreate or modify the logo yourself</span>
                  </li>
                </ul>
              </div>
            </div>
          </ContentSection>

          {/* Contact Section */}
          <section className="rounded-2xl border border-border bg-background/60 p-6 text-center backdrop-blur">
            <h3 className="text-xl font-semibold text-foreground">Need something else?</h3>
            <p className="mt-2 text-muted-foreground">
              If you need additional brand assets or have questions about using our brand,
              please reach out to us.
            </p>
            <Button asChild className="mt-4">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
