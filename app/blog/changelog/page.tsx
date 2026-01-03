import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogImage } from '@/components/blog/blog-image';
import { BlogContentLightbox } from '@/components/blog/blog-content-lightbox';
import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients';
import { Badge } from '@/components/ui/badge';
import { getAllBlogPosts, getBlogPostBySlug, type BlogPost } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const revalidate = 3600; // Revalidate every hour (ISR)

export const metadata: Metadata = {
  title: 'Latest Changelog | Mue Blog',
  description: 'View the latest release notes and updates for Mue.',
  openGraph: {
    title: 'Latest Changelog | Mue Blog',
    description: 'View the latest release notes and updates for Mue.',
  },
};

async function getLatestReleasePost(): Promise<BlogPost | null> {
  const allPosts = await getAllBlogPosts();
  
  // Find the first post with the "release" tag
  const releasePost = allPosts.find((post) => 
    post.frontmatter.tags?.includes('release')
  );
  
  if (!releasePost) {
    return null;
  }
  
  // Get the full post content
  return await getBlogPostBySlug(releasePost.slug);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ChangelogPage() {
  const post = await getLatestReleasePost();

  if (!post) {
    notFound();
  }

  const hasUpdate =
    post.frontmatter.dateModified && post.frontmatter.dateModified !== post.frontmatter.date;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />

      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <header className="mb-12">
          {post.frontmatter.image ? (
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
          )}

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

        <div className="docs-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        <BlogContentLightbox contentHtml={post.content} />
      </article>
    </div>
  );
}

// Gradient hero fallback when no image is provided
function GradientHero({ title }: { title: string }) {
  const gradientClass = BLOG_IMAGE_GRADIENTS[blogImageGradientIndex(title)];
  const initial = (title?.trim()?.[0] || '?').toUpperCase();
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
  );
}
