# 0060 One success icon everywhere (2026-11-20)

Every confirmation in the phone scenes now uses the app's own success icon from the business scene (tinted 84px circle, a ring and then a check that draw themselves) instead of the green seals and full-screen "Renewed / Swapped / You're in" screens.
- New shared `SuccessIcon` (business-app.tsx) with `okReset` / `okPlay` in phone-motion.ts; `DoneSheet` (scrim + short sheet + icon + label) with a `themed` mode for the white-label app.
- Coaches: "Session swapped" sheet. Brand: "You're in" sheet in the gym's colours, plus the three sheet confirmations (brand, plan, top-up) use the themed icon. Front desk: "Client created" uses it too (and "Plan renewed" as before).
- The old full-screen `Confirm` component is removed.

## Only the first row has the slide-up entrance (2026-11-22)
Correction: the slide-up entrance belongs to the first row (business) only. Rows 2-4 (front desk, coaches, brand) keep their in-app motion but no longer slide up: their phones are simply there when the row arrives. `k.enter` was removed from those three scenes. Each timeline's start frame is still rendered at set-up (`tl.time(0.05, false).time(0, false)` in features-motion.ts), so as a row scrolls in, the app is already in its first state (counters at 0, sheets closed) and the motion plays from there instead of snapping back from the finished scene.
