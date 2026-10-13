# 0006 — Founder avatar photo

**Date:** 2026-10-13

## What changed
- Replaced the "KA" initials avatar in the hero's phone screen with the supplied photo.
- Converted to `public/demo/founder-avatar.webp`: 256x256, quality 84, 10 KB
  (source PNG was 481 KB). 256px = 4x the 64pt display size, sharp on dense screens.
- `FounderHome.tsx` renders it with `next/image` (`unoptimized`, `priority`, so the
  precomputed file is served directly and loads with the hero). Path lives in
  `content/demoApp.ts` (`avatar`), replacing `initials`.

## Verification
- Served as `image/webp`, 10,050 bytes, natural size 256; crisp at 2x in the docked
  screen; no console errors. `tsc` and `oxlint` pass.

## Open / next
- Demo content is still illustrative (brief GAP 7): swap the photo and the name
  "Karim" for approved ones before launch.
