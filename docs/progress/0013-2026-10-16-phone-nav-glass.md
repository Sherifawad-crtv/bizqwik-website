# 0013 — Phone mockup nav pill: glass ready before it shows

**Date:** 2026-10-16 · Scope: the bottom nav pill + FAB inside the hero's phone mockup (not the site navbar).

## What changed
- **Cause:** the pill/FAB faded in by animating `autoAlpha` on their *wrapper*. An ancestor with
  `opacity < 1` is a CSS backdrop root, so the pill's `backdrop-filter` could not see the chart behind it
  while fading (flat translucent), then popped to blurred at full opacity. `visibility: hidden` also kept
  the layer from being painted until the moment it showed.
- **Fix:** wrappers only move (`y`); the pill and FAB fade themselves (`[data-order]` opacity). Both
  faces get `will-change` and are painted (visible, opacity 0) from page load, so the blur is ready.
- (An earlier misread touched the site navbar's mobile sheet; those edits were reverted, nothing from them shipped.)

## Verification (Chromium, production build)
- At load, before any scroll: pill `visibility: visible`, `opacity: 0`, `backdrop-filter: blur(28px) saturate(1.8)`,
  zero ancestors with opacity < 1 or a filter.
- During the reveal (opacity 0.73, 0.90, 0.99, 1.00): zero blocking ancestors; the chart bars are
  visibly frosted behind the pill from the first frames. No console errors.
- `tsc`, `oxlint`, `next build` pass.
