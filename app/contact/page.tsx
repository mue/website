import type { Metadata } from 'next';
import Link from 'next/link';

import { Github, Mail, MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/page-header';
import { ContentSection } from '@/components/shared/content-section';
import { BulletList } from '@/components/shared/bullet-list';
import { ContactCard } from '@/components/contact/contact-card';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Mue team. Reach out for support, feedback, or inquiries.',
  openGraph: {
    title: 'Contact | Mue',
    description: 'Get in touch with the Mue team. Reach out for support, feedback, or inquiries.',
  },
};

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const contactMethods = [
  {
    href: 'https://discord.gg/zv8C9F8',
    icon: MessageSquare,
    title: 'Discord Community',
    description:
      'Join our Discord server for real-time support, discussions, and to connect with other Mue users.',
    external: true,
  },
  {
    href: 'https://github.com/mue/mue/issues',
    icon: Github,
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or browse existing issues on our GitHub repository.',
    external: true,
  },
  {
    href: 'mailto:hello@muetab.com',
    icon: Mail,
    title: 'Email',
    description:
      'Send us an email at hello@muetab.com for general inquiries or business-related questions.',
    external: false,
  },
  {
    href: 'https://twitter.com/getmue',
    icon: XIcon,
    title: 'Twitter/X',
    description: 'Follow us on Twitter for the latest updates, announcements, and news about Mue.',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <PageHeader icon={Mail} title="Contact Us" subtitle="We'd love to hear from you" />

        <div className="space-y-8">
          <ContentSection title="Get in Touch">
            <p>
              Whether you have a question, feedback, or need support, we&apos;re here to help.
              Choose the best way to reach us below.
            </p>
          </ContentSection>

          <div className="grid gap-6 md:grid-cols-2">
            {contactMethods.map((method) => (
              <ContactCard
                key={method.title}
                href={method.href}
                icon={method.icon}
                title={method.title}
                description={method.description}
                external={method.external}
              />
            ))}
          </div>

          <section className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
            <h3 className="text-xl font-semibold text-foreground">Before You Reach Out</h3>
            <BulletList
              items={[
                <>
                  Check our{' '}
                  <Link href="/docs" className="text-foreground underline">
                    documentation
                  </Link>{' '}
                  for answers to common questions.
                </>,
                <>
                  Search existing{' '}
                  <a
                    href="https://github.com/mue/mue/issues"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline"
                  >
                    GitHub issues
                  </a>{' '}
                  to see if your question has been addressed.
                </>,
                'For technical support, Discord is usually the fastest way to get help.',
              ]}
            />
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
