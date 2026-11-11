# 0033 — Feature rows: proximity spacing on phones and tablets

**Date:** 2026-11-11 · Report (iPhone screenshots of ours and the reference): each title sat close to the previous card and far from its own, so it read as belonging to the wrong one.

## Measured
- Reference on a phone: about 60px between the previous panel and the next divider and about 30px between the text block and its own panel (their row gap is 64px under 600px, the text has a 32px bottom margin).
- Ours before: 16px above the divider and about 55px to its own panel (16px row gap, a 32px margin and the last bullet's padding).

## What changed (`FeatureList.tsx`)
- Stacked layout (under 901px): rows are **64px** apart (`max-[900px]:gap-16`), the text block has a **32px** margin before its panel (`mb-4` plus the 16px grid gap), and the last bullet has no bottom padding.
  Measured at 390 and 768: 64px above the divider, 32px between the last bullet and the panel (2:1), so each block groups with the panel below it and is clear of the one above.
- Desktop (two columns) is unchanged: the text sits beside its own panel, 16px between rows.

## Verification (Chromium, production build)
- Gaps measured on rows 2 to 4 at 390, 768 and 1440 wide: 64 / 32 on phone and tablet. All nine demos still fit their panels and clear the Replay pill at 1024, 1440 and 390; no horizontal overflow, no console errors.
  `tsc`, `oxlint`, `next build` pass. Not tested on real iOS Safari.
