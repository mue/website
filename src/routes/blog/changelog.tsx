import { createFileRoute, notFound } from '@tanstack/react-router'

import { Calendar, Clock, User } from 'lucide-react'

import { BlogImage } from '@/components/blog/blog-image'
import { BlogContentLightbox } from '@/components/blog/blog-content-lightbox'
import { BlogProse } from '@/components/blog/blog-prose'
import { Badge } from '@/components/ui/badge'

import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog'
import { formatDate, cn } from '@/lib/utils'

export const Route = createFileRoute('/blog/changelog')({
  validateSearch: (search: Record<string, unknown>) => ({
    embed: search.embed as string | undefined,
  }),
  loader: async () => {
    const allPosts = await getAllBlogPosts()
    const releasePost = allPosts.find((post) => post.frontmatter.tags?.includes('release'))
    if (!releasePost) throw notFound()
    const post = await getBlogPostBySlug(releasePost.slug)
    if (!post) throw notFound()
    return { post }
  },
  head: () => ({
    meta: [
      { title: 'Latest Changelog | Mue' },
      { name: 'description', content: 'View the latest release notes and updates for Mue.' },
      { property: 'og:title', content: 'Latest Changelog | Mue' },
      { property: 'og:description', content: 'View the latest release notes and updates for Mue.' },
    ],
  }),
  component: ChangelogPage,
})

function ChangelogPage() {
  const { post } = Route.useLoaderData()
  const { embed } = Route.useSearch()
  const isEmbed = embed === 'true'

  const hasUpdate =
    post.frontmatter.dateModified && post.frontmatter.dateModified !== post.frontmatter.date

  return (
    <div className="relative min-h-screen overflow-hidden">
      {!isEmbed && (
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />
      )}

      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <header className="mb-12">
          {!isEmbed &&
            (post.frontmatter.image ? (
              <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
                <BlogImage
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 896px) 896px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
              </div>
            ) : (
              <GradientHero title={post.frontmatter.title} />
            ))}

          <div className="space-y-4">
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
              </span>
              {hasUpdate && post.frontmatter.dateModified && (
                <span className="flex items-center gap-2" title="Updated date">
                  <Calendar className="h-4 w-4 opacity-60" />
                  <time dateTime={post.frontmatter.dateModified} className="italic">
                    Updated {formatDate(post.frontmatter.dateModified)}
                  </time>
                </span>
              )}
              {post.frontmatter.author && (
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.frontmatter.author}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </span>
            </div>

            {post.frontmatter.description && (
              <p className="text-lg text-muted-foreground">{post.frontmatter.description}</p>
            )}
          </div>
        </header>

        <BlogProse html={post.content} className="docs-prose" />
        <BlogContentLightbox contentHtml={post.content} />
      </article>
    </div>
  )
}

function GradientHero({ title }: { title: string }) {
  const gradientClass = BLOG_IMAGE_GRADIENTS[blogImageGradientIndex(title)]
  const initial = (title?.trim()?.[0] || '?').toUpperCase()

  return (
    <div
      className={cn(
        'relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10 flex items-center justify-center',
        gradientClass,
      )}
      aria-label={`Cover placeholder for ${title}`}
    >
      <span className="text-6xl font-semibold tracking-tight text-white/70 drop-shadow select-none">
        {initial}
      </span>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
    </div>
  )
}
