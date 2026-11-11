# Plan: rebuild the landing page on the reference outline

**Source of the outline and motion:** link.com (Stripe's Link), studied 2026-11-11 (see `docs/MOTION.md` for the measured numbers).
**What we take:** the page structure and the motion language. **What we keep:** our tokens (paper/violet, Urbanist, squircles), our content, our product-component demos.
**Rule:** one phase = one reviewable push with a progress note in `docs/progress/`.

## The outline (their order, our content)

| # | Section | Their version | Bizqwik version |
|---|---------|---------------|-----------------|
| 1 | Nav | Bordered bar, logo left, 3 actions right | Keep our navbar logic; restyle to the bar (decision in phase 3) |
| 2 | Hero | 50/50. Text left, small outlined link-card bottom-left. Right: gray panel with one floating card running a scripted demo | Headline + support + CTAs left; right: panel with a scripted Bizqwik demo (booking to confirmed) |
| 3 | Dark statement | Full-width dark box, big stat headline, brand pills orbiting the logo | "Run your whole gym from one place": role/feature pills orbiting the emblem |
| 4 | 2x2 cards | Outlined cards, title + line + 3D illustration | Four benefit cards with our own illustrations |
| 5 | Sticky features | Titles stack and stick; one big panel swaps its scripted demo; Replay pill | Our nine feature demos (already built), sticky list + Replay |
| 6 | Closing | Dark box, statement dims in word by word, three CTA cards, footer | Same |

## Phases

| Phase | Scope | Output |
|-------|-------|--------|
| **1. Motion system** (this push) | Tokens (eases, durations, distances), reveal / play-once-with-replay / press / scrub-text primitives, `data-reveal` convention, migrate every existing animation onto it, a guard script | `docs/MOTION.md`, `src/motion/*`, `npm run check:motion` |
| 2. Layout skeleton | Container, hairline-box grid, section shells in the 6-section order, empty panels, responsive rules | Page outline in place, no content polish |
| 3. Nav + hero | Decide: keep the pinned phone-morph hero or switch to the 50/50 panel hero. Nav as bordered bar or keep the pill | Hero + nav per decision |
| 4. Dark statement + orbit | Dark box, orbiting pills (loop motion token), stat headline | Section 3 |
| 5. Cards + illustrations | 2x2 grid, four illustrations (SVG/CSS), hover states | Section 4 |
| 6. Sticky feature stage | Sticky stacking titles, swapping panel, Replay, mobile behaviour | Section 5 (replaces the chip tabs) |
| 7. Closing + footer | Scrub-text statement, CTA cards, footer, anchors, SEO | Section 6 |
| 8. Polish + QA | Reduced motion pass, iOS Safari pass, performance, copy review | Release candidate |

## Open decisions (asked when their phase starts, not before)
- Phase 3: hero (pinned phone morph vs 50/50 scripted panel) and nav (floating pill vs bordered bar).
- Phase 1 note: link.com uses native scroll. We keep Lenis for now; its lerp is a token (`smoothScroll.lerp`).
