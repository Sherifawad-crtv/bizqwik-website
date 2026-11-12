# 0048 Lighthouse pass (mobile profile, local production build)
Scores before -> after the fixes in this note (home page; run-to-run noise on performance is about +/-6):
- Home: performance 78 -> 72-78, accessibility 92 -> 96, best practices 100, SEO 63 (only "page is blocked from indexing", the deliberate `noindex`).
- /support: performance 98, accessibility 100, best practices 100, SEO 66 (noindex). /privacy: 99, 100, 100, 66.
- Fixed: `aria-label` on the closing statement's paragraph (SplitText now runs with `aria: "none"`); contrast of the small notes and red marks in the hero's paper props (`#8d8d88` -> `#6b6b66`, `#c63a2c` -> `#a6281c`); `sizes` on the phone frame image.
- Left, by design: the closing statement's words start dim (25%) and light up as you scroll, which Lighthouse reads as low contrast at rest.
- Open: home page LCP is 3.7-4.1 s and total blocking time 450-580 ms under Lighthouse's slowed phone profile. Cause is main-thread work (GSAP, smooth scroll, hero timelines, 1,267 DOM nodes), not image weight. Next steps if wanted: delay Lenis and the below-the-fold scroll setups until idle, and lazy-start the feature demos.
- Open for launch: remove `noindex` (`app/layout.tsx`) when the site goes public.
