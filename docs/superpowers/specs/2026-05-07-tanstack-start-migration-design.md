# TanStack Start Migration Design

**Date:** 2026-05-07
**Status:** Approved

## Motivation

Migrate the Mue website from Next.js App Router to TanStack Start to address:

- App Router complexity (RSC/client boundary confusion, `use client` overhead)
- Build/bundle opacity (Webpack internals, opaque errors)
- Cloudflare compatibility issues (OpenNext quirks, edge runtime limitations)
- Vendor lock-in feel (Next.js-specific APIs making standard React patterns awkward)

## Approach

**Fresh TanStack Start project (Approach A):** New project reusing all framework-agnostic code from the existing repo. The `lib/`, `components/`, and `content/` directories port directly with zero changes.

## Architecture

**Stack:**
- TanStack Start (Vite + Vinxi + Nitro)
- TanStack Router — file-based routing
- TanStack Query — client-side data fetching for marketplace explorer
- Nitro `cloudflare-module` preset — replaces `@opennextjs/cloudflare`
- Tailwind v4 + Radix UI + shadcn components — unchanged

**What moves as-is:**
- `lib/` — all pure TypeScript, fully framework-agnostic
- `components/ui/` — pure React + Tailwind
- `content/` — all markdown files
- All type definitions

**Replacement map:**

| Next.js | TanStack Start |
|---|---|
| `app/` directory | `src/routes/` (file-based) |
| `generateMetadata` | `head` export per route |
| `generateStaticParams` | `loader` + prerender config |
| `notFound()` | `throw notFound()` from TanStack Router |
| `next/link` | `<Link>` from `@tanstack/react-router` |
| `next/navigation` hooks | TanStack Router hooks |
| `next-themes` | Custom `ThemeProvider` (~30 lines) |
| `next-sitemap` | Nitro server route generating `sitemap.xml` |
| `app/api/**/route.ts` | `server/api/**/*.ts` (Nitro event handlers) |

## Section 1: Project Setup

**`app.config.ts`:**
```ts
import { defineConfig } from '@tanstack/start/config'

export default defineConfig({
  server: {
    preset: 'cloudflare-module',
  },
})
```

**`wrangler.toml`** stays unchanged — same Cloudflare account/zone config, pointing at Nitro's output.

**Build scripts:**

| Before | After |
|---|---|
| `next build` | `tss build` |
| `opennextjs-cloudflare build && deploy` | `wrangler deploy` |
| `next dev` | `tss dev` |

## Section 2: Routing

File-based routing under `src/routes/`:

```
src/routes/
  __root.tsx                     # Root layout (nav, theme provider, global styles)
  index.tsx                      # /
  blog/
    index.tsx                    # /blog
    $slug.tsx                    # /blog/[slug]
    changelog.tsx                # /blog/changelog
    page.$page.tsx               # /blog/page/[page]
    tag.$tag.tsx                 # /blog/tag/[tag]
  docs/
    index.tsx                    # /docs
    $.tsx                        # /docs/[...slug] (splat route)
  marketplace/
    index.tsx                    # /marketplace
    $category.$id.tsx            # /marketplace/[category]/[id]
    author.$author.tsx           # /marketplace/author/[author]
    authors.tsx                  # /marketplace/authors
    collection.$collection.tsx   # /marketplace/collection/[collection]
    collections.tsx              # /marketplace/collections
    create.tsx                   # /marketplace/create
  showcase.tsx
  photography.tsx
  download.tsx                   # layout was metadata-only; metadata moves to head export
  demo.tsx                       # layout was metadata-only; metadata moves to head export
  branding.tsx
  contact.tsx
  dmca.tsx
  license.tsx
  privacy.tsx
  uninstall.tsx
```

> **Note:** `app/demo/layout.tsx` and `app/download/layout.tsx` in Next.js are metadata-only wrappers (`return children`). In TanStack Start these are not separate files — the metadata moves into the `head` export on the route itself.

**Dynamic routes** use `$param` naming. **Docs catch-all** `/docs/[...slug]` becomes `$.tsx` (TanStack Router splat route).

**Static pre-rendering** (replaces `generateStaticParams` + `dynamicParams = false`):

