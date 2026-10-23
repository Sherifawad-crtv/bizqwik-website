# 0017 — Ecosystem: light status-card style

**Date:** 2026-10-23 · Direction: restyle the five role components to look like the owner's reference cards
(Calendar booking, Revenue in, Membership renewal; upload `Bizqwik_11.zip`).

## What changed
- Each card now follows the reference anatomy: Surface card with hairline border and soft shadow, lavender
  rounded-square icon tile + bold title + mono status pill (flips amber to green), big numbers, muted sub-line,
  sunken well, control. See DESIGN-SYSTEM "Ecosystem section" for the full spec and the per-role table.
- New cards: Founder "Revenue in" (PENDING to RECEIVED, +1,250.00 EGP counts up), Accountant "Coach payout"
  (Pay to Paid, amount turns green), Reception "Check-in" (QR scan to CHECKED IN), Coaches "Log session" (slide to
  log, earnings tick), Client "Upcoming booking" (Book to CONFIRMED, with the reference's date well).
- Layout: titles stay above the cards; 3 cards over 2 wider ones on desktop (the cards need room), 2 across on tablet.
- Added `calendar` to `components/ui/Icon.tsx`. New `Swap` primitive for text that changes in place.
- Fixed in testing: counters now reset at the start of each loop (the previous final number used to linger);
  Reception sub-line no longer double-prints while crossfading.

## Verification (Chromium, production build)
- Full-section capture at 1440 wide; frame-by-frame capture of all five loops; DOM sampling over 40 ticks confirms
  numbers reset and pills flip in sync. No console errors. `tsc`, `oxlint`, `next build` pass.

## Open / next
- Unused so far: the hand-held iPhone mockup (shows the founder home in a hand). Where should it go?
- Card density, pill wording and the figures are first-pass. The "Membership renewal" card is only reflected as the
  header style (icon tile + title); say if you want it as its own moment (e.g. for Reception).
