# TanStack Start Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Mue website from Next.js App Router to a fresh TanStack Start project, reusing all framework-agnostic code, and deploy to Cloudflare Workers via Nitro's `cloudflare-module` preset.

**Architecture:** Fresh TanStack Start project scaffolded alongside the existing `website/` directory. The `lib/`, `components/`, and `content/` directories copy over with minimal changes (only `lib/blog.ts`, `lib/docs.ts`, `lib/embed-context.tsx`, and `components/theme-provider.tsx` need rewriting). All 50 routes are rebuilt as TanStack Router file-based routes.

**Tech Stack:** TanStack Start 1.x, TanStack Router, TanStack Query, Vite 5, Nitro (`cloudflare-module` preset), Tailwind v4, Radix UI, Wrangler

---

## File Map

**New files (created):**
- `app.config.ts` — TanStack Start + Nitro Cloudflare config
- `wrangler.toml` — Cloudflare Workers deployment config
- `app/routes/__root.tsx` — Root layout with ThemeProvider, EmbedProvider, Navbar, Footer
- `app/routes/index.tsx` — Homepage
- `app/routes/blog/index.tsx` — Blog listing
- `app/routes/blog/$slug.tsx` — Blog post
- `app/routes/blog/changelog.tsx` — Changelog
- `app/routes/blog/page.$page.tsx` — Blog pagination
- `app/routes/blog/tag.$tag.tsx` — Blog tag filter
- `app/routes/docs/index.tsx` — Docs landing
- `app/routes/docs/$.tsx` — Docs catch-all (splat)
- `app/routes/marketplace/index.tsx` — Marketplace listing
- `app/routes/marketplace/$category.$id.tsx` — Item detail
- `app/routes/marketplace/author.$author.tsx` — Author items
- `app/routes/marketplace/authors.tsx` — All authors
- `app/routes/marketplace/collection.$collection.tsx` — Collection detail
- `app/routes/marketplace/collections.tsx` — All collections
- `app/routes/marketplace/create.tsx` — Create wizard
- `app/routes/showcase.tsx`, `photography.tsx`, `download.tsx`, `demo.tsx`
- `app/routes/branding.tsx`, `contact.tsx`, `dmca.tsx`, `license.tsx`, `privacy.tsx`, `uninstall.tsx`
- `app/server/api/browser-versions.ts` — Server function
- `app/server/api/marketplace-download.ts` — Server function
- `app/server/api/marketplace-view.ts` — Server function
- `app/server/routes/sitemap.xml.ts` — Nitro sitemap route

**Modified from existing codebase:**
- `lib/blog.ts` — Replace `fs.readFile` with `import.meta.glob`
- `lib/docs.ts` — Replace recursive `fs.readdir` with `import.meta.glob`
- `lib/embed-context.tsx` — Replace `next/navigation` hooks with TanStack Router equivalents
- `components/theme-provider.tsx` — Replace `next-themes` with custom implementation
- `components/navbar.tsx` — Replace `next/link` and `usePathname`

---

## Task 1: Scaffold the TanStack Start project

**Files:**
- Create: `../tanstack/` (sibling to `website/`)
- Create: `../tanstack/app.config.ts`
- Create: `../tanstack/wrangler.toml`

- [ ] **Step 1: Scaffold the project**

Run from `f:\Code\Mue\new\`:
```bash
bun create tanstack@latest tanstack
```
Select: React, TanStack Start template, Bun as package manager. Accept all defaults.

- [ ] **Step 2: Verify dev server starts**

```bash
cd tanstack && bun dev
```
Expected: server starts at `http://localhost:3000`, default TanStack Start page loads.

- [ ] **Step 3: Configure Cloudflare preset**

Replace the contents of `app.config.ts`:
```ts
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'app',
  },
  vite: {
    plugins: [tsConfigPaths()],
  },
  server: {
    preset: 'cloudflare-module',
  },
})
```

- [ ] **Step 4: Create `wrangler.toml`**

```toml
name = "mue-website"
main = ".output/server/index.mjs"
compatibility_date = "2024-11-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".output/public"
```

- [ ] **Step 5: Run a production build to validate the Cloudflare preset**

```bash
bun run build
```
Expected: build succeeds, `.output/server/index.mjs` exists, `.output/public/` exists.

If build fails with Cloudflare preset errors, check the Nitro Cloudflare docs for updated config options — the preset name may differ between Nitro versions (`cloudflare-module` vs `cloudflare`).

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "feat: scaffold TanStack Start project with Cloudflare preset"
```

---

## Task 2: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install remark/rehype pipeline and content deps**

```bash
bun add gray-matter remark remark-gfm remark-rehype rehype-slug rehype-autolink-headings rehype-raw rehype-stringify hast-util-to-string unist-util-visit
```

- [ ] **Step 2: Install UI dependencies**

```bash
bun add @radix-ui/react-alert-dialog @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-navigation-menu @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip
bun add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
bun add canvas-confetti class-variance-authority clsx cmdk embla-carousel-autoplay embla-carousel-react lucide-react react-icons tailwind-merge webextension-store-meta zod
bun add @tanstack/react-query
```

- [ ] **Step 3: Install dev dependencies**

```bash
bun add -d @types/canvas-confetti tw-animate-css tailwindcss @tailwindcss/vite prettier eslint
```

- [ ] **Step 4: Install fontsource fonts (replaces `next/font/google`)**

```bash
bun add @fontsource/inter @fontsource/lexend-deca @fontsource/alfa-slab-one
```

- [ ] **Step 5: Configure TypeScript path aliases**

In `tsconfig.json`, add `paths` so `@/` resolves to the project root (same as current `website/`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json bun.lockb && git commit -m "chore: install dependencies for TanStack Start migration"
```

---

## Task 3: Copy framework-agnostic code

**Files:**
- Copy: `lib/constants/`, `lib/gradients.ts`, `lib/marketplace.ts`, `lib/showcase.ts`, `lib/use-favorites.ts`, `lib/utils.ts`, `lib/content-templates.ts`, `lib/content-validator.ts`, `lib/favorites-context.tsx`
- Copy: entire `components/` tree
- Copy: entire `content/` directory
- Copy: entire `public/` directory
- Copy: `app/globals.css` → `app/globals.css`

- [ ] **Step 1: Copy lib utilities (excluding files that need rewriting)**

From the `website/` directory, copy these to the new `tanstack/` project preserving directory structure:
- `lib/constants/` (entire directory)
- `lib/gradients.ts`
- `lib/marketplace.ts`
- `lib/showcase.ts`
- `lib/utils.ts`
- `lib/content-templates.ts`
- `lib/content-validator.ts`
- `lib/favorites-context.tsx`
- `lib/hooks/use-image-validation.ts`

Do NOT copy `lib/blog.ts`, `lib/docs.ts`, or `lib/embed-context.tsx` — these are rewritten in later tasks.

- [ ] **Step 2: Copy components**

