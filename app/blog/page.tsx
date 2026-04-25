import type { Metadata } from 'next';

import { getAllBlogPosts } from '@/lib/blog';

import { BlogFilter } from './parts/blog-filter';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.',
  openGraph: {
    title: 'Blog | Mue',
    description:
      'Product updates, technical deep-dives, and thoughts on building mindful browser experiences.',
  },
};

export const revalidate = 3600; // hourly

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Updates from the Mue team
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Product updates, technical deep-dives, and thoughts on building mindful browser
            experiences.
          </p>
        </header>

        <BlogFilter initialPosts={posts} />
      </div>
    </div>
  );
}
