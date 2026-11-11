# 0024 — Layout skeleton (phase 2 of the landing rebuild)

**Date:** 2026-11-11 · Plan: `docs/PLAN-landing-outline.md`.

## What changed
- `/` now shows the whole outline in order: Hero, **dark statement**, **four cards**, **feature stage**, **Plans / Add-ons / FAQ shells**, **closing + footer**.
- New layout primitives (`components/layout/layout.tsx`): `Container`, `Box` (hairline box, tones surface/paper/dark/raised), `Panel`, `Skeleton`.
- New sections (`components/sections/`):
  - `StatementSection`: the dark sheet (`-mt-[100svh]`) that takes over the hero hand-off from the old Ecosystem sheet; headline from the FINAL tagline; the five feature pills sit beside the emblem, fading by distance, static (phase 4 animates them).
  - `BenefitsSection`: 2x2 outlined cards, each title + line + dashed illustration slot (phase 5). Cards use `data-reveal`.
  - `Shells`: Plans, Add-ons, FAQ shells with their real headings, so the nav anchors work. The reference page has no pricing; the brief requires it (added as phase 7).
  - `ClosingSection`: dark box, closing statement, three action cards (call, email, see plans), footer with nav links.
- Feature stage (`Ecosystem.tsx`) is now a plain section (`#apps`): the rising sheet, peeking pages and the sheet padding are gone.
- Nav anchors now all resolve (`#apps`, `#plans`, `#add-ons`, `#faq`, `#contact`); before, only the old `#ecosystem` existed.
- Draft copy for the new sections in `content/sections.ts` (from the brief's lines); `SectionId` gains `benefits`.
- Plan updated: phases renumbered (new phase 7, brief sections).

## Verification (Chromium, production build)
- All seven section ids present at 1440 and 390 wide, in order; no horizontal overflow, no console errors. Nav active state follows the sections.
  `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass.

## Open / next
- Phase 3 decisions (hero, nav, scroll) are still open. The hero is untouched.
- Skeleton slots are labelled with their phase on purpose; they disappear as phases land.
