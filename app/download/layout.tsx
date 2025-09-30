import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download',
  description:
    'Get Mue for Chrome, Edge, and Firefox. Install in seconds and transform every new tab into a moment of calm and focus.',
  openGraph: {
    title: 'Download | Mue',
    description:
      'Get Mue for Chrome, Edge, and Firefox. Install in seconds and transform every new tab into a moment of calm and focus.',
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
