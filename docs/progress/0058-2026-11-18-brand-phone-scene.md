# 0058 "Your gym, your brand": the white-label client app on the iPhone frame
The fourth and last row now has the same kind of scene as the others (slide-up entry, still phone, real tab bar, pointer, a full confirmation screen). The three bullets and the title are unchanged. All four rows are now phone scenes; the old card demos (`demos.tsx`) are gone.
- **Files:** `brand-app.tsx` (the client app and its sheets), `brand-motion.ts` (the scene, built on `phone-motion.ts`). The tab bar (`Chrome` in `business-app.tsx`) gained a `themed` mode that follows the gym's colour variables. `Icon.tsx` gained solid glyphs for ticket and user.
- **How the brand works:** `[data-app]` carries five CSS variables (`--app-brand`, `--app-on`, `--app-bg`, `--app-soft`, `--app-ink`); every colour in the client app uses them, so the scene tweens them and the whole app re-skins at once. The screens follow the client app repo (`bizqwik-client-app`): Home with the plan hero (the 3D membership card, a big "days left" or "classes left" number and a progress bar), Wallet and Points tiles with the app's 3D icons (copied into `public/demo/app-*.webp`), the three quick actions, Today's classes, the floating tab bar (Home, Schedule, Bookings, Profile) and the round check-in button.
- **Scene (about 33 s):**
  1. The gym's "Brand it" form (owner side): app name and web address typed, a logo added, a colour picked, Save. The app opens as the gym's own (a splash with the logo, name and web address) and takes its colours: Grove Pilates, olive on beige.
  2. Book a class: Mat Flow, pay with the wallet, "You're booked"; the wallet goes 450 to 300.
  3. Renew: pick the 10-class bundle, pay at the desk; the plan card turns into the bundle (10 / 10 classes left, full bar).
  4. Tap the wallet and top up 500 EGP; it goes 300 to 800.
  5. The round button scans the desk QR: "Checked in", points 120 to 121, then a full "You're in" screen.
- **Names:** Mona is an invented client; Grove Pilates and `grovepilates.com` are invented (check the address is not a real business before launch). Coaches Fatma and Lana are the Revolt team's first names (see 0055).
- **Open point:** the client app's architecture doc (Sept) says v1 had no top-ups and no payment gateway ("cash and card at the desk are only recorded labels"), but the wallet ledger has a "top-up" category and the brief's bullet says "top up a wallet". The scene follows the bullet. Confirm what the client app does today before launch.
- Reduced motion shows the finished home (bundle, 800 EGP, 121 points, Grove colours). Checked at 1440 and 390; replay resets (slides up again); no console errors.

## Update 2026-11-22: class photos, and no in-app motion
- The two class cards under "Today" now carry photos (Reformer, Mat Flow: `public/demo/class-reformer.webp`, `class-matflow.webp`, 900x600, generated for this site, no real people), with the price/plan chip on the photo.
- The brand phone has no in-app motion for now: it shows the gym's branded home, still (`brand-motion.ts` is an empty stub; the five-step scene is in git history), and its Replay pill is hidden. The new motion comes next.