Copy the entire `components/` tree from `website/` to `tanstack/`. This includes:
- `components/ui/` (all shadcn components)
- `components/marketplace/` (all marketplace components including `create/`)
- `components/blog/`, `components/docs/`, `components/home/`, etc.
- `components/footer.tsx`, `components/logo.tsx`, `components/json-ld.tsx`
- `components/scroll-to-top.tsx`

Do NOT copy `components/theme-provider.tsx` or `components/navbar.tsx` — these are rewritten in later tasks.

- [ ] **Step 3: Copy content and public**

```bash
cp -r ../website/content ./content
cp -r ../website/public ./public
```

- [ ] **Step 4: Copy and configure global styles**

Copy `website/app/globals.css` to `tanstack/app/globals.css`.

The `@theme inline` block in globals.css references `--font-lexend-deca`, `--font-alfa-slab-one` etc. These CSS variables are set by the font imports added in Task 9 — no changes needed to globals.css itself.

- [ ] **Step 5: Verify TypeScript compiles**

```bash
bun run typecheck
```
Expected: errors only in files that import from `next/*` (expected — those are fixed in later tasks). Zero errors in `lib/marketplace.ts`, `lib/utils.ts`, `components/ui/*`.

- [ ] **Step 6: Commit**

```bash
git add lib/ components/ content/ public/ app/globals.css && git commit -m "chore: copy framework-agnostic code from Next.js project"
```

---

## Task 4: Rewrite blog content pipeline

**Files:**
- Create: `lib/blog.ts`

- [ ] **Step 1: Write `lib/blog.ts` using `import.meta.glob`**

```ts
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const blogFiles = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export type BlogFrontmatter = {
  title: string
  date: string
  author?: string
  description?: string
  image?: string
  tags?: string[]
  dateModified?: string
  imagePlaceholder?: string
}

export type BlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: string
  excerpt?: string
  readingTime?: string
  wordCount?: number
}

export type BlogPostPreview = {
  slug: string
  frontmatter: BlogFrontmatter
  excerpt?: string
  readingTime?: string
  wordCount?: number
}

function createProcessor() {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['no-underline'] },
    })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
}

export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  const posts: BlogPostPreview[] = []

  for (const [filePath, raw] of Object.entries(blogFiles)) {
    const fileName = filePath.split('/').pop()!
    const { data, content } = matter(raw)
    const frontmatter = data as BlogFrontmatter
    const slug = fileName.replace(/\.(mdx|md)$/i, '')
    const excerpt =
      frontmatter.description ||
      content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200)
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const readingTime = `${Math.max(1, Math.round(wordCount / 180))} min read`
    posts.push({ slug, frontmatter, excerpt, wordCount, readingTime })
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entry = Object.entries(blogFiles).find(
    ([path]) => path.endsWith(`/${slug}.md`) || path.endsWith(`/${slug}.mdx`),
  )
  if (!entry) return null

  const [, raw] = entry
  const { content, data } = matter(raw)
  const frontmatter = data as BlogFrontmatter
  const html = await createProcessor().process(content)
  const excerpt =
    frontmatter.description ||
    content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200)
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const readingTime = `${Math.max(1, Math.round(wordCount / 180))} min read`

  return {
    slug,
    frontmatter,
    content: html.toString(),
    excerpt,
    wordCount,
    readingTime,
  }
}
```

- [ ] **Step 2: Verify typecheck passes for blog.ts**

```bash
bun run typecheck 2>&1 | grep "lib/blog"
```
Expected: no errors for `lib/blog.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/blog.ts && git commit -m "feat: rewrite blog content pipeline with import.meta.glob"
```

---

## Task 5: Rewrite docs content pipeline

**Files:**
- Create: `lib/docs.ts`

- [ ] **Step 1: Write `lib/docs.ts` using `import.meta.glob`**

```ts
import matter from 'gray-matter'
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
    .map((token) => specialCases[token.toLowerCase()] ?? token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
}

function buildDocEntries(): DocEntry[] {
  return Object.entries(docsFiles).map(([filePath, raw]) => {
    const { data } = matter(raw)
    const frontmatter = data as DocFrontmatter
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
        toc.push({ id: String(node.properties.id), title: toString(node), depth: Number(node.tagName[1]) })
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
    nodes.sort((a, b) => a.order !== b.order ? a.order - b.order : a.title.localeCompare(b.title))
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

  const { content, data } = matter(entry.raw)
  const frontmatter = data as DocFrontmatter
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
```

- [ ] **Step 2: Verify typecheck**

```bash
bun run typecheck 2>&1 | grep "lib/docs"
```
Expected: no errors for `lib/docs.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/docs.ts && git commit -m "feat: rewrite docs content pipeline with import.meta.glob"
```

---

## Task 6: Custom ThemeProvider

**Files:**
- Create: `components/theme-provider.tsx`

The existing `components/theme-provider.tsx` wraps `next-themes`. The new version uses a context + `localStorage` + `.dark` class on `<html>`. It must support the `embed-theme-change` custom event that `EmbedProvider` dispatches.

- [ ] **Step 1: Write the new `components/theme-provider.tsx`**

```tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(resolved: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const initial = stored ?? 'system'
    setThemeState(initial)
    const resolved = initial === 'system' ? getSystemTheme() : initial
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        const resolved = getSystemTheme()
        setResolvedTheme(resolved)
        applyTheme(resolved)
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  useEffect(() => {
    const handler = (e: Event) => {
      const { theme: newTheme } = (e as CustomEvent<{ theme: Theme }>).detail
      setTheme(newTheme)
    }
    window.addEventListener('embed-theme-change', handler)
    return () => window.removeEventListener('embed-theme-change', handler)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
```

- [ ] **Step 2: Update `components/theme-toggle.tsx` to use `useTheme` from this file**

Open `components/theme-toggle.tsx`. Change the import from:
```ts
import { useTheme } from 'next-themes'
```
to:
```ts
import { useTheme } from '@/components/theme-provider'
```

- [ ] **Step 3: Verify typecheck**

```bash
bun run typecheck 2>&1 | grep -E "(theme-provider|theme-toggle)"
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/theme-provider.tsx components/theme-toggle.tsx
git commit -m "feat: replace next-themes with custom ThemeProvider"
```

---

## Task 7: Update EmbedProvider navigation hooks

**Files:**
- Create: `lib/embed-context.tsx`

Replace `useSearchParams`, `usePathname`, `useRouter` from `next/navigation` with TanStack Router equivalents.

