# 0027 — Scroll-scrubbed statement section (phase 4 of the landing rebuild)

**Date:** 2026-11-11 · Direction: the second section is scroll-driven on link.com and its components keep moving; inspect their motion and recreate it.

## How the reference works (read from its source, not guessed)
Full numbers in `docs/MOTION.md` section 7. In short: a `clip-path: inset(...)` on the dark box is scrubbed by scroll progress, growing a 446x224 pill into the
full box; the headline container scales from 60% and rises from -250px while fading in; the logo drops from the pill to the centre; the
pills sit on an arc of eleven slots, glide to the next slot every few seconds (a spring), and the centre slot is highlighted.

## What changed
- `StatementSection` rebuilt (`components/sections/StatementSection.tsx` + `statement-motion.ts`): the same scrub values (including the exact 0.4 to 1 window and
  the radius that holds to 0.8), the same slot arrays, the same list drift (fast start, settles to idle, one slot per 90px of travel). Phone and tablet layouts follow the reference's
  smaller pill (280 x 140), 620px box and centred stack.
- Twelve pills of real content (`content/sections.ts` `orbit`), every line a task from the brief ("Check clients in by QR", "Run the monthly payout", ...). Screen readers get the list as one sentence;
  the moving list is `aria-hidden`.
- The section is no longer a sheet over the hero: it follows the hero normally, so the hero's extra pinned scroll (`COVER_VH`) is 0.
- New kit helpers in `motion/primitives.ts`: `scrubRange()` (scroll progress 0 to 1 over an element's pass through the viewport) and `mapRange()` (clamped linear map).
- Reduced motion: the finished box, list at rest, no ticker. Without JS: the finished box.

## Verification (Chromium, production build)
- Scroll sweep: clip-path, headline opacity and box position follow the reference's curve at 1440 (pill, growing, full box with radius 40) and 390 wide. The highlighted pill advanced
  from "Run the monthly payout" to "Take payment your way" while idle. Reduced motion shows the finished box. No console errors. `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass.

## Open / next
- Phase 3 still owns the hero decision. The hero now ends its pin and hands over with normal scrolling, as in the reference.
- Pill icons are our Solar icons on a circle; the reference uses brand logos. Pill copy is a first draft.
