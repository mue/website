# Homepage Redesign — Design Spec

**Date:** 2026-04-24
**Status:** Approved

## Goal

Redesign the homepage to feel clean and product-focused (Raycast/Arc aesthetic) rather than AI-generated. Keep all existing content; improve presentation through whitespace, typography hierarchy, and letting the product screenshot lead.

## Principles

- The product screenshot is the hero — it does the selling
- Whitespace is deliberate, not padded
- Motivational copy stays but is undecorated — plain text, not wrapped in badge/pill UI
- Brand color (#FF5C25) used sparingly and intentionally
- No gradient blobs, glow effects, or decorative backgrounds
- Animations: fade-in on scroll only — remove float/pan keyframes

---

## Section 1: Hero

**Layout:** Centered, single column

**Content (top to bottom):**

1. Greeting line + motivational subheading — kept as-is in copy, but rendered as plain unstyled text (no pill/badge wrapper, no decorative border)
2. H1: "Stop staring at blank tabs." — large, confident, unchanged
3. One-line subheading — trim existing copy to ~15 words
4. CTA buttons — "Get Started" (solid orange) + "Try it now" (ghost) — remove mobile-detection branching, show both always
5. Screenshot — `max-w-5xl`, centered, `rounded-2xl shadow-2xl`, no browser chrome frame, no glow ring behind it
6. Stats row — inline below screenshot, plain text separated by `|` dividers, no dot indicators, no gradient text

**Remove:** Decorative glow/blob behind screenshot, animated ping on stats, any badge-style wrapper on the greeting.

---

## Section 2: Features

**Layout:** Stacked alternating two-column rows (text | visual, visual | text)

**Each row contains:**

- Section headline (no numbered eyebrow badges)
- Description paragraph
- 2–3 bullet points
- Visual side: solid muted color block or subtle background pattern as placeholder (can be upgraded to real screenshots later)

**Replace:** The current horizontal-scroll card pattern with full-width alternating rows with generous vertical spacing (`py-24` between rows).

**Remove:** Numbered eyebrow badges, identical card borders, the scrollable container.

---

## Section 3: Community / Open Source

**Layout:** Centered text block + stats grid

**Content:**

- Open source badge + GitHub links — rendered as a simple centered text block, not a card
- Stats grid: 6 stats (Collaborators, Stars, Forks, Users, Tabs, Origins) in a 3×2 or 6-col row — just `big number` + `label` underneath, no card borders or shadows
- Browser store badges row — kept as-is

**Remove:** Card borders/shadows from stats, any decorative background on this section.

---

## Global Changes

| Current                        | New                                    |
| ------------------------------ | -------------------------------------- |
| Gradient blob backgrounds      | Removed                                |
| `animate-float`, `animate-pan` | Removed                                |
| `animate-fade-up` on scroll    | Kept                                   |
| Pill/badge wrappers on text    | Removed                                |
| Identical card grid patterns   | Replaced with section-specific layouts |
| Browser chrome on screenshot   | Removed — plain screenshot with shadow |
| Dot indicators on stats        | Removed                                |

---

## Files to Change

- `app/page.tsx` — primary implementation target
- `components/home/feature-card.tsx` — replace with new alternating-row layout
- `components/home/stat-item.tsx` — simplify to plain text
- `components/home/community-stat-card.tsx` — remove card border/shadow styling
- `app/globals.css` — remove float/pan keyframes and their animation utilities
