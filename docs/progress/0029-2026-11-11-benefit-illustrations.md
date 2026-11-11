# 0029 — Card illustrations (phase 5 of the landing rebuild)

**Date:** 2026-11-11 · Direction: build the illustrations for the four cards (asked: "how will you get the illustrations?" Answer: drawn in code from our own product pieces).

## What changed
- `components/sections/BenefitArt.tsx`: four illustrations, each a small collage of product pieces, in HTML with the site's tokens. No image files, so they are sharp at any size.
  - **Check clients in fast:** QR card, member card (Mona K., Active), a "Checked in" pill.
  - **Take payment your way:** amount pill, Cash / Card / InstaPay cards fanned with InstaPay selected, a "Paid" pill.
  - **Know who is coming:** three roster rows (Arrived / Booked chips), an "8 coming" badge.
  - **Stay in control:** revenue card with a bar chart, a coach payout row marked Paid, the emblem tile.
- `BenefitsSection` uses them in place of the dashed placeholders. Pieces lift a few pixels when a card is hovered (`duration.slow`, `ease.standard` via the CSS twins). Illustrations are `aria-hidden`; the title and line carry the meaning.
- New `components/product/parts.tsx`: `Pill`, `Kick` and `QrGrid` moved out of `Demos.tsx` so the demos and the illustrations share the same pieces. `Demos.tsx` imports them; no visual change there.

## Verification (Chromium, production build)
- All four cards captured at 1440 and 390 wide (2x density): pieces sit inside their cards, no horizontal overflow, no console errors.
  `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass. Not tested on real iOS Safari.

## Open / next
- Names and figures are illustrative (brief GAP 7), same as the demos.
- Phase 6 next: the sticky feature list with the swapping demo panel.
