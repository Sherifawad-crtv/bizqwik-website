# 0059 CTA text centring (2026-11-20)

Measured the ink of the text inside every CTA (desktop and 390 wide): Urbanist sat about 1px high in the button, and some CTAs inherited `text-align: start`. `Button` (src/components/ui/Button.tsx) now sets `text-center`, `leading-none` and `pt-[2px]`, so the caps land on the button's centre (within half a pixel) on every CTA: hero, plans, closing, contact and support. Height stays 56px.
