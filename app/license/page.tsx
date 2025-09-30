import Link from 'next/link';
import { ArrowLeft, Scale, Github } from 'lucide-react';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'License',
  description: 'Learn about the open source licenses used in Mue.',
  openGraph: {
    title: 'License | Mue',
    description: 'Learn about the open source licenses used in Mue.',
  },
};

export default function LicensePage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.25)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20">
            <Scale className="h-8 w-8 text-[#FF5C25]" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              License
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Open source and free to use</p>
          </div>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-background/60 p-8 backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">
                Extension & Website
              </h2>
              <span className="rounded-full border border-[#FF5C25]/40 bg-[#FF5C25]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF5C25]">
                BSD-3-Clause
              </span>
            </div>
            <p className="text-muted-foreground">
              The Mue Tab extension and this website are licensed under the{' '}
              <strong>BSD-3-Clause License</strong>. This means you are free to use, modify, and
              distribute the software, provided you include the original copyright notice and
              disclaimer.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-mono text-muted-foreground">
                Copyright (c) 2019-{new Date().getFullYear()} The Mue Authors
              </p>
              <p className="mt-2 text-sm font-mono text-muted-foreground">
                Copyright (c) 2018-2019 David Ralph
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/mue/mue/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Extension License
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/mue/website" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Website License
                </Link>
              </Button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-background/60 p-8 backdrop-blur">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">
                API & Marketplace
              </h2>
              <span className="rounded-full border border-[#0078D4]/40 bg-[#0078D4]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0078D4]">
                MIT
              </span>
            </div>
            <p className="text-muted-foreground">
              The Mue API and Marketplace are licensed under the{' '}
              <strong>MIT License</strong>. This is a permissive license that allows you to use,
              copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
              software.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">API</p>
                <p className="text-sm font-mono text-muted-foreground">
                  Copyright (c) 2019-{new Date().getFullYear()} The Mue Authors
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">Marketplace</p>
                <p className="text-sm font-mono text-muted-foreground">
                  Copyright (c) 2020-{new Date().getFullYear()} The Mue Authors
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="https://github.com/mue/api" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View API License
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/mue/marketplace" target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Marketplace License
                </Link>
              </Button>
            </div>
          </section>

          <section className="rounded-2xl border border-[#FF5C25]/20 bg-gradient-to-br from-[#FF5C25]/10 to-[#FF456E]/10 p-8 backdrop-blur">
            <h3 className="text-xl font-semibold text-foreground">Why Open Source?</h3>
            <p className="mt-4 text-muted-foreground">
              Mue is built by the community, for the community. We believe in transparency,
              collaboration, and empowering developers to create and contribute. All of our code is
              publicly available on GitHub, and we welcome contributions from everyone.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <h4 className="font-semibold text-foreground">Transparent</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every line of code is open for inspection and improvement.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-4">
                <h4 className="font-semibold text-foreground">Community-Driven</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Built with contributions from developers worldwide.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions about licensing?{' '}
              <Link
                href="https://github.com/mue/mue/discussions"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[#FF5C25] hover:underline"
              >
                Ask on GitHub Discussions
              </Link>
            </p>
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
