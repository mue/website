import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import { ChevronLeft } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const revalidate = 3600; // Revalidate every hour (ISR)

interface Params {
  tag: string;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t.toLowerCase())));
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const readable = tag.replace(/-/g, ' ');
  const title = `${readable.charAt(0).toUpperCase() + readable.slice(1)} | Tag | Mue Blog`;
  const description = `Articles tagged with ${readable} on the Mue Blog.`;
  return {
    title,
    description,
    alternates: { canonical: `https://muetab.com/blog/tag/${tag}` },
    openGraph: { title, description },
  };
}

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag } = await params;
  const posts = await getAllBlogPosts();
  const filtered = posts.filter((p) =>
    p.frontmatter.tags?.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
  if (filtered.length === 0) {
    notFound();
  }
  const readable = tag.replace(/-/g, ' ');
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[60vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <script
          type="application/ld+json"
          // BreadcrumbList JSON-LD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://muetab.com/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://muetab.com/blog' },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: readable,
                  item: `https://muetab.com/blog/tag/${tag}`,
                },
              ],
            }),
          }}
        />
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-8 gap-2')}
        >
          <ChevronLeft className="h-4 w-4" /> Back to blog
        </Link>
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Posts tagged &quot;{readable}&quot;
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            {filtered.length} post{filtered.length !== 1 && 's'} with this tag.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
