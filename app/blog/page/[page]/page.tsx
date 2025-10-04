import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const revalidate = 3600; // Revalidate every hour (ISR)

const PAGE_SIZE = 9;

interface Params {
  page: string;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params;
  const pageNum = Number(page) || 1;
  const title = pageNum === 1 ? 'Blog | Mue' : `Page ${pageNum} | Blog | Mue`;
  const description =
    'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.';
  const canonical = pageNum === 1 ? 'https://mue.app/blog' : `https://mue.app/blog/page/${pageNum}`;
  // We need total pages to derive prev/next
  const posts = await getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const prev =
    pageNum > 1
      ? pageNum - 1 === 1
        ? 'https://mue.app/blog'
        : `https://mue.app/blog/page/${pageNum - 1}`
      : undefined;
  const next = pageNum < totalPages ? `https://mue.app/blog/page/${pageNum + 1}` : undefined;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description },
    other: {
      ...(prev ? { 'prev-url': prev } : {}),
      ...(next ? { 'next-url': next } : {}),
    },
  };
}

export default async function BlogPagePaginated({ params }: { params: Promise<Params> }) {
  const { page } = await params;
  const pageNum = Math.max(1, Number(page) || 1);
  const posts = await getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const start = (pageNum - 1) * PAGE_SIZE;
  const pagePosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.28)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mue.app/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://mue.app/blog' },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: `Page ${pageNum}`,
                  item: `https://mue.app/blog/page/${pageNum}`,
                },
              ],
            }),
          }}
        />
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
            <span>Blog</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Page {pageNum}</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Stories from the Mue community
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Product updates, technical deep-dives, and thoughts on building mindful browser
            experiences.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <PaginationNav current={pageNum} total={totalPages} />
      </div>
    </div>
  );
}

function PaginationNav({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const prev = current > 1 ? current - 1 : null;
  const next = current < total ? current + 1 : null;
  return (
    <nav className="mt-16 flex items-center justify-center gap-4" aria-label="Pagination">
      {prev && (
        <Link
          href={prev === 1 ? '/blog' : `/blog/page/${prev}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          rel="prev"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Link>
      )}
      <span className="text-sm text-muted-foreground">
        Page {current} of {total}
      </span>
      {next && (
        <Link
          href={`/blog/page/${next}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          rel="next"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