```ts
// src/routes/marketplace/$category.$id.tsx
export const Route = createFileRoute('/marketplace/$category/$id')({
  loader: ({ params }) => getMarketplaceItem(params.category, params.id),
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.display_name} – Marketplace` }],
  }),
})
```

Prerendering configured in `app.config.ts` to pre-build all marketplace item routes at deploy time.

## Section 3: Content Pipeline

**Problem:** `lib/blog.ts` and `lib/docs.ts` use `fs.readFile` + `process.cwd()`. This works in Next.js because pages are pre-rendered at build time on Node.js, but breaks at runtime on Cloudflare Workers.

**Solution:** Replace `fs` reads with Vite `import.meta.glob` — content is embedded in the bundle at build time:

```ts
// lib/content.ts
const blogFiles = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const docsFiles = import.meta.glob('/content/docs/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})
```

The remark/rehype processing pipeline (gray-matter, remark-gfm, rehype-slug, etc.) is unchanged — it runs against in-memory strings instead of file reads. `getAllBlogPosts()`, `getBlogPostBySlug()`, `getDocBySlug()`, `getDocsTree()` keep the same signatures; only the read mechanism changes.

For `docs.ts`, the recursive `collectDocs(dir)` function becomes an `Object.entries(docsFiles)` loop — file paths (e.g. `/content/docs/advanced/themes.md`) provide slug segments directly by stripping the prefix and extension.

**Trade-off:** Adding content requires a redeploy. This is already true today with `generateStaticParams` — no change in practice.

## Section 4: Data Fetching

**Marketplace API (`lib/marketplace.ts`):** Unchanged. Route `loader` functions call the existing fetch helpers directly:

```ts
export const Route = createFileRoute('/marketplace/')({
  loader: () => Promise.all([getMarketplaceItems(true), getMarketplaceCollections()]),
})
```

`cache: 'force-cache'` on `fetchMarketplace` stays — Cloudflare's fetch respects it.

**TanStack Query** is used for the marketplace explorer component, which has client-side filtering (search, type filter). Loader data is passed as `initialData` to `useQuery`, giving instant display with the option to refetch:

```ts
const { data: items } = useQuery({
  queryKey: ['marketplace-items'],
  queryFn: getMarketplaceItems,
  initialData: Route.useLoaderData().items,
})
```

**Does not use TanStack Query:** Blog, docs, showcase, photography, all static pages — purely server-loaded via `loader`.

**Cloudflare bindings:** If Cloudflare KV/D1/R2 is needed in a loader, access via `getWebRequest()` from Nitro event context — same pattern as current `getCloudflareContext()` from OpenNext.

## Section 5: API Routes

Three Next.js API routes become Nitro server routes:

```
server/
  routes/
    api/
      browser-versions.get.ts
      marketplace/
        download.post.ts
        view.post.ts
```

`NextRequest`/`NextResponse` → `defineEventHandler`/`readBody`/`createError`. Logic is identical. Example:

```ts
// server/routes/api/marketplace/download.post.ts
export default defineEventHandler(async (event) => {
  const { itemId } = await readBody(event)
  if (!itemId) throw createError({ statusCode: 400, message: 'Item ID is required' })

  const res = await fetch(`https://api.muetab.com/v2/marketplace/item/${itemId}/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) throw createError({ statusCode: res.status, message: 'Failed to track download' })
  return res.json()
})
```

The `browser-versions` route keeps its `Cache-Control` header via `setResponseHeader(event, 'Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')`.

## Section 6: Theme, SEO & Sitemap

**Theme:** Custom `ThemeProvider` (~30 lines) using React context + `localStorage` + `data-theme` attribute on `<html>`. Replaces `next-themes` with no external dependency. Avoids SSR flash quirks from a library written for Next.js internals.

**Metadata:** TanStack Router `head` export per route. Root route sets global defaults; individual routes override:

```ts
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => getBlogPostBySlug(params.slug),
  head: ({ loaderData: post }) => ({
    meta: [
      { title: `${post.frontmatter.title} – Mue Blog` },
      { name: 'description', content: post.frontmatter.description },
    ],
  }),
})
```

JSON-LD components (product schema, breadcrumbs) remain as React components rendered inside routes — no change.

**Sitemap:** Nitro server route at `server/routes/sitemap.xml.ts`. Generates sitemap dynamically by calling `getMarketplaceItems()`, `getAllBlogPosts()`, etc. Returns XML with correct `Content-Type`. More flexible than `next-sitemap` since it has direct access to the data layer.

## Section 7: Deployment

Nitro `cloudflare-module` preset is Nitro's first-party Cloudflare Workers adapter — no third-party layer between the app and the runtime.

`wrangler.toml` stays; build output points at Nitro's `_worker.js` bundle instead of OpenNext's chunked output. Nitro's bundle is leaner.

**Early validation:** Test the Cloudflare build with `import.meta.glob` content pipeline in a minimal proof-of-concept before committing to the full page migration. If the Cloudflare build works with embedded markdown content, all remaining work is straightforward porting.

## Migration Sequence

1. **Proof of concept** — New TanStack Start project, Cloudflare preset, one blog route with `import.meta.glob`. Validate the full build + deploy pipeline.
2. **Core layout** — `__root.tsx`, ThemeProvider, nav, global styles.
3. **Static pages** — Contact, branding, privacy, license, DMCA, uninstall (no data fetching).
4. **Blog** — Content pipeline, listing, pagination, tags, changelog.
5. **Docs** — Content pipeline with nested tree, TOC.
6. **Marketplace** — Listing, explorer, item detail, collections, authors. Most complex section.
7. **API routes** — Three Nitro server routes (quick).
8. **Sitemap + SEO audit** — Nitro sitemap route, verify all `head` exports.
9. **DNS cutover** — Deploy to Cloudflare, validate, cut over from Next.js site.
