import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import { DocsShell } from '@/components/docs/docs-shell'
import { CodeBlockCopy } from '@/components/docs/code-block-copy'
import { DocsSearch } from '@/components/docs/search'
import { BlogProse } from '@/components/blog/blog-prose'
import { buttonVariants } from '@/components/ui/button'

import type { DocTreeNode } from '@/lib/docs'
import { getAllDocsMeta, getDocBySlug, getDocsTree } from '@/lib/docs'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/lib/constants/site'

export const Route = createFileRoute('/docs/$')({
  loader: async ({ params }) => {
    const slug = params._splat ? params._splat.split('/').filter(Boolean) : []
    const [doc, tree, docsMeta] = await Promise.all([
      getDocBySlug(slug),
      getDocsTree(),
      getAllDocsMeta(),
    ])
    return { doc, tree, docsMeta, slug }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { doc, tree, slug } = loaderData

    if (!doc) {
      const section = findNode(tree, slug)
      if (section) {
        const topicCount = section.children?.length ?? 0
        const description =
          topicCount > 0
            ? `Explore ${topicCount} ${topicCount === 1 ? 'topic' : 'topics'} in ${section.title}.`
            : `Learn about ${section.title} in the Mue documentation.`
        return {
          meta: [
            { title: `${section.title} | Mue Docs` },
            { name: 'description', content: description },
          ],
        }
      }
      return { meta: [{ title: 'Documentation | Mue' }] }
    }

    const description =
      doc.frontmatter.description ??
      `Learn about ${doc.frontmatter.title} in the Mue documentation.`
    return {
      meta: [
        { title: `${doc.frontmatter.title} | Mue Docs` },
        { name: 'description', content: description },
      ],
      links: [{ rel: 'canonical', href: `${SITE_URL}/docs/${slug.join('/')}` }],
    }
  },
  component: DocsArticlePage,
})

function flattenTree(tree: DocTreeNode[]): DocTreeNode[] {
  const nodes: DocTreeNode[] = []
  const walk = (items: DocTreeNode[]) => {
    items.forEach((item) => {
      nodes.push(item)
      if (item.children) walk(item.children)
    })
  }
  walk(tree)
  return nodes
}

function findNode(tree: DocTreeNode[], slug: string[]) {
  if (slug.length === 0) return null
  const flattened = flattenTree(tree)
  return flattened.find((node) => node.slug.join('/') === slug.join('/')) ?? null
}

function findTitle(tree: DocTreeNode[], slug: string[]) {
  return findNode(tree, slug)?.title
}

function computeReadingTime(markdown: string) {
  const words = markdown.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 180))
  return `${minutes} min read`
}

function DocsArticlePage() {
  const { doc, tree, docsMeta, slug } = Route.useLoaderData()

  const normalizedSlug = slug.filter(Boolean)
  const section = findNode(tree, normalizedSlug)

  if (!doc && section) {
    return <DocsSectionContent section={section} tree={tree} docsMeta={docsMeta} />
  }

  if (!doc) {
    throw notFound()
  }

  return <DocsArticleContent doc={doc} tree={tree} docsMeta={docsMeta} />
}

type LoadedDoc = NonNullable<Awaited<ReturnType<typeof getDocBySlug>>>

type DocsArticleContentProps = {
  doc: LoadedDoc
  tree: DocTreeNode[]
  docsMeta: Awaited<ReturnType<typeof getAllDocsMeta>>
}

function DocsArticleContent({ doc, tree, docsMeta }: DocsArticleContentProps) {
  const sortedMeta = [...docsMeta].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.slug.join('/').localeCompare(b.slug.join('/'))
  })

  const currentIndex = sortedMeta.findIndex((item) => item.slug.join('/') === doc.slug.join('/'))
  const previous = currentIndex > 0 ? sortedMeta[currentIndex - 1] : null
  const next = currentIndex < sortedMeta.length - 1 ? sortedMeta[currentIndex + 1] : null

  const breadcrumb = [
    { label: 'Documentation', href: '/docs' },
    ...doc.slug.slice(0, -1).map((_, index) => {
      const segments = doc.slug.slice(0, index + 1)
      return {
        label: findTitle(tree, segments) ?? segments[index],
        href: `/docs/${segments.join('/')}`,
      }
    }),
    { label: doc.frontmatter.title },
  ]

  return (
    <DocsShell
      toc={doc.toc}
      breadcrumb={breadcrumb}
      header={
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
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
      <CodeBlockCopy />
      <BlogProse html={doc.content} className="docs-prose" />

      <nav className="flex gap-3 border-t pt-6">
        {previous && (
          <Link
            to={previous.href as any}
            className="group flex flex-1 flex-col gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <ChevronLeft className="size-4" /> Previous
            </span>
            <span className="font-medium text-foreground group-hover:text-primary">
              {previous.title}
            </span>
          </Link>
        )}

        {next && (
          <Link
            to={next.href as any}
            className="group flex flex-1 flex-col items-end gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next <ChevronRight className="size-4" />
            </span>
            <span className="font-medium text-foreground group-hover:text-primary">
              {next.title}
            </span>
          </Link>
        )}
      </nav>

      <div className="rounded-2xl border bg-card/70 p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold">Missing something?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          If you can see an area that needs more detail, feel free to improve it!
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href="https://github.com/mue/docs"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-1')}
          >
            Contribute on GitHub
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </DocsShell>
  )
}

type DocsSectionContentProps = {
  section: DocTreeNode
  tree: DocTreeNode[]
  docsMeta: Awaited<ReturnType<typeof getAllDocsMeta>>
}

function DocsSectionContent({ section, tree, docsMeta }: DocsSectionContentProps) {
  const breadcrumb = [
    { label: 'Documentation', href: '/docs' },
    ...section.slug.slice(0, -1).map((_, index) => {
      const segments = section.slug.slice(0, index + 1)
      return {
        label: findTitle(tree, segments) ?? segments[index],
        href: `/docs/${segments.join('/')}`,
      }
    }),
    { label: section.title },
  ]

  const children = section.children ?? []
  const getMetaDescription = (slug: string[]) =>
    docsMeta.find((item) => item.slug.join('/') === slug.join('/'))?.description

  return (
    <DocsShell
      breadcrumb={breadcrumb}
      header={
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{section.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              {children.length > 0
                ? `Explore ${children.length} ${
                    children.length === 1 ? 'topic' : 'topics'
                  } inside ${section.title}.`
                : `${section.title} doesn't have published guides yet.`}
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
            See the sections and content available in this category.
          </p>
        </header>

        {children.length === 0 ? (
          <div className="rounded-2xl border bg-card/70 p-6 text-sm text-muted-foreground">
            We&apos;re still working on documentation for this area. Check back soon!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {children.map((child) => {
              const description = getMetaDescription(child.slug)
              const subtopics = child.children ?? []
              return (
                <Link
                  key={child.slug.join('/')}
                  to={child.href as any}
                  className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border bg-card/70 p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {child.title}
                        </h3>
                        {(description || !child.hasPage) && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {description ??
                              `Contains ${subtopics.length} ${
                                subtopics.length === 1 ? 'additional topic' : 'additional topics'
                              }.`}
                          </p>
                        )}
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

                  <div className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary group-hover:underline">
                    {child.hasPage ? 'Read guide' : 'Browse section'}
                    <ArrowRight className="size-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </DocsShell>
  )
}
