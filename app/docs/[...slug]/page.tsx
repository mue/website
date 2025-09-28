import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { DocsShell } from "@/components/docs/docs-shell";
import { getDocsNavigation } from "@/components/docs/layout-context";
import { DocsSearch } from "@/components/docs/search";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { DocTreeNode } from "@/lib/docs";
import { getAllDocsMeta, getDocBySlug } from "@/lib/docs";
import { cn } from "@/lib/utils";

type DocPageParams = {
  slug?: string[];
};

type DocPageProps = {
  params: Promise<DocPageParams>;
};

export async function generateStaticParams() {
  const docs = await getAllDocsMeta();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) {
    return {
      title: "Documentation | Mue",
    };
  }

  const description =
    doc.frontmatter.description ??
    `Learn about ${doc.frontmatter.title} in the Mue documentation.`;

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

function findTitle(tree: DocTreeNode[], slug: string[]) {
  const flattened = flattenTree(tree);
  const match = flattened.find(
    (node) => node.slug.join("/") === slug.join("/")
  );
  return match?.title;
}

function computeReadingTime(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min read`;
}

export default async function DocsArticlePage({ params }: DocPageProps) {
  const { slug = [] } = await params;
  const [doc, { tree, docsMeta }] = await Promise.all([
    getDocBySlug(slug),
    getDocsNavigation(),
  ]);

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
    return a.slug.join("/").localeCompare(b.slug.join("/"));
  });

  const currentIndex = sortedMeta.findIndex(
    (item) => item.slug.join("/") === doc.slug.join("/")
  );
  const previous = currentIndex > 0 ? sortedMeta[currentIndex - 1] : null;
  const next =
    currentIndex < sortedMeta.length - 1 ? sortedMeta[currentIndex + 1] : null;

  const sectionTitle =
    findTitle(tree, doc.slug.slice(0, -1)) ?? "Documentation";

  const breadcrumb = [
    { label: "Documentation", href: "/docs" },
    ...doc.slug.slice(0, -1).map((_, index) => {
      const segments = doc.slug.slice(0, index + 1);
      return {
        label: findTitle(tree, segments) ?? segments[index],
        href: `/docs/${segments.join("/")}`,
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
            <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {sectionTitle}
            </Badge>
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
      <article
        className="docs-prose"
        dangerouslySetInnerHTML={{ __html: doc.content }}
      />

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
        <div className="ml-auto">
          {next && (
            <Link
              href={next.href}
              className="group flex flex-col gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
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
            className={cn(buttonVariants({ variant: "outline" }), "gap-1")}
          >
            Contribute on GitHub
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </DocsShell>
  );
}
