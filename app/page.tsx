"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

const highlights = [
  "Fresh photos & quotes that match your energy",
  "Timer, todos, and widgets—all in one view",
  "Your data stays yours. Always private, always synced.",
];

const stats = [
  "Thousands of tabs powered by Mue",
  "Loved worldwide",
  "Open source & privacy-obsessed",
];

const scrollFeatures = [
  {
    eyebrow: "Eye candy",
    title: "Backgrounds that hit different",
    description:
      "Pick from curated photo packs or let Mue auto-rotate stunning scenery based on your time of day.",
    bullets: [
      "Hundreds of handpicked photo collections",
      "Lighting that adapts from sunrise to sunset",
      "One-click favorites for instant vibes",
    ],
  },
  {
    eyebrow: "Stay locked in",
    title: "Everything you need, nothing you don't",
    description:
      "Ambient sounds, quick notes, Pomodoro timers—all right there in your tab. No context switching required.",
    bullets: [
      "Focus sessions with smart reminders",
      "Auto-pause when you switch away",
      "Track your streaks and deep work hours",
    ],
  },
  {
    eyebrow: "Daily inspiration",
    title: "Quotes that actually resonate",
    description:
      "Start every tab with words that match your mood. Boost, calm, or focus—your choice, your language.",
    bullets: [
      "2,000+ community-curated quotes",
      "Auto-translates to 20+ languages",
      "Import your own favorite quotes easily",
    ],
  },
];

