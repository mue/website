import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { DocsShell } from '@/components/docs/docs-shell';
import { getDocsNavigation } from '@/components/docs/layout-context';
import { DocsSearch } from '@/components/docs/search';
import { buttonVariants } from '@/components/ui/button';
import type { DocTreeNode } from '@/lib/docs';
import { getAllDocsMeta, getDocBySlug } from '@/lib/docs';
import { cn } from '@/lib/utils';

export const dynamic = 'force-static';
export const dynamicParams = false;

type DocPageParams = {
  slug?: string[];
};

type DocPageProps = {
  params: Promise<DocPageParams>;
};

export async function generateStaticParams() {
  const { docsMeta, tree } = await getDocsNavigation();

  const slugSet = new Set<string>();

  const addSlug = (segments: string[]) => {
    if (segments.length === 0) return;
    slugSet.add(segments.join('/'));
  };

  docsMeta.forEach((doc) => {
    addSlug(doc.slug);
  });

  const walk = (nodes: DocTreeNode[]) => {
    nodes.forEach((node) => {
      addSlug(node.slug);
      if (node.children) {
        walk(node.children);
      }
    });
  };

  walk(tree);

  return Array.from(slugSet.values()).map((slug) => ({
    slug: slug.split('/').filter(Boolean),
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) {
    const { tree } = await getDocsNavigation();
    const section = findNode(tree, slug.filter(Boolean));
    if (section) {
      const title = section.title;
      const topicCount = section.children?.length ?? 0;
      const description =
        topicCount > 0
          ? `Explore ${topicCount} ${topicCount === 1 ? 'topic' : 'topics'} in ${title}.`
          : `Learn about ${title} in the Mue documentation.`;
      return {
        title: `${title} | Mue Docs`,
        description,
      };
    }
    return {
      title: 'Documentation | Mue',
    };
  }

  const description =
    doc.frontmatter.description ?? `Learn about ${doc.frontmatter.title} in the Mue documentation.`;

  return {
    title: `${doc.frontmatter.title} | Mue Docs`,
    description,
  };
}

function flattenTree(tree: DocTreeNode[]): DocTreeNode[] {
  const nodes: DocTreeNode[] = [];
  const walk = (items: DocTreeNode[]) => {
    items.forEach((item) => {
      nodes.push(item);
      if (item.children) {
        walk(item.children);
      }
    });
  };
  walk(tree);
  return nodes;
}

function findNode(tree: DocTreeNode[], slug: string[]) {
  if (slug.length === 0) return null;
  const flattened = flattenTree(tree);
  return flattened.find((node) => node.slug.join('/') === slug.join('/')) ?? null;
}

function findTitle(tree: DocTreeNode[], slug: string[]) {
  return findNode(tree, slug)?.title;
}

function computeReadingTime(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min read`;
}

export default async function DocsArticlePage({ params }: DocPageProps) {
  const { slug = [] } = await params;
  const [doc, { tree, docsMeta }] = await Promise.all([getDocBySlug(slug), getDocsNavigation()]);

  const normalizedSlug = slug.filter(Boolean);
  const section = findNode(tree, normalizedSlug);

  if (!doc && section) {
    return <DocsSectionContent section={section} tree={tree} docsMeta={docsMeta} />;
  }

  if (!doc) {
    notFound();
  }

  return <DocsArticleContent doc={doc} tree={tree} docsMeta={docsMeta} />;
}

type LoadedDoc = NonNullable<Awaited<ReturnType<typeof getDocBySlug>>>;

type DocsArticleContentProps = {
  doc: LoadedDoc;
  tree: DocTreeNode[];
  docsMeta: Awaited<ReturnType<typeof getAllDocsMeta>>;
};

function DocsArticleContent({ doc, tree, docsMeta }: DocsArticleContentProps) {
  const sortedMeta = [...docsMeta].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.slug.join('/').localeCompare(b.slug.join('/'));
  });

  const currentIndex = sortedMeta.findIndex((item) => item.slug.join('/') === doc.slug.join('/'));
  const previous = currentIndex > 0 ? sortedMeta[currentIndex - 1] : null;
  const next = currentIndex < sortedMeta.length - 1 ? sortedMeta[currentIndex + 1] : null;

  const breadcrumb = [
    { label: 'Documentation', href: '/docs' },
    ...doc.slug.slice(0, -1).map((_, index) => {
      const segments = doc.slug.slice(0, index + 1);
      return {
        label: findTitle(tree, segments) ?? segments[index],
        href: `/docs/${segments.join('/')}`,
      };
    }),
    { label: doc.frontmatter.title },
  ];

  return (
    <DocsShell
      toc={doc.toc}
      breadcrumb={breadcrumb}
      header={
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            {/* <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {sectionTitle}
            </Badge> */}
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {doc.frontmatter.title}
            </h1>
            {doc.frontmatter.description && (
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                {doc.frontmatter.description}
              </p>
            )}
            <p className="text-xs uppercase tracking-widest text-muted-foreground/80">
              {computeReadingTime(doc.raw)}
            </p>
          </div>
          <div className="w-full max-w-sm md:hidden">
            <DocsSearch docs={docsMeta} />
          </div>
        </div>
      }
    >
      <article className="docs-prose" dangerouslySetInnerHTML={{ __html: doc.content }} />

      <nav className="grid gap-4 border-t pt-6 md:grid-cols-2">
        <div>
          {previous && (
            <Link
              href={previous.href}
              className="group flex flex-col gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <ChevronLeft className="size-4" /> Previous
              </span>
              <span className="font-medium text-foreground group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              href={next.href}
              className="group flex flex-col gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40 items-end"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Next <ChevronRight className="size-4" />
              </span>
              <span className="font-medium text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <div className="rounded-2xl border bg-card/70 p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold">Missing something?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Our docs live in the open. If you see a gap, jump in and improve them.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="https://github.com/mue/docs"
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-1')}
          >
            Contribute on GitHub
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </DocsShell>
  );
}

type DocsSectionContentProps = {
  section: DocTreeNode;
  tree: DocTreeNode[];
  docsMeta: Awaited<ReturnType<typeof getAllDocsMeta>>;
};

function DocsSectionContent({ section, tree, docsMeta }: DocsSectionContentProps) {
  const breadcrumb = [
    { label: 'Documentation', href: '/docs' },
    ...section.slug.slice(0, -1).map((_, index) => {
      const segments = section.slug.slice(0, index + 1);
      return {
        label: findTitle(tree, segments) ?? segments[index],
        href: `/docs/${segments.join('/')}`,
      };
    }),
    { label: section.title },
  ];

  const children = section.children ?? [];
  const getMetaDescription = (slug: string[]) =>
    docsMeta.find((item) => item.slug.join('/') === slug.join('/'))?.description;

  return (
    <DocsShell
      breadcrumb={breadcrumb}
      header={
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            {/* <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Section
            </Badge> */}
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{section.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              {children.length > 0
                ? `Explore ${children.length} ${
                    children.length === 1 ? 'topic' : 'topics'
                  } inside ${section.title}.`
                : `${section.title} doesn’t have published guides yet.`}
            </p>
          </div>
          <div className="w-full max-w-sm md:hidden">
            <DocsSearch docs={docsMeta} />
          </div>
        </div>
      }
    >
      <section className="space-y-6">
        <header className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Available guides</h2>
          <p className="text-sm text-muted-foreground">
            Jump straight into the content that lives within this section.
          </p>
        </header>

        {children.length === 0 ? (
          <div className="rounded-2xl border bg-card/70 p-6 text-sm text-muted-foreground">
            We’re still working on documentation for this area. Check back soon!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {children.map((child) => {
              const description = getMetaDescription(child.slug);
              const subtopics = child.children ?? [];
              return (
                <article
                  key={child.slug.join('/')}
                  className="flex h-full flex-col justify-between rounded-2xl border bg-card/70 p-6 shadow-sm transition hover:border-primary/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{child.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {description ??
                            (child.hasPage
                              ? 'Open the guide to learn more.'
                              : `Contains ${subtopics.length} ${
                                  subtopics.length === 1 ? 'additional topic' : 'additional topics'
                                }.`)}
                        </p>
                      </div>
                    </div>

                    {subtopics.length > 0 && (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {subtopics.slice(0, 3).map((item) => (
                          <li key={item.slug.join('/')}>{item.title}</li>
                        ))}
                        {subtopics.length > 3 && <li>+ {subtopics.length - 3} more</li>}
                      </ul>
                    )}
                  </div>

                  <Link
                    href={child.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {child.hasPage ? 'Read guide' : 'Browse section'}
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </DocsShell>
  );
}
