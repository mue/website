import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

import { parseFrontmatter } from '@/lib/frontmatter';

const blogFiles = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export type BlogFrontmatter = {
  title: string;
  date: string;
  author?: string;
  description?: string;
  image?: string;
  tags?: string[];
  dateModified?: string;
  imagePlaceholder?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  excerpt?: string;
  readingTime?: string;
  wordCount?: number;
};

export type BlogPostPreview = {
  slug: string;
  frontmatter: BlogFrontmatter;
  excerpt?: string;
  readingTime?: string;
  wordCount?: number;
};

function createProcessor() {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: { className: ['no-underline'] },
    })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  const posts: BlogPostPreview[] = [];

  for (const [filePath, raw] of Object.entries(blogFiles)) {
    const fileName = filePath.split('/').pop()!;
    const { data, content } = parseFrontmatter<BlogFrontmatter>(raw);
    const frontmatter = data;
    const slug = fileName.replace(/\.(mdx|md)$/i, '');
    const excerpt =
      frontmatter.description ||
      content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200);
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readingTime = `${Math.max(1, Math.round(wordCount / 180))} min read`;
    posts.push({ slug, frontmatter, excerpt, wordCount, readingTime });
  }

  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entry = Object.entries(blogFiles).find(
    ([path]) => path.endsWith(`/${slug}.md`) || path.endsWith(`/${slug}.mdx`),
  );
  if (!entry) return null;

  const [, raw] = entry;
  const { content, data } = parseFrontmatter<BlogFrontmatter>(raw);
  const frontmatter = data;
  const html = await createProcessor().process(content);
  const excerpt =
    frontmatter.description || content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200);
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(1, Math.round(wordCount / 180))} min read`;

  return {
    slug,
    frontmatter,
    content: html.toString(),
    excerpt,
    wordCount,
    readingTime,
  };
}
