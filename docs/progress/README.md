# Progress log

One markdown entry per push, newest number highest. Each entry records **what
that push changed and why**, plus how it was verified, so a designer or
developer picking this up can read the history as a narrative.

Convention (same as the app repo, `Sherifawad-crtv/bizqwik`):

- File name: `NNNN-YYYY-MM-DD-short-slug.md` (zero-padded, monotonic).
- Sections: **What changed**, **Why**, **Verification**, **Open / next**.
- Entries are point-in-time and never edited after their push. Corrections go
  in a new entry.
- Anything that changes a token, a font or a motion rule also updates
  `docs/DESIGN-SYSTEM.md` in the same push.
- Decisions that outlive one push go in `docs/DECISIONS.md`.

## Index

| # | Date | Entry |
|---|---|---|
| 0001 | 2026-10-13 | [Foundation: scaffold, fonts, tokens](0001-2026-10-13-foundation.md) |
| 0002 | 2026-10-13 | [Content layer + motion foundation](0002-2026-10-13-content-and-motion.md) |
| 0003 | 2026-10-13 | [Navbar: wide ⇄ narrow, mobile pill + sheet](0003-2026-10-13-navbar.md) |
| 0004 | 2026-10-13 | [Hero: pinned scatter-to-dock phone](0004-2026-10-13-hero.md) |
| 0005 | 2026-10-13 | [Hero decluttered, true-size screen, navbar centred and post-hero](0005-2026-10-13-hero-fixes.md) |
| 0006 | 2026-10-13 | [Founder avatar photo](0006-2026-10-13-founder-avatar.md) |
| 0007 | 2026-10-13 | [New hero headline](0007-2026-10-13-headline.md) |
| 0008 | 2026-10-13 | [New hero subtitle](0008-2026-10-13-subtitle.md) |
| 0009 | 2026-10-15 | [Hero: manual-to-Bizqwik morph](0009-2026-10-15-hero-morph.md) |
| 0010 | 2026-10-15 | [Smoother-morph attempt, reverted](0010-2026-10-15-smoother-morph-reverted.md) |
| 0011 | 2026-10-16 | [Receipt shadow and polaroid photo morph](0011-2026-10-16-receipt-polaroid.md) |
| 0012 | 2026-10-16 | [Calculator keys](0012-2026-10-16-calculator-keys.md) |
| 0013 | 2026-10-16 | [Phone nav pill: glass ready before it shows](0013-2026-10-16-phone-nav-glass.md) |
| 0014 | 2026-10-23 | [Ecosystem section, first pass](0014-2026-10-23-ecosystem.md) |
| 0015 | 2026-10-23 | [Ecosystem: one live product moment per role](0015-2026-10-23-ecosystem-live-moments.md) |
| 0016 | 2026-10-23 | [Ecosystem: strip to the component, short titles above](0016-2026-10-23-ecosystem-minimal.md) |
| 0017 | 2026-10-23 | [Ecosystem: light status-card style](0017-2026-10-23-ecosystem-light-cards.md) |
| 0018 | 2026-11-04 | [Ecosystem: tabbed two-panel stage](0018-2026-11-04-ecosystem-tabbed-stage.md) |
| 0019 | 2026-11-04 | [Ecosystem: features instead of apps](0019-2026-11-04-ecosystem-features.md) |
| 0020 | 2026-11-04 | [Squircle corners in every browser](0020-2026-11-04-squircle-everywhere.md) |
| 0021 | 2026-11-04 | [Ecosystem: swipeable pills on mobile](0021-2026-11-04-mobile-chips.md) |
| 0022 | 2026-11-04 | [Ecosystem: real product components, nine features](0022-2026-11-04-ecosystem-real-components.md) |
| 0023 | 2026-11-11 | [Motion system (phase 1 of the landing rebuild)](0023-2026-11-11-motion-system.md) |
| 0024 | 2026-11-11 | [Layout skeleton (phase 2)](0024-2026-11-11-layout-skeleton.md) |
| 0025 | 2026-11-11 | [Squircles as vectors](0025-2026-11-11-squircle-vectors.md) |
| 0026 | 2026-11-11 | [Squircles removed](0026-2026-11-11-squircles-removed.md) |
| 0027 | 2026-11-11 | [Scroll-scrubbed statement (phase 4)](0027-2026-11-11-scrubbed-statement.md) |
| 0028 | 2026-11-11 | [Page grid from the reference](0028-2026-11-11-page-grid.md) |
| 0029 | 2026-11-11 | [Card illustrations (phase 5)](0029-2026-11-11-benefit-illustrations.md) |
| 0030 | 2026-11-11 | [3D illustrations for the four cards](0030-2026-11-11-3d-illustrations.md) |
| 0031 | 2026-11-11 | [Sticky feature list (phase 6)](0031-2026-11-11-sticky-feature-list.md) |
| 0032 | 2026-11-11 | [Divider above each feature title](0032-2026-11-11-feature-divider.md) |
| 0033 | 2026-11-11 | [Feature rows: proximity spacing](0033-2026-11-11-feature-proximity.md) |
| 0034 | 2026-11-11 | [CTA corner radius](0034-2026-11-11-cta-radius.md) |
| 0035 | 2026-11-11 | [CTA hover: smoother rounding, white CTAs reverse](0035-2026-11-11-cta-hover.md) |
| 0036 | 2026-11-11 | [White CTA hover: darker shade](0036-2026-11-11-cta-hover-shade.md) |
| 0037 | 2026-11-11 | [Feature list rebuilt as four bundles](0037-2026-11-11-feature-bundles.md) |
| 0038 | Fixed-height feature panels on phones |
| 0039 | Phase 7: Plans, Compare, Add-ons, FAQ |
| 0040 | Statement section smoothing on touch |
| 0041 | Desktop navbar glass |
| 0042 | Phase 8: closing, footer, SEO |
| 0043 | Phase 9: QA pass (first round) |
| 0044 | Phase 3 closed: keep pinned hero and pill nav |
| 0045 | Support centre and policy pages |
| 0046 | Feature demos start when you arrive at them |
| 0047 | Support hub illustration without blend mode |
| 0048 | Lighthouse pass |