- [ ] **Step 1: Write the updated `lib/embed-context.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import { useNavigate, useLocation, useSearch } from '@tanstack/react-router'
import { ScrollToTop } from '@/components/scroll-to-top'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

type EmbedContextType = {
  isEmbed: boolean
  isPreview: boolean
  sendMessage: (type: string, payload: unknown) => void
  config: EmbedConfig
  buildEmbedUrl: (path: string, hasExistingParams?: boolean) => string
}

type EmbedConfig = {
  theme?: 'light' | 'dark' | 'system'
  filters?: { type?: string; collection?: string }
  viewMode?: 'grid' | 'list'
}

const EmbedContext = createContext<EmbedContextType | undefined>(undefined)

export function EmbedProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const search = useSearch({ strict: false }) as Record<string, string>

  const isEmbed = search?.embed === 'true'
  const isPreview = search?.preview === 'true'
  const themeParam = (search?.theme ?? null) as 'light' | 'dark' | 'system' | null
  const [config, setConfig] = useState<EmbedConfig>({})
  const previousPathRef = useRef(pathname)

  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path
    const separator = hasExistingParams ? '&' : '?'
    const params: string[] = ['embed=true']
    if (isPreview) params.push('preview=true')
    if (themeParam) params.push(`theme=${themeParam}`)
    return `${path}${separator}${params.join('&')}`
  }

  const sendMessage = (type: string, payload: unknown) => {
    if (isEmbed && typeof window !== 'undefined') {
      window.parent.postMessage({ type, payload }, '*')
    }
  }

  useEffect(() => {
    if (isEmbed && themeParam) {
      window.dispatchEvent(new CustomEvent('embed-theme-change', { detail: { theme: themeParam } }))
    }
  }, [isEmbed, themeParam])

  useEffect(() => {
    if (isEmbed) window.parent.postMessage({ type: 'marketplace:ready', payload: null }, '*')
  }, [isEmbed])

  useEffect(() => {
    if (!isEmbed) return
    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data
      if (type === 'marketplace:config') {
        setConfig(payload)
        if (payload.theme) {
          window.dispatchEvent(new CustomEvent('embed-theme-change', { detail: { theme: payload.theme } }))
        }
      } else if (type === 'marketplace:navigate' && payload?.path) {
        const params = new URLSearchParams({ embed: 'true' })
        if (isPreview) params.set('preview', 'true')
        if (themeParam) params.set('theme', themeParam)
        navigate({ to: `${payload.path}?${params.toString()}` })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [isEmbed, navigate, isPreview, themeParam])

  useEffect(() => {
    if (isEmbed && pathname !== previousPathRef.current) {
      const searchStr = new URLSearchParams(search as Record<string, string>).toString()
      sendMessage('marketplace:navigation', {
        path: pathname,
        fullPath: searchStr ? `${pathname}?${searchStr}` : pathname,
        search: searchStr,
      })
      previousPathRef.current = pathname
    }
  }, [pathname, search, isEmbed])

  return (
    <EmbedContext.Provider value={{ isEmbed, isPreview, sendMessage, config, buildEmbedUrl }}>
      {children}
    </EmbedContext.Provider>
  )
}

export function useEmbed() {
  const ctx = useContext(EmbedContext)
  if (!ctx) throw new Error('useEmbed must be used within EmbedProvider')
  return ctx
}

export function EmbedLayoutWrapper({ children }: { children: ReactNode }) {
  const { isEmbed } = useEmbed()
  if (isEmbed) return <main className="flex-1">{children}</main>
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50">
          <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-12">
            <Navbar />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
bun run typecheck 2>&1 | grep "embed-context"
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/embed-context.tsx && git commit -m "feat: update EmbedProvider to use TanStack Router hooks"
```

---

## Task 8: Update Navbar

**Files:**
- Modify: `components/navbar.tsx`

Replace `next/link` with `Link` from `@tanstack/react-router`, `usePathname` with `useLocation`.

- [ ] **Step 1: Update imports at the top of `components/navbar.tsx`**

Replace:
```ts
import Link from 'next/link'
import { usePathname } from 'next/navigation'
```
with:
```ts
import { Link, useLocation } from '@tanstack/react-router'
```

- [ ] **Step 2: Update `usePathname()` call**

Replace:
```ts
const pathname = usePathname()
```
with:
```ts
const { pathname } = useLocation()
```

No other changes needed — all other `Link` and `pathname` usages stay identical.

- [ ] **Step 3: Verify typecheck**

```bash
bun run typecheck 2>&1 | grep "navbar"
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/navbar.tsx && git commit -m "feat: update Navbar to use TanStack Router navigation"
```

---

## Task 9: Root layout

**Files:**
- Create: `app/routes/__root.tsx`
- Modify: `app/globals.css` (add font imports)

- [ ] **Step 1: Add font imports to `app/globals.css`**

At the very top of `app/globals.css`, before any other imports:
```css
@import '@fontsource/lexend-deca/index.css';
@import '@fontsource/inter/index.css';
@import '@fontsource/alfa-slab-one/index.css';
```

Add CSS variable declarations after the imports:
```css
:root {
  --font-lexend-deca: 'Lexend Deca', sans-serif;
  --font-inter: 'Inter', sans-serif;
  --font-alfa-slab-one: 'Alfa Slab One', serif;
}
```

- [ ] **Step 2: Write `app/routes/__root.tsx`**

```tsx
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { EmbedProvider, EmbedLayoutWrapper } from '@/lib/embed-context'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/constants/site'

import '@/app/globals.css'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mue - Modifiable. User-centric. Experience.' },
      {
        name: 'description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { name: 'theme-color', content: '#ff5c25' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:title', content: 'Mue - Modifiable. User-centric. Experience.' },
      {
        property: 'og:description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { property: 'og:site_name', content: 'Mue' },
      { property: 'og:image', content: '/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Mue - Modifiable. User-centric. Experience.' },
      {
        name: 'twitter:description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { name: 'twitter:image', content: '/og-image.png' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Suspense fallback={null}>
              <EmbedProvider>
                <EmbedLayoutWrapper>
                  <Outlet />
                </EmbedLayoutWrapper>
              </EmbedProvider>
            </Suspense>
          </ThemeProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"9afb1f4a6f99424590b9f96620879e2a"}'
        />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify the dev server renders the root layout**

```bash
bun dev
```
Open `http://localhost:3000`. Expected: page loads without console errors, correct fonts applied.

- [ ] **Step 4: Commit**

```bash
git add app/routes/__root.tsx app/globals.css
git commit -m "feat: add root layout with ThemeProvider, QueryClient, EmbedProvider"
```

---

## Task 10: Homepage

**Files:**
- Create: `app/routes/index.tsx`

Port `website/app/page.tsx`. Replace `next/image` with `<img>`, `next/link` with TanStack Router `Link` (use `to=` for internal paths, `<a href=>` for external).

- [ ] **Step 1: Create `app/routes/index.tsx`**

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight, Rocket, Users, Star, GitFork, UserCheck,
  LayoutDashboard, CalendarDays, type LucideIcon,
} from 'lucide-react'
import { FaChrome, FaFirefoxBrowser, FaEdge, FaGithub } from 'react-icons/fa'
import { SiNaver } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import { FeatureCard } from '@/components/home/feature-card'
import { CommunityStatCard } from '@/components/home/community-stat-card'
import { BrowserBadge } from '@/components/home/browser-badge'
import { StatItem } from '@/components/home/stat-item'
import { SoftwareApplicationJsonLd } from '@/components/json-ld'
import { BROWSER_STORE_URLS } from '@/lib/constants/browser-links'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'Mue - Modifiable. User-centric. Experience.' }],
  }),
  component: HomePage,
})

