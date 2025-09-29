import { promises as fs } from "fs";
import type { Dirent } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Element, Root } from "hast";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type TocItem = {
  id: string;
  title: string;
  depth: number;
};

export type DocFrontmatter = {
  title?: string;
  slug?: string;
  description?: string;
  order?: number;
  hidden?: boolean;
};

type DocEntry = {
  frontmatter: DocFrontmatter;
  slug: string[];
  filePath: string;
};

export type LoadedDoc = {
  frontmatter: DocFrontmatter & { title: string };
  slug: string[];
  content: string;
  toc: TocItem[];
  raw: string;
};

export type DocTreeNode = {
  title: string;
  slug: string[];
  href: string;
  order: number;
  hasPage: boolean;
  children?: DocTreeNode[];
};

function isMarkdownFile(file: string) {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

function formatTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

async function collectDocs(dir: string, segments: string[] = []) {
  let entries: Dirent[] = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
  const docs: DocEntry[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      docs.push(...(await collectDocs(path.join(dir, entry.name), [...segments, entry.name])));
      continue;
    }

    if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;

    const filePath = path.join(dir, entry.name);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const frontmatter = data as DocFrontmatter;

    const explicitSlug = frontmatter.slug
      ? frontmatter.slug.replace(/^\/+|\/+$/g, "")
      : undefined;

    const slug = explicitSlug
      ? explicitSlug.split("/")
      : [...segments, entry.name.replace(/\.(mdx|md)$/i, "")];

    docs.push({
      frontmatter,
      slug,
      filePath,
    });
  }

  return docs;
}

function createProcessor(toc: TocItem[]) {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: [
          "no-underline",
          "font-medium",
          "text-muted-foreground",
          "hover:text-foreground",
        ],
      },
    })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false,
    })
    .use(() => (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        if (!node.tagName) return;
        if (!/^h[2-4]$/.test(node.tagName)) return;
        if (!node.properties?.id) return;

        toc.push({
          id: String(node.properties.id),
          title: toString(node),
          depth: Number(node.tagName[1]),
        });
      });
    })
    .use(rehypeStringify, { allowDangerousHtml: true });
}

export async function getDocsTree(): Promise<DocTreeNode[]> {
  const docs = await collectDocs(DOCS_DIR);

  const root: DocTreeNode[] = [];

  const ensureBranch = (entry: DocEntry) => {
    let nodes = root;
    entry.slug.forEach((segment, index) => {
      const path = entry.slug.slice(0, index + 1);
      const slugKey = path.join("/");
      const isLeaf = index === entry.slug.length - 1;
      let node = nodes.find((candidate) => candidate.slug.join("/") === slugKey);

      if (!node) {
        node = {
          title: isLeaf
            ? entry.frontmatter.title ?? formatTitleFromSlug(segment)
            : formatTitleFromSlug(segment),
          slug: path,
          href: `/docs/${path.join("/")}`,
          order: entry.frontmatter.order ?? 0,
          hasPage: isLeaf,
          children: isLeaf ? undefined : [],
        };
        nodes.push(node);
      } else if (isLeaf) {
        node.title = entry.frontmatter.title ?? node.title;
        node.href = `/docs/${path.join("/")}`;
        node.order = entry.frontmatter.order ?? node.order;
        node.hasPage = true;
      }

      if (!isLeaf) {
        node.children = node.children ?? [];
        nodes = node.children;
      }
    });
  };

  docs
    .filter((entry) => !entry.frontmatter.hidden)
    .forEach((entry) => {
      ensureBranch(entry);
    });

  const sortNodes = (nodes: DocTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
    nodes.forEach((node) => {
      if (node.children) {
        sortNodes(node.children);
        if (node.children.length === 0) {
          delete node.children;
        }
      }
    });
  };

  sortNodes(root);

  return root;
}

export async function getDocBySlug(slugSegments: string[]): Promise<LoadedDoc | null> {
  const normalizedSlug = slugSegments.filter(Boolean);
  const docs = await collectDocs(DOCS_DIR);
  const entry = docs.find((doc) => doc.slug.join("/") === normalizedSlug.join("/"));

  if (!entry) return null;

  const raw = await fs.readFile(entry.filePath, "utf8");
  const { content, data } = matter(raw);
  const frontmatter = data as DocFrontmatter;
  const toc: TocItem[] = [];
  const html = await createProcessor(toc).process(content);

  const title = frontmatter.title ?? formatTitleFromSlug(normalizedSlug.at(-1) ?? "Document");

  return {
    frontmatter: { ...frontmatter, title },
    slug: normalizedSlug,
    content: html.toString(),
    toc,
    raw: content,
  };
}

export async function getAllDocsMeta() {
  const docs = await collectDocs(DOCS_DIR);
  return docs
    .filter((doc) => !doc.frontmatter.hidden)
    .map((doc) => ({
      title: doc.frontmatter.title ?? formatTitleFromSlug(doc.slug.at(-1) ?? "Document"),
      slug: doc.slug,
      href: `/docs/${doc.slug.join("/")}`,
      order: doc.frontmatter.order ?? 0,
      description: doc.frontmatter.description,
    }));
}
