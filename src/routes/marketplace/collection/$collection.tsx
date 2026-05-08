import { createFileRoute, notFound, Link } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MarketplaceBreadcrumb } from '@/components/marketplace/marketplace-breadcrumb'
import { BreadcrumbTracker } from '@/components/marketplace/breadcrumb-tracker'
import { NoCollectionItemsEmptyState } from '@/components/marketplace/empty-state'
import ItemsGrid from '@/components/marketplace/items-grid'

import { getMarketplaceCollection } from '@/lib/marketplace'
import { FavoritesProvider } from '@/lib/favorites-context'
import { SITE_URL } from '@/lib/constants/site'

export const Route = createFileRoute('/marketplace/collection/$collection')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
    preview: search.preview as string | undefined,
  }),
  loader: async ({ params }) => {
    try {
      const data = await getMarketplaceCollection(params.collection)
      return { data }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { data } = loaderData
    const description =
      data.description ??
      `Browse all items inside the ${data.display_name} collection on the Mue marketplace.`
    return {
      meta: [
        { title: `${data.display_name} – Marketplace collection | Mue` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${data.display_name} – Marketplace collection` },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `${SITE_URL}/marketplace/collection/${encodeURIComponent(data.name)}`,
        },
      ],
    }
  },
  component: CollectionPage,
})

function CollectionPage() {
  const { data } = Route.useLoaderData()
  const { embed, preview } = Route.useSearch()
  const isEmbed = embed === 'true'
  const isPreview = preview === 'true'

  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path
    const separator = hasExistingParams ? '&' : '?'
    const params = isPreview ? 'embed=true&preview=true' : 'embed=true'
    return `${path}${separator}${params}`
  }

  const items = data.items ?? []
  const hasItems = items.length > 0
  const collectionNameMap = new Map<string, string>()

  return (
    <FavoritesProvider>
      <div
        className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 ${
          isEmbed ? 'px-4 py-6' : 'px-6 py-12 lg:px-8'
        }`}
      >
        {!isEmbed && (
          <MarketplaceBreadcrumb type="collection" collectionName={data.display_name} />
        )}
        <BreadcrumbTracker
          breadcrumbs={[
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Collections', href: buildEmbedUrl('/marketplace/collections') },
            { label: data.display_name },
          ]}
        />

        <header className="overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm">
          <div className="grid grid-cols-[140px_1fr] lg:grid-cols-[2fr_3fr]">
            <div className="relative min-h-[140px] lg:aspect-auto lg:min-h-[220px]">
              {data.img ? (
                <img
                  src={data.img}
                  alt={data.display_name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            <div className="flex flex-col gap-3 p-4 pr-5 lg:gap-5 lg:p-8">
              <div className="space-y-1.5 lg:space-y-3">
                <Badge variant="secondary">Collection</Badge>
                <h1 className="text-xl font-semibold tracking-tight text-foreground lg:text-3xl lg:md:text-4xl">
                  {data.display_name}
                </h1>
                {data.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2 lg:text-base lg:line-clamp-none lg:md:text-lg">
                    {data.description}
                  </p>
                )}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-muted-foreground lg:gap-4 lg:text-sm">
                <span>
                  {hasItems
                    ? `${items.length} ${items.length === 1 ? 'item' : 'items'}`
                    : 'No items yet'}
                </span>
                {data.news && <Badge variant="outline">Latest update</Badge>}
                {data.news_link && (
                  <Link
                    to={data.news_link as any}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Read announcement
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {hasItems ? (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-foreground">Included marketplace items</h2>
              <span className="text-sm text-muted-foreground">Sorted alphabetically</span>
            </div>
            <ItemsGrid
              items={items.slice().sort((a, b) => a.display_name.localeCompare(b.display_name))}
              collectionNameMap={collectionNameMap}
            />
          </section>
        ) : (
          <NoCollectionItemsEmptyState />
        )}

        <Separator />

        <div className="pb-12 text-sm text-muted-foreground">
          Want to expand this collection? Contribute on the{' '}
          <a
            href="https://github.com/mue/marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Mue GitHub
          </a>
          .
        </div>
      </div>
    </FavoritesProvider>
  )
}
