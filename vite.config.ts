import { defineConfig } from 'vite';

import { fileURLToPath } from 'node:url';

import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      tsconfigPaths: true,
    },

    plugins: [
      !isProd && devtools(),
      isAnalyze &&
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),

      cloudflare({ viteEnvironment: { name: 'ssr' } }),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          crawlLinks: true,
          concurrency: 8,
          filter: ({ path }) =>
            !path.startsWith('/marketplace') &&
            path !== '/download' &&
            path !== '/sitemap.xml',
        },
      }),
      viteReact(),
    ].filter(Boolean),

    build: {
      sourcemap: false,
      rolldownOptions: {
        output: {
          codeSplitting: true,
        },
      },
    },
  };
});
