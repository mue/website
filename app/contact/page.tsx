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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Get in Touch with Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Whether you have questions, feedback, or need support, we're here to help. Reach out
            through any of the channels below, and we'll get back to you as soon as possible.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <ContactCard key={method.title} {...method} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/30 px-8 py-7">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Search className="h-4 w-4 text-muted-foreground" />
            Before reaching out
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-0">
            <p className="text-sm leading-relaxed text-muted-foreground sm:pr-8">
              Check the{' '}
              <Link href="/docs" className="text-foreground no-underline hover:underline underline-offset-2">
                documentation
              </Link>{' '}
              for answers to common questions.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:border-l sm:border-border sm:px-8">
              Search{' '}
              <a
                href="https://github.com/mue/mue/issues"
                target="_blank"
                rel="noreferrer"
                className="text-foreground no-underline hover:underline underline-offset-2"
              >
                GitHub Issues
              </a>{' '}
              to see if your problem has been reported.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:border-l sm:border-border sm:pl-8">
              Our Discord community can usually help faster than email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
