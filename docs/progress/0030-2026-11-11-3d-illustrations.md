# 0030 — 3D illustrations for the four cards (replaces 0029)

**Date:** 2026-11-11 · Direction: the collages from 0029 are "not illustrations"; build 3D-like illustrations like the reference.

## What changed
- Four 3D renders generated with Figma AI (model `gpt-image-2.5-flare`, 4:3, 1280x960) in a new Figma file, "Bizqwik landing illustrations" (team "Sherif's Lab",
  https://www.figma.com/design/Riec6mMgMwGXb6NgNQ4j8i). One shared style prompt: isometric, frosted glass and matte plastic, violet `#5A41FF` main colour, lavender, a touch of white,
  soft green only on check badges, pure white background, no text or people. Subjects: a QR glass tile with a dumbbell and a check badge (check-in); a zip wallet with a card and coins (payments);
  a calendar with three token figures and a check badge (bookings); a glass dashboard with violet bars, a ring and a coin (control).
- Processed with Pillow: cropped to the subject with an 8% margin on a 4:3 canvas, white levelled to pure `#FFFFFF`, saved as WebP (about 25 KB each) in `public/illustrations/`
  (`checkin`, `payment`, `roster`, `control`).
- `BenefitsSection` shows them with `mix-blend-multiply`, so the white drops out and the card colour shows through (no cut-out needed). Hover lifts and grows the image slightly
  (`duration.slow`, `ease.standard`). `unoptimized` on purpose: Next's re-encoding would shift the pure white the blend relies on.
- Removed `components/sections/BenefitArt.tsx` (the HTML collages). `components/product/parts.tsx` stays (the demos use it).

## Verification (Chromium, production build)
- Four cards at 1440 and 390 wide (2x density): renders sit centred, no visible box (sampled pixels inside the image area equal the card colour), no horizontal overflow, no console errors.
  `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass. Not tested on real iOS Safari.

## Notes
- Figma AI credits were used (4 images, no retries). The Figma asset links expire after 7 days; the processed files are in the repo, and the originals are in the Figma file.
- To change a render: edit the prompt, regenerate in the Figma file, re-run the crop and white-level step, replace the WebP.
- `www.figma.com` was added to the allowed hosts of the personal "Open" environment so the full-size images could be downloaded.
- The renders carry no text. Names or figures never appear in them.

## Open / next
- Phase 6: the sticky feature list with the swapping demo panel.
