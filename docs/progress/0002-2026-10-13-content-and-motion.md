# 0002 — Content layer + motion foundation

**Date:** 2026-10-13 · **Stage:** foundation (still no page sections)

## What changed
- **Content layer** in `src/content/`, typed (`types.ts`) and split by section:
  `site` (contact, nav, CTAs, SEO, microcopy, VAT notes), `hero` (+ ecosystem),
  `apps` (five summaries, five blocks, illustrative client brands), `plans`
  (plans, plan-app matrix, Enterprise panel, compare table, footer), `addons`,
  `faq`, `contact`. Copy is verbatim from the brief. Components will render
  this data and never hold copy.
- Root layout title/description now read from `content/site.ts`.
- **Motion foundation** in `src/motion/`: `tokens.ts` (eases, durations,
  staggers, Lenis feel), `gsap.ts` (single plugin registration: ScrollTrigger,
  SplitText), `SmoothScroll.tsx` (Lenis driven by the GSAP ticker; mounted in
  the root layout; off under reduced motion).
- Dependencies added: `gsap`, `lenis`.
- Motion tokens removed from `tokens.css` (they now live in TS).
- `npm run check:content` (`scripts/check-content.ts`): guards the hard content
  rules. Also verified it fails when a rule is broken.
- Docs: DESIGN-SYSTEM motion section rewritten; DECISIONS D-007 to D-009.

## Why
Direction is Awwwards-grade, GSAP-driven, smooth scrolling, so the brief's
restrained-motion and layout specs are dropped and only its website content is
kept (D-007, D-008). Putting content in typed data keeps the page scalable:
a CMS or database can replace `src/content/` later without touching components,
and plans can be bound to billing when subscriptions ship.

## Verification
- `tsc --noEmit`, `oxlint`, `next build`, `check:content` all pass.
- Chromium 1440px: Lenis active (`html.lenis`), wheel scroll eases (730px then
  1200px), no console errors. With reduced motion: Lenis off, native instant
  scroll, no errors.

## Open / next
- Next phase: hero + nav pill, to lock the visual and motion language.
- Device mockups and screenshots are not available yet; the hero art will use
  whatever assets are supplied (see ROADMAP).
- Brief GAPs that still need an owner decision: domain, `tel:` format and
  WhatsApp, legal entity, analytics tool, Arabic/RTL.
