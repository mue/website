'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCw, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-background px-6 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.18),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.16),_transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(255,92,37,0.32),_rgba(255,92,37,0)_65%)] blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-16 rounded-[3rem] border border-border bg-background/80 px-6 py-16 text-center shadow-[0_45px_120px_-45px_rgba(15,18,45,0.85)] backdrop-blur lg:px-20 lg:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-destructive">
          <AlertTriangle className="h-3 w-3" />
          <span>Error</span>
        </div>

        <div className="flex flex-col items-center gap-6 text-balance">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Something went wrong
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            We encountered an unexpected error while loading this page. Don&apos;t worry, your data
            is safe. Try refreshing or head back home.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="w-full max-w-2xl rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-destructive/80">
              Development Error Details
            </p>
            <pre className="overflow-x-auto text-xs text-muted-foreground">
              {error.message}
              {error.digest && (
                <>
                  {'\n'}
                  Digest: {error.digest}
                </>
              )}
            </pre>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Button size="lg" className="px-8" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button size="lg" variant="secondary" className="px-7" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>

        <div className="grid w-full gap-5 text-left sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground backdrop-blur">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-muted-foreground/70">
              What you can do
            </p>
            <ul className="mt-4 space-y-3">
              {[
                'Refresh the page to try again',
                'Clear your browser cache',
                'Check your internet connection',
                'Try again in a few moments',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-1.5 w-6 rounded-full bg-gradient-to-r from-[#FF5C25] via-[#D21A11] to-[#FF456E]" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-[#FF5C25]/20 via-transparent to-[#FF456E]/30 p-6 text-left text-foreground shadow-[0_25px_80px_-50px_rgba(12,12,40,0.85)]">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-foreground/75">
                Need assistance?
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                We&apos;re here to help
              </h2>
              <p className="mt-3 text-sm text-foreground/80">
                If this error persists, please report it on GitHub or reach out on Discord.
              </p>
            </div>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="https://github.com/mue/mue/issues" target="_blank" rel="noreferrer">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report issue
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
