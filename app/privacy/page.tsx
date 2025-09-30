import type { Metadata } from 'next';
import Link from 'next/link';

import { Shield } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
            <Shield className="h-8 w-8 text-[#FF5C25]" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: September 8, 2024</p>
          </div>
        </div>

        <div className="prose-custom space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
            <p className="mt-4 text-muted-foreground">
              Mue shares no personal information with any third parties and all of your settings,
              backgrounds and other data are stored locally via localStorage. This data can be
              exported as JSON in advanced settings on Mue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">
              Widget API Requests
            </h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>No API request stores any identifiable information sent.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>All requests are sent securely with HTTPS.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>All features which make requests can be disabled in settings.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">Weather Widget</h3>
            <p className="mt-4 text-muted-foreground">
              The weather feature of Mue only stores your inputted location (or estimated when
              clicking on &apos;Auto&apos;) locally, and it is only sent in a request to get the
              current weather in your area. This request cannot be linked to you in any way and is
              sent through our opensource proxy server (proxy.muetab.com) to our weather provider
              (OpenWeatherMap).
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">
              Background Widget
            </h3>
            <p className="mt-4 text-muted-foreground">
              The photo map location feature of Mue will send a request with the information of the
              photo shown to Mapbox.
            </p>
            <p className="mt-4 text-muted-foreground">
              The background feature of Mue requests to our API in order to get a random image. The
              only information sent in this request is the background category and resolution. When
              Unsplash or Pexels are selected, this information is sent through our opensource proxy
              server to their API. Images are requested and loaded from Cloudinary, Unsplash and
              Pexels. Enabling the &apos;Use DuckDuckGo Proxy&apos; option in background settings on
              the main modal will load all images through the DuckDuckGo image proxy instead.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">Quote Widget</h3>
            <p className="mt-4 text-muted-foreground">
              The quote feature of Mue requests to our API (api.muetab.com) in order to get a random
              quote. Your set quote language is sent in this request to get a quote in your
              language.
            </p>
            <p className="mt-4 text-muted-foreground">
              When opening the about tab in settings, requests are sent to the GitHub API, our API
              and our opensource sponsors proxy in order to check for updates, get a list of
              contributors, sponsors and photographers on Mue.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">
              Quick Links Widget
            </h3>
            <p className="mt-4 text-muted-foreground">
              When Quick Links is enabled, favicons are obtained from the DuckDuckGo favicon API.
              The only information sent is the URL you specified and this cannot be linked to you.
              If you disable the &apos;Use DuckDuckGo Proxy&apos; setting in the Quick Links tab,
              the image is obtained through Google&apos;s favicon API instead.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">Marketplace</h3>
            <p className="mt-4 text-muted-foreground">
              The Marketplace tab requests to our API (marketplace.muetab.com) in order to get a
              list of products in a category as well as a specific one. No information apart from
              this is sent. Images on Marketplace and My Add-ons pages are loaded through the
              DuckDuckGo Image Proxy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground">Offline Mode</h3>
            <p className="mt-4 text-muted-foreground">
              Offline mode can be utilised to prevent requests to any of the services mentioned in
              this privacy policy.
            </p>
          </section>

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
