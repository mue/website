'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { AlertTriangle, ArrowRight } from 'lucide-react';
import { FaChrome, FaEdge, FaFirefoxBrowser } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { SiNaver } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { BrowserCard } from '@/components/download/browser-card';
import { NumberedStep } from '@/components/download/numbered-step';

import { BROWSER_STORE_URLS } from '@/lib/constants/browser-links';

interface BrowserVersions {
  chrome: string | null;
  edge: string | null;
  firefox: string | null;
  whale: string | null;
}

const browsers = [
  {
    name: 'Chrome',
    Icon: FaChrome,
    description: 'Get Mue for Chrome and Chromium-based browsers',
    url: BROWSER_STORE_URLS.chrome,
    versionKey: 'chrome' as keyof BrowserVersions,
    gradient: 'from-[#4285F4] to-[#34A853]',
    userAgents: ['Chrome', 'Chromium', 'Edg/'],
  },
  {
    name: 'Edge',
    Icon: FaEdge,
    description: 'Get Mue for Microsoft Edge',
    url: BROWSER_STORE_URLS.edge,
    versionKey: 'edge' as keyof BrowserVersions,
    gradient: 'from-[#0078D4] to-[#50E6FF]',
    userAgents: ['Edg/'],
  },
  {
    name: 'Firefox',
    Icon: FaFirefoxBrowser,
    description: 'Get Mue for Firefox',
    url: BROWSER_STORE_URLS.firefox,
    versionKey: 'firefox' as keyof BrowserVersions,
    gradient: 'from-[#FF6611] to-[#FF9500]',
    userAgents: ['Firefox'],
  },
  {
    name: 'Whale',
    Icon: SiNaver,
    description: 'Get Mue for NAVER Whale browser',
    url: BROWSER_STORE_URLS.whale,
    versionKey: 'whale' as keyof BrowserVersions,
    gradient: 'from-[#1BC5E9] to-[#0D67D2]',
    userAgents: ['Whale'],
  },
];

const secondaryDownloads = [
  {
    name: 'Source Code',
    icon: FaGithub,
    description: 'Build from source or contribute to the project',
    url: 'https://github.com/mue/mue',
    version: 'Open source on GitHub',
  },
];

const steps = [
  {
    number: 1,
    title: 'Install the extension',
    description: 'Click the button above to add Mue to your browser from the official store.',
  },
  {
    number: 2,
    title: 'Open a new tab',
    description: 'Launch a new tab and Mue will guide you through the initial setup process.',
  },
  {
    number: 3,
    title: 'Customise your space',
    description:
      'Explore settings to tailor backgrounds, widgets, and more to match your workflow.',
  },
];

function detectBrowser(): string | null {
  if (typeof window === 'undefined') return null;
  const ua = navigator.userAgent;

  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome') || ua.includes('Chromium')) return 'Chrome';

  return null;
}

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

export default function DownloadPage() {
  const [detectedBrowser, setDetectedBrowser] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [versions, setVersions] = useState<BrowserVersions>({
    chrome: null,
    edge: null,
    firefox: null,
    whale: null,
  });
  const [versionsLoading, setVersionsLoading] = useState(true);

  useEffect(() => {
    setDetectedBrowser(detectBrowser());
    setIsMobile(isMobileDevice());

    fetch('/api/browser-versions')
      .then((res) => res.json())
      .then((data: BrowserVersions) => setVersions(data))
      .catch((error) => console.error('Failed to fetch browser versions:', error))
      .finally(() => setVersionsLoading(false));
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center">
        {isMobile && (
          <div className="mb-10 w-full max-w-3xl rounded-2xl border border-yellow-500/30 bg-yellow-500/[0.08] p-6 text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-yellow-500" />
            <p className="text-base font-semibold text-foreground">Desktop only</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Mue is a browser extension for desktop computers. Visit this page on your computer to install.
            </p>
          </div>
        )}

        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Get Mue for your browser
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          Available for Chrome, Edge, Firefox, and Whale. Install in seconds and transform every new
          tab into a moment of calm and focus.
        </p>

        <div className="mt-16 grid w-full gap-6 grid-cols-1 sm:grid-cols-2">
          {browsers.map((browser) => {
            const version = versions[browser.versionKey];
            const displayVersion = versionsLoading
              ? 'Loading version...'
              : version
                ? `Version ${version}`
                : 'Latest version available';

            return (
              <BrowserCard
                key={browser.name}
                name={browser.name}
                icon={browser.Icon}
                description={browser.description}
                url={browser.url}
                version={displayVersion}
                gradient={browser.gradient}
                isDetected={detectedBrowser === browser.name}
              />
            );
          })}
        </div>

        <div className="mt-12 w-full max-w-3xl">
          <p className="mb-4 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
            Other options
          </p>

          <div className="grid gap-4">
            {secondaryDownloads.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-primary/30 hover:bg-card/80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-20 w-full max-w-3xl text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What happens next?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">Up and running in under a minute.</p>
          <div className="mt-8">
            {steps.map((step, i) => (
              <NumberedStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <p>Need help getting started?</p>
          <Button variant="outline" asChild>
            <Link href="/docs/introduction">
              View Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
