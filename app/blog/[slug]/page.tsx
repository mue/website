import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, User, Clock } from 'lucide-react';
import { BlogImage } from '@/components/blog/blog-image';
import { BlogContentLightbox } from '@/components/blog/blog-content-lightbox';
import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { ArticleJsonLd as ArticleJsonLdComponent, BreadcrumbJsonLd } from '@/components/json-ld';

export const revalidate = 3600; // Revalidate every hour (ISR)

type BlogPostParams = {
  slug: string;
};

type BlogPostProps = {
  params: Promise<BlogPostParams>;
  searchParams: Promise<{ embed?: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Post Not Found | Mue Blog' };
  }
  const title = `${post.frontmatter.title} | Mue Blog`;
  const description =
    post.excerpt || post.frontmatter.description || 'Read the latest from the Mue blog.';
  const url = `https://muetab.com/blog/${slug}`;
  const image = post.frontmatter.image;
  const tags = post.frontmatter.tags || [];
  const modified = post.frontmatter.dateModified;
  const readingTime = post.readingTime;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      authors: post.frontmatter.author ? [post.frontmatter.author] : undefined,
      tags,
      images: image ? [image] : undefined,
      publishedTime: post.frontmatter.date,
      modifiedTime: modified,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
    keywords: tags.length ? tags : undefined,
    other: readingTime
      ? {
          'reading-time': readingTime,
        }
      : undefined,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params, searchParams }: BlogPostProps) {
  const { slug } = await params;
  const { embed } = await searchParams;
  const isEmbed = embed === 'true';
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getAllBlogPosts()]);

  if (!post) {
    notFound();
  }

  // Find adjacent posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const hasUpdate =
    post.frontmatter.dateModified && post.frontmatter.dateModified !== post.frontmatter.date;
  return (
    <div className="relative min-h-screen overflow-hidden">
      {!isEmbed && (
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />
      )}

      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {!isEmbed && (
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-8 gap-2')}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to blog
          </Link>
        )}

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
              {hasUpdate && (
                <span className="flex items-center gap-2" title="Updated date">
                  <Calendar className="h-4 w-4 opacity-60" />
                  <time dateTime={post.frontmatter.dateModified} className="italic">
                    Updated {formatDate(post.frontmatter.dateModified!)}
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

        <ArticleJsonLdComponent
          headline={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          url={`https://muetab.com/blog/${post.slug}`}
          datePublished={post.frontmatter.date}
          dateModified={post.frontmatter.dateModified}
          author={post.frontmatter.author}
          image={post.frontmatter.image}
          keywords={post.frontmatter.tags}
          wordCount={post.wordCount}
          timeRequired={
            post.readingTime ? `PT${/^(\d+)/.exec(post.readingTime)?.[1] || '5'}M` : undefined
          }
        />
        <BreadcrumbJsonLd
          items={[
            { position: 1, name: 'Home', item: 'https://muetab.com/' },
            { position: 2, name: 'Blog', item: 'https://muetab.com/blog' },
            {
              position: 3,
              name: post.frontmatter.title,
              item: `https://muetab.com/blog/${post.slug}`,
            },
          ]}
        />
        <div className="docs-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        <BlogContentLightbox contentHtml={post.content} />

        <nav className="mt-16 grid gap-4 border-t pt-8 md:grid-cols-2">
          <div>
            {previousPost && (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="group flex flex-col gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" /> Previous post
                </span>
                <span className="font-medium text-foreground group-hover:text-primary">
                  {previousPost.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col items-end gap-1 rounded-xl border bg-card/70 p-4 transition hover:border-primary/40"
              >
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Next post <ArrowRight className="h-4 w-4" />
                </span>
                <span className="font-medium text-foreground group-hover:text-primary text-right">
                  {nextPost.frontmatter.title}
                </span>
              </Link>
            )}
          </div>
        </nav>

        <div className="mt-12 rounded-2xl border bg-card/70 p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold">Enjoying Mue?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join thousands of mindful makers and add Mue to your browser today.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="https://chromewebstore.google.com/detail/mue/jfaidnnckeinloipodbgfjjmipgjnllo"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
            >
              Add to Chrome
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/introduction"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              View docs
            </Link>
          </div>
        </div>
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
