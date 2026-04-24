import type { Metadata } from 'next';
import Link from 'next/link';

import { Mail, MessageSquare, Search } from 'lucide-react';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';

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
    description: 'Real-time support and community discussions with the Mue team.',
    badge: 'Fastest response',
    external: true,
  },
  {
    href: 'https://github.com/mue/mue/issues',
    icon: FaGithub,
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or browse what others have reported.',
    badge: 'Bugs & features',
    external: true,
  },
  {
    href: 'mailto:hello@muetab.com',
    icon: Mail,
    title: 'Email',
    description: 'General inquiries, partnerships, or security issues.',
    handle: 'hello@muetab.com',
    badge: 'General & security',
    external: false,
  },
  {
    href: 'https://x.com/getmue',
    icon: FaXTwitter,
    title: 'X (Twitter)',
    description: 'Follow us for updates, announcements, and news about Mue.',
    handle: '@getmue',
    badge: 'Stay updated',
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        {/* Hero */}
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get in Touch with Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Whether you have questions, feedback, or need support, we're here to help. Reach out through any of the channels below, and we'll get back to you as soon as possible.
          </p>
        </header>

        {/* Contact cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <ContactCard key={method.title} {...method} />
          ))}
        </div>

        {/* Self-help callout */}
        <div className="mt-6">
          <div className="rounded-2xl border border-border bg-muted/30 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Before reaching out</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    &rarr; Check the{' '}
                    <Link href="/docs" className="text-foreground underline underline-offset-2">
                      documentation
                    </Link>{' '}
                    for answers to common questions
                  </li>
                  <li>
                    &rarr; Search{' '}
                    <a
                      href="https://github.com/mue/mue/issues"
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground underline underline-offset-2"
                    >
                      GitHub Issues
                    </a>{' '}
                    to see if your problem has been reported
                  </li>
                  <li>&rarr; Our Discord community can usually help faster than email</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
