# Decisions

Append-only. One line of context, the decision, and the date.

- **D-001 (2026-10-13) Stack:** Next.js (App Router) + TypeScript + Tailwind v4,
  npm, Vercel. Reason: the landing page grows into auth, dashboard and billing
  in one repo. Route groups will separate `(marketing)` from future `(app)`.
- **D-002 (2026-10-13) Tokens come from the app repo**, cross-checked with the
  brief. The website and product share one visual system.
- **D-003 (2026-10-13) Fonts are self-hosted** (Urbanist, Space Mono), Latin
  subset only (English-only v1). Add subsets when Arabic is decided.
- **D-004 (2026-10-13) Motion libraries deferred. SUPERSEDED by D-007.** The brief asks for
  restrained motion (no parallax); the original request was an Awwwards/GSAP
  feel. GSAP + Lenis are not installed until design direction resolves this.
- **D-005 (2026-10-13) Payments provider undecided.** When billing starts, put
  a provider-agnostic `billing/` interface in front of it. Money is computed by
  the backend, never in the UI.
- **D-006 (2026-10-13) Design is code-led,** reviewed on live previews.
- **D-007 (2026-10-13) Motion direction: Awwwards / GSAP / smooth scroll.**
  GSAP (ScrollTrigger, SplitText) + Lenis are installed. The brief's "restrained
  motion, no parallax, no looping animation" rules (§3.8) are dropped.
- **D-008 (2026-10-13) The brief is a content source only.** From
  `BIZQWIK_LANDING_PAGE_BRIEF.md` we take: copy, section order, plans, FAQ,
  contact details, SEO text, microcopy and the content rules. We do not take its
  layout, component, motion, device-mockup or tech specs; those follow our own
  design direction. The brief file itself is not committed.
- **D-009 (2026-10-13) Content lives in typed files** (`src/content/`), never in
  components. `npm run check:content` guards the hard rules (prices, Enterprise
  has no number, one badge, no prices on add-ons, no forbidden claims).
- **D-010 (2026-10-13) Navbar follows the reference's two-state behaviour**
  (wide at top, narrow cluster when scrolled; single glass pill on mobile) in
  our light/violet identity. Scrubbed to scroll, not toggled. Solar icons are
  not installed yet: the menu button is drawn in CSS; add `@solar-icons/react`
  with the sections that need it.
- **D-011 (2026-10-13) Solar icons installed** (`@solar-icons/react`, Linear
  weight, per-icon imports through `components/ui/Icon.tsx`). Only listed icons are
  bundled; add new ones in that one file.
- **D-012 (2026-10-13) Hero = pinned, scrubbed scatter-to-dock of real HTML UI.**
  The app screen is built from the real Overview structure rather than screenshots,
  so pieces can move independently. Overrides the brief's "use real screenshots"
  note for the hero only. Demo numbers are illustrative (D-013).
- **D-013 (2026-10-13) Demo data is illustrative** and lives in
  `src/content/demoApp.ts`; figures are internally consistent. Replace with approved
  demo content before launch (brief GAP 7).
- **D-014 (2026-10-13) Hero copy is title + subtitle + two CTAs only.** The brief's
  eyebrow, "billed monthly" fine print and five-app proof strip are dropped by
  direction (too much noise). Their text was removed from `content/hero.ts`.
- **D-015 (2026-10-13) The phone screen is built at true iPhone Pro Max size**
  (440 x 957 pt) with the product's real dimensions; docking positions are measured
  from layout, never hand-placed. Supersedes the 390px design space of D-012.
- **D-016 (2026-10-13) The navbar's centre pill is fixed;** only the logo and CTA move
  to it, and only after the hero's pin ends.
