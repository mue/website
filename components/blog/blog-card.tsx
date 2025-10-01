'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { BlogImage } from '@/components/blog/blog-image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface BlogCardPostLike {
  slug: string;
  excerpt?: string;
  frontmatter: {
    title: string;
    date: string;
    author?: string;
    image?: string;
    tags?: string[];
    imagePlaceholder?: string;
  };
}

interface BlogCardProps {
  post: BlogCardPostLike;
  sizes?: string;
  className?: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogCard({ post, sizes, className }: BlogCardProps) {
  const { frontmatter } = post;
  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-[0_18px_60px_-45px_rgba(12,14,40,0.65)] backdrop-blur transition-all focus-within:-translate-y-1 hover:-translate-y-1 hover:border-[#FF5C25]/50 focus-within:border-[#FF5C25]/50 hover:shadow-[0_35px_90px_-45px_rgba(12,12,40,0.9)] focus-within:shadow-[0_35px_90px_-45px_rgba(12,12,40,0.9)]',
        className,
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read post: ${frontmatter.title}`}
        className="absolute inset-0 z-10"
        tabIndex={0}
      />
      <div className="pointer-events-none absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#FF5C25]/60 group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5">
        <ArrowRight
          className="h-4 w-4 text-white/70 transition-colors group-hover:text-white group-focus-within:text-white"
          aria-hidden
        />
      </div>
      {frontmatter.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <BlogImage
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105 group-focus-within:scale-105"
            sizes={sizes || '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
            blurDataURL={frontmatter.imagePlaceholder}
            placeholder={frontmatter.imagePlaceholder ? 'blur' : 'empty'}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      )}

      <div className="pointer-events-none flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time itemProp="datePublished" dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
          </span>
          {frontmatter.author && (
            <>
              <span className="text-muted-foreground/50">&bull;</span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{frontmatter.author}</span>
                </span>
              </span>
            </>
          )}
        </div>

        <h2
          className="mb-3 text-xl font-semibold tracking-tight text-foreground transition group-hover:text-primary group-focus-within:text-primary"
          itemProp="headline"
        >
          {frontmatter.title}
        </h2>

        {post.excerpt && (
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground" itemProp="description">
            {post.excerpt}
          </p>
        )}

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2" itemProp="keywords">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <span className="mt-auto h-0" aria-hidden />
      </div>
    </article>
  );
}
