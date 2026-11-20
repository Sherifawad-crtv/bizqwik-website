# 0060 One success icon everywhere (2026-11-20)

Every confirmation in the phone scenes now uses the app's own success icon from the business scene (tinted 84px circle, a ring and then a check that draw themselves) instead of the green seals and full-screen "Renewed / Swapped / You're in" screens.
- New shared `SuccessIcon` (business-app.tsx) with `okReset` / `okPlay` in phone-motion.ts; `DoneSheet` (scrim + short sheet + icon + label) with a `themed` mode for the white-label app.
- Coaches: "Session swapped" sheet. Brand: "You're in" sheet in the gym's colours, plus the three sheet confirmations (brand, plan, top-up) use the themed icon. Front desk: "Client created" uses it too (and "Plan renewed" as before).
- The old full-screen `Confirm` component is removed.