export default function Home() {
  const featuresSectionRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<Array<HTMLElement | null>>([]);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = featuresSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height + viewportHeight * 0.6;
      const scrolled = Math.min(
        Math.max(viewportHeight * 0.4 - rect.top, 0),
        totalScrollable
      );
      const progress = totalScrollable === 0 ? 0 : scrolled / totalScrollable;
      setPreviewProgress(
        Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 1) : 0
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cards = featureRefs.current;
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) {
              setActiveFeature(index);
            }
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    cards.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = previewContainerRef.current;
    if (!node) return;

    node.style.setProperty(
      "--preview-translate-x",
      `${-12 + previewProgress * -6}%`
    );
    node.style.setProperty(
      "--preview-translate-y",
      `${previewProgress * 110}px`
    );
    node.style.setProperty("--preview-scale", `${1 - previewProgress * 0.06}`);
  }, [previewProgress]);

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
                Stop staring at blank tabs. Start vibing.
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:text-lg">
                Every tab drop hits different with Mue. Stunning backgrounds,
                quotes that slap, timers, todos—everything you need to lock in.
                No fluff. No distractions. Just pure focus energy.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#FF5C25] to-[#FF456E] px-6 py-4 text-sm font-semibold shadow-[0_20px_60px_-20px_rgba(255,92,37,0.5)] transition-all hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.6)] hover:scale-105 sm:text-base"
                  asChild
                >
                  <Link
                    href="/download"
                  >
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
                  <Link href="/docs/introduction">
                    <Play className="mr-2 h-4 w-4" />
                    See how it works
                  </Link>
                </Button>
              </div>

              <div className="mt-8 space-y-3">
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

              <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-slate-950/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF5C25]" />
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FFB425]" />
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF456E]" />
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.625rem] font-medium text-white/80 backdrop-blur">
                    ✨ Live Tab
                  </div>
                </div>

                <div className="relative aspect-[16/10]">
                  <Image
                    fill
                    priority
                    src="/muetab_screenshot.webp"
                    alt="Mue Tab in action - beautiful backgrounds, quotes, and widgets"
                    className="object-cover"
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
                    <p className="text-xs text-muted-foreground xl:text-sm">
                      Stay focused
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16">
            {highlights.map((item, i) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-background/80 to-background/40 p-5 backdrop-blur transition-all hover:border-[#FF5C25]/40 hover:shadow-[0_30px_70px_-20px_rgba(255,92,37,0.3)] sm:p-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-[#FF5C25]/20 to-[#FF456E]/20 blur-2xl transition-all duration-500 group-hover:scale-150" />
                <span className="relative mb-3 inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E] shadow-lg transition-transform group-hover:scale-125" />
                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Browser badges */}
          <div className="mt-12 flex flex-col items-center gap-5 lg:mt-16">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              Available everywhere
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Chrome", "Edge", "Firefox", "Whale"].map((browser) => (
                <div
                  key={browser}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-background/60 px-4 py-2 backdrop-blur transition-all hover:border-[#FF5C25]/40 hover:bg-background/80 hover:shadow-[0_10px_30px_-10px_rgba(255,92,37,0.2)]"
                >
                  <span className="text-xs font-semibold text-foreground transition-colors group-hover:text-[#FF5C25] sm:text-sm">
                    {browser}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={featuresSectionRef}
        className="relative border-t border-white/5 bg-gradient-to-b from-background via-background/95 to-background/80 pb-28 pt-18"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(210,26,17,0.12)_0%,_transparent_75%)]" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 lg:grid lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div
              ref={previewContainerRef}
              className="sticky top-24 preview-motion"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/65 shadow-[0_35px_80px_-35px_rgba(10,10,30,0.9)] ring-1 ring-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-white/75">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex h-2 w-2 rounded-full bg-[#FF5C25]" />
                    <span className="flex h-2 w-2 rounded-full bg-[#FFB425]" />
                    <span className="flex h-2 w-2 rounded-full bg-[#FF456E]" />
                    <span className="ml-3 text-white/70">mue.tab/studio</span>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/70">
                    Preview
                  </div>
                </div>
                <div className="relative aspect-[10/13] bg-gradient-to-b from-[#FF5C25]/40 via-[#D21A11]/35 to-[#FF456E]/30">
                  <Image
                    fill
                    priority
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                    alt="Mue feature preview"
                    className="object-cover opacity-80 mix-blend-luminosity"
                    sizes="(min-width: 1024px) 420px, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/55 to-black/70" />
                  <div className="absolute inset-8 rounded-[2rem] border border-white/8 bg-white/5 p-6 text-left text-white backdrop-blur">
                    <Logo className="h-12 w-12 opacity-80" />
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                      Make it yours
                    </h3>
                    <p className="mt-3 text-sm text-white/75">
                      Every detail customizable. Every feature purposeful. This
                      is your tab, designed exactly how you want it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-12 lg:order-2">
            {scrollFeatures.map((feature, index) => (
              <article
                key={feature.title}
                data-index={index}
                ref={(node) => {
                  featureRefs.current[index] = node;
                }}
                className={`scroll-mt-28 rounded-3xl border bg-background/78 p-8 backdrop-blur transition-all lg:p-10 ${
                  activeFeature === index
                    ? "border-[#FF5C25]/50 shadow-[0_35px_90px_-45px_rgba(12,12,40,0.9)]"
                    : "border-white/10 shadow-[0_18px_60px_-45px_rgba(12,14,40,0.65)]"
                }`}
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#FF5C25]">
                  {feature.eyebrow}
                </span>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground lg:text-[2.15rem]">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base text-muted-foreground">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 inline-flex h-1.5 w-4 rounded-full bg-gradient-to-r from-[#FF5C25] via-[#D21A11] to-[#FF456E]" />
                      <span className="text-pretty leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF456E]/40 to-transparent" />
                <p className="mt-4 text-xs uppercase tracking-[0.36em] text-muted-foreground/70">
                  0{index + 1} • Crafted with the Mue community
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 bg-background/95 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.16),_transparent_65%)]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF456E]/30 bg-[#FF456E]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.36em] text-[#FF456E]">
            <span>Open Source</span>
            <span className="h-1 w-1 rounded-full bg-[#FF456E]" />
            <span>GitHub</span>
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built by creators, for creators.
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            100% open source. Join the community shaping the future of Mue—new
            themes, features, and localization ships every week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="shadow-[0_18px_45px_-28px_rgba(15,15,45,0.75)]"
            >
              <Link
                href="https://github.com/mue/mue"
                target="_blank"
                rel="noreferrer"
              >
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
              <Link
                href="https://github.com/mue/mue/issues"
                target="_blank"
                rel="noreferrer"
              >
                View open issues
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid w-full gap-6 text-left sm:grid-cols-3">
            {["40k+ stars", "200+ contributors", "Since 2016"].map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/10 bg-background/80 p-5 text-sm text-muted-foreground backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.36em] text-[#FF5C25]/80">
                  Community
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
