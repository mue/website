'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { FaChrome, FaFirefoxBrowser, FaEdge } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

import { Button } from '@/components/ui/button';

const stats = ['Launched 2018', '5,000+ monthly active users', '10 million+ tabs opened'];

const communityStats = [
  {
    label: 'Collaborators',
    value: '50+',
    description: 'Open-source builders keeping Mue fresh.',
  },
  {
    label: 'GitHub Stars',
    value: '600+',
    description: 'Loved by developers across the globe.',
  },
  {
    label: 'Forks',
    value: '70+',
    description: 'Experiments and extensions from the community.',
  },
  {
    label: 'Users',
    value: '5k+ monthly',
    description: 'Daily focus seekers tuning their tabs.',
  },
  {
    label: 'Tabs Opened',
    value: '10M+',
    description: 'Countless sessions powered by our APIs.',
  },
  {
    label: 'Origins',
    value: 'Est. 2018',
    description: 'Years of iteration and mindful design.',
  },
];

const scrollFeatures = [
  {
    eyebrow: 'Eye candy',
    title: 'Backgrounds that hit different',
    description:
      'Pick from curated photo packs or let Mue auto-rotate stunning scenery based on your time of day.',
    bullets: [
      'A hand-picked exclusive library of backgrounds',
      'Community supplied packs available in the Marketplace',
    ],
  },
  {
    eyebrow: 'Stay locked in',
    title: 'Quotes that actually resonate',
    description:
      'Words that resonate, in your language. Start every tab with quotes that match your mood and mindset.',
    bullets: ['hand picked quotes', 'Community curated quote packs'],
  },
  {
    eyebrow: 'Privacy first',
    title: 'Your data, your rules',
    description:
      'Mue is built with privacy at its core. Your data stays on your device and is never sold or shared.',
    bullets: ['No personal data collection', 'Fully open source on GitHub'],
  },
];

const browsers = [
  {
    name: 'Chrome',
    tagline: 'Chromium flagship',
    Icon: FaChrome,
    iconClass:
      'bg-[conic-gradient(from_120deg_at_50%_50%,#DB4437_0deg,#DB4437_90deg,#F4B400_90deg,#F4B400_180deg,#0F9D58_180deg,#0F9D58_270deg,#4285F4_270deg,#4285F4_360deg)]',
    innerDotClass: 'bg-[#1A73E8]',
    shadowClass: 'shadow-[0_16px_35px_-18px_rgba(66,133,244,0.55)]',
  },
  {
    name: 'Edge',
    tagline: 'Microsoft Edge',
    Icon: FaEdge,
    iconClass: 'bg-[linear-gradient(135deg,#00A4EF_0%,#0078D7_55%,#174EB6_100%)]',
    innerDotClass: 'bg-[#0F5BB5]',
    shadowClass: 'shadow-[0_16px_35px_-18px_rgba(0,120,215,0.55)]',
  },
  {
    name: 'Firefox',
    tagline: 'Mozilla Firefox',
    Icon: FaFirefoxBrowser,
    iconClass: 'bg-[linear-gradient(135deg,#FF9500_0%,#FF7139_40%,#FF4F5E_70%,#9C2AA0_100%)]',
    innerDotClass: 'bg-[#FF9500]',
    shadowClass: 'shadow-[0_16px_35px_-18px_rgba(255,113,57,0.55)]',
  },
  {
    name: 'Whale',
    tagline: 'NAVER Whale',
    Icon: SiNaver,
    iconClass: 'bg-[linear-gradient(135deg,#1BC5E9_0%,#0D67D2_100%)]',
    innerDotClass: 'bg-[#1BC5E9]',
    shadowClass: 'shadow-[0_16px_35px_-18px_rgba(27,197,233,0.55)]',
  },
];

