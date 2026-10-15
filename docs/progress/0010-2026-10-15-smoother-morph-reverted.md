# 0010 — Smoother-morph attempt, reverted

**Date:** 2026-10-15

## What happened
- Commit `bc52e8a` tried a smoother morph: the manual prop tweened its shape, corners, tilt,
  colour, edge and shadow into the empty app card, its contents faded first, the app face
  arrived underneath and the shell dissolved last; longer morph (0.55), pin 2.2 viewport
  heights, no blur, nav/FAB/bars/count-up moved later.
- At the owner's request it was **reverted** (commit `97ade4d`, a plain `git revert`, no
  history rewrite). The hero is back to the 0009 behaviour: cross-dissolve with blur,
  morph length 0.3, pin 1.9 viewport heights.

## If it is wanted again
- `git show bc52e8a` has the full change (hero-motion.ts, Chaos.tsx `torn` prop,
  DESIGN-SYSTEM notes). `git revert 97ade4d` re-applies it.

## Verification
- After the revert: `tsc`, `oxlint`, `next build` pass; hero at 1440x900 and 390x844 renders
  as in 0009; no overflow, no console errors.
