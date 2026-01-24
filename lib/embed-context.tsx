'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { ScrollToTop } from '@/components/scroll-to-top';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

type EmbedContextType = {
  isEmbed: boolean;
  isPreview: boolean;
  sendMessage: (type: string, payload: any) => void;
  config: EmbedConfig;
  buildEmbedUrl: (path: string, hasExistingParams?: boolean) => string;
};

type EmbedConfig = {
  theme?: 'light' | 'dark' | 'system';
  filters?: { type?: string; collection?: string };
  viewMode?: 'grid' | 'list';
};

const EmbedContext = createContext<EmbedContextType | undefined>(undefined);

export function EmbedProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEmbed = searchParams?.get('embed') === 'true';
  const isPreview = searchParams?.get('preview') === 'true';
  const [config, setConfig] = useState<EmbedConfig>({});

  // Helper to build URLs with embed/preview params preserved
  const buildEmbedUrl = (path: string, hasExistingParams = false) => {
    if (!isEmbed) return path;
    const separator = hasExistingParams ? '&' : '?';
    const params = isPreview ? 'embed=true&preview=true' : 'embed=true';
    return `${path}${separator}${params}`;
  };

  // Send ready message when embed mode is initialized
  useEffect(() => {
    if (isEmbed && typeof window !== 'undefined') {
      window.parent.postMessage({ type: 'marketplace:ready', payload: null }, '*');
    }
  }, [isEmbed]);

  // Listen for messages from parent
  useEffect(() => {
    if (!isEmbed) return;

    const handleMessage = (event: MessageEvent) => {
      const { type, payload } = event.data;

      if (type === 'marketplace:config') {
        setConfig(payload);

        // Apply theme if provided
        if (payload.theme && typeof window !== 'undefined') {
          const themeEvent = new CustomEvent('embed-theme-change', {
            detail: { theme: payload.theme },
          });
          window.dispatchEvent(themeEvent);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isEmbed]);

  // Track navigation changes
  useEffect(() => {
    if (isEmbed) {
      sendMessage('marketplace:navigation', { path: pathname });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isEmbed]);

  const sendMessage = (type: string, payload: any) => {
    if (isEmbed && typeof window !== 'undefined') {
      window.parent.postMessage({ type, payload }, '*');
    }
  };

  return (
    <EmbedContext.Provider value={{ isEmbed, isPreview, sendMessage, config, buildEmbedUrl }}>
      {children}
    </EmbedContext.Provider>
  );
}

export function useEmbed() {
  const context = useContext(EmbedContext);
  if (!context) {
    throw new Error('useEmbed must be used within EmbedProvider');
  }
  return context;
}

export function EmbedLayoutWrapper({ children }: { children: ReactNode }) {
  const { isEmbed } = useEmbed();

  if (isEmbed) {
    // Embed mode: no navbar/footer, reduced spacing
    return <main className="flex-1">{children}</main>;
  }

  // Normal mode: with navbar/footer
  return (
    <>
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
    </>
  );
}
