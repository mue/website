'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import Logo from './logo';

import { ThemeToggle } from './theme-toggle';

const footerLinks = {
  Product: [
    { name: 'Download', href: '/download' },
    { name: 'Demo', href: '/demo' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Blog', href: '/blog' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API', href: '/docs/api/introduction' },
    { name: 'FAQ', href: '/docs/faq' },
    { name: 'Status', href: 'https://status.muetab.com' },
    { name: 'Changelog', href: 'https://github.com/mue/mue/releases' },
    { name: 'GitHub', href: 'https://github.com/mue/mue' },
  ],
  Community: [
    { name: 'Join Discord', href: 'https://discord.gg/zv8C9F8' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'Contribute Addon', href: '/marketplace/create' },
    { name: 'Contact', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'License', href: '/license' },
    { name: 'DMCA', href: '/dmca' },
  ],
};

type SystemStatus = 'operational' | 'degraded' | 'loading';

export default function Footer() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('loading');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/mue/status/master/history/summary.json',
        );
        const data = await response.json();

        const allUp = data.every((service: { status: string }) => service.status === 'up');
        setSystemStatus(allUp ? 'operational' : 'degraded');
      } catch {
        setSystemStatus('degraded');
      }
    };

    fetchStatus();
  }, []);

  const statusConfig = {
    operational: {
      text: 'All systems are operational',
      dotColor: 'bg-emerald-500',
    },
    degraded: {
      text: 'Degraded performance',
      dotColor: 'bg-yellow-500',
    },
    loading: {
      text: 'Checking status...',
      dotColor: 'bg-gray-500',
    },
  };

  const status = statusConfig[systemStatus];

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link href="/" className="inline-block">
              <Logo className="h-12 w-12" />
            </Link>

            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              <span className="font-bold">M</span>odifiable. <span className="font-bold">U</span>
              ser-centric. <span className="font-bold">E</span>xperience.
              <br />
              That&apos;s Mue.
            </p>
            <a
              href="https://status.muetab.com"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
            >
              <span className={`inline-flex h-2 w-2 rounded-full ${status.dotColor}`} />
              <span>{status.text}</span>
            </a>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://github.com/mue/mue"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/getmue"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition hover:border-[#FF5C25]/40 hover:text-foreground"
              >
                <FaXTwitter className="h-4 w-4" />
                <span className="sr-only">X (formerly Twitter)</span>
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
                        className="cursor-pointer text-sm text-muted-foreground transition hover:text-foreground"
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

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2019-{new Date().getFullYear()} The Mue Authors. Licensed under{' '}
            <Link href="/license" className="cursor-pointer underline underline-offset-4 decoration-muted-foreground/50 hover:text-foreground hover:decoration-foreground transition-colors">
              BSD-3-Clause
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
