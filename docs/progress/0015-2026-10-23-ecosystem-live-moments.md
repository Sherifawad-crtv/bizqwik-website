# 0015 — Ecosystem: one live product moment per role

**Date:** 2026-10-23 · Direction from the owner after 0014: the section copied the deck's presentation style
(numbered tiles, "used by", arrows). The brief is for content and features, not style. Instead: in each role,
one animated UI component that resembles the role (e.g. accountant: payout row, Pay clicked, morphing into a
green Paid, Apple Pay feel).

## What changed
- Removed from the cards: numbers, "Used by" chips, arrows between cards, icon tiles and the sync lighting.
- New `Demos.tsx` (five product moments) and a rewritten `ecosystem-motion.ts` (loops). See DESIGN-SYSTEM,
  "Ecosystem section" for the full table. In short: Founder (payment lands, revenue ticks, bar grows),
  Accountant (Pay to loader to green Paid), Front desk (QR scan to green check, client arrives), Coach
  (slide to log, earnings tick), Client (Book to green Booked, spots count down, +20 pts).
- Reusable `morphButton()` (the Apple-Pay move) and `tap()` (cursor press) in `ecosystem-motion.ts`.
- Layout fixes found while testing: accountant name no longer wraps; founder toast has its own strip; client
  points chip rides the spots row.
- Kept: the rising sheet, tilted tag, heading/lede (from the owner's reference), portraits, role captions
  (the brief's final role lines, unchanged).
- Docs: DESIGN-SYSTEM Ecosystem section rewritten; DECISIONS D-023 records the style rule.

## Verification (Chromium, production build)
- Frame-by-frame capture of all five loops at 1440x900 (14 frames each, 2x): every state reads clearly,
  no overlaps after the fixes. Also checked at 820 (2 columns) and 390 (1 column): loops play, no overflow.
- No console errors. `tsc`, `oxlint`, `next build` pass.

## Open / next (for the owner's review)
- Is each moment the right one for its role? Pacing and loop length? Copy inside (Coach Nour, Mona K.,
  figures) is illustrative.
- Card density and the heading/tag wording are still first-pass.