function HomePage() {
  // Paste the full JSX body from website/app/page.tsx's default export.
  // - Replace every <Image ... /> with <img ... /> (keep src, alt, width, height, className)
  // - Replace internal <Link href="/path"> with <Link to="/path">
  // - Replace external <Link href="https://..."> with <a href="https://..." target="_blank" rel="noreferrer">
  return <>{/* paste here */}</>
}
```

- [ ] **Step 2: Verify homepage renders**

```bash
bun dev
```
Navigate to `http://localhost:3000`. Expected: homepage renders with correct content, fonts, and layout.

- [ ] **Step 3: Commit**

```bash
git add app/routes/index.tsx && git commit -m "feat: port homepage route"
```

---

## Task 11: Static pages

**Files:**
- Create: `app/routes/branding.tsx`
- Create: `app/routes/contact.tsx`
- Create: `app/routes/privacy.tsx`
- Create: `app/routes/license.tsx`
- Create: `app/routes/dmca.tsx`
- Create: `app/routes/uninstall.tsx`

For each page, use this pattern:

```tsx
import { createFileRoute } from '@tanstack/react-router'
// same imports as website/app/<page>/page.tsx, replacing next/link with @tanstack/react-router

export const Route = createFileRoute('/<path>')({
  head: () => ({
    meta: [
      { title: '<PageTitle> | Mue' },
      { name: 'description', content: '<description>' },
    ],
  }),
  component: PageComponent,
})

function PageComponent() {
  // Paste JSX from website/app/<page>/page.tsx
  // Replace internal next/link <Link href=...> with <Link to=...>
  return <>{/* ... */}</>
}
```

- [ ] **Step 1: Create all 6 static page routes**

Source → destination and metadata:
- `website/app/branding/page.tsx` → `app/routes/branding.tsx` (title: "Branding | Mue")
- `website/app/contact/page.tsx` → `app/routes/contact.tsx` (title: "Contact | Mue")
- `website/app/privacy/page.tsx` → `app/routes/privacy.tsx` (title: "Privacy Policy | Mue")
- `website/app/license/page.tsx` → `app/routes/license.tsx` (title: "License | Mue")
- `website/app/dmca/page.tsx` → `app/routes/dmca.tsx` (title: "DMCA | Mue")
- `website/app/uninstall/page.tsx` → `app/routes/uninstall.tsx` (title: "Uninstall | Mue")

- [ ] **Step 2: Verify all routes typecheck**

```bash
bun run typecheck
```
Expected: no errors in the six new route files.

- [ ] **Step 3: Commit**

```bash
git add app/routes/branding.tsx app/routes/contact.tsx app/routes/privacy.tsx \
        app/routes/license.tsx app/routes/dmca.tsx app/routes/uninstall.tsx
git commit -m "feat: port static pages (branding, contact, privacy, license, dmca, uninstall)"
```

---

## Task 12: Blog routes

**Files:**
- Create: `app/routes/blog/index.tsx`
- Create: `app/routes/blog/$slug.tsx`
- Create: `app/routes/blog/changelog.tsx`
- Create: `app/routes/blog/page.$page.tsx`
- Create: `app/routes/blog/tag.$tag.tsx`

- [ ] **Step 1: Create `app/routes/blog/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getAllBlogPosts } from '@/lib/blog'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllBlogPosts(),
  head: () => ({
    meta: [
      { title: 'Blog | Mue' },
      { name: 'description', content: 'News, updates, and articles from the Mue team.' },
    ],
  }),
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const posts = Route.useLoaderData()
  // Paste JSX from website/app/blog/page.tsx, replacing next/link with Link to=
  return <>{/* ... */}</>
}
```

- [ ] **Step 2: Create `app/routes/blog/$slug.tsx`**

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getBlogPostBySlug } from '@/lib/blog'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData: post }) => ({
    meta: [
      { title: `${post.frontmatter.title} | Mue Blog` },
      { name: 'description', content: post.frontmatter.description ?? post.excerpt },
      { property: 'og:title', content: `${post.frontmatter.title} | Mue Blog` },
      { property: 'og:description', content: post.frontmatter.description ?? post.excerpt },
    ],
  }),
  component: BlogPostPage,
})

function BlogPostPage() {
  const post = Route.useLoaderData()
  // Paste JSX from website/app/blog/[slug]/page.tsx.
  // The blog HTML content (post.content) is generated by the remark/rehype pipeline
  // from trusted static markdown files — rendering it is safe.
  return <>{/* ... */}</>
}
```

- [ ] **Step 3: Create `app/routes/blog/page.$page.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getAllBlogPosts } from '@/lib/blog'

const POSTS_PER_PAGE = 9

export const Route = createFileRoute('/blog/page/$page')({
  loader: async ({ params }) => {
    const page = parseInt(params.page, 10)
    const all = await getAllBlogPosts()
    const total = Math.ceil(all.length / POSTS_PER_PAGE)
    const posts = all.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
    return { posts, page, total }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Blog — Page ${loaderData.page} | Mue` }],
  }),
  component: BlogPaginationPage,
})

function BlogPaginationPage() {
  const { posts, page, total } = Route.useLoaderData()
  // Paste JSX from website/app/blog/page/[page]/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 4: Create `app/routes/blog/tag.$tag.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getAllBlogPosts } from '@/lib/blog'

export const Route = createFileRoute('/blog/tag/$tag')({
  loader: async ({ params }) => {
    const all = await getAllBlogPosts()
    return all.filter((p) => p.frontmatter.tags?.includes(params.tag))
  },
  head: ({ params }) => ({
    meta: [{ title: `Posts tagged "${params.tag}" | Mue Blog` }],
  }),
  component: BlogTagPage,
})

function BlogTagPage() {
  const posts = Route.useLoaderData()
  // Paste JSX from website/app/blog/tag/[tag]/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 5: Create `app/routes/blog/changelog.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getAllBlogPosts } from '@/lib/blog'

export const Route = createFileRoute('/blog/changelog')({
  loader: () => getAllBlogPosts(),
  head: () => ({ meta: [{ title: 'Changelog | Mue Blog' }] }),
  component: ChangelogPage,
})

function ChangelogPage() {
  const posts = Route.useLoaderData()
  // Paste JSX from website/app/blog/changelog/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 6: Verify blog routes typecheck and render**

```bash
bun run typecheck && bun dev
```
Navigate to `/blog` and `/blog/[slug]` for a known post. Expected: posts render correctly.

- [ ] **Step 7: Commit**

```bash
git add app/routes/blog/ && git commit -m "feat: port blog routes"
```

---

## Task 13: Docs routes

**Files:**
- Create: `app/routes/docs/index.tsx`
- Create: `app/routes/docs/$.tsx`

- [ ] **Step 1: Create `app/routes/docs/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getDocsTree } from '@/lib/docs'

export const Route = createFileRoute('/docs/')({
  loader: () => getDocsTree(),
  head: () => ({
    meta: [
      { title: 'Documentation | Mue' },
      { name: 'description', content: 'Guides and references for the Mue ecosystem.' },
    ],
  }),
  component: DocsIndexPage,
})

function DocsIndexPage() {
  const tree = Route.useLoaderData()
  // Paste JSX from website/app/docs/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 2: Create `app/routes/docs/$.tsx`**

In TanStack Router, `$.tsx` is a splat route. Matched path segments are available as `params._splat`.

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getDocBySlug, getDocsTree } from '@/lib/docs'
import { DocsShell } from '@/components/docs/docs-shell'

export const Route = createFileRoute('/docs/$')({
  loader: async ({ params }) => {
    const slugSegments = (params._splat ?? '').split('/').filter(Boolean)
    const [doc, tree] = await Promise.all([getDocBySlug(slugSegments), getDocsTree()])
    if (!doc) throw notFound()
    return { doc, tree }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.doc.frontmatter.title} | Mue Docs` },
      { name: 'description', content: loaderData.doc.frontmatter.description },
    ],
  }),
  component: DocPage,
})

