import type { Metadata } from 'next';
import Link from 'next/link';

import { Scale } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { ContentSection } from '@/components/shared/content-section';
import { BulletList } from '@/components/shared/bullet-list';

export const metadata: Metadata = {
  title: 'DMCA Policy',
  description: 'Digital Millennium Copyright Act (DMCA) policy and takedown procedures for Mue.',
  openGraph: {
    title: 'DMCA Policy | Mue',
    description: 'Digital Millennium Copyright Act (DMCA) policy and takedown procedures for Mue.',
  },
};

export default function DMCAPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <PageHeader icon={Scale} title="DMCA Policy" subtitle="Last Updated: October 1, 2025" />

        <div className="prose-custom space-y-8">
          <ContentSection title="Overview">
            <p>
              Mue respects the intellectual property rights of others and expects its users to do
              the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we
              will respond expeditiously to claims of copyright infringement committed using our
              service and/or website.
            </p>
          </ContentSection>

          <ContentSection title="Filing a DMCA Notice">
            <p>
              If you believe that your copyrighted work has been copied in a way that constitutes
              copyright infringement and is accessible via the Mue service, including our
              marketplace, please notify our copyright agent as set forth below.
            </p>
            <p className="mt-4 font-semibold">
              Your DMCA notice must include the following information:
            </p>
            <BulletList
              items={[
                'A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.',
                'Identification of the copyrighted work claimed to have been infringed.',
                'Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access disabled, and information reasonably sufficient to permit us to locate the material.',
                'Your contact information, including your address, telephone number, and an email address.',
                'A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.',
                'A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.',
              ]}
            />
          </ContentSection>

          <ContentSection title="How to Submit a Notice">
            <p>Please submit your DMCA notice to our designated copyright agent:</p>
            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-6">
              <p className="font-semibold">Email:</p>
              <a href="mailto:hello@muetab.com" className="text-primary hover:underline">
                hello@muetab.com
              </a>
              <p className="mt-4 font-semibold">Subject Line:</p>
              <p className="text-muted-foreground">DMCA Takedown Request</p>
            </div>
          </ContentSection>

          <ContentSection title="Counter-Notification">
            <p>
              If you believe that your content that was removed (or to which access was disabled) is
              not infringing, or that you have the authorization from the copyright owner, the
              copyright owner&apos;s agent, or pursuant to the law, to post and use the material,
              you may send a counter-notice containing the following information to our copyright
              agent:
            </p>
            <BulletList
              items={[
                'Your physical or electronic signature.',
                'Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled.',
                'A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content.',
                'Your name, address, telephone number, and email address.',
                'A statement that you consent to the jurisdiction of the federal court in your jurisdiction and that you will accept service of process from the person who provided notification of the alleged infringement.',
              ]}
            />
          </ContentSection>

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

          <section className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
            <p className="text-sm text-muted-foreground">
              We may update this DMCA policy here without notice at any time. Please note that this
              policy does not constitute legal advice.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button asChild>
            <Link href="/marketplace">Visit Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
