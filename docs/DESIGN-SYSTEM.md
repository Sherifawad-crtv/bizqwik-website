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
  *Wide*: wordmark at the left edge, glass link pill, violet "Talk to us" at the
  right edge of the 1280 container. *Narrow*: logo and CTA have travelled in to
  sit 12px either side of the pill; the wordmark has become the emblem tile.
  **The pill never moves or resizes: it is the fixed centre (viewport centre in
  every state). Only the side items travel to it.**
  The change is scrubbed to scroll (0.6s smoothing) both ways, over 160px.
- **When:** it starts only after the page's hero has finished (the hero's pin
  ends); until then the navbar stays wide. On pages without a hero it starts at
  the top. Implemented with `HERO_PIN_ID` (hero-motion.ts) read by nav/motion.ts;
  the hero refreshes first (`refreshPriority`). Note: this needs content after
  the hero to be visible; `/` currently ends with the hero.
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
- **Layout:** only the title (two lines), subtitle and the two CTAs above an empty
  phone that bleeds off the bottom, faded into the page. No eyebrow, fine print or
  proof strip (removed by direction: the hero stays quiet).
- **Start (scroll 0):** empty phone with nine pieces tilted around it, each one the
  *manual* version of a Bizqwik component (see "Manual to Bizqwik" below). The nav pill
  and FAB have no manual face; they rise in from below at the end.
- **Manual to Bizqwik morph:** every piece has two faces. `Chaos.tsx` holds the manual
  ones (HTML/CSS, off-brand on purpose: warm paper, Excel green, kraft, handwriting);
  `FounderHome.tsx` holds the Bizqwik ones. Mid-flight the manual face reshapes to the
  card's size and radius, straightens, blurs out, while the Bizqwik face blurs in
  (`hero-motion.ts`, offsets `t0 + 0.16` and `t0 + 0.24`).

| Piece | Manual face | Becomes |
|---|---|---|
| greeting | sticky note | "Hi, Karim" |
| avatar | polaroid (square photo, white frame, caption, tape) | round avatar; the photo itself shrinks into the circle |
| range | torn month strip, pen-circled | range selector |
| revenue | thermal receipt (torn edge, soft drop-shadow) | revenue card (count-up) |
| profit | calculator | profit tile |
| payouts | handwritten ledger | coach payouts tile |
| subscribers | clipboard sign-in | subscribers tile |
| wallet | paper punch card | wallet credit tile |
| chart | messy spreadsheet | revenue vs payouts chart |

To add or change a prop: edit its component in `Chaos.tsx` (each is `w`, `h`, tilt and
content) and pass it as `chaos=` to the piece in `FounderHome.tsx`. Handwriting is Caveat
600 (`src/assets/fonts/caveat-600.woff2`, 18 KB ASCII subset), `font-hand`.
- **Scroll (pinned for 1.9 viewport heights, scrubbed 0.7s):** text drifts up and out,
  phone rises under the navbar, pieces fly in and dock one after another, then the
  status bar, nav pill, chart bars and the revenue count-up finish the screen.
- **The screen is real UI at true device size:** an iPhone Pro Max screen is
  440 x 957 pt (the frame's screen has exactly that aspect). `FounderHome.tsx`
  uses the product's real numbers (16px side padding, 20px + 62pt safe area on top,
  64px avatar, 28px gaps, KPI grid gap 10, 64px nav pill with five 52px tabs beside a
  64px FAB, 12px + 34pt home indicator below), ported from `Sherifawad-crtv/bizqwik`
  (`Oversight.tsx`, `Shell.tsx`, `BottomNav.tsx`, `Fab.tsx`, `HomeAvatar.tsx`).
  Pieces are plain flow children, so the browser lays them out like the app does; the
  design space is scaled to the screen (`--k`). Tailwind sizes in that file are points.
  Data: `src/content/demoApp.ts` (illustrative).
