# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Mue homepage to feel clean and product-focused — strip decorative noise, let the screenshot lead, and replace identical card patterns with varied section layouts.

**Architecture:** All changes are confined to `app/page.tsx` and three component files in `components/home/`. No new files are created. The redesign rearranges and simplifies existing JSX/Tailwind — no logic changes, no new dependencies.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4, TypeScript

---

## File Map

| File                                      | Change                                                                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/globals.css`                         | Remove `animate-float`, `animate-pan`, `animate-subtle-pan` keyframes and utilities                                                                                |
| `components/home/stat-item.tsx`           | Remove gradient dot — render as plain `<span>`                                                                                                                     |
| `components/home/community-stat-card.tsx` | Remove card border/background/shadow — render as plain number + label block                                                                                        |
| `components/home/feature-card.tsx`        | Replace card layout with alternating two-column row (text \| colour block)                                                                                         |
| `app/page.tsx`                            | Hero: single-column centered layout, bare screenshot, inline stats. Features: pass `index` for alternating. Community: remove pill badge, remove section gradient. |

---

## Task 1: Remove unused animation keyframes from globals.css

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Open globals.css and locate the float/pan keyframes**

Search for `@keyframes float`, `@keyframes pan`, `@keyframes subtle-pan` and any `animate-float`, `animate-pan`, `animate-subtle-pan` utility classes. They appear in the `@layer utilities` block.

- [ ] **Step 2: Delete the keyframes and their utility classes**

Remove every block matching these patterns — the keyframes themselves and the `.animate-float`, `.animate-pan`, `.animate-subtle-pan` utility declarations. Leave `fade-up`, `fade-zoom`, and `ping` untouched.

- [ ] **Step 3: Verify the dev server compiles without errors**

Run: `npm run dev`
Expected: No Tailwind or compilation errors in terminal output.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "style: remove float and pan animation keyframes"
```

---

## Task 2: Simplify StatItem — remove gradient dot

**Files:**

- Modify: `components/home/stat-item.tsx`

- [ ] **Step 1: Replace the component body**

Replace the entire file content with:

```tsx
type StatItemProps = {
  stat: string;
};

export function StatItem({ stat }: StatItemProps) {
  return <span>{stat}</span>;
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev` and open `http://localhost:3000`.
Expected: Stats line in hero renders as plain text with no coloured dots.

- [ ] **Step 3: Commit**

```bash
git add components/home/stat-item.tsx
git commit -m "style: simplify StatItem to plain text"
```

---

## Task 3: Simplify CommunityStatCard — remove card border and background

**Files:**

- Modify: `components/home/community-stat-card.tsx`

- [ ] **Step 1: Replace the component body**

```tsx
type CommunityStatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function CommunityStatCard({ label, value, description }: CommunityStatCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
        {label}
      </p>
      <p className="mt-1 text-sm text-muted-foreground/70">{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000` and scroll to the community section.
Expected: Stats render as big number + small label + description, no card borders.

- [ ] **Step 3: Commit**

```bash
git add components/home/community-stat-card.tsx
git commit -m "style: simplify CommunityStatCard to plain number block"
```

---

## Task 4: Redesign FeatureCard as alternating two-column row

**Files:**

- Modify: `components/home/feature-card.tsx`

- [ ] **Step 1: Replace the component**

The `index` prop is used to alternate text/visual column order (even = text left, odd = text right).

```tsx
type FeatureCardProps = {
  index: number;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  footerText: string;
};

const visualColors = ['bg-[#FF5C25]/8', 'bg-[#FF456E]/8', 'bg-amber-500/8'];

export function FeatureCard({
  index,
  eyebrow,
  title,
  description,
  bullets,
  footerText,
}: FeatureCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center ${isReversed ? 'lg:[&>*:first-child]:order-last' : ''}`}
    >
      {/* Text side */}
      <div className="flex flex-col">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#FF5C25]">
          {eyebrow}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C25]/60" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs uppercase tracking-[0.28em] text-muted-foreground/40">
          {footerText}
        </p>
      </div>

      {/* Visual side */}
      <div className={`h-64 rounded-2xl lg:h-80 ${visualColors[index % visualColors.length]}`} />
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Open `http://localhost:3000` and scroll to the features section.
Expected: Three rows, alternating text-left/text-right layout, solid muted colour block on the visual side, no card borders.

- [ ] **Step 3: Commit**

```bash
git add components/home/feature-card.tsx
git commit -m "style: replace FeatureCard with alternating two-column row"
```

---

## Task 5: Redesign the Hero section in page.tsx

**Files:**

- Modify: `app/page.tsx`

**What changes:**

- Remove the two gradient blob `div`s at the top of the hero section
- Change layout from two-column grid to centered single-column
- Greeting + motivational copy: keep as-is but centred
- Screenshot: full-width up to `max-w-5xl`, `rounded-2xl shadow-2xl`, no browser chrome wrapper, no glow ring behind it
- Stats: inline row below screenshot, `|` dividers, using updated `StatItem`
- CTA buttons: remove `isMobile` branching — always show both buttons. Keep the mobile hint text (`isMobile` state + `useEffect` can stay for the small hint paragraph only)
- Browser badges: keep as-is, move inside hero section directly below stats

- [ ] **Step 1: Replace the hero `<section>` block**

Replace the entire `<section className="relative isolate overflow-hidden ...">` block (lines 138–280 in the original) with:

```tsx
<section className="relative pb-16 pt-20 sm:pb-24 sm:pt-28">
  <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 text-center">
    {/* Greeting */}
    <p
      className="text-base text-muted-foreground animate-fade-up animate-delay-100"
      suppressHydrationWarning
    >
      {greeting}, {friendlyTerm}.
    </p>

    {/* H1 */}
    <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-up animate-delay-200">
      Stop staring at <span className="text-[#FF5C25]">blank</span> tabs.
    </h1>

    {/* Subheading */}
    <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg animate-fade-up animate-delay-300">
      Every tab hits different with Mue. Stunning backgrounds, quotes that slap, places for your
      notes — everything you need to lock in.
    </p>

    {/* CTAs */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up animate-delay-400">
      <Button
        size="lg"
        className="group relative overflow-hidden bg-linear-to-r from-[#FF5C25] to-[#FF456E] px-6 py-4 text-sm font-semibold shadow-[0_20px_60px_-20px_rgba(255,92,37,0.5)] transition-all hover:shadow-[0_25px_70px_-15px_rgba(255,92,37,0.6)] hover:scale-105 sm:text-base"
        asChild
      >
        <Link href="/download">
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 -z-0 bg-linear-to-r from-[#FF456E] to-[#FF5C25] opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-2 border-[#FF5C25]/30 px-6 py-4 text-sm font-semibold transition-all hover:border-[#FF5C25] hover:bg-[#FF5C25]/5 sm:text-base"
        asChild
      >
        <Link href="/demo">
          <Rocket className="mr-2 h-4 w-4" />
          Try it now
        </Link>
      </Button>
    </div>

    {isMobile && (
      <p className="text-xs text-muted-foreground/70">
        Mue is a browser extension for desktop. Visit on your computer to get started.
      </p>
    )}

    {/* Screenshot */}
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

    {/* Stats */}
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground/70 animate-fade-up animate-delay-500">
      {stats.map((stat, i) => (
        <span key={stat} className="flex items-center gap-4">
          {i > 0 && <span className="text-muted-foreground/30">|</span>}
          <StatItem stat={stat} />
        </span>
      ))}
    </div>

    {/* Browser badges */}
    <div className="mt-4 flex flex-col items-center gap-4">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
        Available everywhere*
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {browsers.map((browser) => (
          <BrowserBadge
            key={browser.name}
            name={browser.name}
            icon={browser.Icon}
            url={browser.url}
          />
        ))}
      </div>
      <p className="text-[0.7rem] leading-relaxed text-muted-foreground/50 sm:text-xs">
        *not actually available on Safari yet, but we&apos;re working on it! And no, we&apos;re not
        adding Opera support. Please stop asking.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify hero**

Open `http://localhost:3000`.
Expected: Centered single-column hero, plain greeting text, screenshot without browser chrome wrapper or glow, stats as plain inline row with `|` dividers.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "style: redesign hero to centered single-column layout"
```

---

## Task 6: Redesign the Features section in page.tsx

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the features `<section>` block**

Replace the entire second `<section>` (the one starting with `<section className="relative border-t border-white/5 bg-gradient-to-b ...">`) with:

```tsx
<section className="border-t border-border py-28">
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 px-6">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Built-in tools to keep you in flow
      </h2>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        Mue blends mindful visuals with productivity essentials so every new tab fuels your focus
        instead of draining it.
      </p>
    </div>

    <div className="flex flex-col gap-24">
      {scrollFeatures.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          index={index}
          eyebrow={feature.eyebrow}
          title={feature.title}
          description={feature.description}
          bullets={feature.bullets}
          footerText={feature.footerText}
        />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify features section**

Open `http://localhost:3000` and scroll to features.
Expected: Clean section header (no eyebrow label), three alternating two-column rows with generous spacing, no gradient background.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "style: redesign features section with alternating rows"
```

---

## Task 7: Redesign the Community section in page.tsx

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the community `<section>` block**

Replace the entire third `<section>` (starting with `<section className="relative overflow-hidden border-t border-white/5 ...">`) with:

```tsx
<section className="border-t border-border py-24">
  <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center">
    <div className="flex flex-col items-center gap-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#FF5C25]">
        Open Source
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Built by you, for you.
      </h2>
      <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
        100% free and open source. Join the community shaping the future of Mue — whether
        that&apos;s contributing code, reporting issues, or sharing ideas.
      </p>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button size="lg" asChild>
        <Link href="https://github.com/mue/mue" target="_blank" rel="noreferrer">
          View Mue on GitHub
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild className="border-[#FF5C25]/30 text-[#FF5C25]">
        <Link href="https://github.com/mue/mue/issues" target="_blank" rel="noreferrer">
          See open issues
        </Link>
      </Button>
    </div>

    <div className="grid w-full gap-x-8 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-3">
      {communityStats.map((stat) => (
        <CommunityStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify community section**

Open `http://localhost:3000` and scroll to community.
Expected: Plain "Open Source" eyebrow text (not a pill badge), no radial gradient background, stats as plain number blocks with no card borders.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "style: redesign community section, remove decorative elements"
```

---

## Self-Review

**Spec coverage:**

- ✅ Remove gradient blobs/glow — Task 5 removes both hero blobs and the glow ring
- ✅ Plain greeting text (no pill wrapper) — Task 5
- ✅ Screenshot without browser chrome — Task 5
- ✅ Stats as inline row with `|` dividers — Task 5
- ✅ Remove mobile CTA branching (both buttons always shown) — Task 5
- ✅ Feature section: alternating two-column rows — Tasks 4 & 6
- ✅ Remove numbered eyebrow badges from features — Task 4
- ✅ Community stats: no card borders — Task 3 & 7
- ✅ Community: remove pill badge — Task 7
- ✅ Remove float/pan animations — Task 1
- ✅ Keep fade-in on scroll — preserved throughout (animate-fade-up kept)