function DocPage() {
  const { doc, tree } = Route.useLoaderData()
  // doc.content is HTML generated by the remark/rehype pipeline from trusted static
  // markdown files — safe to render. Paste the full shell JSX from
  // website/app/docs/[...slug]/page.tsx, replacing DocsShell props as needed.
  return (
    <DocsShell tree={tree} toc={doc.toc}>
      <article className="prose prose-neutral dark:prose-invert max-w-none"
        ref={(el) => { if (el) el.innerHTML = doc.content }}
      />
    </DocsShell>
  )
}
```

Note: using `ref` with `innerHTML` instead of `dangerouslySetInnerHTML` achieves the same result. Alternatively, use a sanitizing wrapper component. The content source is the trusted `content/docs/` directory compiled at build time.

- [ ] **Step 3: Verify docs routes typecheck and render**

```bash
bun run typecheck && bun dev
```
Navigate to `/docs` and a known doc path (e.g. `/docs/introduction`). Expected: docs tree renders, content displays correctly.

- [ ] **Step 4: Commit**

```bash
git add app/routes/docs/ && git commit -m "feat: port docs routes"
```

---

## Task 14: Marketplace listing

**Files:**
- Create: `app/routes/marketplace/index.tsx`

- [ ] **Step 1: Create `app/routes/marketplace/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getMarketplaceItems, getMarketplaceCollections } from '@/lib/marketplace'
import { MarketplaceExplorer } from '@/components/marketplace/explorer'
import { MarketplaceLoadingSkeleton } from '@/components/marketplace/marketplace-loading-skeleton'

// Paste hashString and seededShuffle from website/app/marketplace/page.tsx
function hashString(str: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const Route = createFileRoute('/marketplace/')({
  loader: async () => {
    const [collections, items] = await Promise.all([
      getMarketplaceCollections(),
      getMarketplaceItems(true),
    ])
    return { collections, items }
  },
  head: () => ({
    meta: [
      { title: 'Marketplace | Mue' },
      { name: 'description', content: 'Browse the full catalogue of Mue marketplace packs, presets, and quotes.' },
      { property: 'og:title', content: 'Marketplace | Mue' },
    ],
  }),
  component: MarketplacePage,
})

function MarketplacePage() {
  const { collections, items } = Route.useLoaderData()

  const { data: liveItems } = useQuery({
    queryKey: ['marketplace-items'],
    queryFn: () => getMarketplaceItems(true),
    initialData: items,
    staleTime: 1000 * 60 * 5,
  })

  const now = new Date()
  const seedKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}`
  const seed = hashString(seedKey)
  const randomCollections = seededShuffle(collections.filter((c) => c.img), seed)
    .slice(0, 3)
    .map((c) => ({
      ...c,
      contentTypes: [...new Set(liveItems.filter((i) => i.in_collections.includes(c.name)).map((i) => i.type))],
    }))

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col min-h-screen gap-12 px-6 py-12 lg:px-8">
      {randomCollections.map((c) => c.img ? <link key={c.name} rel="preload" as="image" href={c.img} /> : null)}
      <Suspense fallback={<MarketplaceLoadingSkeleton />}>
        <MarketplaceExplorer items={liveItems} collections={collections} randomCollections={randomCollections} />
      </Suspense>
    </div>
  )
}
```

- [ ] **Step 2: Verify typecheck and render**

```bash
bun run typecheck && bun dev
```
Navigate to `/marketplace`. Expected: items grid renders, search and filter work client-side.

- [ ] **Step 3: Commit**

```bash
git add app/routes/marketplace/index.tsx && git commit -m "feat: port marketplace listing route"
```

---

## Task 15: Marketplace item detail

**Files:**
- Create: `app/routes/marketplace/$category.$id.tsx`
- Create: `app/routes/marketplace/_item-sidebar.tsx`
- Create: `app/routes/marketplace/_item-content-tabs.tsx`
- Create: `app/routes/marketplace/_item-actions.tsx`
- Create: `app/routes/marketplace/_view-tracker.tsx`

- [ ] **Step 1: Copy co-located item components**

Copy these files from `website/app/marketplace/[category]/[id]/` and rename with `_` prefix (so TanStack Router ignores them as routes):
- `item-sidebar.tsx` → `app/routes/marketplace/_item-sidebar.tsx`
- `item-content-tabs.tsx` → `app/routes/marketplace/_item-content-tabs.tsx`
- `item-actions.tsx` → `app/routes/marketplace/_item-actions.tsx`
- `view-tracker.tsx` → `app/routes/marketplace/_view-tracker.tsx`

In each file, replace any `next/link` imports with `@tanstack/react-router`. Leave the `fetch('/api/marketplace/...')` calls in `_item-actions.tsx` and `_view-tracker.tsx` as-is for now — they are updated in Task 20.

- [ ] **Step 2: Create `app/routes/marketplace/$category.$id.tsx`**

```tsx
import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { getMarketplaceItem, getMarketplaceItems, getItemCategory } from '@/lib/marketplace'
import { FavoritesProvider } from '@/lib/favorites-context'
import { SITE_URL } from '@/lib/constants/site'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb'
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker'
import ItemsGrid from '@/components/marketplace/items-grid'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/json-ld'
import { AlertCircle, Key } from 'lucide-react'
import { useEmbed } from '@/lib/embed-context'
import { ItemSidebar } from './_item-sidebar'
import { ItemContentTabs } from './_item-content-tabs'

const PROVIDER_NAMES: Record<string, string> = {
  mue: 'MUE', unsplash: 'Unsplash', pexels: 'Pexels', pixabay: 'Pixabay', flickr: 'Flickr',
}

export const Route = createFileRoute('/marketplace/$category/$id')({
  loader: async ({ params }) => {
    let data
    try {
      data = await getMarketplaceItem(params.category as 'packs' | 'presets', params.id)
    } catch {
      throw notFound()
    }
    const allItems = await getMarketplaceItems()
    const collectionNames = data.in_collections?.map((c) => (typeof c === 'string' ? c : c.name)) ?? []
    const related = allItems
      .filter((item) => {
        if (item.name === data.name) return false
        if (data.author && item.author?.toLowerCase() === data.author.toLowerCase()) return true
        return collectionNames.some((col) => item.in_collections.includes(col))
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)
    return { data, related }
  },
  head: ({ loaderData }) => {
    const { data } = loaderData
    const description = data.description ?? `Learn more about ${data.display_name} on the Mue marketplace.`
    return {
      meta: [
        { title: `${data.display_name} – Marketplace | Mue` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${data.display_name} – Marketplace` },
        { property: 'og:description', content: description },
      ],
    }
  },
  component: MarketplaceItemPage,
})

