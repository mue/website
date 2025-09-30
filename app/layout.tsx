import './globals.css';

import type { Metadata } from 'next';
import { Lexend_Deca, Inter, Alfa_Slab_One } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ScrollToTop } from '@/components/scroll-to-top';

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
    default: 'Mue - Your mindful new tab',
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
    title: 'Mue - Your mindful new tab',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Mue - Your mindful new tab',
    description:
      'A fast, open and free-to-use browser extension that gives a new, fresh and customisable tab page to modern browsers.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#ff5c25',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendDeca.variable} ${inter.variable} ${alfaSlabOne.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50">
              <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-12">
                <Navbar />
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
