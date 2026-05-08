import { createFileRoute, notFound } from '@tanstack/react-router'
import { User, Info } from 'lucide-react'

import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb'
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker'
import ItemsGrid from '@/components/marketplace/items-grid'

import {
  getMarketplaceItems,
  slugifyAuthor,
  deslugifyAuthor,
} from '@/lib/marketplace'
import { FavoritesProvider } from '@/lib/favorites-context'

export const Route = createFileRoute('/marketplace/author/$author')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
    preview: search.preview as string | undefined,
  }),
  loader: async ({ params }) => {
    const allItems = await getMarketplaceItems()
    const items = allItems.filter(
      (item) => item.author && slugifyAuthor(item.author) === params.author.toLowerCase(),
    )

    if (items.length === 0) throw notFound()

    const authorName = items[0]?.author || deslugifyAuthor(params.author)
    return { items, authorName }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { authorName } = loaderData
    return {
      meta: [
        { title: `${authorName} – Marketplace | Mue` },
        { name: 'description', content: `Browse all marketplace items created by ${authorName}.` },
        { property: 'og:title', content: `${authorName} – Marketplace` },
        {
          property: 'og:description',
          content: `Browse all marketplace items created by ${authorName}.`,
        },
      ],
    }
  },
  component: AuthorPage,
})

function AuthorPage() {
  const { items, authorName } = Route.useLoaderData()
  const { embed, preview } = Route.useSearch()
  const isEmbed = embed === 'true'
  const isPreview = preview === 'true'

  const buildEmbedUrl = (path: string) => {
    if (!isEmbed) return path
    const params = isPreview ? 'embed=true&preview=true' : 'embed=true'
    return `${path}?${params}`
  }

  const collectionNameMap = new Map<string, string>()

  return (
    <FavoritesProvider>
      <div
        className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 ${
          isEmbed ? 'px-4 py-6' : 'px-6 py-12 lg:px-8'
        }`}
      >
        {!isEmbed && <MarketplaceBreadcrumb type="author" authorName={authorName} />}
        <BreadcrumbTracker
          breadcrumbs={[
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Authors', href: buildEmbedUrl('/marketplace/authors') },
            { label: authorName },
          ]}
        />

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{authorName}</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            This page is automatically generated based on the author name. Items are grouped by
            matching author names, which may occasionally include unrelated items with similar names.
          </p>
        </div>

        <div className="space-y-4">
          <ItemsGrid items={items} collectionNameMap={collectionNameMap} />
        </div>
      </div>
    </FavoritesProvider>
  )
}
