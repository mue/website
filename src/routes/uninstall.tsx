import { createFileRoute, Link } from '@tanstack/react-router';

import { ArrowRight, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/uninstall')({
  head: () => ({
    meta: [
      { title: 'Uninstall Survey | Mue' },
      { name: 'description', content: 'Help us improve Mue by sharing your feedback' },
    ],
  }),
  component: UninstallPage,
});

function UninstallPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.12)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Successfully Uninstalled
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          We&apos;re sorry to see you go. Please take a moment to share your feedback below so we
          can continue to improve Mue for everyone.
        </p>

        <div className="mt-12 w-full">
          <div className="mx-auto max-w-3xl lg:p-12 px-3 py-1 bg-[#B13854] rounded-xl">
            <iframe
              data-tally-src="https://tally.so/embed/nPpGd1?hideTitle=1&amp;dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="858"
              title="Thank you for using Mue."
              src="https://tally.so/embed/nPpGd1?hideTitle=1&amp;dynamicHeight=1&amp;originPage=%2Funinstall"
              scrolling="no"
            />
          </div>
        </div>

        <div className="mt-16 w-full max-w-2xl rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <div className="mb-1 flex justify-center">
            <RefreshCcw className="h-8 w-8 text-[#FF5C25]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Changed your mind?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mue is always improving. If you&apos;d like to give it another shot, you can reinstall
            it in seconds.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/download" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Reinstall Mue
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/blog">Read what&apos;s new</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
