"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

const highlights = [
  "Ambient quotes and photography that rotate with your rhythm",
  "Planned focus sessions, todos, and widgets in one glance",
  "Privacy-first with synced preferences across every device",
];

const stats = [
  "4M+ custom tabs opened",
  "Beloved by mindful makers worldwide",
  "Open source & privacy-first by design",
];

const scrollFeatures = [
  {
    eyebrow: "Visual serenity",
    title: "Mood-driven scenes that shift with you",
    description:
      "Choose from curated packs or let Mue auto-rotate through scenery that mirrors your time of day.",
    bullets: [
      "Hundreds of handcrafted photo collections",
      "Dynamic lighting adapts to sunrise and sunset",
      "One click to favourite any background",
    ],
  },
  {
    eyebrow: "Focus in motion",
    title: "Timer, todos, and music—side by side",
    description:
      "Launch ambient sounds, capture quick notes, and run Pomodoro sprints without leaving the tab.",
    bullets: [
      "Structured sessions with smart reminders",
      "Auto-pauses when you switch tasks",
      "Deep work analytics and streak tracking",
    ],
  },
  {
    eyebrow: "Personal touch",
    title: "Quotes and greetings that feel handpicked",
    description:
      "Prints daily inspiration in your language, tuned to the tone you need—boost, calm, or focus.",
    bullets: [
      "Library of 2,000+ community-sourced quotes",
      "Localises automatically for 20+ languages",
      "Bring your own words with a simple import",
    ],
  },
];

export default function Home() {
  const featuresSectionRef = useRef<HTMLDivElement | null>(null);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
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
      <section className="relative isolate overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-[-45%] -z-20 h-[120vh] bg-[radial-gradient(circle_at_top,_rgba(255,92,37,0.38)_0%,_transparent_65%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-35%] -z-30 h-[90vh] bg-[radial-gradient(circle_at_bottom,_rgba(255,69,110,0.32)_0%,_transparent_70%)] blur-3xl" />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
            <span>Mue Tab</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Mindful browsing</span>
          </div>

          <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            A tab tailored to you, for the day that&apos;s yours.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Every time you open a new tab, Mue meets you with calming visuals,
            meaningful words, and the controls you need to focus. It&apos;s the
            browser ritual that keeps pace with you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="px-8 shadow-[0_25px_60px_-25px_var(--tw-shadow-color)] shadow-primary/50"
              asChild
            >
              <Link
                href="https://chromewebstore.google.com/detail/mue/jfaidnnckeinloipodbgfjjmipgjnllo"
                target="_blank"
                rel="noreferrer"
              >
                Add Mue to Chrome
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="px-7" asChild>
              <Link href="/docs/introduction">
                <Play className="mr-2 h-4 w-4" />
                Explore the docs
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid w-full gap-4 text-left sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/15 bg-background/75 p-5 text-sm text-muted-foreground shadow-[0_18px_45px_-30px_rgba(14,18,34,0.7)] backdrop-blur transition hover:border-[#FF5C25]/40"
              >
                <span className="mb-3 inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[#FF5C25] to-[#FF456E]" />
                <p className="text-pretty leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.32em] text-muted-foreground/80">
            {stats.map((stat) => (
              <span key={stat} className="flex items-center gap-3">
                {stat}
              </span>
            ))}
          </div>

          <div className="relative mt-16 w-full max-w-5xl">
            <div className="absolute inset-x-8 -bottom-10 h-40 rounded-full bg-[linear-gradient(135deg,_rgba(255,92,37,0.28),_rgba(255,69,110,0.28))] blur-3xl" />
            <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,92,37,0.28),_rgba(255,69,110,0))] blur-2xl" />

            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900/70 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.85)] ring-1 ring-white/10">
              <div className="flex items-center justify-between border-b border-white/10 px-8 py-5 text-white/80">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-white/70">demo.muetab.com</span>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium backdrop-blur">
                  Inspired focus
                </div>
              </div>

              <div className="relative aspect-[16/9]">
                <Image
                  fill
                  priority
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
                  alt="Preview of Mue Tab showcasing a calming background"
                  className="object-cover"
                  sizes="(min-width: 1280px) 900px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

                <div className="absolute left-8 top-8 flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-white/15 px-4 py-2 text-sm text-white/85 backdrop-blur">
                    Search the moment
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/60 backdrop-blur">
                    Focus
                  </div>
                </div>

                <div className="absolute left-8 bottom-8 max-w-xl text-left text-white">
                  <div className="text-xs uppercase tracking-[0.6em] text-white/70">
                    Good afternoon, Taylor
                  </div>
                  <div className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    A tab that fuels your flow.
                  </div>
                  <p className="mt-3 text-sm text-white/80 md:text-base">
                    Fresh backgrounds, quotes that resonate, and quick actions
                    keep you centred while your day evolves.
                  </p>
                </div>

                <div className="absolute -right-6 bottom-10 hidden w-48 flex-col gap-3 rounded-3xl border border-white/12 bg-white/10 p-4 text-left text-white backdrop-blur lg:flex">
                  <p className="text-[0.6rem] uppercase tracking-[0.45em] text-white/70">
                    Today&apos;s cadence
                  </p>
                  <div>
                    <p className="text-sm font-semibold">Deep work sprint</p>
                    <p className="text-xs text-white/70">
                      45 mins • Oceanic Rain
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-emerald-200">
                      Win streak
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      12 mindful tabs
                    </p>
                  </div>
                </div>
              </div>
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
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                      Your space, always in flow
                    </h3>
                    <p className="mt-3 text-sm text-white/75">
                      Stay anchored with a preview that mirrors the live tab as
                      you explore what makes Mue special.
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
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground lg:text-[2.15rem]">
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
          <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built together with a community that ships daily.
          </h2>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Dive into the repo, open issues, and shape the future of Mue Tab.
            Contributors keep the experience fresh—from new themes to
            accessibility enhancements and localization.
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
