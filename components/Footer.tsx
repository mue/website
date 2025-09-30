import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';

const footerLinks = {
  Product: [
    { name: 'Download', href: '/download' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Blog', href: '/blog' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API', href: '/docs/api/introduction' },
    { name: 'GitHub', href: 'https://github.com/mue/mue' },
  ],
  Community: [
    { name: 'Discord', href: 'https://discord.gg/zv8C9F8' },
    { name: 'Twitter', href: 'https://twitter.com/getmue' },
    { name: 'Contact', href: '/contact' },
    {
      name: 'Contribute',
      href: 'https://github.com/mue/mue/blob/main/CONTRIBUTING.md',
    },
  ],
  Legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'License', href: '/license' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link href="/" className="inline-block">
              <Logo className="h-12 w-12" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A mindful new tab experience that brings calm and focus to every browsing session.
            </p>
            <a
              href="https://status.muetab.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>All systems operational</span>
            </a>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://github.com/mue/mue"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/getmue"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2019-{new Date().getFullYear()} The Mue Authors. Open source and built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
