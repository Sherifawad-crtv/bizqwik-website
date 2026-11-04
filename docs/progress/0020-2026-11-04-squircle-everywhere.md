# 0020 — Squircle corners in every browser

**Date:** 2026-11-04 · Report: squircles only showed in Chrome on Mac; iOS Safari (iPhone) showed plain round corners.

## Cause
The old rule was `[data-sq] { corner-shape: squircle }`. That CSS property exists only in Chromium.

## What changed
- Removed the `corner-shape` rule from `globals.css`.
- New `components/ui/Squircle.tsx` (mounted once in `layout.tsx`): for every `[data-sq]` element it draws the same shape
  (superellipse, exponent 4 = the spec's `squircle`) as `clip-path: path()`, sized per element, kept in sync by a
  ResizeObserver, and picks up elements added later (menu sheet, tabs) with a MutationObserver.
- The path uses the even-odd rule (big rect + border box + squircle) so the element's box-shadow and focus ring are not
  clipped; the fill is shaped by the squircle. Painted `border-radius` is set to half the squircle radius so the fill
  covers the squircle corners.
- `data-sq` added to the new feature chips and the mobile select.
- To squircle anything else: add `data-sq` and a `rounded-*` class. Radius comes from the class.

## Verification
- Chromium production build at 1440 and 390: CTAs, nav tile/pill/menu button, chips all squircle, shadows intact,
  no console errors. I could not run real iOS Safari here; `clip-path: path()` with `evenodd` is supported since Safari 13.1.
