# 0019 — Ecosystem: features instead of apps

**Date:** 2026-11-04 · Direction: the tabs showcase features (like the owner's Glofox reference chips), not the five apps.

## What changed
- New `content/features.ts` (+ `Feature`/`FeatureId` types): five feature tabs, copy lifted from the brief's app blocks.
  Revenue & Reports, Coach Payouts, Check-in & Sales, Sessions & Earnings, Booking & Client App. Each has a title,
  headline and three bullets, and maps to one existing live card (Revenue in, Coach payout, Check-in, Log session,
  Upcoming booking). The `LOOP` map in `Ecosystem.tsx` ties a feature to its loop in `ecosystem-motion.ts`.
- The section no longer names roles or apps: tag "Features", heading "Everything your gym runs on.", lede
  "Pick a feature and watch it work." (`content/hero.ts` `ecosystem`). Placeholder copy, change freely.
- `appSummaries` / `appBlocks` stay in content for the later "The apps" section.

## Verification
- `tsc`, `oxlint`, `check:content`, `next build` pass. Chromium 1440 and 390: tabs and select switch features,
  no overflow, no console errors.

## Open / next
- Which other features deserve a tab (memberships and freezing, wallet and loyalty, staff attendance, branding)?
  Each needs a new live card; say which and I will build them.
