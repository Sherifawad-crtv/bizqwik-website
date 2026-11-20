# 0059 CTA text centring (2026-11-20)

Measured the ink of the text inside every CTA (desktop and 390 wide): Urbanist sat about 1px high in the button, and some CTAs inherited `text-align: start`. `Button` (src/components/ui/Button.tsx) now sets `text-center`, `leading-none` and `pt-[2px]`, so the caps land on the button's centre (within half a pixel) on every CTA: hero, plans, closing, contact and support. Height stays 56px.

## Inside the animated phone mockups
The same offset was in the phone scenes (business, front desk, coaches, brand): every fixed-height button, pill, chip and initial badge (Pay, Mark paid, Renew, Approve, Details, Lana, the D/M avatars...). One rule in `src/styles/globals.css` scoped to `[data-demo]` gives them `padding-top: .12em; line-height: 1`, so the labels sit on the optical centre like the site CTAs. Two-line tiles (flex-col) are untouched. Checked on all four phones at 3x.
