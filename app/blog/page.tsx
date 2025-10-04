import type { Metadata } from 'next';
// All list rendering handled client-side in BlogFilter
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

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.28)_0%,_transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
            <span>Blog</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Insights & Updates</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Stories from the Mue community
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
