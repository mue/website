import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import type { Element, Root } from 'hast'

import { parseFrontmatter } from '@/lib/frontmatter'

const docsFiles = import.meta.glob('/content/docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export type TocItem = { id: string; title: string; depth: number }
export type DocFrontmatter = {
  title?: string
  slug?: string
  description?: string
  order?: number
  hidden?: boolean
}
export type LoadedDoc = {
  frontmatter: DocFrontmatter & { title: string }
  slug: string[]
  content: string
  toc: TocItem[]
  raw: string
}
export type DocMeta = {
  title: string
  slug: string[]
  href: string
  order: number
  description?: string
}
export type DocTreeNode = {
  title: string
  slug: string[]
  href: string
  order: number
  hasPage: boolean
  children?: DocTreeNode[]
}

type DocEntry = { frontmatter: DocFrontmatter; slug: string[]; filePath: string; raw: string }

function formatTitleFromSlug(slug: string) {
  const specialCases: Record<string, string> = { api: 'API' }
  return slug
    .split('-')
    .map(
      (token) =>
        specialCases[token.toLowerCase()] ?? token.charAt(0).toUpperCase() + token.slice(1),
    )
    .join(' ')
}

function buildDocEntries(): DocEntry[] {
  return Object.entries(docsFiles).map(([filePath, raw]) => {
    const { data } = parseFrontmatter<DocFrontmatter>(raw)
    const frontmatter = data
    // /content/docs/foo/bar.md -> ['foo', 'bar']
    const relative = filePath.replace(/^\/content\/docs\//, '').replace(/\.(md|mdx)$/i, '')
    const segments = relative.split('/')
    const explicitSlug = frontmatter.slug
      ? frontmatter.slug.replace(/^\/+|\/+$/g, '').split('/')
      : undefined
    return { frontmatter, slug: explicitSlug ?? segments, filePath, raw }
  })
}

function createProcessor(toc: TocItem[]) {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['no-underline', 'font-medium', 'text-inherit', 'hover:text-foreground'],
      },
    })
    .use(rehypeRaw)
    .use(() => (tree: Root) => {
      visit(tree, 'element', (node: Element) => {
        if (!node.tagName || !/^h[2-4]$/.test(node.tagName) || !node.properties?.id) return
        toc.push({
          id: String(node.properties.id),
          title: toString(node),
          depth: Number(node.tagName[1]),
        })
      })
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
}

export async function getDocsTree(): Promise<DocTreeNode[]> {
  const docs = buildDocEntries()
  const root: DocTreeNode[] = []

  const ensureBranch = (entry: DocEntry) => {
    let nodes = root
    entry.slug.forEach((segment, index) => {
      const slugPath = entry.slug.slice(0, index + 1)
      const slugKey = slugPath.join('/')
      const isLeaf = index === entry.slug.length - 1
      let node = nodes.find((n) => n.slug.join('/') === slugKey)
      if (!node) {
        node = {
          title: isLeaf
            ? (entry.frontmatter.title ?? formatTitleFromSlug(segment))
            : formatTitleFromSlug(segment),
          slug: slugPath,
          href: `/docs/${slugPath.join('/')}`,
          order: entry.frontmatter.order ?? 0,
          hasPage: isLeaf,
          children: isLeaf ? undefined : [],
        }
        nodes.push(node)
      } else if (isLeaf) {
        node.title = entry.frontmatter.title ?? node.title
        node.href = `/docs/${slugPath.join('/')}`
        node.order = entry.frontmatter.order ?? node.order
        node.hasPage = true
      }
      if (!isLeaf) {
        node.children = node.children ?? []
        nodes = node.children
      }
    })
  }

  docs.filter((e) => !e.frontmatter.hidden).forEach(ensureBranch)

  const sortNodes = (nodes: DocTreeNode[]) => {
    nodes.sort((a, b) => (a.order !== b.order ? a.order - b.order : a.title.localeCompare(b.title)))
    nodes.forEach((n) => {
      if (n.children) {
        sortNodes(n.children)
        if (n.children.length === 0) delete n.children
      }
    })
  }
  sortNodes(root)
  return root
}

export async function getDocBySlug(slugSegments: string[]): Promise<LoadedDoc | null> {
  const normalized = slugSegments.filter(Boolean)
  const entry = buildDocEntries().find((e) => e.slug.join('/') === normalized.join('/'))
  if (!entry) return null

  const { content, data } = parseFrontmatter<DocFrontmatter>(entry.raw)
  const frontmatter = data
  const toc: TocItem[] = []
  const html = await createProcessor(toc).process(content)
  const title = frontmatter.title ?? formatTitleFromSlug(normalized.at(-1) ?? 'Document')

  return {
    frontmatter: { ...frontmatter, title },
    slug: normalized,
    content: html.toString(),
    toc,
    raw: content,
  }
}

export async function getAllDocsMeta(): Promise<DocMeta[]> {
  return buildDocEntries()
    .filter((e) => !e.frontmatter.hidden)
    .map((e) => ({
      title: e.frontmatter.title ?? formatTitleFromSlug(e.slug.at(-1) ?? 'Document'),
      slug: e.slug,
      href: `/docs/${e.slug.join('/')}`,
      order: e.frontmatter.order ?? 0,
      description: e.frontmatter.description,
    }))
}
