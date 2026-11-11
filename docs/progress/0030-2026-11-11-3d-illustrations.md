# 0030 — 3D illustrations for the four cards (replaces 0029)

**Date:** 2026-11-11 · Direction: the collages from 0029 are "not illustrations"; build 3D-like illustrations like the reference.

## What changed
- Four 3D renders, all **Nano Banana Pro** (Figma Weave), 4:3, 2K, one shared style bible and prompt pattern (isometric, frosted glass and matte plastic, violet `#5A41FF` hero colour,
  soft green only on check badges, no text or people), each with a style reference. The brief used for the last two is `docs/ILLUSTRATION-BRIEF.md`.
  - `checkin`, `payment`: generated from this session through the Weave connector (22 credits). The Weave free plan allows only 2 agent model runs, so the other two were made by the owner in the Weave app with that brief.
  - `roster` (calendar with figures and a check badge) and `control` (glass dashboard, bars, ring, coin, trend tile): delivered as images by the owner.
  - The first attempt (default Figma image tool, lower quality) was discarded.
- Processing (Pillow/NumPy): the renders have a soft grey-lavender backdrop, so each is **flat-fielded** (a smooth background model is fitted to the frame border and divided out) so the backdrop becomes pure white while shadows stay,
  near-white is snapped to `#FFFFFF`, then cropped to the subject with a 7% margin on a 4:3 canvas and saved as 1400x1050 WebP (about 30-40 KB each) in `public/illustrations/`.
- `BenefitsSection` shows them with `mix-blend-multiply`, so the white drops out into the card colour; hover lifts and grows the image slightly (`duration.slow`, `ease.standard`). `unoptimized` on purpose so the pure white is not re-encoded.
- Removed `components/sections/BenefitArt.tsx` (HTML collages). `components/product/parts.tsx` stays (the demos use it).

## Verification (Chromium, production build)
- Four cards at 1440 and 390 wide (2x density): renders sit centred, no visible box (sampled pixels inside the image area equal the card colour), no horizontal overflow, no console errors.
  `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass. Not tested on real iOS Safari.

## Notes
- Credits: 4 Figma AI credits were spent on the discarded first attempt; 22 Weave credits on the two renders made from this session (128 left in the workspace, which is on the Weave Free plan). The Weave links expire after 7 days; the processed files are in the repo.
- To change a render: edit its prompt in `docs/ILLUSTRATION-BRIEF.md`, regenerate in the Weave app with the other renders as references, and re-run the flat-field, crop and WebP step on the new PNG.
- `www.figma.com` and `s3-alpha-sig.figma.com` were added to the allowed hosts of the personal "Open" environment so Figma and Weave images could be downloaded.
- The renders carry no text. Names or figures never appear in them.

## Open / next
- Phase 6: the sticky feature list with the swapping demo panel.
