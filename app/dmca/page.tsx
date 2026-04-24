import type { Metadata } from 'next';
import Link from 'next/link';

import { Scale } from 'lucide-react';

import { ContentSection } from '@/components/shared/content-section';
import { BulletList } from '@/components/shared/bullet-list';

export const metadata: Metadata = {
  title: 'DMCA',
  description: 'Digital Millennium Copyright Act (DMCA) policy and takedown procedures for Mue.',
  openGraph: {
    title: 'DMCA | Mue',
    description: 'Digital Millennium Copyright Act (DMCA) policy and takedown procedures for Mue.',
  },
};

export default function DMCAPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.12)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
              <Scale className="h-6 w-6 text-[#FF5C25]" />
            </div>
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            DMCA Policy
          </h1>
          <p className="mx-auto mt-4 text-sm text-muted-foreground">
            Last updated: October 1, 2025
          </p>
        </header>

        <div className="space-y-10">
          <ContentSection title="Overview">
            <p>
              Mue respects the intellectual property rights of others and expects its users to do
              the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we
              will respond expeditiously to claims of copyright infringement committed using our
              service and/or website.
            </p>
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="Filing a DMCA Notice">
            <p>
              If you believe that your copyrighted work has been copied in a way that constitutes
              copyright infringement and is accessible via the Mue service, including our
              marketplace, please notify our copyright agent as set forth below.
            </p>
            <p className="mt-4 font-semibold text-foreground">
              Your DMCA notice must include:
            </p>
            <BulletList
              items={[
                'A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.',
                'Identification of the copyrighted work claimed to have been infringed.',
                'Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material.',
                'Your contact information, including your address, telephone number, and an email address.',
                'A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.',
                'A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.',
              ]}
            />
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="How to Submit">
            <p>Please submit your DMCA notice to our designated copyright agent:</p>
            <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</p>
              <a
                href="mailto:hello@muetab.com"
                className="mt-1 block font-mono text-foreground underline underline-offset-2"
              >
                hello@muetab.com
              </a>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Subject line</p>
              <p className="mt-1 font-mono text-sm text-foreground">DMCA Takedown Request</p>
            </div>
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="Counter-Notification">
            <p>
              If you believe that your content that was removed is not infringing, or that you have
              authorization from the copyright owner, you may send a counter-notice containing the
              following to our copyright agent:
            </p>
            <BulletList
              items={[
                'Your physical or electronic signature.',
                'Identification of the content that has been removed and the location at which it appeared before removal.',
                'A statement that you have a good faith belief that the content was removed as a result of mistake or misidentification.',
                'Your name, address, telephone number, and email address.',
                'A statement that you consent to the jurisdiction of the federal court in your jurisdiction.',
              ]}
            />
          </ContentSection>

          <div className="h-px bg-border" />

          <ContentSection title="Repeat Infringers">
            <p>
              Mue reserves the right to terminate user accounts or remove content from users who are
              repeat infringers of copyright.
            </p>
          </ContentSection>

          <ContentSection title="Marketplace Content">
            <p>
              All content submitted to the Mue marketplace must respect intellectual property
              rights. Users who submit photos, quotes, or other content must have the right to share
              such content. Content found to be infringing will be removed promptly upon receipt of
              a valid DMCA notice.
            </p>
          </ContentSection>

          <div className="h-px bg-border" />

          <div className="rounded-2xl border border-border bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">
              We may update this policy without notice at any time. This policy does not constitute
              legal advice. Questions?{' '}
              <Link href="/contact" className="text-foreground underline underline-offset-2">
                Get in touch.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
