# 0032 — Divider above each feature title

**Date:** 2026-11-11 · Direction: add a divider on top of each title, like the reference, that appears with the scroll.

## How the reference does it (read from its accordion component and CSS)
A 1px line sits above the title (a block of its own, 16px above the title, full text-column width, `transform-origin: left`). When the row is on screen it draws `scaleX` 0 to 1 over 0.6s with a 0.2s delay;
when the row leaves it goes back to 0 in 0.3s. The whole text block fades 0 to 1 over 0.3s with it. "On screen" uses an observer with a -192px margin top and bottom (twice the header offset), so it
triggers a little after the row appears and reverses a little before it leaves. On phones the block starts visible.

## What changed
- `FeatureList`: each text block has `data-accordion` and a `data-rule` divider (1px, ink at 15%) above the title, 16px gap. The first bullet no longer has its own top hairline (the divider now opens the block).
- `motion/primitives.ts`: new `toggleOnView(el, onChange, margin)`, an observer that fires on enter and on leave, every time, using the element's real position (so it works while the text is stuck).
- `initFeatureMotion`: on desktop and tablet the block starts hidden (opacity 0, line scaled to 0) and shows or hides as above using tokens (`duration.fast`, `duration.slow`, `ease.standard`, delay `gap.beat * 2`). Phones start visible and only react on leaving. Reduced motion: nothing animates (the block stays as rendered).
- `docs/MOTION.md`: the primitive and the divider recipe.

## Verification (Chromium, production build)
- Desktop and phone: hidden at load, on entering view opacity 0 to 1 and the line at 0.78 after 0.5s and 1.00 after 1.1s, both back to 0 after scrolling away. No console errors.
  `tsc`, `oxlint`, `check:motion` pass. Not tested on real iOS Safari.

## Open / next
- Reduced-motion visitors see every block fully visible with the line drawn (no observer runs for them).
