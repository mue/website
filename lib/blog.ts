import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogFrontmatter = {
  title: string;
  date: string;
  author?: string;
  description?: string;
  image?: string;
  tags?: string[];
  dateModified?: string; // optional ISO date for updates
  imagePlaceholder?: string; // optional base64 blur placeholder
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

function isMarkdownFile(file: string) {
  return file.endsWith('.md') || file.endsWith('.mdx');
}

function createProcessor() {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: [
          'no-underline',
          'font-medium',
          'text-muted-foreground',
          'hover:text-foreground',
        ],
      },
    })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true });
}

export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  let entries;
  try {
    entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const posts: BlogPostPreview[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;

    const filePath = path.join(BLOG_DIR, entry.name);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const frontmatter = data as BlogFrontmatter;

    const slug = entry.name.replace(/\.(mdx|md)$/i, '');

    // Extract excerpt from content (first paragraph)
    const excerpt =
      frontmatter.description ||
      content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200);

    // Basic word metrics
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(wordCount / 180));
    const readingTime = `${minutes} min read`;

    posts.push({
      slug,
      frontmatter,
      excerpt,
      wordCount,
      readingTime,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    try {
      raw = await fs.readFile(mdxPath, 'utf8');
    } catch {
      return null;
    }
  }

  const { content, data } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const html = await createProcessor().process(content);

  const excerpt =
    frontmatter.description || content.split('\n\n')[0]?.replace(/[#*`]/g, '').trim().slice(0, 200);

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 180));
  const readingTime = `${minutes} min read`;

  return {
    slug,
    frontmatter,
    content: html.toString(),
    excerpt,
    wordCount,
    readingTime,
  };
}
