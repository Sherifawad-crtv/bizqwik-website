# 0057 "Coaches": a phone scene in the iPhone frame
Same treatment as the business and front-desk rows (slide-up entry, still phone, real tab bar, pointer, a zoom, a full confirmation screen). The three bullets and the title are unchanged.
- **Files:** `coach-app.tsx` (the home screen and three sheets), `coach-motion.ts` (the scene, built on `phone-motion.ts`). The old wallet-card demo is removed; `frontdesk-app.tsx` now exports the small pieces the coach screens share (pill, sheet frame, check).
- **Screen:** the product's coach home, "My Month": greeting with Coach Ali's app avatar (a Revolt coach), the running-total card (RUNNING TOTAL · EGP, sessions, group, private, state), then DAYS LOGGED as day cards with the QR time and a LOGGED pill. Tabs as the product gives a coach: My Month, Clients, History, and the round scan button.
- **Scene (about 22 s):**
  1. The running total counts up to 4,200 (14 sessions at the Senior rate, 300 EGP); the day cards fade in.
  2. The round button scans the coaches' room QR; "Session logged, +300 EGP"; the total goes 4,200 to 4,500, sessions 14 to 15, and a new day (Mon, Nov 16) grows in at the top.
  3. Tap that day: its sheet opens (scanned at 5:52 PM, 300 EGP, "Senior coach · 300 EGP per session") with a camera zoom, then back out.
  4. Swap, from the brief: "Fri 20 · Strength 6:00 PM", Swap opens a sheet that says at least 2 hours ahead and the other coach has to accept; pick Coach Lana, Send request, "Waiting for Lana", "Lana accepted", the Swap button becomes "Lana", and a full "Swapped" screen rises.
- **Open point:** I found no session-swap feature in the product's `dev` branch code (searched src and the edge function). The bullet comes from the brief ("Swap a session with another coach, at least 2 hours ahead, if they accept") and the scene shows it as the brief describes. Confirm it exists or is planned before launch.
- Coaches shown are real Revolt coaches' first names and app avatars (Ali, Lana, Fatma, Yassin) as in progress 0055; amounts are illustrative.
- Reduced motion shows the finished home (new day added, swap done).
- Checked at 1440 and 390 in headless Chromium; replay resets (slides up again, total back to 0); no console errors.
