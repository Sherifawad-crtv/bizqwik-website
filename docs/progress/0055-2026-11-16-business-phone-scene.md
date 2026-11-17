# 0055 "Run the business": a phone that walks through the founder app
Replaces the old card demo. One row, one scene, no bullets (the flow carries the message).
- **Shape:** a portrait phone screen with rounded corners and no bezel (390 x 816 pt scaled to 282 px wide on desktop, 262 px in the phone panels). `components/features/business-app.tsx`.
- **Entrance:** the phone flies in from a different side each play (six start points, no tilt or rotation, clipped by the panel), then drifts a little between steps and settles. `components/features/business-motion.ts`.
- **Six steps, pages slide sideways like a real app, a pointer taps through them:**
  1. Overview: Profit, Revenue, Active subscribers, Coach payouts count up; the range switches to 6M.
  2. Analytics: scroll to the chart, tap the OCT bar for its figures, regroup "Where the money came from" from SERVICE to TYPE.
  3. Accounting: tap Profit & loss, add an expense (Equipment 8,400), expenses and net profit move.
  4. Team: coaches with tier and today's attendance (on time, 9 min late); open Coach Nour and see sessions scanned by QR with times.
  5. Schedule: tap Friday the 20th, a New class sheet opens, "Strength" is typed, Add class puts a dot on every Friday.
  6. To pay: Settle month, then Pay turns to Paid.
  Order changed slightly from the plan: Accounting comes right after Analytics because the app reaches it from the Profit & loss row.
- A small caption in the panel's top-left names the step (desktop only).
- The row has no bullet list now (`bullets: []` in `content/features.ts`; `FeatureList` renders the list only when there are bullets).
- Shared timeline helpers moved to `demo-kit.ts`; `tap(...)` got a `lazy` option (reads its target when the glide starts, for targets that slide in).
- Plays once when most of the panel is on screen, holds the last page, Replay restarts it (from a different side). Reduced motion shows the Overview page finished.
- Figures are illustrative and consistent with the hero phone (profit 365,700 = revenue 587,400 - payouts 221,700).
- Length: about 30 seconds. Trim by dropping a step or tightening the gaps in `business-motion.ts`.
- Not changed: the other three rows. The owner said "make them all a phone view"; read as "all the pages of this scene". Confirm if the other rows should follow.

## Update 2026-11-17 (owner notes, seven changes)
1. **No wiggle.** The phone slides up on entry and then stays exactly where it is (no drift between steps, no random sides).
2. **The app's real tab bar.** 64px bar, five 50px tabs, 6px gaps, sliding circle, FAB 64px, as BottomNav/Shell. The active tab turns solid duotone and violet (`--primary-pressed`), the others go back to outline and grey; the tab presses in when tapped. Solid glyphs were added to `ui/Icon.tsx` for all five tabs. As in the app, sub-pages (Accounting, Coach) have no tab bar and show a back button; Accounting's main action ("Add expense") floats where the bar was.
3. **Caption removed** (the in-container text).
4. **Subtitle back** under "Run the business" ("See the whole business. Run it from one place."). Only for this row; the other rows still have none.
5. **Slide-up entry** from below (about 1.2s, the enter curve).
6. **Charts zoom.** After the scroll to the chart the phone zooms to 1.4x centred on the chart card (about 1.2s, the standard curve), the bar is tapped, then it zooms back out smoothly before the scene moves on.
7. **Payout.** Settle month, then a 1.32x zoom on the list, Pay turns to Paid, the camera pulls back and a full "Paid" screen rises over the app: a seal that springs in, a check that draws itself, a pulsing ring, the amount and "Saved to History". It holds as the last frame.
- Navigation model: pages are stacked; a new page slides in from the right over the old one (which eases left), and Back reverses it. Back taps were added after Accounting and Coach, so the scene is about 36 seconds.
- Checked at 1440 and 390: replay resets cleanly (slides up again), no console errors.
