# 0025 — Squircles as vectors: shadows, hairlines and logo tile fixed

**Date:** 2026-11-11 · Report: shapes, shadows and the logo tile looked low quality (zoomed screenshot from the owner).

## Causes (reproduced at 3x pixel density, zoomed)
1. **Clip-path squircles clip shadows.** The clip left lighter square notches at the corners of the navbar pill and dark "ears" under the bottom corners of the logo tile, because a box-shadow follows a plain rounded box, not the squircle.
2. **Hairline borders broke at corners** (the CSS border follows a circle, the clip followed the squircle).
3. **Faceted curves**: the squircle was a 14-segment polygon per corner, visible on larger shapes.
4. **The B on the statement tile** was the violet logo run through `brightness-0 invert`, which gave it a white halo. A proper reversed logo is still a brief gap.

## What changed
- `components/ui/Squircle.tsx` rewritten: each `data-sq` element is now painted as an **SVG background** (superellipse, about 1px per segment, a true stroke for the hairline). Crisp at any density; no clip-path.
- Shadows are `filter: drop-shadow(...)` on the element, so they follow the painted squircle exactly (tokens `--drop-card`, `--drop-float` in `globals.css`).
- A squircle is described with CSS variables, never `bg-*`/`border-*`/`shadow-*` classes: `--sq-r`, `--sq-fill`, `--sq-stroke`, `--sq-sw`, `--sq-drop`. Documented in `globals.css`. Without JS the same variables paint a plain rounded rectangle. State changes (selected chip, hover, focus) repaint the shape.
- Migrated: Button, ReplayButton, Box, Panel, ecosystem chips, navbar tile, navbar active indicator and menu button, statement tile and dark boxes, closing box.
- **Glass surfaces (navbar pill, mobile bar, mobile sheet) are plain rounded rectangles again**: a backdrop blur cannot follow an SVG shape and a filtered ancestor would blind it. The pill's shadow was also softened.
- Removed the big top shadow on the dark statement sheet and the glow-through-clip artefacts. The statement tile is a light tile with the original violet B (no inversion), with a violet glow.

## Verification
- Chromium production build at 3x density: tile, pill, cards, chips, closing box, mobile bar and menu all crisp, no notches or ears, hairlines continuous around corners. 31 of 33 squircle elements painted (the other two are the hidden desktop/mobile counterparts). `tsc`, `oxlint`, `check:content`, `check:motion` pass. Real iOS Safari not available here.

## Open / next
- **Waiting on the reversed (dark-mode) logo** from the owner. Until it arrives the tile uses the violet mark on a light tile.
