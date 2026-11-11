# 0031 — Sticky feature list (phase 6 of the landing rebuild)

**Date:** 2026-11-11 · Direction: start phase 6, the sticky feature list (replaces the chip tabs).

## How the reference does it (read from its CSS and component source)
Each feature is its own row in a grid: the text column is `position: sticky; align-self: start; top: var(--headerNavOffset)` (96px) with `margin-bottom` of the same offset, so it
stays in view while its row scrolls and lets go before the row ends; the panel column is a gray, hairline-bordered box with an aspect ratio of 849/640 and `overflow: hidden`. Rows are 16px apart,
there is no heading above the list, no tab switching, and each panel's demo plays when it scrolls into view with a Replay pill in the corner. Column split: about 1 : 2.03 up to 1440px, about 1 : 1.4 above
(measured), stacked on phones.

## What changed
- New `components/ecosystem/FeatureList.tsx` replaces the tabbed stage (`Ecosystem.tsx` removed). Nine rows, one per feature (`content/features.ts`): title, headline and the three bullets with a small icon tile and hairlines
  on the left; the live demo and a Replay pill in the gray panel on the right. At 1440 the panel is 868 x 655 at x 508 and the text column 428 wide (reference: 869 x 655 at x 507, 427 wide).
- The section heading, "Features" tag and lede are gone: the reference has no heading above this list. The section keeps `id="apps"` for the "The apps" nav link.
- Under 901px the text is not sticky and sits above its panel (the reference squeezes the text into a narrow column there). New token `--header-offset: 96px` in `globals.css`.
- Motion: `initFeatureMotion` in `ecosystem-motion.ts` replaces the tab logic. Every panel's demo plays once when its panel scrolls into view (`playOnView`), holds its finished frame, and replays from its own Replay pill.
  All nine demos are on screen from load, so the old "width measured while hidden" bug cannot occur. Reduced motion: finished states, Replay hidden.
- Panel sizing: aspect ratio 849/640 from 901px, with a 640px minimum height so the tallest demos clear the Replay pill at 1024px; `w-full min-w-0` stops the minimum height from widening the panel through the aspect ratio (this had caused a 100px sideways scroll at 1024).

## Verification (Chromium, production build)
- Nine panels at 1440, 1024 and 390 wide: every demo fits inside its panel and clears the Replay pill (measured after each finished), no horizontal overflow, no console errors.
- Behaviour on the payments panel: hidden until scrolled to, plays (violet to spinner to green Paid), holds for 9 seconds, Replay returns to the first frame and plays again; panels not yet seen stay untouched; reduced motion shows the finished state and hides Replay.
- `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass. Not tested on real iOS Safari.

## Notes and open points
- Nine rows make a long section (about 6,200px at 1440). The reference has four. If it feels too long, merge related features (for example Check-in with Bookings, Payments with Memberships) or cut to the strongest six.
- The sticky text only has about 280px of travel because three bullets make the text block taller than the reference's. Dropping the bullets would give it more.
- Next: phase 3 (nav and hero decisions), phase 7 (Plans, Add-ons, FAQ), phase 8 (closing), phase 9 (polish).