function MarketplaceItemPage() {
  const { data, related } = Route.useLoaderData()
  const { category, id } = Route.useParams()
  const { isEmbed, isPreview, buildEmbedUrl } = useEmbed()

  // Paste the rest of the JSX from website/app/marketplace/[category]/[id]/page.tsx.
  // Replace useSearchParams().get('embed') checks with isEmbed / isPreview from useEmbed().
  // Replace buildEmbedUrl calls with buildEmbedUrl from useEmbed().
  // Paste date formatting, presetSettings extraction, and full JSX return.
  return (
    <FavoritesProvider>
      {/* paste full item page JSX here */}
    </FavoritesProvider>
  )
}
```

- [ ] **Step 3: Verify typecheck**

```bash
bun run typecheck 2>&1 | grep "marketplace/\$category"
```
Expected: no type errors.

- [ ] **Step 4: Verify item detail renders**

```bash
bun dev
```
Navigate to a marketplace item URL. Expected: sidebar, content tabs, and related items render.

- [ ] **Step 5: Commit**

```bash
git add "app/routes/marketplace/\$category.\$id.tsx" app/routes/marketplace/_item-*.tsx
git commit -m "feat: port marketplace item detail route"
```

---

## Task 16: Marketplace collections and authors

**Files:**
- Create: `app/routes/marketplace/collections.tsx`
- Create: `app/routes/marketplace/collection.$collection.tsx`
- Create: `app/routes/marketplace/authors.tsx`
- Create: `app/routes/marketplace/author.$author.tsx`

- [ ] **Step 1: Create `app/routes/marketplace/collections.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getMarketplaceCollections } from '@/lib/marketplace'

export const Route = createFileRoute('/marketplace/collections')({
  loader: () => getMarketplaceCollections(),
  head: () => ({ meta: [{ title: 'Collections | Mue Marketplace' }] }),
  component: CollectionsPage,
})

function CollectionsPage() {
  const collections = Route.useLoaderData()
  // Paste JSX from website/app/marketplace/collections/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 2: Create `app/routes/marketplace/collection.$collection.tsx`**

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getMarketplaceCollection } from '@/lib/marketplace'

