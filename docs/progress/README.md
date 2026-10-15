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
| 0010 | 2026-10-15 | [Smoother, more natural morph](0010-2026-10-15-smoother-morph.md) |
