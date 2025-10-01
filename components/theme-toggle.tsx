'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme !== 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
