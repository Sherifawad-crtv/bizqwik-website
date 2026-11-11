# 0026 — Squircles removed

**Date:** 2026-11-11 · Direction: delete the squircles from all radii; they were causing problems.

## What changed
- Removed the squircle system entirely: `components/ui/Squircle.tsx`, its mount in the layout, the `[data-sq]` / `--sq-*` / `--drop-*` CSS, every `data-sq` attribute.
- Every surface is back to ordinary CSS: `rounded-*` radius, `border`, `bg-*`, `shadow-*`. Radii are unchanged in value (buttons 24, cards 28, dark boxes 40, chips 12, pills full), so the layout is identical; the corners are circular arcs.
- Because shadows and borders are native again, the notches, ears and broken hairlines from 0025 cannot occur.
- Docs updated: the squircle section removed from `DESIGN-SYSTEM.md`; decision D-033 supersedes D-028 and D-032.

## Verification
- `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass; no `data-sq`, `--sq-` or `Squircle` left in `src/`. Screenshots at 3x density at 1440 and 390 wide show clean corners, shadows and hairlines.
