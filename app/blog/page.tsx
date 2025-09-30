import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";

import { getAllBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-static";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

          <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Stories from the Mue community
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Product updates, technical deep-dives, and thoughts on building
            mindful browser experiences.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card/70 p-12 text-center backdrop-blur">
            <p className="text-muted-foreground">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-[0_18px_60px_-45px_rgba(12,14,40,0.65)] backdrop-blur transition-all hover:-translate-y-1 hover:border-[#FF5C25]/50 hover:shadow-[0_35px_90px_-45px_rgba(12,12,40,0.9)]"
              >
                {post.frontmatter.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.frontmatter.date)}
                    </span>
                    {post.frontmatter.author && (
                      <>
                        <span className="text-muted-foreground/50">"</span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {post.frontmatter.author}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="mb-3 font-display text-xl font-semibold tracking-tight text-foreground transition group-hover:text-primary">
                    {post.frontmatter.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}

                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="rounded-full text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}