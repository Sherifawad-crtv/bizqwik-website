# 0022 — Ecosystem: real product components, nine features

**Date:** 2026-11-04 · Direction: use our real components in the stage and add more features (scheduling, bookings, etc.).
Source for the look: the product repo (`Sherifawad-crtv/bizqwik`, `src/components` and `src/routes`).

## What changed
- Every demo is now an app "screen" (paper background, mono kicker, bold title, as the app's header) built from ports of the
  real components: **Segmented** (month and view switchers), **StatePill / PackageStatusPill** (dot + mono caps),
  **MoneyHero**, the front desk **week TimeGrid** (tinted class blocks with violet left edge, today circle, red now-line),
  **Bookings rows** (time, title, "N booked", NOW/NEXT chips), the **class roster row** (attendance chip, Arrived / No-show),
  **PaymentCards** (Cash / Card / InstaPay, selected = tint + 2px violet), **DayList rows** and the product **Button**
  (secondary tint). They are presentational ports in `Demos.tsx`; the app itself is not imported.
- Nine feature tabs (was five): Revenue & Reports, **Scheduling**, **Bookings**, Check-in, **Payments & Sales**,
  **Memberships**, Coach Payouts, Sessions & Earnings, Client App. Copy in `content/features.ts`; `FeatureId` extended.
- Loops: month switch + counting numbers; classes landing on the week grid and a new class added; a booking arriving and
  the client marked Arrived; QR scan; choosing InstaPay then paying; renewing an exhausted plan; settle to paid; a session
  logged by QR with earnings ticking; booking confirmed. Demo panel max width 520.
- Bugs fixed in testing: the Pay/Book button was invisible the first time a tab was opened (its width was measured while the
  panel was hidden and left at 0). The tween now sets `immediateRender: false` and states its width on both ends.
  The button's first tween and the centring now use plain `margin: auto` instead of a CSS translate.
- Icons added: `calendar-mark`, `card`, `ticket`.

## Verification
- Chromium production build at 1440 and 390 wide: frame sequences of all nine loops, no overflow, no console errors.
  On phones the calendar shows three days. `tsc`, `oxlint`, `check:content`, `next build` pass.

## Open / next
- Figures, names and dates are illustrative (brief GAP 7).
- Not yet shown: wallet and loyalty, staff attendance with timestamps, branding setup. Say which deserve a tab.
