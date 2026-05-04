import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo',
  description:
    'Experience Mue Tab in action. Try out the demo to see how Mue can transform your browsing experience.',
  openGraph: {
    title: 'Demo | Mue',
    description:
      'Experience Mue Tab in action. Try out the demo to see how Mue can transform your browsing experience.',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
