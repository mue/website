'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <EmbedThemeSync />
      {children}
    </NextThemesProvider>
  );
}

function EmbedThemeSync() {
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: string }>;
      setTheme(customEvent.detail.theme);
    };

    window.addEventListener('embed-theme-change', handleThemeChange);
    return () => window.removeEventListener('embed-theme-change', handleThemeChange);
  }, [setTheme]);

  return null;
}