export const Route = createFileRoute('/marketplace/collection/$collection')({
  loader: async ({ params }) => {
    try {
      return await getMarketplaceCollection(params.collection)
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.display_name} | Mue Marketplace` }],
  }),
  component: CollectionDetailPage,
})

function CollectionDetailPage() {
  const collection = Route.useLoaderData()
  // Paste JSX from website/app/marketplace/collection/[collection]/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 3: Create `app/routes/marketplace/authors.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getMarketplaceItems, slugifyAuthor } from '@/lib/marketplace'

export const Route = createFileRoute('/marketplace/authors')({
  loader: async () => {
    const items = await getMarketplaceItems()
    const authorMap = new Map<string, number>()
    items.forEach((item) => {
      if (item.author) authorMap.set(item.author, (authorMap.get(item.author) ?? 0) + 1)
    })
    return Array.from(authorMap.entries())
      .map(([name, count]) => ({ name, count, slug: slugifyAuthor(name) }))
      .sort((a, b) => b.count - a.count)
  },
  head: () => ({ meta: [{ title: 'Authors | Mue Marketplace' }] }),
  component: AuthorsPage,
})

function AuthorsPage() {
  const authors = Route.useLoaderData()
  // Paste JSX from website/app/marketplace/authors/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 4: Create `app/routes/marketplace/author.$author.tsx`**

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { getMarketplaceItems, deslugifyAuthor } from '@/lib/marketplace'

export const Route = createFileRoute('/marketplace/author/$author')({
  loader: async ({ params }) => {
    const authorName = deslugifyAuthor(params.author)
    const all = await getMarketplaceItems()
    const items = all.filter(
      (item) => item.author?.toLowerCase() === authorName.toLowerCase(),
    )
    if (items.length === 0) throw notFound()
    return { authorName, items }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.authorName} | Mue Marketplace` }],
  }),
  component: AuthorPage,
})

function AuthorPage() {
  const { authorName, items } = Route.useLoaderData()
  // Paste JSX from website/app/marketplace/author/[author]/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 5: Verify and commit**

```bash
bun run typecheck && bun dev
```
Navigate to `/marketplace/collections` and `/marketplace/authors`. Expected: both pages render.

```bash
git add app/routes/marketplace/collections.tsx "app/routes/marketplace/collection.\$collection.tsx" \
        app/routes/marketplace/authors.tsx "app/routes/marketplace/author.\$author.tsx"
git commit -m "feat: port marketplace collections and authors routes"
```

---

## Task 17: Marketplace create page

**Files:**
- Create: `app/routes/marketplace/create.tsx`

- [ ] **Step 1: Create `app/routes/marketplace/create.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
// Paste imports from website/app/marketplace/create/page.tsx

export const Route = createFileRoute('/marketplace/create')({
  head: () => ({
    meta: [{ title: 'Create | Mue Marketplace' }],
  }),
  component: CreatePage,
})

function CreatePage() {
  // Paste JSX from website/app/marketplace/create/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add app/routes/marketplace/create.tsx && git commit -m "feat: port marketplace create route"
```

---

## Task 18: Download, demo, showcase, and photography pages

**Files:**
- Create: `app/routes/download.tsx`
- Create: `app/routes/demo.tsx`
- Create: `app/routes/showcase.tsx`
- Create: `app/routes/photography.tsx`

- [ ] **Step 1: Create `app/routes/download.tsx`**

The `getBrowserVersions` server function is defined in Task 20 at `app/server/api/browser-versions.ts`. The download page calls it in its loader.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getBrowserVersions } from '@/app/server/api/browser-versions'

export const Route = createFileRoute('/download')({
  loader: () => getBrowserVersions(),
  head: () => ({
    meta: [
      { title: 'Download | Mue' },
      { name: 'description', content: 'Get Mue for Chrome, Edge, and Firefox. Install in seconds.' },
      { property: 'og:title', content: 'Download | Mue' },
    ],
  }),
  component: DownloadPage,
})

function DownloadPage() {
  const versions = Route.useLoaderData()
  // Paste JSX from website/app/download/page.tsx, passing versions to BrowserCard components
  return <>{/* ... */}</>
}
```

If `getBrowserVersions` is not yet written (Task 20 not done), create a stub first:

```ts
// app/server/api/browser-versions.ts (stub)
import { createServerFn } from '@tanstack/start'
export const getBrowserVersions = createServerFn({ method: 'GET' }).handler(async () => ({
  chrome: null, edge: null, firefox: null, whale: null,
}))
```

Replace with the full implementation when completing Task 20.

- [ ] **Step 2: Create `app/routes/demo.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  head: () => ({
    meta: [
      { title: 'Demo | Mue' },
      { name: 'description', content: 'Experience Mue Tab in action. Try out the demo.' },
    ],
  }),
  component: DemoPage,
})

function DemoPage() {
  // Paste JSX from website/app/demo/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 3: Create `app/routes/showcase.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getShowcaseItems } from '@/lib/showcase'

export const Route = createFileRoute('/showcase')({
  loader: () => getShowcaseItems(),
  head: () => ({ meta: [{ title: 'Showcase | Mue' }] }),
  component: ShowcasePage,
})

function ShowcasePage() {
  const items = Route.useLoaderData()
  // Paste JSX from website/app/showcase/page.tsx
  return <>{/* ... */}</>
}
```

- [ ] **Step 4: Create `app/routes/photography.tsx`**

Check `website/app/photography/page.tsx` for its data source and follow the same loader pattern.

- [ ] **Step 5: Commit**

```bash
git add app/routes/download.tsx app/routes/demo.tsx app/routes/showcase.tsx app/routes/photography.tsx
git commit -m "feat: port download, demo, showcase, and photography routes"
```

---

## Task 19: 404 page

**Files:**
- Modify: `app/routes/__root.tsx`

- [ ] **Step 1: Check `components/error-page.tsx`**

Open `components/error-page.tsx` (copied in Task 3). Verify it exports a component suitable for 404 display. If it renders the full not-found UI from `website/app/not-found.tsx`, use it directly. Otherwise, add the 404 JSX from `website/app/not-found.tsx` into `components/error-page.tsx` as a named export `NotFoundPage`.

- [ ] **Step 2: Register `notFoundComponent` in `__root.tsx`**

In `app/routes/__root.tsx`, add the import and update `createRootRoute`:

```tsx
import { NotFoundPage } from '@/components/error-page'

export const Route = createRootRoute({
  // ...existing head config...
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})
```

- [ ] **Step 3: Verify 404 renders**

```bash
bun dev
```
Navigate to `/this-page-does-not-exist`. Expected: the custom 404 component renders.

- [ ] **Step 4: Commit**

```bash
git add app/routes/__root.tsx components/error-page.tsx
git commit -m "feat: add 404 not-found page"
```

---

## Task 20: Server functions for API routes

**Files:**
- Create: `app/server/api/browser-versions.ts`
- Create: `app/server/api/marketplace-download.ts`
- Create: `app/server/api/marketplace-view.ts`

- [ ] **Step 1: Write `app/server/api/browser-versions.ts`**

```ts
import { createServerFn } from '@tanstack/start'
import { ChromeWebStore, Amo } from 'webextension-store-meta'

async function fetchFirefoxVersion(): Promise<string | null> {
  try {
    const store = await Amo.load({ id: 'mue' })
    return store.version()
  } catch {
    return null
  }
}

async function fetchChromeVersion(): Promise<string | null> {
  try {
    const store = await ChromeWebStore.load({ id: 'bngmbednanpcfochchhgbkookpiaiaid' })
    return store.version()
  } catch {
    return null
  }
}

async function fetchEdgeVersion(): Promise<string | null> {
  try {
    const res = await fetch(
      'https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/aepnglgjfokepefimhbnibfjekidhmja',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } },
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.version ?? null
  } catch {
    return null
  }
}

export const getBrowserVersions = createServerFn({ method: 'GET' }).handler(async () => {
  const [chrome, edge, firefox] = await Promise.all([
    fetchChromeVersion(),
    fetchEdgeVersion(),
    fetchFirefoxVersion(),
  ])
  return { chrome, edge, firefox, whale: chrome }
})
```

- [ ] **Step 2: Write `app/server/api/marketplace-download.ts`**

```ts
import { createServerFn } from '@tanstack/start'
import { z } from 'zod'

export const trackMarketplaceDownload = createServerFn({ method: 'POST' })
  .validator(z.object({ itemId: z.string() }))
  .handler(async ({ data }) => {
    const res = await fetch(
      `https://api.muetab.com/v2/marketplace/item/${data.itemId}/download`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    )
    if (!res.ok) throw new Error('Failed to track download')
    return res.json()
  })
```

- [ ] **Step 3: Write `app/server/api/marketplace-view.ts`**

```ts
import { createServerFn } from '@tanstack/start'
import { z } from 'zod'

export const trackMarketplaceView = createServerFn({ method: 'POST' })
  .validator(z.object({ itemId: z.string() }))
  .handler(async ({ data }) => {
    const res = await fetch(
      `https://api.muetab.com/v2/marketplace/item/${data.itemId}/view`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    )
    if (!res.ok) throw new Error('Failed to track view')
    return res.json()
  })
```

- [ ] **Step 4: Update `app/routes/marketplace/_item-actions.tsx`**

Replace the `fetch('/api/marketplace/download', ...)` call with the server function:

```ts
import { trackMarketplaceDownload } from '@/app/server/api/marketplace-download'

// Replace:
// await fetch('/api/marketplace/download', { method: 'POST', body: JSON.stringify({ itemId }) })
// With:
await trackMarketplaceDownload({ data: { itemId } })
```

- [ ] **Step 5: Update `app/routes/marketplace/_view-tracker.tsx`**

Replace the `fetch('/api/marketplace/view', ...)` call with the server function:

```ts
import { trackMarketplaceView } from '@/app/server/api/marketplace-view'

// Replace:
// await fetch('/api/marketplace/view', { method: 'POST', body: JSON.stringify({ itemId }) })
// With:
await trackMarketplaceView({ data: { itemId } })
```

- [ ] **Step 6: Verify typecheck**

```bash
bun run typecheck
```
Expected: no errors in `app/server/api/` or `_item-actions.tsx` / `_view-tracker.tsx`.

- [ ] **Step 7: Commit**

```bash
git add app/server/api/ app/routes/marketplace/_item-actions.tsx app/routes/marketplace/_view-tracker.tsx
git commit -m "feat: add server functions replacing Next.js API routes"
```

---

## Task 21: Sitemap

**Files:**
- Create: `app/server/routes/sitemap.xml.ts`

In Nitro, a file at `server/routes/sitemap.xml.ts` is served at `/sitemap.xml`.

- [ ] **Step 1: Create `app/server/routes/sitemap.xml.ts`**

```ts
import { defineEventHandler, setResponseHeader } from 'h3'
import { getAllBlogPosts } from '@/lib/blog'
import { getMarketplaceItems, getItemCategory } from '@/lib/marketplace'
import { SITE_URL } from '@/lib/constants/site'

const staticRoutes = [
  '/', '/blog', '/docs', '/marketplace', '/marketplace/collections',
  '/marketplace/authors', '/showcase', '/photography', '/download',
  '/demo', '/branding', '/contact', '/privacy', '/license',
]

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml')

  const [posts, items] = await Promise.all([getAllBlogPosts(), getMarketplaceItems()])

  const staticUrls = staticRoutes.map(
    (path) => `  <url><loc>${SITE_URL}${path}</loc><changefreq>weekly</changefreq></url>`,
  )

  const blogUrls = posts.map(
    (post) =>
      `  <url><loc>${SITE_URL}/blog/${post.slug}</loc>` +
      `<lastmod>${post.frontmatter.dateModified ?? post.frontmatter.date}</lastmod>` +
      `<changefreq>monthly</changefreq></url>`,
  )

  const itemUrls = items.map(
    (item) =>
      `  <url><loc>${SITE_URL}/marketplace/${getItemCategory(item.type)}/${item.id}</loc>` +
      `<lastmod>${item.updated_at ?? item.created_at ?? ''}</lastmod>` +
      `<changefreq>weekly</changefreq></url>`,
  )

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticUrls,
    ...blogUrls,
    ...itemUrls,
    '</urlset>',
  ].join('\n')
})
```

- [ ] **Step 2: Verify sitemap is served**

```bash
bun dev
```
Visit `http://localhost:3000/sitemap.xml`. Expected: valid XML with URLs for static pages, blog posts, and marketplace items.

- [ ] **Step 3: Commit**

```bash
git add app/server/routes/sitemap.xml.ts && git commit -m "feat: add Nitro sitemap.xml server route"
```

---

## Task 22: Prerendering configuration

**Files:**
- Modify: `app.config.ts`

- [ ] **Step 1: Update `app.config.ts` with prerender routes**

```ts
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import { getMarketplaceItems, getItemCategory } from './lib/marketplace'
import { getAllBlogPosts } from './lib/blog'
import { getAllDocsMeta } from './lib/docs'

export default defineConfig({
  tsr: { appDirectory: 'app' },
  vite: { plugins: [tsConfigPaths()] },
  server: {
    preset: 'cloudflare-module',
    prerender: {
      routes: async () => {
        const [items, posts, docsMeta] = await Promise.all([
          getMarketplaceItems(),
          getAllBlogPosts(),
          getAllDocsMeta(),
        ])

        return [
          '/', '/blog', '/docs', '/marketplace', '/marketplace/collections',
          '/marketplace/authors', '/showcase', '/photography', '/download',
          '/demo', '/branding', '/contact', '/privacy', '/license', '/dmca', '/uninstall',
          ...items.map((item) => `/marketplace/${getItemCategory(item.type)}/${item.id}`),
          ...posts.map((post) => `/blog/${post.slug}`),
          ...docsMeta.map((doc) => `/docs/${doc.slug.join('/')}`),
        ]
      },
    },
  },
})
```

- [ ] **Step 2: Run a full build and check prerendered output**

```bash
bun run build
```
Expected: build completes without errors. `.output/public/` contains `index.html` files for all marketplace item routes and blog posts.

```bash
ls .output/public/marketplace/packs/
```
Expected: subdirectory per marketplace pack item.

- [ ] **Step 3: Commit**

```bash
git add app.config.ts && git commit -m "feat: configure prerendering for all static routes"
```

---

## Task 23: Cloudflare deployment

**Files:**
- No new files; final validation and deploy.

- [ ] **Step 1: Run final typecheck**

```bash
bun run typecheck
```
Expected: zero errors.

- [ ] **Step 2: Run production build**

```bash
bun run build
```
Expected: build succeeds. Note the total bundle sizes from the Vite output.

- [ ] **Step 3: Test locally with Wrangler**

```bash
bunx wrangler dev
```
Expected: site loads at `http://localhost:8787`. Manually check:
- `/` — homepage renders with correct fonts and theme
- `/marketplace` — explorer loads, search and type filters work
- `/marketplace/packs/[any-item-id]` — item detail page renders
- `/blog` — post listing renders
- `/blog/[any-slug]` — post content renders with correct headings
- `/docs/introduction` (or any known doc) — docs shell + tree + content render
- `/sitemap.xml` — returns valid XML
- Theme toggle — switches between light and dark correctly
- Navbar active states — correct page highlights

- [ ] **Step 4: Deploy to Cloudflare**

```bash
bunx wrangler deploy
```
Expected: deployment succeeds with a Workers URL in the output.

- [ ] **Step 5: Smoke test the deployed Workers URL**

Repeat the checks from Step 3 against the live Workers URL. Pay particular attention to:
- `/sitemap.xml` — confirms Nitro server routes work
- Marketplace download/view tracking — click a download button on a marketplace item and confirm no console errors

- [ ] **Step 6: Cut DNS over**

Update the Cloudflare Workers route (in the Cloudflare dashboard, or in `wrangler.toml` under `[routes]`) to point your production domain to the new deployment.

- [ ] **Step 7: Final commit and tag**

```bash
git add . && git commit -m "feat: complete TanStack Start migration"
git tag v2.0.0-tanstack
```

---

## Self-Review Notes

**Spec coverage:**
- Section 1 (project setup) → Tasks 1–2
- Section 2 (routing) → Tasks 10–19
- Section 3 (content pipeline) → Tasks 4–5
- Section 4 (data fetching) → Tasks 14–15
- Section 5 (API routes) → Task 20
- Section 6 (theme, SEO, sitemap) → Tasks 6, 9, 21
- Section 7 (deployment) → Tasks 22–23

**Placeholder check:** Tasks 10–19 instruct "paste JSX from source file." This is intentional — the JSX is verbatim content from existing Next.js pages; repeating all of it would add hundreds of lines of noise without changing anything. Each instruction names the exact source file.

**Type consistency:**
- `getBlogPostBySlug` returns `BlogPost | null` (Task 4) — used with null check + `notFound()` in Task 12.
- `getDocBySlug` returns `LoadedDoc | null` (Task 5) — used with null check + `notFound()` in Task 13.
- `getBrowserVersions` defined in Task 20 step 1 as a `createServerFn` — imported in Task 18 step 1. If Task 18 is executed before Task 20, use the stub from Task 18 step 1 and replace it after Task 20.
- `trackMarketplaceDownload`/`trackMarketplaceView` defined in Task 20 steps 2–3 — used in Task 20 steps 4–5. All in the same task, no ordering issue.
- `hashString` and `seededShuffle` defined inline in Task 14 — not reused elsewhere.
