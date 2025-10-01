/** @type {import('next-sitemap').IConfig} */
import fs from 'fs';
import path from 'path';

const config = {
  siteUrl: process.env.SITE_URL || 'https://muetab.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async (config) => {
    const result = [];
    // Blog posts for deriving tags & pagination counts
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    let files = [];
    try {
      files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
    } catch {}
    const posts = [];
    const tags = new Set();
    for (const file of files) {
      const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const fmMatch = /---([\s\S]*?)---/.exec(raw);
      if (fmMatch) {
        const front = fmMatch[1];
        const tagLineMatches = front.match(/tags:\s*\[[^\]]*\]/i);
        if (tagLineMatches) {
          const inner = tagLineMatches[0].replace(/tags:\s*\[/i, '').replace(/\]$/, '');
          inner
            .split(',')
            .map((t) => t.trim().replace(/^['\"]|['\"]$/g, ''))
            .filter(Boolean)
            .forEach((t) => tags.add(t.toLowerCase()));
        }
      }
      const slug = file.replace(/\.(md|mdx)$/i, '');
      posts.push({ slug });
    }
    const PAGE_SIZE = 9;
    const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    for (let p = 2; p <= totalPages; p++) {
      result.push(await config.transform(config, `/blog/page/${p}`));
    }
    for (const tag of tags) {
      result.push(await config.transform(config, `/blog/tag/${tag}`));
    }
    return result;
  },
};

export default config;
