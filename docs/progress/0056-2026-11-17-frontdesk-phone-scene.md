# 0056 "Front desk and CRM": a phone scene in the iPhone frame
Same treatment as "Run the business" (progress 0055): the phone slides up and stays put, pages slide like the real app, the tab bar follows Shell.tsx, a pointer taps, two camera zooms, a full confirmation screen at the end. The four bullets and the title are unchanged.
- **Files:** `frontdesk-app.tsx` (screens), `frontdesk-motion.ts` (the scene), `phone-motion.ts` (moves shared by phone scenes: slide-up entry, push, tab bar, sheets, zoom, confirmation), plus `PhoneFrame`, `Chrome` and `Confirm` in `business-app.tsx` made reusable (the tab bar takes its tabs). The old card demo is removed. `Icon.tsx` gained the calendar solid glyph, search and gift.
- **Tab bar:** Desk, Bookings, Clients, Activity and the round button, as the product's front-desk role has them. The record is a sub-page (no tab bar, floating actions).
- **Five steps (about 32 s):**
  1. Desk: the numbers count up; New client opens a two-step sheet (name, phone and email typed; Monthly plan picked; app invite on); Register shows "Client created".
  2. Check in by QR: the round button opens a scanner; a QR slides into the frame, a line sweeps, "Mona Khaled, checked in"; today's count goes 38 to 39.
  3. Bookings: Book a client on Strength 6:00 PM, pick Mona, the booked count goes 8 to 9.
  4. Clients: "Mona" is typed, the list narrows to her, her record opens (plan and renewal date, package, wallet, last check-in, coach, history); zoom in on the record card, zoom out.
  5. Renew: Renew opens the payment sheet (Cash, Card, Wallet, InstaPay); InstaPay shows Mona's receipt, zoom in, Approve, the camera pulls back and a full "Renewed" screen rises. Freeze and Refund sit beside Renew on the record.
- Clients are invented (Mona Khaled and others); no real client data. Dina is an invented desk user.
- `business-motion.ts` still has its own copies of the moves that now live in `phone-motion.ts`; fold them together when convenient.
- Checked at 1440 and 390 in headless Chromium: no console errors, replay not yet re-tested for this scene.

## Update 2026-11-20: the renewal ends on the app's real success sheet
Same treatment as the business scene. After the receipt is approved and the payment sheet leaves, the app's success sheet rises over the dimmed record: the tinted circle springs in, the ring and then the check draw, "Plan renewed" under it, a short hold, then it closes on Mona's record. The full-screen "Renewed" seal is gone from this scene. Shared pieces: `DoneSheet` (business-app.tsx) and `done()` in phone-motion.ts. Coaches and brand scenes still use the full-screen confirmation.
