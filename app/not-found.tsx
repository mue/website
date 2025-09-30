import Link from 'next/link';
import { ArrowLeft, Compass, LifeBuoy } from 'lucide-react';

import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-background px-6 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.18),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.16),_transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(255,92,37,0.32),_rgba(255,92,37,0)_65%)] blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-16 rounded-[3rem] border border-white/10 bg-background/80 px-6 py-16 text-center shadow-[0_45px_120px_-45px_rgba(15,18,45,0.85)] backdrop-blur lg:px-20 lg:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
          <span>404</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Page missing</span>
        </div>

        <div className="flex flex-col items-center gap-6 text-balance">
          <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Lost in the flow, but not gone for good.
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            The page you&apos;re looking for has either moved or hasn&apos;t been crafted yet.
            Let&apos;s guide you back to the parts of Mue that keep your browsing grounded.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Button size="lg" className="px-8" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return home
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="px-7" asChild>
            <Link href="/demo">
              <Compass className="mr-2 h-4 w-4" />
              Try Mue Demo
            </Link>
          </Button>
        </div>

        <div className="grid w-full gap-5 text-left sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-muted-foreground backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/70">
              Quick suggestions
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  label: "What's new in Mue",
                  href: '/blog',
                },
                {
                  label: 'Create for the marketplace',
                  href: '/docs/marketplace/create',
                },
                {
                  label: 'Need to uninstall?',
                  href: '/uninstall',
                },
              ].map((item) => (
                <li key={item.href} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-6 rounded-full bg-gradient-to-r from-[#FF5C25] via-[#D21A11] to-[#FF456E]" />
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground transition hover:text-[#FF5C25]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col justify-between rounded-3xl border border-white/12 bg-gradient-to-br from-[#FF5C25]/20 via-transparent to-[#FF456E]/30 p-6 text-left text-white shadow-[0_25px_80px_-50px_rgba(12,12,40,0.85)]">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-white/75">
                Still need help?
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                Our docs and community can point you forward.
              </h2>
              <p className="mt-3 text-sm text-white/80">
                Browse the FAQ, reach out on GitHub, or join the conversation.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-6 border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/20"
              asChild
            >
              <Link href="/docs/faq">
                <LifeBuoy className="mr-2 h-4 w-4" />
                Visit the help centre
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
