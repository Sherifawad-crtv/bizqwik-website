# 0011 — Receipt shadow and polaroid photo morph

**Date:** 2026-10-16

## What changed
- **Receipt shadow.** It already had one, but its torn-edge mask clipped it away. `Chaos` now
  has a `torn` mode: the outer shell carries a soft `drop-shadow`, the masked paper is nested
  inside; blur moved onto that body so the shadow is not overwritten by the morph.
- **Polaroid.** New square photo (`public/demo/founder-photo.webp`, 256px, 5 KB) replaces the
  round one (old `founder-avatar.webp` deleted). The prop is a proper polaroid: white frame,
  thick caption border, tape, faint sheen. The same photo is the avatar's image.
- **Photo morph.** In flight, frame/caption/tape fade while the square photo scales to the
  avatar's size, moves to its place and loses its sepia tint; the shell rounds it into the
  circle, then hands over to the real avatar (same image, so it lines up). `POLAROID` constants
  in `phone.ts`; special case in `hero-motion.ts`.
- **Rebalanced scatter** so nothing covers the polaroid: avatar far right, range strip beside
  the phone top-right, spreadsheet slightly lower. Receipt sits over the sticky note by design.
- `demoApp.avatar` now points at the new file.

## Verification (Chromium, production build)
- Close-ups at 2x: receipt shadow visible with the zigzag intact; polaroid shows photo, frame,
  caption and tape. Filmstrip: photo shrinks out of the frame into the avatar's place.
- 1440x900, 1920x1080, 390x844 clean; reduced motion shows only the finished app; no overflow,
  no console errors. `tsc`, `oxlint`, `next build` pass.

## Open / next
- Photo and the name "Karim" are still illustrative demo content (brief GAP 7).
