# 0052 Hero phone screen rebuilt from the dev branch's founder app
Source: `Sherifawad-crtv/bizqwik`, branch `dev` (commit f589018): `routes/Oversight.tsx`, `routes/overview/Cards.tsx`, `BarChart.tsx`, `Charts.tsx`, `components/BottomNav.tsx`, `HomeAvatar.tsx`, `Segmented.tsx`, `fab/FabButton.tsx`.
What changed against the old mock (which followed an earlier build of the app):
- The founder (department head) overview has four equal tiles in this order: Profit, Revenue, Active subscribers, Coach payouts. The big revenue card, the "wallet credit" tile and the caption lines under the numbers are gone. Deltas: profit and revenue green, payouts grey.
- The chart is the product's soft BarChart: revenue bar light and behind, payouts deep and in front (overlapping, round tops), scale on the left (0, 200k, 400k, 600k), uppercase month labels, round-dot legend, no value labels over the bars. Title and subtitle in uppercase like the app ("REVENUE VS COACH PAYOUTS", "MAY – OCT 2026 · BY MONTH · EGP").
- The next card ("WHERE THE MONEY CAME FROM", with its SERVICE / TYPE selector) now peeks out under the nav, as it does in the app when you have not scrolled.
- Segmented labels are uppercase (MONTH, 3M, 6M, 12M), caption "OCT 2026". Nav tabs are 50px (not 52), cards have no border.
- Hero animation: the "wallet" piece became "sources" (the punch-card prop now morphs into that card); the revenue count-up runs on the Revenue tile. Order of the pieces settling follows the new layout.
- Files: `content/demoApp.ts`, `components/hero/FounderHome.tsx`, `components/hero/phone.ts`. Illustrative figures still sum (profit 365,700 = revenue 587,400 - payouts 221,700).
- Checked at 1440 and 390 (scatter, mid-morph and final screens), no overflow, no console errors.
