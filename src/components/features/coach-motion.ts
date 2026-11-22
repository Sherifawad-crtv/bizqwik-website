import { duration, ease, stagger } from "@/motion/tokens";
import { swap, type TL } from "./demo-kit";
import { phoneKit, fmt, type PhoneColors } from "./phone-motion";

/*
 * The "Coaches" scene (iPhone frame, slides up and stays put), three steps:
 *   1 My Month   the running total counts up on a wallet-style card; the days logged are listed
 *   2 Earnings   tap the latest day and ZOOM IN on its detail (the tier rate, 300 EGP a session)
 *   3 Swap       from the brief: swap Friday's session with Coach Lana (2 hours ahead, she has to accept):
 *                pick her, send, wait, accepted, the app's success sheet
 */

type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };
const ZOOM = { day: 1.3 };

export function buildCoach(tl: TL, _stage: HTMLElement, c: PhoneColors, q: Q) {
  const { one, all } = q;
  const k = phoneKit(tl, c, q);
  const { phone, tapAt, countTo, navVisible, sheetUp, sheetDown, zoomIn, zoomOut } = k;
  const val = (n: string) => one(`[data-val="${n}"]`);
  const layer = (n: string) => one(`[data-layer="${n}"]`);
  const sheet = (n: string) => one(`[data-sheet="${n}"]`);

  /* ---------- start state ---------- */
  k.reset(["mine"]);
  tl.set(sheet("day"), { autoAlpha: 0, y: 450 }, 0);
  tl.set(sheet("swap"), { autoAlpha: 0, y: 620 }, 0);
  tl.set(layer("s1"), { opacity: 1, x: 0 }, 0);
  tl.set(layer("s2"), { opacity: 0, x: 40 }, 0);
  tl.set(one("[data-pick-ring]"), { opacity: 0 }, 0);
  tl.set(one("[data-accepted]"), { opacity: 0, y: 8 }, 0);
  tl.set(all("[data-dot]"), { opacity: 0.25, scale: 1 }, 0);
  tl.set(all("[data-dayrow]"), { opacity: 0, y: 14 }, 0);
  tl.set(one("[data-nextcard]"), { opacity: 0, y: 14 }, 0);
  tl.add(() => {
    val("total").textContent = "0";
    val("days").textContent = "0 DAYS";
    one('[data-swap-state]').textContent = "Waiting for Lana";
  }, 0.01);

  /* ---------- 1. My Month ---------- */
  countTo(val("total"), 0, 4500, 1.0, duration.count);
  countTo(val("days"), 0, 15, 1.0, duration.count, (v) => `${fmt(v)} DAYS`);
  tl.to(one("[data-nextcard]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter }, 1.5);
  tl.to(all("[data-dayrow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.loose }, 1.7);

  /* ---------- 2. Earnings: open the new day, zoom in on the tier rate ---------- */
  let land = tapAt(one('[data-tap="day"]'), 3.4);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("day"), land + 0.1);
  const z1 = land + 0.8;
  zoomIn(() => sheet("day"), ZOOM.day, z1, duration.count);
  const zo = z1 + duration.count + 1.2;
  zoomOut(zo, duration.count);
  sheetDown(sheet("day"), 450, zo + 0.3);
  navVisible(true, zo + 0.4);

  /* ---------- 3. Swap Friday's session with Coach Lana ---------- */
  land = tapAt(one('[data-tap="swap"]'), zo + duration.count * 0.8);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("swap"), land + 0.1);
  land = tapAt(one('[data-tap="pickcoach"]'), land + 0.9);
  tl.to(one("[data-pick-ring]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land);
  land = tapAt(one('[data-tap="sendswap"]'), land + 0.8);
  tl.to(layer("s1"), { opacity: 0, x: -40, duration: duration.base, ease: ease.standard }, land + 0.1);
  tl.to(layer("s2"), { opacity: 1, x: 0, duration: duration.base, ease: ease.enter }, land + 0.2);
  tl.to(all("[data-dot]"), { opacity: 1, duration: duration.fast, ease: ease.standard, stagger: stagger.loose, yoyo: true, repeat: 3 }, land + 0.5);
  const acc = land + 0.5 + duration.fast * 1.5 + 0.9;
  tl.add(() => (one("[data-swap-state]").textContent = "Lana accepted"), acc);
  tl.to(one("[data-accepted]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.spring }, acc);
  swap(tl, phone, "swapbtn", acc + 0.6);
  sheetDown(sheet("swap"), 620, acc + 1.2);
  const cf = acc + 1.3;
  k.done(cf);
}
