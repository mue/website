import { createFileRoute } from '@tanstack/react-router'

import { getAllBlogPosts } from '@/lib/blog'
import { getMarketplaceItems, getItemCategory } from '@/lib/marketplace'
import { getAllDocsMeta } from '@/lib/docs'
import { SITE_URL } from '@/lib/constants/site'

const staticRoutes = [
  '/', '/blog', '/docs', '/marketplace', '/marketplace/collections',
  '/marketplace/authors', '/showcase', '/photography', '/download',
  '/demo', '/branding', '/contact', '/privacy', '/license',
]

export const Route = createFileRoute('/sitemap.xml')({
  loader: async () => {
    const [posts, items, docsMeta] = await Promise.all([
      getAllBlogPosts(),
      getMarketplaceItems(),
      getAllDocsMeta(),
    ])

    const staticUrls = staticRoutes.map(
      (path) => `  <url><loc>${SITE_URL}${path}</loc><changefreq>weekly</changefreq></url>`,
    )

    const blogUrls = posts.map(
      (post) =>
        `  <url><loc>${SITE_URL}/blog/${post.slug}</loc>` +
        `<lastmod>${post.frontmatter.dateModified ?? post.frontmatter.date}</lastmod>` +
        `<changefreq>monthly</changefreq></url>`,
    )

    const itemUrls = items.map(
      (item) =>
        `  <url><loc>${SITE_URL}/marketplace/${getItemCategory(item.type)}/${encodeURIComponent(item.id)}</loc>` +
        `<lastmod>${item.updated_at ?? item.created_at ?? ''}</lastmod>` +
        `<changefreq>weekly</changefreq></url>`,
    )

    const docsUrls = docsMeta.map(
      (doc) =>
        `  <url><loc>${SITE_URL}${doc.href}</loc><changefreq>monthly</changefreq></url>`,
    )

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...staticUrls,
      ...blogUrls,
      ...itemUrls,
      ...docsUrls,
      '</urlset>',
    ].join('\n')

    throw new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    })
  },
  component: () => null,
})
