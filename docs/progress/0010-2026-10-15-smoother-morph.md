# 0010 — Smoother, more natural morph

**Date:** 2026-10-15 · Feedback on 0009: the morph should feel smoother and more natural.

## What changed
- **Cause:** 0009 cross-dissolved two faces (fade + blur), so mid-transition neither was solid.
- **Now the paper becomes the card.** The manual face's size, corner radius, tilt, colour,
  hairline edge and shadow tween into the empty app card; the receipt's torn edge straightens
  (mask size tween). Its contents fade out early; the Bizqwik face fades in *underneath* the
  nearly finished card; the shell dissolves last. A piece is never see-through.
- Longer and calmer: `MORPH` 0.55 per piece (was 0.3), stagger 0.04, pin 2.2 viewport heights
  (was 1.9), nav/FAB/chart bars/count-up moved later so they follow the morph.
- Blur removed from the morph (smoother and cheaper to paint).
- Docs: DESIGN-SYSTEM morph description and knobs.

## Verification (Chromium, production build)
- Filmstrip at 8 scroll steps (1440x900): solid piece in every frame, shells land as blank
  cards then fill with content; no see-through gaps; end state clean, nothing left over.
- 390x844 and 1920x1080 clean; reduced motion shows only the finished app; resize still correct.
- No overflow, no console errors. `tsc`, `oxlint`, `next build` pass.

## Open / next
- Pacing is easy to retune (MORPH, stagger, PIN_VH). Say if you want it slower, snappier, or
  with the content arriving earlier than the shell lands.
