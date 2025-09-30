import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Github } from 'lucide-react';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Mue team. Reach out for support, feedback, or inquiries.',
  openGraph: {
    title: 'Contact | Mue',
    description: 'Get in touch with the Mue team. Reach out for support, feedback, or inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
            <Mail className="h-8 w-8 text-[#FF5C25]" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Contact Us
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">We&apos;d love to hear from you</p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
            <p className="mt-4 text-muted-foreground">
              Whether you have a question, feedback, or need support, we&apos;re here to help. Choose the
              best way to reach us below.
            </p>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="https://discord.gg/zv8C9F8"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 transition group-hover:scale-110">
                <MessageSquare className="h-6 w-6 text-[#FF5C25]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Discord Community
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Join our Discord server for real-time support, discussions, and to connect with
                  other Mue users.
                </p>
              </div>
            </a>

            <a
              href="https://github.com/mue/mue/issues"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 transition group-hover:scale-110">
                <Github className="h-6 w-6 text-[#FF5C25]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  GitHub Issues
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Report bugs, request features, or browse existing issues on our GitHub repository.
                </p>
              </div>
            </a>

            <a
              href="mailto:hello@muetab.com"
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 transition group-hover:scale-110">
                <Mail className="h-6 w-6 text-[#FF5C25]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send us an email at hello@muetab.com for general inquiries or business-related
                  questions.
                </p>
              </div>
            </a>

            <a
              href="https://twitter.com/getmue"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 transition hover:border-[#FF5C25]/40 hover:bg-background/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 transition group-hover:scale-110">
                <svg
                  className="h-6 w-6 text-[#FF5C25]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Twitter/X</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Follow us on Twitter for the latest updates, announcements, and news about Mue.
                </p>
              </div>
            </a>
          </div>

          <section className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
            <h3 className="text-xl font-semibold text-foreground">
              Before You Reach Out
            </h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>
                  Check our{' '}
                  <Link href="/docs" className="text-foreground underline">
                    documentation
                  </Link>{' '}
                  for answers to common questions.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>
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
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]" />
                <span>For technical support, Discord is usually the fastest way to get help.</span>
              </li>
            </ul>
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
