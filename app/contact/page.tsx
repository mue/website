import type { Metadata } from 'next';
import Link from 'next/link';

import { Github, Mail, MessageSquare } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

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

const contactMethods = [
  {
    href: 'https://discord.gg/zv8C9F8',
    icon: MessageSquare,
    title: 'Discord Server',
    description:
      'Join our Discord server for support, community discussions and to connect with other Mue users.',
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
      'For general inquiries, partnerships or security issues, reach out to us via email at hello@muetab.com',
    external: false,
  },
  {
    href: 'https://twitter.com/getmue',
    icon: FaXTwitter,
    title: 'X (formerly Twitter)',
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
              Whether you have questions, feedback, or need support, our team is here to help. Reach
              out through any of the channels below, and we&apos;ll get back to you as soon as
              possible. 
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
            <h3 className="text-xl font-semibold text-foreground">Things not working?</h3>
            <BulletList
              items={[
                <>
                  Read our{' '}
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
                    GitHub Issues
                  </a>{' '}
                  to see if your problem has been addressed.
                </>,
                'If you need support, our Discord is usually the fastest way to get help.',
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
