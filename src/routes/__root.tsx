import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { Suspense } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { NotFoundPage } from '@/components/not-found-page';
import { EmbedProvider, EmbedLayoutWrapper } from '@/lib/embed-context';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/json-ld';
import { SITE_URL } from '@/lib/constants/site';

import styles from '../styles.css?url';

// Prevents flash of wrong theme before React hydrates
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=(t==='light'||t==='dark')?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',d==='dark')}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mue - Modifiable. User-centric. Experience.' },
      {
        name: 'description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { name: 'theme-color', content: '#ff5c25' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:title', content: 'Mue - Modifiable. User-centric. Experience.' },
      {
        property: 'og:description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { property: 'og:site_name', content: 'Mue' },
      { property: 'og:image', content: `${SITE_URL}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Mue - Modifiable. User-centric. Experience.' },
      {
        name: 'twitter:description',
        content:
          'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
      },
      { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: 'stylesheet', href: styles },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Suspense fallback={null}>
            <EmbedProvider>
              <EmbedLayoutWrapper>
                <Outlet />
              </EmbedLayoutWrapper>
            </EmbedProvider>
          </Suspense>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"9afb1f4a6f99424590b9f96620879e2a"}'
        />
      </body>
    </html>
  );
}
