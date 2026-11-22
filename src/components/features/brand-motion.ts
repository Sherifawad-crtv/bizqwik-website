import { duration, ease, stagger } from "@/motion/tokens";
import { typeText, type TL } from "./demo-kit";
import { GROVE, NEUTRAL } from "./brand-app";
import { phoneKit, fmt, type PhoneColors } from "./phone-motion";

/*
 * The "Your gym, your brand" scene (iPhone frame, slides up and stays put), five steps:
 *   1 Brand      the gym's form: name and web address typed, logo added, a colour picked, Save. The app opens as the
 *                gym's own (a splash with the logo, name and web address) and the whole app takes its colours
 *   2 Book       Book a class, pick Mat Flow, pay with the wallet: "You're booked", the wallet goes 450 to 300
 *   3 Plan       Renew on the plan card, pick the 10-class bundle, pay at the desk: the card turns into the bundle
 *   4 Wallet     tap the wallet, top up 500 EGP: it goes 300 to 800
 *   5 Check in   the round button scans the desk QR: "Checked in", points 120 to 121, a full "You're in" screen
 * The brand lives in CSS variables on [data-app]; the scene tweens them. Same rules as business-motion.ts.
 */

type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

export function buildBrand(tl: TL, _stage: HTMLElement, c: PhoneColors, q: Q) {
  const { one, all } = q;
  const k = phoneKit(tl, c, q);
  const { phone, tapAt, countTo, navVisible, sheetUp, sheetDown, zoomIn, zoomOut } = k;
  const app = one("[data-app]");
  const val = (n: string) => one(`[data-val="${n}"]`);
  const layer = (n: string) => one(`[data-layer="${n}"]`);
  const sheet = (n: string) => one(`[data-sheet="${n}"]`);
  const hero = (n: string) => one(`[data-hero-${n}]`);
  const text = (el: HTMLElement, s: string, at: number) => tl.add(() => (el.textContent = s), at);
  const done = (name: string, at: number) => {
    // the sheet's content gives way to its "it worked" layer: a seal, a check that draws itself
    tl.to(layer(`${name}1`), { opacity: 0, x: -40, duration: duration.base, ease: ease.standard }, at);
    tl.to(layer(`${name}2`), { opacity: 1, x: 0, duration: duration.base, ease: ease.enter }, at + 0.1);
    k.okPlay(name, at + 0.2);
  };
  const pick = (ringSel: string, at: number) => tl.to(one(ringSel), { opacity: 1, duration: duration.fast, ease: ease.standard }, at);
  const chipOn = (tapSel: string, at: number) => {
    const inner = one(tapSel).firstElementChild as HTMLElement;
    tl.to(inner, { backgroundColor: GROVE["--app-ink"], color: GROVE["--app-bg"], opacity: 1, duration: duration.fast, ease: ease.standard }, at);
  };

  /* ---------- start state ---------- */
  k.reset(["home"]);
  tl.set(app, NEUTRAL, 0);
  tl.set(sheet("brand"), { autoAlpha: 0, y: 720 }, 0);
  tl.set(sheet("book"), { autoAlpha: 0, y: 580 }, 0);
  tl.set(sheet("plans"), { autoAlpha: 0, y: 620 }, 0);
  tl.set(sheet("topup"), { autoAlpha: 0, y: 540 }, 0);
  tl.set(sheet("scan"), { autoAlpha: 0, y: 760 }, 0);
  tl.set([layer("b1"), layer("p1"), layer("t1")], { opacity: 1, x: 0 }, 0);
  tl.set([layer("b2"), layer("p2"), layer("t2")], { opacity: 0, x: 40 }, 0);
  ["b", "p", "t"].forEach((n) => {
    k.okReset(n);
  });
  tl.set(one("[data-logo]"), { opacity: 0, scale: 0.6 }, 0);
  tl.set(one("[data-sw-ring]"), { opacity: 0 }, 0);
  tl.set([one("[data-class-ring]"), one("[data-bundle-ring]"), one("[data-amount-ring]")], { opacity: 0 }, 0);
  tl.set(one("[data-splash]"), { autoAlpha: 0 }, 0);
  tl.set(one("[data-splash-logo]"), { scale: 0.6, opacity: 0 }, 0);
  tl.set(all("[data-splash-text]"), { opacity: 0, y: 12 }, 0);
  tl.set(one("[data-qr]"), { y: 230, scale: 0.7, opacity: 0 }, 0);
  tl.set(one("[data-scanline]"), { y: 0, opacity: 0 }, 0);
  tl.set(one("[data-scan-ok]"), { opacity: 0, y: 24 }, 0);
  tl.set(one("[data-hero-bar]"), { scaleX: 0.13, transformOrigin: "left center" }, 0);
  tl.set(all("[data-tap='paywallet'] > span, [data-tap='paydesk'] > span"), { backgroundColor: "", color: "" }, 0);
  tl.add(() => {
    one('[data-type="appname"]').textContent = "";
    one('[data-type="url"]').textContent = "";
    hero("label").textContent = "CLASS MONTHLY";
    hero("title").textContent = "Monthly plan";
    hero("big").textContent = "4";
    hero("unit").textContent = "days left";
    hero("detail").textContent = "Until Nov 20";
    hero("cta").textContent = "Renew";
    val("wallet").textContent = "450";
    val("points").textContent = "120";
  }, 0.01);


  /* ---------- 1. The gym brands its app ---------- */
  sheetUp(sheet("brand"), 1.0);
  navVisible(false, 0.9, duration.fast);
  typeText(tl, one('[data-type="appname"]'), "Grove Pilates", 1.6, duration.base + 0.1);
  typeText(tl, one('[data-type="url"]'), "grovepilates.com", 2.2, duration.base + 0.1);
  let land = tapAt(one('[data-tap="logo"]'), 2.8);
  tl.to(one("[data-logo]"), { opacity: 1, scale: 1, duration: duration.base, ease: ease.spring }, land + 0.05);
  land = tapAt(one('[data-tap="swatch"]'), land + 0.6);
  tl.to(one("[data-sw-ring]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land);
  land = tapAt(one('[data-tap="save"]'), land + 0.6);
  // the app opens as the gym's own: the brand's colour fills the screen, then the whole app takes its colours
  tl.to(app, { ...GROVE, duration: duration.slow, ease: ease.standard }, land + 0.1);
  sheetDown(sheet("brand"), 720, land + 0.2);
  tl.to(one("[data-splash]"), { autoAlpha: 1, duration: duration.base, ease: ease.standard }, land + 0.5);
  tl.to(one("[data-splash-logo]"), { scale: 1, opacity: 1, duration: duration.slow, ease: ease.spring }, land + 0.7);
  tl.to(all("[data-splash-text]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.loose }, land + 0.9);
  tl.to(one("[data-splash]"), { autoAlpha: 0, duration: duration.slow, ease: ease.standard }, land + 2.0);
  navVisible(true, land + 2.1);
  const home = land + 2.5;

  /* ---------- 2. Book a class, pay with the wallet ---------- */
  land = tapAt(one('[data-tap="bookqa"]'), home);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("book"), land + 0.1);
  land = tapAt(one('[data-tap="pickclass"]'), land + 0.8);
  pick("[data-class-ring]", land);
  land = tapAt(one('[data-tap="paywallet"]'), land + 0.55);
  chipOn('[data-tap="paywallet"]', land);
  land = tapAt(one('[data-tap="bookit"]'), land + 0.55);
  done("b", land + 0.1);
  sheetDown(sheet("book"), 580, land + 1.3);
  navVisible(true, land + 1.4);
  countTo(val("wallet"), 450, 300, land + 1.5, duration.slow);

  /* ---------- 3. Buy a bundle: the plan card turns into it ---------- */
  land = tapAt(one('[data-tap="renew"]'), land + 2.3);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("plans"), land + 0.1);
  land = tapAt(one('[data-tap="pickbundle"]'), land + 0.8);
  pick("[data-bundle-ring]", land);
  land = tapAt(one('[data-tap="paydesk"]'), land + 0.55);
  chipOn('[data-tap="paydesk"]', land);
  land = tapAt(one('[data-tap="buy"]'), land + 0.55);
  done("p", land + 0.1);
  sheetDown(sheet("plans"), 620, land + 1.3);
  navVisible(true, land + 1.4);
  const morph = land + 1.6;
  tl.to(one("[data-hero]"), { scale: 0.97, duration: duration.fast, ease: ease.standard, yoyo: true, repeat: 1 }, morph);
  text(hero("label"), "CLASS BUNDLE", morph + 0.2);
  text(hero("title"), "10 classes", morph + 0.2);
  text(hero("big"), "10", morph + 0.2);
  text(hero("unit"), "/ 10 classes left", morph + 0.2);
  text(hero("detail"), "Pay at desk · valid 3 months", morph + 0.2);
  text(hero("cta"), "Details", morph + 0.2);
  tl.to(one("[data-hero-bar]"), { scaleX: 1, duration: duration.slow, ease: ease.standard }, morph + 0.2);

  /* ---------- 4. Top up the wallet ---------- */
  land = tapAt(one('[data-tap="wallettile"]'), morph + 1.1);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("topup"), land + 0.1);
  land = tapAt(one('[data-tap="amount"]'), land + 0.7);
  pick("[data-amount-ring]", land);
  land = tapAt(one('[data-tap="topupnow"]'), land + 0.55);
  done("t", land + 0.1);
  sheetDown(sheet("topup"), 540, land + 1.3);
  navVisible(true, land + 1.4);
  countTo(val("wallet"), 300, 800, land + 1.5, duration.slow + 0.3);

  /* ---------- 5. Check in with the desk QR ---------- */
  land = tapAt(one("[data-fab]"), land + 2.5);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("scan"), land + 0.1);
  tl.to(one("[data-scanline]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land + 0.5);
  tl.to(one("[data-scanline]"), { y: 215, duration: duration.slow + 0.3, ease: ease.standard }, land + 0.6);
  tl.to(one("[data-qr]"), { y: 0, scale: 1, opacity: 1, duration: duration.scene, ease: ease.enter }, land + 0.6);
  const ok = land + 0.6 + duration.scene + 0.35;
  tl.to(one("[data-scanline]"), { opacity: 0, duration: duration.fast, ease: ease.standard }, ok - 0.2);
  tl.to(one("[data-scan-ok]"), { opacity: 1, y: 0, duration: duration.slow, ease: ease.spring }, ok);
  countTo(val("points"), 120, 121, ok + 0.4, duration.base);
  sheetDown(sheet("scan"), 760, ok + 1.0);
  k.done(ok + 1.2);
  void phone; void fmt; void zoomIn; void zoomOut;
}
