import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Rocket,
  Users,
  Star,
  GitFork,
  UserCheck,
  LayoutDashboard,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react';
import { FaChrome, FaFirefoxBrowser, FaEdge, FaGithub } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/home/feature-card';
import { CommunityStatCard } from '@/components/home/community-stat-card';
import { BrowserBadge } from '@/components/home/browser-badge';
import { StatItem } from '@/components/home/stat-item';
import { SoftwareApplicationJsonLd } from '@/components/json-ld';

import { BROWSER_STORE_URLS } from '@/lib/constants/browser-links';

const stats = ['Maintained since 2018', '10,000+ monthly active users', '10,000,000+ tabs'];

const communityStats: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Collaborators', value: '50+', icon: Users },
  { label: 'GitHub Stars', value: '700+', icon: Star },
  { label: 'Forks', value: '70+', icon: GitFork },
  { label: 'Users', value: '5K+ Monthly', icon: UserCheck },
  { label: 'Tabs Opened', value: '10M+', icon: LayoutDashboard },
  { label: 'First Version', value: '2018', icon: CalendarDays },
];

const scrollFeatures = [
  {
    title: 'Beautiful backgrounds that inspire',
    description:
      'Pick from our selection of exclusive library, choose your own, or explore the Marketplace for community packs.',
    bullets: [
      'Hand-picked selection from our in-house photography team',
      'Community submitted packs available in the Marketplace',
    ],
  },
  {
    title: 'Quotes to keep you motivated',
    description:
      'Get inspiration, humour or wisdom from our massive library of quote packs in multiple languages.',
    bullets: [
      'Hand-picked quotes that inspire and motivate',
      'Movie quotes, memes and more options in the Marketplace',
    ],
  },
  {
    title: 'Keeping your data secure',
    description:
      'Mue is open-source and contains no tracking. All data is stored on device and is never shared without your consent.',
    bullets: ['No personal data collection', 'Fully open source on GitHub'],
  },
];

const browsers = [
  {
    name: 'Chrome',
    Icon: FaChrome,
    url: BROWSER_STORE_URLS.chrome,
  },
  {
    name: 'Edge',
    Icon: FaEdge,
    url: BROWSER_STORE_URLS.edge,
  },
  {
    name: 'Firefox',
    Icon: FaFirefoxBrowser,
    url: BROWSER_STORE_URLS.firefox,
  },
  {
    name: 'Whale',
    Icon: SiNaver,
    url: BROWSER_STORE_URLS.whale,
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SoftwareApplicationJsonLd />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[100vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.15)_0%,_transparent_60%)] blur-3xl dark:bg-[radial-gradient(ellipse_at_top,_rgba(255,92,37,0.25)_0%,_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-transparent dark:to-black/80" />

      {/* hero */}
      <section className="relative pb-16 pt-12 sm:pb-24 sm:pt-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
          <h1 className="font-heading font-light text-balance text-4xl tracking-wide text-foreground sm:text-5xl lg:text-6xl animate-fade-up animate-delay-200">
            Stop staring at <span className="text-[#FF5C25]">blank</span> tabs.
          </h1>

          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg animate-fade-up animate-delay-300">
            Improve your new tab experience with Mue. Unique backgrounds, motivational quotes, and a
            ton of features. All for free, and open-source too.
          </p>

          <div className="flex flex-row flex-wrap justify-center gap-3 sm:items-center animate-fade-up animate-delay-400">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-linear-to-r from-[#c43d10] to-[#b02048] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_-20px_rgba(255,92,37,0.4)] transition-all hover:scale-105 sm:text-base"
              asChild
            >
              <Link href="/download" className="flex items-center justify-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <span>Get Started</span>
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#FF5C25]/40 px-6 py-4 text-sm font-semibold transition-all duration-200 hover:border-[#FF5C25] hover:bg-[#FF5C25]/10 sm:text-base"
              asChild
            >
              <Link href="/demo" className="flex items-center justify-center gap-2">
                <Rocket className="h-4 w-4" />
                <span>Try it now</span>
              </Link>
            </Button>
          </div>

          <div className="w-full animate-fade-zoom animate-delay-300">
            <Image
              priority
              src="/muetab_screenshot_2.webp"
              alt="Mue Tab in action - beautiful backgrounds, quotes, and widgets"
              width={2559}
              height={1439}
              className="w-full rounded-2xl shadow-2xl"
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
          </div>

          <div className="flex flex-col items-center gap-1.5 text-sm text-muted-foreground/70 animate-fade-up animate-delay-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2">
            {stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-4">
                {i > 0 && <span className="hidden text-muted-foreground/30 sm:inline">|</span>}
                <StatItem stat={stat} />
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-5 animate-fade-up animate-delay-500">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/50">
              Available for your browser
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {browsers.map((browser) => (
                <BrowserBadge
                  key={browser.name}
                  name={browser.name}
                  icon={browser.Icon}
                  url={browser.url}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="border-t border-border py-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Features that make a difference.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-m">
              Mue boasts unique widgets and a design tailored towards productivity and wellbeing.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {scrollFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                index={index}
                title={feature.title}
                description={feature.description}
                bullets={feature.bullets}
              />
            ))}
          </div>
        </div>
      </section>

      {/* community */}
      <section className="border-t border-border py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built by you, for you.
            </h2>
            <p className="max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg">
              Developed in the open with a passionate community of users from around the world. Join
              us on GitHub - whether that be contributing code, suggesting ideas or reporting
              issues!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link
                href="https://github.com/mue/mue"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <FaGithub className="h-4 w-4" />
                <span>View Mue on GitHub</span>
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-[#FF5C25]/30 text-[#FF5C25]"
            >
              <Link
                href="https://github.com/mue/mue/issues"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span>See open issues</span>
              </Link>
            </Button>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10 text-center lg:grid-cols-3">
            {communityStats.map((stat) => (
              <CommunityStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
