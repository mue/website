'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Chrome, Globe, Github } from 'lucide-react';
import { FaChrome, FaFirefoxBrowser, FaEdge } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { Button } from '@/components/ui/button';

const browsers = [
  {
    name: 'Chrome',
    Icon: FaChrome,
    description: 'Get Mue for Chrome and Chromium-based browsers',
    url: 'https://chromewebstore.google.com/detail/mue/jfaidnnckeinloipodbgfjjmipgjnllo',
    version: 'Latest version available',
    gradient: 'from-[#4285F4] to-[#34A853]',
    userAgents: ['Chrome', 'Chromium', 'Edg/'],
  },
  {
    name: 'Edge',
    Icon: FaEdge,
    description: 'Get Mue for Microsoft Edge',
    url: 'https://microsoftedge.microsoft.com/addons/detail/mue/aepnglgjfokepefimhbnibfjekidhmja',
    version: 'Optimized for Edge',
    gradient: 'from-[#0078D4] to-[#50E6FF]',
    userAgents: ['Edg/'],
  },
  {
    name: 'Firefox',
    Icon: FaFirefoxBrowser,
    description: 'Get Mue for Firefox',
    url: 'https://addons.mozilla.org/firefox/addon/mue',
    version: 'Firefox Add-on',
    gradient: 'from-[#FF6611] to-[#FF9500]',
    userAgents: ['Firefox'],
  },
  {
    name: 'Whale',
    Icon: SiNaver,
    description: 'Get Mue for NAVER Whale browser',
    url: 'https://store.whale.naver.com/detail/llgbhppoedhhjcammholkkpbkegjicbf',
    version: 'NAVER Whale Store',
    gradient: 'from-[#1BC5E9] to-[#0D67D2]',
    userAgents: ['Whale'],
  },
];

const secondaryDownloads = [
  {
    name: 'Source Code',
    icon: Github,
    description: 'Build from source or contribute to the project',
    url: 'https://github.com/mue/mue',
    version: 'Open source on GitHub',
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

export default function DownloadPage() {
  const [detectedBrowser, setDetectedBrowser] = useState<string | null>(null);

  useEffect(() => {
    setDetectedBrowser(detectBrowser());
  }, []);
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] -z-20 h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.35)_0%,_transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-20%] -z-30 h-[70vh] bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.28)_0%,_transparent_65%)] blur-3xl" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
          <span>Download</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Choose your browser</span>
        </div>

        <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Get Mue for your browser
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          Available for Chrome, Edge, Firefox, and Whale. Install in seconds and transform every new tab
          into a moment of calm and focus.
        </p>

        <div className="mt-16 grid w-full gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {browsers.map((browser) => {
            const Icon = browser.Icon;
            const isDetected = detectedBrowser === browser.name;
            return (
              <div
                key={browser.name}
                className={`group relative overflow-hidden rounded-3xl border p-8 text-left shadow-[0_20px_70px_-40px_rgba(12,12,40,0.8)] backdrop-blur transition-all ${
                  isDetected
                    ? 'border-[#FF5C25]/60 bg-background/95 shadow-[0_25px_90px_-35px_rgba(255,92,37,0.6)] ring-2 ring-[#FF5C25]/30'
                    : 'border-white/10 bg-background/80 hover:border-[#FF5C25]/40 hover:shadow-[0_25px_90px_-35px_rgba(12,12,40,0.95)]'
                }`}
              >
                <div
                  className={`absolute inset-x-0 -top-24 h-48 bg-gradient-to-b ${browser.gradient} opacity-[0.08] blur-3xl transition-opacity group-hover:opacity-[0.14]`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                      <Icon className="h-8 w-8 text-foreground" />
                    </div>
                    {isDetected && (
                      <span className="rounded-full border border-[#FF5C25]/40 bg-[#FF5C25]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF5C25]">
                        Your Browser
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
                    {browser.name}
                  </h3>

                  <p className="mt-3 text-sm text-muted-foreground">{browser.description}</p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {browser.version}
                  </div>

                  <Button
                    size="lg"
                    className="mt-8 w-full shadow-[0_20px_50px_-25px_var(--tw-shadow-color)] shadow-primary/40"
                    asChild
                  >
                    <Link href={browser.url} target="_blank" rel="noreferrer">
                      Add to {browser.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 w-full max-w-3xl">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Other Options
          </h2>
          <div className="grid gap-4">
            {secondaryDownloads.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-background/60 p-6 backdrop-blur transition-all hover:border-[#FF5C25]/40 hover:bg-background/80"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[#FF5C25]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-20 w-full max-w-3xl rounded-3xl border border-white/10 bg-background/60 p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            What happens next?
          </h2>
          <div className="mt-8 space-y-6 text-left">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Install the extension</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the button above to add Mue to your browser from the official store.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Open a new tab</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Launch a new tab and Mue will greet you with a beautiful, personalized experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-sm font-bold text-white">
                3
              </span>
              <div>
                <h3 className="font-semibold text-foreground">Customize your space</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore settings to tailor backgrounds, widgets, and themes to match your
                  workflow.
                </p>
              </div>
            </div>
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
