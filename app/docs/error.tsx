'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function DocsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Docs error:', error);
  }, [error]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/40 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-destructive">
          <AlertTriangle className="h-3 w-3" />
          <span>Documentation Error</span>
        </div>

        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Failed to load documentation
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          We couldn&apos;t load this documentation page. This might be a temporary issue.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-left">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-destructive/80">
              Error Details
            </p>
            <pre className="overflow-x-auto text-xs text-muted-foreground">{error.message}</pre>
          </div>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/docs">
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card/70 p-6 text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Alternative resources
          </p>
          <ul className="space-y-3">
            <li>
              <Link
                href="https://github.com/mue/mue"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                View documentation on GitHub
              </Link>
            </li>
            <li>
              <Link
                href="https://discord.gg/zv8C9F8"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Ask for help on Discord
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-primary hover:underline"
              >
                Contact support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
