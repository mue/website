'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-24">
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.18),_transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.16),_transparent_70%)]" />

          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-12 rounded-3xl border border-border bg-background/80 px-6 py-16 text-center shadow-2xl backdrop-blur lg:px-16 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-destructive">
              <AlertTriangle className="h-3 w-3" />
              <span>Critical Error</span>
            </div>

            <div className="flex flex-col items-center gap-6 text-balance">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Application Error
              </h1>
              <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                A critical error occurred in the application. Please refresh the page to continue.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="w-full rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-left">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-destructive/80">
                  Development Error Details
                </p>
                <div className="space-y-2">
                  <pre className="overflow-x-auto text-xs text-muted-foreground">
                    {error.message}
                  </pre>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground">Digest: {error.digest}</p>
                  )}
                  {error.stack && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-xs font-medium text-foreground">
                        Stack trace
                      </summary>
                      <pre className="mt-2 overflow-x-auto text-xs text-muted-foreground">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Application
            </button>

            <div className="rounded-2xl border border-border bg-muted/30 p-6 text-left text-sm backdrop-blur">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                If the problem persists
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-[#FF5C25] to-[#FF456E]" />
                  <span>Clear your browser cache and cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-[#FF5C25] to-[#FF456E]" />
                  <span>Try using a different browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-1.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-[#FF5C25] to-[#FF456E]" />
                  <span>Report the issue on GitHub</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
