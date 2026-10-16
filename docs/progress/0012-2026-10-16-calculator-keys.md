# 0012 — Calculator keys

**Date:** 2026-10-16

## What changed
- The hero's calculator prop now has labelled keys in a real layout (`Chaos.tsx`, `CALC_KEYS`):
  7 8 9 ÷ / 4 5 6 × / 1 2 3 - / 0 . = +. Digits on cream keys, operators white on the orange column.
  Space Mono bold 12px; all characters are in the font's Latin subset.

## Verification
- 3x close-up: all 16 keys legible, tilt and shadow intact. `tsc`, `oxlint`, `next build` pass,
  no console errors.
