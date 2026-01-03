import './globals.css';

import type { Metadata } from 'next';
import { Alfa_Slab_One, Inter, Lexend_Deca } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from '@/components/theme-provider';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/json-ld';
import { EmbedProvider, EmbedLayoutWrapper } from '@/lib/embed-context';

const lexendDeca = Lexend_Deca({
  variable: '--font-lexend-deca',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const alfaSlabOne = Alfa_Slab_One({
  variable: '--font-alfa-slab-one',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muetab.com'),
  title: {
    default: 'Mue - Modifiable. User-centric. Experience.',
    template: '%s | Mue',
  },
  description:
    'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
  keywords: [
    'mue',
    'new tab',
    'browser extension',
    'customizable',
    'productivity',
    'chrome',
    'firefox',
    'edge',
  ],
  authors: [{ name: 'Mue Team', url: 'https://muetab.com' }],
  creator: 'Mue Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muetab.com',
    title: 'Mue - Modifiable. User-centric. Experience.',
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    siteName: 'Mue',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mue',
      },
    ],
  },
  other: {
    'theme-color': '#ff5c25',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mue - Modifiable. User-centric. Experience.',
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body
        className={`${lexendDeca.variable} ${inter.variable} ${alfaSlabOne.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EmbedProvider>
            <EmbedLayoutWrapper>{children}</EmbedLayoutWrapper>
          </EmbedProvider>
        </ThemeProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: '9afb1f4a6f99424590b9f96620879e2a' })}
        />
      </body>
    </html>
  );
}
