# 0036 — White CTA hover: darker shade, not inverted

**Date:** 2026-11-11 · Direction: skip the inverted colour on the white CTAs; use a darker shade of the original colour. Supersedes the colour part of 0035 (the 0.5s rounding stays).

## What changed (`components/ui/Button.tsx`)
- White (secondary) CTA hover: `surface` `#FBFAF7` darkens to `sunken` `#ECEBE5`; the text stays `ink`. The shadow and the corner rounding are unchanged.
- The `hover:brightness-105` boost now belongs to the violet CTA only. On the white button it would have lightened the darker fill again (measured effect: it undid about half the darkening).
- Violet CTA unchanged (darkens to `primary-pressed`).
- `docs/DESIGN-SYSTEM.md` updated: "darkens, never inverts".

## Verification (Chromium, production build)
- White CTA: rest `rgb(251,250,247)`, hovered `rgb(236,235,229)` with `rgb(26,23,38)` text, back to rest after leaving; radius 20px then 28px then 20px. Violet CTA: `rgb(90,65,255)` then `rgb(72,50,214)`. No console errors. `tsc`, `oxlint`, `check:motion`, `next build` pass.
