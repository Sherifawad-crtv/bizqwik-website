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
