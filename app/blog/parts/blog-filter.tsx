'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from '@/components/blog/blog-card';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

// Types based on expected shape from getAllBlogPosts
interface Frontmatter {
  title: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  imagePlaceholder?: string;
}
interface BlogPost {
  slug: string;
  excerpt?: string;
  frontmatter: Frontmatter;
}

interface BlogFilterProps {
  initialPosts: BlogPost[];
}

const FILTER_TAGS = [
  { label: 'All', value: 'all' },
  { label: 'Announcements', value: 'announcement' },
  { label: 'Updates', value: 'update' },
];

export function BlogFilter({ initialPosts }: BlogFilterProps) {
  const [filter, setFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filtered = useMemo(() => {
    const list =
      filter === 'all'
        ? initialPosts
        : initialPosts.filter((p) =>
            p.frontmatter.tags?.map((t) => t.toLowerCase()).includes(filter),
          );
    return [...list].sort((a, b) => {
      const da = new Date(a.frontmatter.date).getTime();
      const db = new Date(b.frontmatter.date).getTime();
      return sortOrder === 'newest' ? db - da : da - db;
    });
  }, [filter, initialPosts, sortOrder]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {FILTER_TAGS.map((tag) => {
            const active = filter === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                {...(active ? { 'aria-pressed': 'true' } : { 'aria-pressed': 'false' })}
                onClick={() => setFilter(tag.value)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0',
                  active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background/40 border-border hover:border-primary/40 text-muted-foreground hover:text-foreground',
                )}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Sort
          </span>
          <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
            <SelectTrigger size="sm" className="min-w-[9rem]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card/70 p-12 text-center backdrop-blur">
          <p className="text-muted-foreground">No posts for this filter.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
