# 0037 — Feature list rebuilt as four bundles with Link-style demos

**Date:** 2026-11-11 · Direction (after the plan agreed in chat): one place per bundle, simple components like the reference's, ditch our native app components, hammer on CRM at the front desk, show analytics,
a branded app for clients like the Glofox reference, a wallet-style view of income for coaches, 3 to 4 wordings per bundle. Rounded corners instead of a phone frame.

## What changed
- **Nine rows became four bundles**, in order: Run the business, Front desk and CRM, Coaches, Your gym your brand. Copy in `content/features.ts`: brief headlines, 3 to 4 bullets each, from the brief's own lines.
  The CRM lines describe what the product's client records do (register a client, sell a plan, send the app invite, find by name or phone, plan/packages/wallet on one record, renew, freeze, refund to the wallet).
  The accountant's payout sits under the business bundle.
- **New simple UI kit** (`components/features/ui.tsx`), measured from the reference's panels: white card with a large soft shadow, light rows with a small icon tile, a plain key-value table, status as a dot and a word,
  small bordered buttons, a violet pointer. Our native app pieces (mono caps labels, status pills with dots, dense roster rows) are gone from this section.
- **Four demos** (`components/features/demos.tsx`, timelines in `features-motion.ts`):
  - Business: revenue number counting up with a 7-month bar chart (analytics), then the card opens to Team today (on time or 9 minutes late), Schedule (a class added), Payouts (the pointer presses Pay, it turns Paid).
  - Front desk and CRM: type "Mona" in the client search, the list narrows, the pointer opens the client record (plan, renewal, wallet, last check-in), Check in then Renew flip to done and the renewal date moves.
  - Coaches: a wallet-style violet card; a session lands in the list, earnings count from 4,200 to 4,500, and "Payout Nov 2" becomes "Paid Nov 2".
  - Your gym, your brand: a "Brand your app" editor beside the client app; name, logo, colour and address are typed and the app re-brands as Forge Athletics (black), Grove Pilates (olive on beige) and Pulse Studio (violet).
    On phones the editor is hidden and three colour dots mark the current brand.
- **Removed:** the nine old demos, their timelines, the product-parts file and `components/ecosystem/`. Icons added: user-rounded, upload-minimalistic, arrow-up, calendar-add, snowflake, palette, link-round.
- `FeatureId` is now `business | frontdesk | coaches | clients`. Docs: DESIGN-SYSTEM "Feature demos" replaces the old Ecosystem section.

## Bugs found and fixed while testing
- The business card measured 611px tall (my estimate was 480): it overflowed the panel at 1024px. Rows are now more compact (40px tiles, 10px padding), the month labels are gone and the chart is shorter: 529px. The panel's minimum height rose from 640 to 670px (the reference panel is 655px at 1440, so this only matters on narrower screens).
- "Checked in" wrapped on phones (small buttons no longer wrap, slightly smaller text on phones); the coach rate line wrapped (shortened to "Senior tier · 300 EGP each"); the client record's status was oversized.

## Verification (Chromium, production build)
- All four demos captured through their timelines at 1440 and at 390 wide. Fit test after each finished: every demo inside its panel and clear of the Replay pill at 1440, 1024 and 390; no horizontal overflow; no console errors.
- Behaviour on the coaches panel: hidden until scrolled to, plays (earnings 4,200 to 4,500, then Paid), holds, Replay returns to the first frame and plays again. Reduced motion: all demos at their finished state (Paid, record open, Pulse Studio),
  sections open, Replay hidden.
- `tsc`, `oxlint`, `check:content`, `check:motion`, `next build` pass. Not tested on real iOS Safari.

## Notes
- All names and figures are illustrative (brief GAP 7). Web addresses in the client demo (forgeathletics.com, grovepilates.com, pulsestudio.fit) are made up; check they are not someone's real brand before launch.
- Business and Front desk bundles each have four bullets; Coaches and Clients have three.
