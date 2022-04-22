// inspired by https://github.com/Mohammad-Faisal/nextjs-sitemap-demo/blob/main/pages/sitemap.xml.js
import * as fs from 'fs';

export async function getServerSideProps({ res }) {
  const paths = fs
    .readdirSync('./src/pages')
    .filter((page) => {
      return ![
        '_app.js',
        '_error.js',
        '404.js',
        '500.js',
        '_document.js',
        'uninstall.js',
        'formsuccess.js',
        'sitemap.xml.js',
      ].includes(page);
    })
    .map((pagePath) => {
      return `https://muetab.com/${pagePath.replace('.js', '')}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
