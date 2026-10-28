# Architecture Plan: Self-Contained Tall Showcase Cards & Zero-Overlap Layout

This plan details the structural and visual overhaul of interactive card showcases across the Atrium platform. It replaces horizontal multi-card carousels that broke grid bounds (`w-screen`) with self-contained, tall single-card showcases that stay strictly within their layout column, featuring rich workflow steps, live operational telemetry, and centered controls.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The root cause of the visual collision identified in the screenshot (`Screenshot_41_1b4fdb10.png`) was that the swiper components broke out of their 12-column grid column using `w-screen relative left-1/2 -translate-x-1/2` with viewport-edge floating chevrons, directly colliding with the left-hand headline.

- **Confirmed Display Mode**: Single tall active card with strict boundary clipping (`w-full overflow-hidden`, zero horizontal bleed into the text column).
- **Confirmed Content Expansion**: Taller card silhouette (`min-h-[480px]` / `min-h-[520px]`) enriched with progressive workflow stages, simulated edge telemetry chips, and operational impact metrics.
- **Confirmed Navigation Geometry**: Dedicated control hub centered strictly underneath the card container (prev/next controls, segmented progress pills, domain indicators, autoplay pause toggle).

---

## 1. Overview & Core Concept

### What It Delivers
A focused, editorial presentation for Atrium's core interactive moments:
1. **Section 1.5 (Category Proof Strip)**: Domain Trade Showcases (`CategoryCardSwiper`)
2. **Section 2 (The Problem)**: Frontline Operational Bottlenecks (`ProblemCardSwiper`)
3. **Section 3 (The Shift)**: Fragmented Chaos vs. Unified Architecture (`ShiftCardSwiper`)

Instead of 3 cramped horizontal cards peeking across column gutters and colliding with typography, each section displays **one stately, tall showcase card** at a time. The card features deep vertical hierarchy (domain kicker, bold title, field explanation, 3-step operational workflow preview, and edge telemetry pills) with smooth vertical slide or crossfade transitions.

### Key Value
- **100% Text Protection**: The narrative column retains guaranteed breathing room (`measure` 45–55ch) with zero overlapping elements or runaway chevrons.
- **Deep Operational Fidelity**: Taller cards allow users to actually understand Atrium's edge workflows (e.g., turnstiles, thermal printers, real-time sync) instead of superficial 2-line blurbs.
- **Responsive Symmetry**: Adapts seamlessly on desktop (2-column side-by-side) and mobile (stacked single-column with finger swipe gestures).

---

## 2. User Experience & Visual Design

### A. Taller Showcase Card Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [ 01 — DOMAIN ]                           View Live Workflow ↗ │  ← Header & Index
│                                                                 │
│ Memberships & Classes                                           │  ← Domain Title
│ Gyms, fitness studios, martial arts academies, sports clubs     │  ← Audience Subline
├─────────────────────────────────────────────────────────────────┤
│ FIELD WORKFLOW STAGES                                           │  ← Enriched Workflow Steps
│ 1. Turnstile Check-In   · Local NFC / QR edge scan (20ms)       │
│ 2. Automated Quotas     · Trainer commission tally calculated   │
│ 3. Offline Buffer       · Stored locally if broadband drops     │
├─────────────────────────────────────────────────────────────────┤
│ LIVE OPERATIONAL TELEMETRY                                      │  ← Metric Telemetry Preview
│ ┌──────────────────────────┐  ┌───────────────────────────────┐ │
│ │ 99.98% Edge Uptime       │  │ < 120ms Register Latency      │ │
│ └──────────────────────────┘  └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         ◄   [ ● ──── ──── ──── ──── ──── ]   ►   [01 / 06]         ← Centered Under-Card Hub
```

### B. Architectural Surface Contrast

Each card showcase adapts to the section's background theme:

1. **Section 1.5 — Deep Obsidian (`#09090b`)**:
   - Card Background: `bg-stone-950/90` with hairline `border-stone-800`
   - Active Glow: Subtle terracotta border highlight (`#e06b48`/60)
   - Accent Elements: Terracotta badges, emerald status dots (`● Ready`)
2. **Section 2 — Rich Terracotta (`#963c24`)**:
   - Card Background: `bg-stone-950/95` dark glass with `border-white/10`
   - Typography: Warm cream text and bright warning indicators for bottleneck points
3. **Section 3 — Crisp Off-White (`#fbfbfa`)**:
   - Card Background: `bg-white` with `border-stone-200/90 shadow-xl`
   - Typography: Deep obsidian text (`text-stone-950`), stone-600 sublines, terracotta badges

---

## 3. Component Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Section Container (12-Column Grid, Max-W 7XL)                   │
├────────────────────────────────┬────────────────────────────────┤
│ Left Column (lg:col-span-5)    │ Right Column (lg:col-span-7)   │
│ • SectionHeader                │ • Strict Box: w-full overflow- │
│ • Category Tag                 │   hidden (ZERO SCREEN BREAKOUT)│
│ • Balanced Editorial Headline  │ • Tall Showcase Card (500px)   │
│ • Paragraph & Bullet Checklist │ • Animated Transition Engine   │
│ • Primary Call-to-Action       │ • Centered Navigation Hub      │
│                                │   [Prev] [Pills] [Next] [Auto] │
└────────────────────────────────┴────────────────────────────────┘
```

### State Management & Interactions
- **Active Index State**: Tracks `activeIndex` (0 to N-1) with directional velocity for smooth sliding animations (`Framer Motion` / `AnimatePresence`).
- **Autoplay Engine**: Configurable interval (4.5s) with hover pause, touch pause, and visual indicator (`[01 / 06] · PAUSED`).
- **Touch / Swipe Gestures**: Native touch start/move/end inside the card bounds only, never listening to window-wide coordinates.
- **Direct Tab Interaction**: Clicking any progress pill jumps directly to that domain card.

---

## 4. Implementation Steps (Upon Approval)

1. **Rebuild `CategoryCardSwiper.tsx`**:
   - Remove `w-screen relative left-1/2 -translate-x-1/2` and full-screen chevrons.
   - Enforce `w-full max-w-xl mx-auto overflow-hidden` container.
   - Add taller card layout with 3 workflow stages and live operational telemetry chips.
   - Position navigation chevrons and segmented progress pills strictly centered below the card.

2. **Rebuild `ProblemCardSwiper.tsx`**:
   - Remove screen-width breakouts.
   - Increase card height (`min-h-[460px]`) featuring Problem Breakdown, Impact Warning, and Atrium Solution Box.
   - Center navigation controls underneath.

3. **Rebuild `ShiftCardSwiper.tsx`**:
   - Enforce self-contained column boundaries with theme-aware cards.
   - Provide clean Before vs. After architectural comparison points inside each card.

4. **Audit `PageShell.tsx` Section Columns**:
   - Verify all 2-column grids have `relative z-10`, `overflow-hidden` or clean flex bounds, ensuring no child component ever overlaps text.

5. **Verification**:
   - Run `lint_applet` (`tsc --noEmit`) and `compile_applet` (`npm run build`).
   - Validate desktop (1440px), tablet (768px), and mobile (375px) viewports.
