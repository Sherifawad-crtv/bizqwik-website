# 0018 — Ecosystem: tabbed two-panel stage

**Date:** 2026-11-04 · Direction: take inspiration from the owner's reference (Glofox "features" tabs, desktop +
mobile) and use our own real components inside the frame. Layout idea only; styling stays Bizqwik.

## What changed
- Five columns replaced by one **stage**: role chips on top (Founder, Accountant, Reception, Coaches, Client, each
  with its Solar icon; active chip = violet outline + tint), then two panels.
  - Left: lavender card with the role's real content from `appBlocks` (app title, headline, first three bullets).
  - Right: quiet Sunken panel centred on that role's live card (Demos.tsx, unchanged cards).
- Mobile: chips become a select plus a thin progress bar and `n/5` counter (as in the reference). The demo panel
  sits above the copy.
- Tabs are real `tablist`/`tab`/`tabpanel` with arrow-key navigation. Heading, tag and lede above are unchanged.
- Motion (`ecosystem-motion.ts`): all five loops are built once, but only the shown role plays, and only while the
  stage is on screen. A MutationObserver on `data-active` restarts the chosen loop (re-measured) and fades the copy in.
- Fixed in testing: the Apple-Pay button lost its centring when its loop restarted (CSS translate vs GSAP). It now
  uses GSAP `xPercent: -50`. Card title no longer wraps ("Check-in") on a phone.
- Added `alt-arrow-down` and `check-circle` to `components/ui/Icon.tsx`.

## Verification (Chromium, production build)
- 1440 and 390 wide: no overflow, no console errors; tab switch and select switch show the new role; the payout
  morph plays centred after switching. `tsc`, `oxlint`, `check:content`, `next build` pass.

## Open / next
- No auto-advance between roles yet (click only). Say if you want it, with a progress fill on the chip.
- No "Learn more" link on the left card: the per-app sections do not exist yet.
- Still unused: the hand-held iPhone mockup.