- **Frame:** `public/devices/iphone-frame.webp` (980x2000, transparent screen at
  x51 y45 878x1910, ~135px corner radius). Layer order: clipped screen, frame, pieces.
- **Docking is measured, scatter is computed:** where a piece lands is read from the
  real layout (`offsetLeft/Top`); `SCATTER` in `phone.ts` only holds side, reach,
  height, tilt, scale and order. Positions are re-derived at every refresh, and shrink
  on narrow screens so the phone still reads as empty.
- **Reduced motion:** no pin, no scrub; the finished screen is shown (manual faces stay hidden).
- To change the vision: edit `SCATTER` (where things start and the settling order),
  `PIN_VH` / `END_TOP` and the timeline offsets in `hero-motion.ts`.

## Ecosystem section (chapter 2) — first pass
Code: `src/components/ecosystem/` (`Ecosystem.tsx`, `ecosystem-motion.ts`). Copy from `content/hero.ts`
(`ecosystem`) and `content/apps.ts` (`appSummaries`), unchanged from the brief.
- **Hand-off from the hero:** the hero stays pinned for `PIN_VH` (1.9) + `COVER_VH` (1) viewport heights;
  its timeline ends at 1.9 and idles while this section's sheet slides up over it. The sheet pulls itself up
  with `-mt-[100svh]` (must equal `COVER_VH`). The navbar's wide-to-narrow change starts when the pin ends.
- **Sheet:** Surface, 72px top radius (48 on mobile), soft upward shadow, two tinted "pages" peeking above it.
- **Tag:** tilted ink pill "01 · The ecosystem" (decorative eyebrow, the heading is the H2).
- **Cards (desktop, 5 across; mobile, stacked):** 104px illustrated role portrait with the app's violet icon
  tile on it, number, title, one-line role, "Used by". Each links to `#apps` (those blocks are not built yet).
- **Sync:** scrubbing through the row lights each icon tile violet in turn, then the arrow after it
  (stateless `onUpdate`, so it is right in both directions). Mobile arrows point down.
- **Entrance:** tag drops in, heading rises word by word (SplitText), lede fades up, cards stagger in.
- **Reduced motion:** no entrance, everything shown, all lit.
- **Portraits:** `public/demo/founder-photo.webp` (real photo) and four generated, illustrated role portraits
  `role-accountant|front-desk|coach|client.webp` (200px previews, ~4.5 KB). Illustrative, not real people.

## Assets
`public/brand/wordmark.png`, `public/brand/mark.png`: use as supplied, light
backgrounds only, never recolour or stretch. Fonts: `src/assets/fonts/`.

### Chaos faces: implementation notes
- A masked (torn) face cannot use `box-shadow` (the mask clips it). `Chaos` has a `torn` mode:
  the outer shell carries a `drop-shadow` filter and the masked paper is its child
  (`data-chaos-body`); the timeline puts the blur on the body so the shadow filter is never overwritten.
- Polaroid: `POLAROID` (phone.ts) holds frame and photo sizes. During the morph the frame, caption
  and tape fade (`data-polaroid-fade`) while the square photo (`data-polaroid-photo`) scales and
  moves to the avatar's place and its sepia tint clears; the shell's radius rounds it into the circle.
  The photo is one asset for both faces: `public/demo/founder-photo.webp` (square, 256px, 5 KB).

### Glass inside the phone (nav pill)
The app's bottom nav pill is a `backdrop-filter` element. An ancestor with `opacity < 1` (or a filter,
mask or clip-path) is a *backdrop root* and blinds it to what is behind, so the glass looks flat while
fading and snaps to blurred at full opacity. Rule: never fade an ancestor of a glass element; fade the
glass element itself. In `hero-motion.ts` the nav/FAB wrappers only move (`y`), and their faces
(`[data-order]`) fade. Both faces are on their own layer from load (`will-change`), painted at opacity 0,
so the blur is ready the moment they start showing.
