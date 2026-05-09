import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { ChevronLeft } from 'lucide-react';

import { BlogCard } from '@/components/blog/blog-card';
import { buttonVariants } from '@/components/ui/button';

import { getAllBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants/site';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/blog/tag/$tag')({
  loader: async ({ params }) => {
    const posts = await getAllBlogPosts();
    const filtered = posts.filter((p) =>
      p.frontmatter.tags?.map((t) => t.toLowerCase()).includes(params.tag.toLowerCase()),
    );
    if (filtered.length === 0) throw notFound();
    return { filtered, tag: params.tag };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { tag } = loaderData;
    const readable = tag.replace(/-/g, ' ');
    const title = readable.charAt(0).toUpperCase() + readable.slice(1);
    const description = `Articles tagged with ${readable} on the Mue Blog.`;

    return {
      meta: [
        { title: `${title} | Mue Blog` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${title} | Mue Blog` },
        { property: 'og:description', content: description },
      ],
      links: [{ rel: 'canonical', href: `${SITE_URL}/blog/tag/${tag}` }],
    };
  },
  component: TagPage,
});

function TagPage() {
  const { filtered, tag } = Route.useLoaderData();
  const readable = tag.replace(/-/g, ' ');

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.22)_0%,_transparent_60%)] blur-3xl" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Link
          to="/blog"
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
