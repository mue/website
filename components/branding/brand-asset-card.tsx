'use client';

import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

interface BrandAssetCardProps {
  title: string;
  description: string;
  isDark: boolean;
}

export function BrandAssetCard({ title, description, isDark }: BrandAssetCardProps) {
  const downloadSVG = () => {
    const svg = document.getElementById(isDark ? 'logo-dark' : 'logo-light');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mue-logo-${isDark ? 'dark' : 'light'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur">
      <div
        className={`flex h-48 items-center justify-center p-8 ${
          isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}
      >
        <Logo
          id={isDark ? 'logo-dark' : 'logo-light'}
          width={120}
          height={120}
          className="h-28 w-28"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <Button onClick={downloadSVG} variant="outline" size="sm" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download SVG
        </Button>
      </div>
    </div>
  );
}
