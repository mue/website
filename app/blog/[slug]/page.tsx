import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';

import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlogImage } from '@/components/blog/blog-image';

export const dynamic = 'force-static';
export const dynamicParams = false;

type BlogPostParams = {
  slug: string;
};

type BlogPostProps = {
  params: Promise<BlogPostParams>;
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
    return {
      title: 'Post Not Found | Mue Blog',
    };
  }

  return {
    title: `${post.frontmatter.title} | Mue Blog`,
    description: post.excerpt || post.frontmatter.description,
    openGraph: post.frontmatter.image
      ? {
          images: [post.frontmatter.image],
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

function computeReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min read`;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getAllBlogPosts()]);

  if (!post) {
    notFound();
  }

  // Find adjacent posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />

      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-8 gap-2')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <header className="mb-12">
          {post.frontmatter.image && (
            <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-white/10">
              <BlogImage
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 896px) 896px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
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

            <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.frontmatter.date)}
              </span>
              {post.frontmatter.author && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.frontmatter.author}
                  </span>
                </>
              )}
              <span className="text-muted-foreground/50">•</span>
              <span className="uppercase tracking-widest">{computeReadingTime(post.content)}</span>
            </div>

            {post.frontmatter.description && (
              <p className="text-lg text-muted-foreground">{post.frontmatter.description}</p>
            )}
          </div>
        </header>

        <div className="docs-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

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
