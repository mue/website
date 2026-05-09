import { createFileRoute, Link } from '@tanstack/react-router';

import { Shield } from 'lucide-react';

import { ContentSection } from '@/components/shared/content-section';
import { BulletList } from '@/components/shared/bullet-list';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Mue' },
      {
        name: 'description',
        content: 'Learn how Mue handles your data and protects your privacy.',
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.12)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
              <Shield className="h-6 w-6 text-[#FF5C25]" />
            </div>
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 text-sm text-muted-foreground">
            Last updated: September 8, 2024
          </p>
        </header>

        <div className="space-y-10">
          <ContentSection title="Introduction">
            <p>
              Mue shares no personal information with any third parties and all of your settings,
              backgrounds and other data are stored locally via localStorage.
            </p>
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="Widget API Requests">
            <BulletList
              items={[
                'No API request stores any identifiable information sent.',
                'All requests are sent securely with HTTPS.',
                'All features which make requests can be disabled in settings.',
              ]}
            />
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="Weather Widget" titleSize="md">
            <p>
              The weather feature of Mue only stores your inputted location (or estimated when
              clicking on &apos;Auto&apos;) locally, and it is only sent in a request to get the
              current weather in your area through our opensource proxy server (proxy.muetab.com).
            </p>
          </ContentSection>

          <ContentSection title="Background Widget" titleSize="md">
            <p>
              The photo map location feature of Mue will send a request with the information of the
              photo shown to Mapbox. The background feature requests to our API for a random image —
              only the background category and resolution are sent.
            </p>
          </ContentSection>

          <ContentSection title="Quote Widget" titleSize="md">
            <p>
              The quote feature requests to our API (api.muetab.com) to get a random quote. Your set
              quote language is sent in this request.
            </p>
          </ContentSection>

          <ContentSection title="Quick Links Widget" titleSize="md">
            <p>
              When Quick Links is enabled, favicons are obtained from the DuckDuckGo favicon API.
              The only information sent is the URL you specified and this cannot be linked to you.
            </p>
          </ContentSection>

          <ContentSection title="Marketplace" titleSize="md">
            <p>
              The Marketplace tab requests to our API (marketplace.muetab.com) to get a list of
              products. No information apart from this is sent.
            </p>
          </ContentSection>

          <ContentSection title="Offline Mode" titleSize="md">
            <p>
              Offline mode can be utilised to prevent requests to any of the services mentioned in
              this privacy policy.
            </p>
          </ContentSection>

          <div className="h-px bg-border" />

          <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy without notice at any time. Questions?{' '}
              <Link
                to="/contact"
                className="text-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Get in touch.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
