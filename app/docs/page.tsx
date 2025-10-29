import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRight, BookOpen, Layers3, PlugZap, FileEdit } from 'lucide-react';

import { DocsShell } from '@/components/docs/docs-shell';
import { getDocsNavigation } from '@/components/docs/layout-context';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour (ISR)

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Everything you need to install, extend, and contribute to the Mue ecosystem—from quickstart guides to deep-dive API references.',
  openGraph: {
    title: 'Documentation | Mue',
    description:
      'Everything you need to install, extend, and contribute to the Mue ecosystem—from quickstart guides to deep-dive API references.',
  },
};

const featureHighlights = [
  {
    title: 'Marketplace',
    description: 'Extend Mue with community-built photo, quote, and preset packs.',
    icon: Layers3,
    href: '/docs/marketplace/introduction',
  },
  {
    title: 'API',
    description: "Integrate Mue's curated content into your own projects via the REST API.",
    icon: PlugZap,
    href: '/docs/api/introduction',
  },
  {
    title: 'Translate',
    description: 'Help localise Mue for the world with our Weblate-powered workflow.',
    icon: BookOpen,
    href: '/docs/translations',
  },
];

export default async function DocsIndexPage() {
  const { tree } = await getDocsNavigation();
  return (
    <DocsShell
      breadcrumb={[{ label: 'Documentation' }]}
      header={
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_260px]">
          <div className="space-y-4">
            {/* <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
              New tab, new possibilities
            </Badge> */}
            <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Build, customise, and ship delightful Mue experiences.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Everything you need to install, extend, and contribute to the Mue ecosystem—from
              quickstart guides to deep-dive API references.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/docs/introduction" className={cn(buttonVariants({ size: 'lg' }))}>
                Start exploring
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://demo.muetab.com"
                className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
              >
                View live demo
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <section className="space-y-6">
        <header className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Pick a storyline</h2>
          <p className="text-sm text-muted-foreground">
            Dive into step-by-step guides designed for builders, translators, and integrators.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureHighlights.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative flex flex-col gap-4 rounded-2xl border bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <feature.icon className="size-8 text-primary transition group-hover:scale-110" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read more
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">All documentation</h2>
          <p className="text-sm text-muted-foreground">
            Browse every guide and reference, grouped by domain.
          </p>
        </header>

        <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
          {/* Render large cards first */}
          {tree
            .filter((section) => section.children && section.children.length > 0)
            .map((section) => (
              <article
                key={section.slug.join('/')}
                className="flex flex-col rounded-lg border bg-card/70 p-3 shadow-sm transition hover:border-primary/30 lg:rounded-2xl lg:p-6 lg:row-span-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold lg:text-lg">{section.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground lg:mt-1 lg:text-sm">
                      {section.children!.length} topic
                      {section.children!.length !== 1 && 's'}
                    </p>
                  </div>
                  <Link
                    href={section.href}
                    className="text-xs font-medium text-primary hover:underline lg:text-sm"
                  >
                    View all
                  </Link>
                </div>

                <ul className="mt-3 space-y-2 lg:mt-4 lg:space-y-3">
                  {section.children!.slice(0, 3).map((child) => (
                    <li key={child.slug.join('/')}>
                      <Link
                        href={child.href}
                        className="group flex items-center justify-between rounded-lg border border-dashed border-transparent px-2 py-1.5 text-sm transition hover:border-primary/30 hover:bg-primary/5 lg:px-3 lg:py-2"
                      >
                        <span className="font-medium text-foreground">{child.title}</span>
                        <ArrowRight className="size-3 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary lg:size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

          {/* Render small cards after */}
          {tree
            .filter((section) => !section.children || section.children.length === 0)
            .map((section) => (
              <Link
                key={section.slug.join('/')}
                href={section.href}
                className="group flex items-center justify-between gap-3 rounded-lg border bg-card/70 p-2.5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg lg:rounded-xl lg:p-4"
              >
                <div>
                  <h3 className="text-sm font-semibold lg:text-base">{section.title}</h3>
                  <p className="mt-0.5 text-[10px] text-muted-foreground lg:text-xs">View page</p>
                </div>
                <ArrowRight className="size-3.5 shrink-0 text-primary transition group-hover:translate-x-1 lg:size-4" />
              </Link>
            ))}

          {/* Contribute card - fills empty spot if needed */}
          <Link
            href="https://github.com/mue/mue/tree/main/docs"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-2.5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg lg:rounded-xl lg:p-4"
          >
            <div>
              <h3 className="text-sm font-semibold text-primary lg:text-base">
                Contribute to docs
              </h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground lg:text-xs">
                Help improve our documentation
              </p>
            </div>
            <FileEdit className="size-3.5 shrink-0 text-primary transition group-hover:scale-110 lg:size-4" />
          </Link>
        </div>
      </section>
    </DocsShell>
  );
}