- **D-017 (2026-10-13) Hero headline is "One ecosystem. / Declutter your community ops."**
  (by direction; replaces the brief's FINAL "One ecosystem. Your whole community.").
  "community ops." carries the highlighter underline. The page title/description in
  `content/site.ts`, `brand.tagline` and the Contact lede still use the old line; they
  are separate pieces of copy and were not changed.
- **D-018 (2026-10-13) Hero subtitle is "Coach attendance, scheduling, bookings and wallets,
  organized in one place."** (by direction; replaces the brief's "Founder, accountant, front
  desk, coaches and clients, all in sync."). That sentence is no longer used on the page.
- **D-019 (2026-10-15) The hero pieces morph from manual-process props into the Bizqwik
  components** (sticky note, receipt, calculator, ledger, clipboard, punch card,
  spreadsheet...). The story is "Declutter your community ops": the mess becomes the app.
  Manual faces are HTML/CSS, not images; the hero `alt` text was rewritten to describe this.
- **D-020 (2026-10-23) Ecosystem = a white sheet that rises over the still-pinned hero.** The hero's pin is
  extended by `COVER_VH` so the sheet covers it before it unpins; the navbar change waits for that.
- **D-021 (2026-10-23) Role portraits are generated illustrations** (Canva image generation) in the style of
  the founder photo; accountant, front desk, coach and client. Placeholders for review: swap for approved
  artwork before launch (brief GAP 7). The generator returned 200px previews, so avatars are shown at 104px.
- **D-022 (2026-10-23) Next.js pinned to 16.4.3.** `npm audit` flagged 16.0.0-16.4.0 (critical RCE in image
  optimization with SVGs and in `use cache`; DoS in server actions). We use none of those paths, but we do not
  ship on a flagged version. Check `npm audit` before each release.
- **D-023 (2026-10-23) Do not adopt the deck's / brief's presentation style. The brief and deck are a source of
  CONTENT, FEATURES and what Bizqwik is; the product repo is the source of how it looks.** The first Ecosystem pass
  copied deck devices (numbered tiles, "Used by" chips, arrows joining tiles, sync-lighting) and was rejected.
  Replaced by one live product component per role (see DESIGN-SYSTEM, Ecosystem). Rule for every later section:
  show real product UI doing real work; take wording and features from the brief, not its layout vocabulary.
  (Supersedes the sync effect of D-020; the sheet and tag stay: they come from the owner's own reference.)
- **D-024 (2026-10-23) The Ecosystem cards are only the component, with short titles above.** No avatars, no
  text inside the card beyond what the component itself shows. Titles: Founder, Accountant, Reception, Coaches,
  Client (`AppSummary.short`). The four generated role portraits were deleted with their field (supersedes
  D-021; they remain in git history, commit 62a6b06). `founder-photo.webp` stays: the hero's avatar uses it.
- **D-025 (2026-10-23) Ecosystem cards adopt the owner's reference "status card" style** (light Surface cards, hairline,
  lavender icon tile, mono status pill, big numbers, sunken well). Text that is part of such a card (title, pill,
  sub-line, a well) is back, because it is the component's own content; avatars, captions and deck devices stay out
  (D-023, D-024). The short role titles stay above the cards. Layout became 3 + 2 to give the cards their width.
  Not used yet: the owner's hand-held-phone mockup (Mockuuups) from the same upload.
- **D-026 (2026-11-04) Ecosystem is a tabbed stage, not five columns.** Role chips switch a two-panel stage (real
  content left, live role card right), after the owner's Glofox reference. Layout only; styling and cards stay
  ours (D-023, D-025). The short titles now live on the chips instead of above each card.
- **D-027 (2026-11-04) Ecosystem tabs are features, not apps** (supersedes the role chips in D-026). Feature copy lives in `content/features.ts`; app-level copy stays for the apps section.
- **D-028 (2026-11-04) Squircles are drawn in JS (clip-path), not with `corner-shape`,** because only Chromium supports the CSS property. Opt in with `data-sq`.
- **D-029 (2026-11-04) Ecosystem demos are ports of the product repo's real components** (Segmented, StatePill, MoneyHero, TimeGrid, roster row, PaymentCards, DayList), drawn inside an app-screen shell. Nine feature tabs. Replaces the invented status cards of D-025.
- **D-030 (2026-11-11) One motion system, taken from the reference landing page** (`docs/MOTION.md`). Tokens and kit in `src/motion/`; no raw eases or durations in components (`npm run check:motion`); static content does not animate on load; demos play once, hold, and offer Replay. Scroll-scrubbed timelines are the documented exception. Plan in `docs/PLAN-landing-outline.md`.
- **D-031 (2026-11-11) Landing outline in code:** hero, dark statement (rises over the hero), four cards, feature stage, Plans/Add-ons/FAQ, closing. Built from `components/layout` primitives (Container, Box, Panel, Skeleton). Plans/Add-ons/FAQ are added to the reference outline because the brief requires them.
- **D-032 (2026-11-11) Squircles are vector backgrounds, not clip-paths** (supersedes D-028): SVG background + `drop-shadow` filter, described by `--sq-*` CSS variables. Glass surfaces stay plain rounded rectangles.
- **D-033 (2026-11-11) No squircles.** All corners are plain CSS radii. Supersedes D-028 (clip-path squircles) and D-032 (SVG squircles). Reason: they caused rendering problems; native radius, border and shadow are exact in every browser.
- **D-034 (2026-11-11) The dark statement is a scroll-scrubbed clip-path box** recreated from the reference source (pill grows into the box; pills glide through slots). It follows the hero normally (`COVER_VH` = 0). Reusable via `scrubRange()` and `mapRange()`.
- **D-035 (2026-11-11) One page grid, measured from the reference:** 1672px max content width, gutters 64 / 24 / 12px, cards 16px apart. Every section uses `page-width` / `Container`; none sets its own width.
- **D-036 (2026-11-11) Card illustrations are 3D renders** generated with Figma AI, not drawn in HTML (supersedes the collage approach of progress 0029). Violet, glass and matte plastic; white background blended into the card with `mix-blend-multiply`.
- **D-037 (2026-11-11) Feature section is a sticky list, not tabs** (supersedes D-026/D-027 chip tabs): one row per feature, text sticky left, gray demo panel right, demos play on scroll with Replay. No section heading, as in the reference.
- **D-038 (2026-11-11) Four feature bundles with Link-style demos** (supersedes the nine-row list of D-037): business (revenue, analytics, team, schedule, payout), front desk and CRM, coaches (wallet of earnings), clients (white-label app re-branding). Demos use a small simple UI kit (`components/features/ui.tsx`) instead of our native app components; client demo uses rounded app cards, no phone frame.
- **D-039 (2026-11-11) Keep the pinned phone hero and the floating pill nav.** Closes phase 3. Owner chose to keep both rather than switch to link.com's 50/50 panel hero and bordered bar: they are where Bizqwik differs from the reference; everything else follows it.
