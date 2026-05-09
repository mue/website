import { createFileRoute } from '@tanstack/react-router';

import { BlogFilter } from '@/components/blog/blog-filter';

import { getAllBlogPosts } from '@/lib/blog';

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>) => ({
    filter: search.filter as string | undefined,
  }),
  loader: () => getAllBlogPosts(),
  head: () => ({
    meta: [
      { title: 'Blog | Mue' },
      {
        name: 'description',
        content:
          'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.',
      },
      { property: 'og:title', content: 'Blog | Mue' },
      {
        property: 'og:description',
        content:
          'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.',
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const posts = Route.useLoaderData();
  const { filter } = Route.useSearch();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Updates from the Mue team
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Release changelogs, feature explanations and announcements for the tab.
          </p>
        </header>

        <BlogFilter initialPosts={posts} initialFilter={filter} />
      </div>
    </div>
  );
}
