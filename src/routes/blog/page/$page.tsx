import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { ArrowRight, ChevronLeft } from 'lucide-react';

import { BlogCard } from '@/components/blog/blog-card';
import { buttonVariants } from '@/components/ui/button';

import { getAllBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants/site';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 9;

export const Route = createFileRoute('/blog/page/$page')({
  loader: async ({ params }) => {
    const pageNum = Math.max(1, Number(params.page) || 1);
    const posts = await getAllBlogPosts();
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    if (pageNum > totalPages) throw notFound();

    const start = (pageNum - 1) * PAGE_SIZE;
    const pagePosts = posts.slice(start, start + PAGE_SIZE);

    return { pageNum, pagePosts, totalPages };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { pageNum, totalPages } = loaderData;
    const title = pageNum === 1 ? 'Blog | Mue' : `Page ${pageNum} | Blog | Mue`;
    const description =
      'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.';
    const canonical = pageNum === 1 ? `${SITE_URL}/blog` : `${SITE_URL}/blog/page/${pageNum}`;
    const prev =
      pageNum > 1
        ? pageNum - 1 === 1
          ? `${SITE_URL}/blog`
          : `${SITE_URL}/blog/page/${pageNum - 1}`
        : undefined;
    const next = pageNum < totalPages ? `${SITE_URL}/blog/page/${pageNum + 1}` : undefined;

    return {
      meta: [{ title }, { name: 'description', content: description }],
      links: [
        { rel: 'canonical', href: canonical },
        ...(prev ? [{ rel: 'prev', href: prev }] : []),
        ...(next ? [{ rel: 'next', href: next }] : []),
      ],
    };
  },
  component: BlogPagePaginated,
});

function BlogPagePaginated() {
  const { pageNum, pagePosts, totalPages } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[80vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.28)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
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
          to={prev === 1 ? '/blog' : `/blog/page/${prev}`}
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
          to={`/blog/page/${next}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
          rel="next"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
