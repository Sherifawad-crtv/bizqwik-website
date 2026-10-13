# Design system

Source of truth in code: `src/styles/tokens.css`. Live preview: `/foundation`.
Origin: app repo `Sherifawad-crtv/bizqwik` (`src/index.css`) + brief §3.

## Principles
Warm, friendly, approachable; never an enterprise admin panel. Group with space
and soft elevation, not hard borders. No cards inside cards. No pure white.
Violet is used sparingly: key numbers, the Grow card, primary actions, icons.

## Colour
| Token (Tailwind) | Hex | Use |
|---|---|---|
| `paper` | #F3F2EE | Page background |
| `surface` | #FBFAF7 | Cards |
| `sunken` | #ECEBE5 | Wells, tags, selector |
| `line` | #E3E1DA | Hairlines |
| `ink` | #1A1726 | Main text |
| `ink-muted` | #6C687A | Secondary text |
| `ink-faint` | #9A96A6 | Decoration only (2.6:1) |
| `primary` | #5A41FF | Key numbers, actions, Grow |
| `primary-pressed` | #4832D6 | Hover/pressed, small violet text |
| `primary-tint` | rgb(90 65 255 / .10) | Icon tiles, soft containers |
| `primary-light` / `primary-dark` | #A193FF / #2E1F99 | Accent shades (aesthetics only) |
| `amber-fg/bg` | #946200 / #F6E7C4 | "Scale plan only" tags |
| `green-fg/bg` | #177A4B / #D8EFE0 | Included ticks |
| `danger-fg/bg` | #B23A3A / #F6DEDC | Errors (from app, not in brief) |

Gradients (CSS vars): `--gradient-mark` (emblem only), `--gradient-grow`
(Grow card only), `--wash-violet` (5–7% section wash).
Text on violet is white (5.8:1). Small violet text uses `primary-pressed`.

## Type
- **Urbanist** (500/600/700/800): everything except labels. Headlines 800,
  tracking −2% to −3.5%. Numbers 800 + `tabular`.
- **Space Mono** (400/700): small uppercase labels, units, captions, eyebrows.
  Never sentences or buttons.
- Fluid scale (desktop → mobile): `text-h1` 104→44, `text-h2` 96→36,
  `text-h3` 34→22, `text-body` 26→17, `text-label` 16→12.

## Shape and elevation
Radius: `tile` 16, `input` 20, `button` 24, `card` 28, `card-lg` 32; pills round.
Shadows: `shadow-card` (default), `shadow-float` (sticky nav, call button),
`shadow-glow` (Grow card only).

## Layout
Content max `max-w-page` (1280). Section padding 120px desktop / 72px mobile.
Breakpoints: 768 (`sm`), 1024 (`lg`, real layout swap), 1280 (`xl`).
Gutters 16–20px mobile, 28–32px desktop. Touch targets >= 44px.

## Motion
GSAP + ScrollTrigger + SplitText (SplitText is free in GSAP 3.13+) with Lenis
smooth scroll. Ambition: Awwwards-level, scroll-driven, cinematic.
- All durations, eases, staggers and the Lenis feel live in `src/motion/tokens.ts`.
- Plugins are registered once in `src/motion/gsap.ts`; import `gsap`,
  `ScrollTrigger`, `SplitText` from there only.
- `src/motion/SmoothScroll.tsx` (mounted in the root layout) runs Lenis off
  GSAP's ticker so scroll and ScrollTrigger share one clock. Anchor links are
  offset for the sticky nav.
- Reduced motion: Lenis is not started (native scroll). Every animation must
  also provide an instant, no-movement state.

## Navbar (reference: Nefin nav screenshots, restyled in our tokens)
Code: `src/components/nav/` (`Navbar.tsx` markup + state, `motion.ts` GSAP).
- **Desktop (>= 1024px)**, three free-floating pieces, no bar background.
  *Wide* (scroll 0): wordmark left, glass link pill centred, violet "Talk to us"
  right, spread across the 1280 container. *Narrow* (scrolled 160px): one
  centred cluster, the wordmark becomes the emblem tile; 12px gaps.
  The change is scrubbed to scroll (0.6s smoothing) both ways.
- **Mobile (< 1024px)**: one glass pill, wordmark left, rounded-square menu
  button right. On scroll it insets 24px, slims 64 to 56px and rises. The button
  opens a glass sheet: four links (staggered in), Talk to us, phone, email.
  Scroll is locked (Lenis stop) while open; Escape and any link close it.
- **Active link**: sliding Surface indicator + violet dot, driven by
  IntersectionObserver over `#apps #plans #add-ons #faq` (hidden at the top).
- **Glass**: `bg-surface/70 backdrop-blur-xl backdrop-saturate-150 shadow-float`.
- Reduced motion: both states switch instantly at the halfway point (80px).
- Skip link is first in the tab order. Anchors clear the nav via
  `scroll-padding-top: 6rem` (Lenis honours it; do not also set a Lenis offset).
- `ui/Button.tsx`: link-as-button (`primary` violet, `secondary` surface).

## Hero (reference: your empty-iPhone demo frames, structure only)
Code: `src/components/hero/` (`Hero.tsx` layout, `PhoneMockup.tsx`, `FounderHome.tsx`
pieces, `phone.ts` geometry + piece table, `hero-motion.ts` GSAP).
- **Layout:** text block (eyebrow, H1 in two lines, support, CTAs, fine print, five-app
  proof strip when the viewport is >= 900px tall) above an empty phone that bleeds off
  the bottom, faded into the page. The H1 is capped near 84px so the phone has room.
- **Start (scroll 0):** empty phone, nine founder-home pieces tilted around it
  (greeting, avatar, range selector, revenue card, four KPI tiles, chart, nav).
- **Scroll (pinned for 1.9 viewport heights, scrubbed 0.7s):** text drifts up and out,
  phone rises under the navbar, pieces fly in and dock one after another, then the
  status bar, nav pill, chart bars and the revenue count-up finish the screen.
- **The screen is real UI, not an image:** the product's Overview (mirrors
  `Sherifawad-crtv/bizqwik` `src/routes/Oversight.tsx`) built in a 390px design space
  and scaled to the screen (`--k`). Tailwind sizes inside `FounderHome.tsx` are
  design px. Data: `src/content/demoApp.ts` (illustrative).
- **Frame:** `public/devices/iphone-frame.webp` (980x2000, transparent screen at
  x51 y45 878x1910, ~135px corner radius). Layer order: clipped screen, frame, pieces.
- **Scatter is computed, not hard-coded:** each piece has side, reach, height, tilt and
  scale in `phone.ts`; positions are derived from the viewport at every refresh, and
  shrink on narrow screens so the phone still reads as empty.
- **Reduced motion:** no pin, no scrub; the finished screen is shown.
- To change the vision: edit `PIECES` (where things start and the settling order),
  `PIN_VH` / `END_TOP` and the timeline offsets in `hero-motion.ts`.

## Assets
`public/brand/wordmark.png`, `public/brand/mark.png`: use as supplied, light
backgrounds only, never recolour or stretch. Fonts: `src/assets/fonts/`.