export default function Home() {
  const [greeting, setGreeting] = useState('Evening');
  const [ellipsis, setEllipsis] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Afternoon');
    } else {
      setGreeting('Evening');
    }
  }, []);

  useEffect(() => {
    const frames = ['', '.', '..', '...'] as const;
    let frameIndex = 0;

    const interval = window.setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      setEllipsis(frames[frameIndex]);
    }, 420);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pb-12 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[100vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.4)_0%,_transparent_50%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-30 h-[80vh] bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.35)_0%,_transparent_60%)] blur-3xl" />

        <div className="mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:items-center">
            {/* Left column - Content */}
            <div className="flex flex-col">
              {/* <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF5C25]/30 bg-gradient-to-r from-[#FF5C25]/10 to-[#FF456E]/10 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#FF5C25] backdrop-blur">
                <span>New Tab</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E]" />
                <span>Reimagined</span>
              </div> */}

              <h1 className="mt-8 text-balance text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block animate-fade-up animate-delay-100">
                  <b className="font-heading tracking-wide font-light">
                    {greeting}
                    <span className="sr-only">...</span>
                    <span aria-hidden="true" className="ml-1 inline-block w-4 text-left">
                      {ellipsis}
                    </span>
                  </b>
                </span>
                <span className="mt-2 block animate-fade-up animate-delay-200">
                  Stop staring at <b className="font-heading tracking-wide font-light">blank</b>{' '}
                  tabs.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:text-lg animate-fade-up animate-delay-300">
                Every tab hits different with Mue. Stunning backgrounds, quotes that slap,
                notes—everything you need to lock in. No fluff. No distractions. Just pure focus
                energy.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up animate-delay-400">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#FF5C25] to-[#FF456E] px-6 py-4 text-sm font-semibold shadow-[0_20px_60px_-20px_rgba(255,92,37,0.5)] transition-all hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.6)] hover:scale-105 sm:text-base"
                  asChild
                >
                  <Link href="/download">
                    <span className="relative z-10">Get Mue—It&apos;s Free</span>
                    <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#FF456E] to-[#FF5C25] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#FF5C25]/30 px-6 py-4 text-sm font-semibold transition-all hover:border-[#FF5C25] hover:bg-[#FF5C25]/5 sm:text-base"
                  asChild
                >
                  {/* <Link href="/demo">
                    <Rocket className="mr-2 h-4 w-4" />
                    Try the demo
                  </Link> */}
                  <Link href="/demo">
                    <Rocket className="mr-2 h-4 w-4" />
                    Try it now
                  </Link>
                  {/* <Link href="/demo">
                    <Play className="mr-2 h-4 w-4" />
                    Try it now
                  </Link> */}
                </Button>
              </div>

              <div className="mt-8 space-y-3 animate-fade-up animate-delay-600">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                  Trusted worldwide
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground/80 sm:text-sm">
                  {stats.map((stat) => (
                    <div key={stat} className="flex items-center gap-2">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E]" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Screenshot */}
            <div className="relative lg:order-last">
              <div className="absolute -inset-6 rounded-full bg-[linear-gradient(135deg,_rgba(255,92,37,0.25),_rgba(255,69,110,0.25))] blur-[50px] lg:-inset-10 lg:blur-[70px]" />

              <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-950/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur animate-fade-zoom animate-delay-300">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF5C25]" />
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FFB425]" />
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF456E]" />
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.625rem] font-medium text-white/80 backdrop-blur">
                    Example
                  </div>
                </div>

                <div className="relative aspect-[16/10]">
                  <Image
                    fill
                    priority
                    src="/muetab_screenshot_2.webp"
                    alt="Mue Tab in action - beautiful backgrounds, quotes, and widgets"
                    className="object-fit animate-subtle-pan"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 top-1/4 hidden animate-float rounded-xl border border-white/10 bg-background/95 p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] backdrop-blur xl:-left-6 xl:rounded-2xl xl:p-5 2xl:block">
                <div className="flex items-center gap-3 xl:gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-lg shadow-lg xl:h-12 xl:w-12 xl:rounded-xl xl:text-xl">
                    🌅
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground xl:text-base">
                      Fresh vibes
                    </p>
                    <p className="text-xs text-muted-foreground xl:text-sm">Every tab</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 hidden animate-float-delayed rounded-xl border border-white/10 bg-background/95 p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] backdrop-blur xl:-right-6 xl:rounded-2xl xl:p-5 2xl:block">
                <div className="flex items-center gap-3 xl:gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5C25] to-[#FF456E] text-lg shadow-lg xl:h-12 xl:w-12 xl:rounded-xl xl:text-xl">
                    ⏱️
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground xl:text-base">Lock in</p>
                    <p className="text-xs text-muted-foreground xl:text-sm">Stay focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          {/* <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16">
            {highlights.map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-background/80 to-background/40 p-5 backdrop-blur transition-all hover:border-[#FF5C25]/40 hover:shadow-[0_30px_70px_-20px_rgba(255,92,37,0.3)] sm:p-6"
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <span className="relative mb-3 inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] shadow-lg transition-transform group-hover:scale-125" />
                <p className="relative text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div> */}

          {/* Browser badges */}
          <div className="mt-12 flex flex-col items-center lg:mt-16">
            <div className="gap-5 flex flex-col relative w-full max-w-4xl overflow-hidden rounded-3xl px-6 py-10 text-center">
              {/* <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,92,37,0.25)_0%,_transparent_70%)] blur-3xl" /> */}
              <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.3em] dark:text-muted-foreground/60 text-neutral-800">
                Available everywhere*
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                {browsers.map((browser) => {
                  const Icon = browser.Icon;
                  return (
                    <div key={browser.name}>
                      <div className="flex flex-1 flex-row items-center text-left">
                        <span className="bg-background px-4 py-2 rounded-full text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-[#FF5C25] sm:text-base flex items-center gap-2">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {browser.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="relative text-[0.7rem] leading-relaxed text-neutral-800 dark:text-muted-foreground/70 sm:text-xs">
                *Availability can vary by store. Optimized for desktop browsers, but Mue is open
                source—port it, fork it, and make it your own anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 bg-gradient-to-b from-background via-background/95 to-background/80 py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(210,26,17,0.12)_0%,_transparent_75%)]" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#FF5C25]">
              Feature spotlight
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built-in tools to keep you in flow
            </h2>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Mue blends mindful visuals with productivity essentials so every new tab fuels your
              focus instead of draining it.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="space-y-10">
              {scrollFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-background/80 p-8 shadow-[0_18px_60px_-45px_rgba(12,14,40,0.65)] backdrop-blur lg:p-10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.36em] text-[#FF5C25]">
                      0{index + 1}
                    </span>
                    <span className="text-xs uppercase tracking-[0.36em] text-muted-foreground/70">
                      {feature.eyebrow}
                    </span>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground lg:text-[2.1rem]">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground">{feature.description}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1 inline-flex h-1.5 w-4 rounded-full bg-gradient-to-r from-[#FF5C25] via-[#D21A11] to-[#FF456E]" />
                        <span className="text-pretty leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF456E]/40 to-transparent" />
                  <p className="mt-4 text-xs uppercase tracking-[0.36em] text-muted-foreground/70">
                    Crafted with the Mue community
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-background/95 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.16),_transparent_65%)]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF456E]/30 bg-[#FF456E]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.36em] text-[#FF456E]">
            <span>Open Source</span>
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built by you, for you.
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            100% open source. Join the community shaping the future of Mue—new themes, features, and
            localization ships every week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild className="shadow-[0_18px_45px_-28px_rgba(15,15,45,0.75)]">
              <Link href="https://github.com/mue/mue" target="_blank" rel="noreferrer">
                Star Mue on GitHub
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#FF5C25]/30 text-[#FF5C25]"
            >
              <Link href="https://github.com/mue/mue/issues" target="_blank" rel="noreferrer">
                View open issues
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid w-full gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {communityStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-background/80 p-5 text-sm text-muted-foreground backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.36em] text-[#FF5C25]/80">
                  {stat.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{stat.value}</p>
                <p className="mt-3 text-xs text-muted-foreground/80">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
