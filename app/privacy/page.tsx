import type { Metadata } from 'next';
import Link from 'next/link';

import { Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { ContentSection } from '@/components/shared/content-section';
import { BulletList } from '@/components/shared/bullet-list';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Mue handles your data and protects your privacy.',
  openGraph: {
    title: 'Privacy Policy | Mue',
    description: 'Learn how Mue handles your data and protects your privacy.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <PageHeader
          icon={Shield}
          title="Privacy Policy"
          subtitle="Last Updated: September 8, 2024"
        />

        <div className="prose-custom space-y-8">
          <ContentSection title="Introduction">
            <p>
              Mue shares no personal information with any third parties and all of your settings,
              backgrounds and other data are stored locally via localStorage. This data can be
              exported as JSON in advanced settings on Mue.
            </p>
          </ContentSection>

          <ContentSection title="Widget API Requests">
            <BulletList
              items={[
                'No API request stores any identifiable information sent.',
                'All requests are sent securely with HTTPS.',
                'All features which make requests can be disabled in settings.',
              ]}
            />
          </ContentSection>

          <ContentSection title="Weather Widget" titleSize="md">
            <p>
              The weather feature of Mue only stores your inputted location (or estimated when
              clicking on &apos;Auto&apos;) locally, and it is only sent in a request to get the
              current weather in your area. This request cannot be linked to you in any way and is
              sent through our opensource proxy server (proxy.muetab.com) to our weather provider
              (OpenWeatherMap).
            </p>
          </ContentSection>

          <ContentSection title="Background Widget" titleSize="md">
            <p>
              The photo map location feature of Mue will send a request with the information of the
              photo shown to Mapbox.
            </p>
            <p>
              The background feature of Mue requests to our API in order to get a random image. The
              only information sent in this request is the background category and resolution. When
              Unsplash or Pexels are selected, this information is sent through our opensource proxy
              server to their API. Images are requested and loaded from Cloudinary, Unsplash and
              Pexels. Enabling the &apos;Use DuckDuckGo Proxy&apos; option in background settings on
              the main modal will load all images through the DuckDuckGo image proxy instead.
            </p>
          </ContentSection>

          <ContentSection title="Quote Widget" titleSize="md">
            <p>
              The quote feature of Mue requests to our API (api.muetab.com) in order to get a random
              quote. Your set quote language is sent in this request to get a quote in your
              language.
            </p>
            <p>
              When opening the about tab in settings, requests are sent to the GitHub API, our API
              and our opensource sponsors proxy in order to check for updates, get a list of
              contributors, sponsors and photographers on Mue.
            </p>
          </ContentSection>

          <ContentSection title="Quick Links Widget" titleSize="md">
            <p>
              When Quick Links is enabled, favicons are obtained from the DuckDuckGo favicon API.
              The only information sent is the URL you specified and this cannot be linked to you.
              If you disable the &apos;Use DuckDuckGo Proxy&apos; setting in the Quick Links tab,
              the image is obtained through Google&apos;s favicon API instead.
            </p>
          </ContentSection>

          <ContentSection title="Marketplace" titleSize="md">
            <p>
              The Marketplace tab requests to our API (marketplace.muetab.com) in order to get a
              list of products in a category as well as a specific one. No information apart from
              this is sent. Images on Marketplace and My Add-ons pages are loaded through the
              DuckDuckGo Image Proxy.
            </p>
          </ContentSection>

          <ContentSection title="Offline Mode" titleSize="md">
            <p>
              Offline mode can be utilised to prevent requests to any of the services mentioned in
              this privacy policy.
            </p>
          </ContentSection>

          <section className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy here without notice at any time.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/download">Get Started with Mue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
