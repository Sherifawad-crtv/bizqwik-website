# 0016 — Ecosystem: strip to the component, short titles above

**Date:** 2026-10-23 · Direction: remove the noise (avatars, text inside the container); titles go above the
container, short: Founder, Accountant, Reception, Coaches, Client.

## What changed
- Cards now hold only the live component, directly on the paper card (the nested white box is gone).
- Titles moved above each card, one word: Founder, Accountant, Reception, Coaches, Client (`short` in `content/apps.ts`).
- Removed: every avatar (card headers, coach row, client row), the role captions, "Coach Nour / 14 sessions / Cash out",
  "Log session / Strength / Earned this month", "Calisthenics / Fri 6:00 PM / spots left", the "To pay / Paid" pill, the
  checked-in row, "+20 pts", the revenue label and delta pill.
- Kept only what the component needs: amount + Pay/Paid; revenue number + bars + "+1,500" toast; QR + check; slider
  + "Logged" + earnings + "+150"; three spot dots + Book/Booked.
- New touches that replace removed text: the accountant's amount turns green on payment; a spot dot fills green with a
  check when the client books.
- Bigger type and controls since there is less around them (56px buttons).
- Deleted the four generated role portraits and `AppSummary.portrait` (unused now).

## Verification (Chromium, production build)
- Frame-by-frame capture of all five loops (1440x900, 2x): every state reads; no overlaps. No console errors.
- `tsc`, `oxlint`, `next build` pass.

## Open / next
- Reception and Coaches are the labels used in the cards; the brief's longer app names return in the next section.
- Pacing, loop length and the exact moments are still open to change.
