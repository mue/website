import { Link } from '@tanstack/react-router';

import { ArrowLeft, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="relative flex flex-col min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <p className="pointer-events-none select-none text-[30vw] font-semibold leading-none tracking-tighter text-foreground/[0.06] md:absolute md:inset-0 md:flex md:items-center md:justify-center md:text-[22vw]">
        500
      </p>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Something went wrong
        </h1>

        <p className="max-w-md text-pretty text-base text-muted-foreground">
          We will sort it! In the meantime, you can try refreshing the page to see if that helps.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-destructive/80">
              Dev error details
            </p>
            <pre className="overflow-x-auto text-xs text-muted-foreground">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            { label: "What's new", href: '/blog' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href as any}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
