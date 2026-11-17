import { duration, ease, stagger } from "@/motion/tokens";
import { grow, swap, type TL } from "./demo-kit";
import { phoneKit, fmt, type PhoneColors } from "./phone-motion";

/*
 * The "Coaches" scene (iPhone frame, slides up and stays put), three steps:
 *   1 My Month   the running total counts up at the coach's tier rate; the days logged are listed
 *   2 Scan       the round button scans the coaches' room QR: a session is logged, the total goes 4,200 to 4,500,
 *                a new day appears; tap it and ZOOM IN on its detail (the tier rate, 300 EGP a session)
 *   3 Swap       from the brief: swap Friday's session with Coach Lana (2 hours ahead, she has to accept):
 *                pick her, send, wait, accepted, a full "Swapped" screen
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
  tl.set(sheet("scan"), { autoAlpha: 0, y: 760 }, 0);
  tl.set(sheet("day"), { autoAlpha: 0, y: 450 }, 0);
  tl.set(sheet("swap"), { autoAlpha: 0, y: 620 }, 0);
  tl.set(layer("s1"), { opacity: 1, x: 0 }, 0);
  tl.set(layer("s2"), { opacity: 0, x: 40 }, 0);
  tl.set(one("[data-qr]"), { y: 230, scale: 0.7, opacity: 0 }, 0);
  tl.set(one("[data-scanline]"), { y: 0, opacity: 0 }, 0);
  tl.set(one("[data-scan-ok]"), { opacity: 0, y: 24 }, 0);
  tl.set(one("[data-pick-ring]"), { opacity: 0 }, 0);
  tl.set(one("[data-accepted]"), { opacity: 0, y: 8 }, 0);
  tl.set(all("[data-dot]"), { opacity: 0.25, scale: 1 }, 0);
  tl.set(all("[data-dayrow]"), { opacity: 0, y: 14 }, 0);
  tl.set(one("[data-nextcard]"), { opacity: 0, y: 14 }, 0);
  tl.set(one("[data-newday]"), { height: 0, opacity: 0 }, 0);
  tl.add(() => {
    val("total").textContent = "0";
    val("sessions").textContent = "0 sessions";
    val("group").textContent = "0 EGP";
    val("days").textContent = "0 DAYS";
    one('[data-swap-state]').textContent = "Waiting for Lana";
  }, 0.01);

  /* ---------- 1. My Month ---------- */
  k.enter(0.05);
  countTo(val("total"), 0, 4200, 1.0, duration.count);
  countTo(val("sessions"), 0, 14, 1.0, duration.count, (v) => `${fmt(v)} sessions`);
  countTo(val("group"), 0, 4200, 1.0, duration.count, (v) => `${fmt(v)} EGP`);
  countTo(val("days"), 0, 14, 1.0, duration.count, (v) => `${fmt(v)} DAYS`);
  tl.to(one("[data-nextcard]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter }, 1.5);
  tl.to(all("[data-dayrow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.loose }, 1.7);

  /* ---------- 2. Scan the room QR: a session is logged ---------- */
  let land = tapAt(one("[data-fab]"), 3.0);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("scan"), land + 0.1);
  tl.to(one("[data-scanline]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, land + 0.5);
  tl.to(one("[data-scanline]"), { y: 215, duration: duration.slow + 0.3, ease: ease.standard }, land + 0.6);
  tl.to(one("[data-qr]"), { y: 0, scale: 1, opacity: 1, duration: duration.scene, ease: ease.enter }, land + 0.6);
  const ok = land + 0.6 + duration.scene + 0.35;
  tl.to(one("[data-scanline]"), { opacity: 0, duration: duration.fast, ease: ease.standard }, ok - 0.2);
  tl.to(one("[data-scan-ok]"), { opacity: 1, y: 0, duration: duration.slow, ease: ease.spring }, ok);
  sheetDown(sheet("scan"), 760, ok + 1.1);
  navVisible(true, ok + 1.2);
  const logged = ok + 1.4;
  countTo(val("total"), 4200, 4500, logged, duration.slow + 0.2);
  countTo(val("sessions"), 14, 15, logged, duration.base, (v) => `${fmt(v)} sessions`);
  countTo(val("group"), 4200, 4500, logged, duration.slow + 0.2, (v) => `${fmt(v)} EGP`);
  countTo(val("days"), 14, 15, logged, duration.base, (v) => `${fmt(v)} DAYS`);
  grow(tl, one("[data-newday]"), logged + 0.2);

  /* ---------- 3. Earnings: open the new day, zoom in on the tier rate ---------- */
  land = tapAt(one('[data-tap="day"]'), logged + 1.8);
  navVisible(false, land, duration.fast);
  sheetUp(sheet("day"), land + 0.1);
  const z1 = land + 0.8;
  zoomIn(() => sheet("day"), ZOOM.day, z1, duration.count);
  const zo = z1 + duration.count + 1.2;
  zoomOut(zo, duration.count);
  sheetDown(sheet("day"), 450, zo + 0.3);
  navVisible(true, zo + 0.4);

  /* ---------- 4. Swap Friday's session with Coach Lana ---------- */
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
  k.confirm(cf, stagger.loose);
}
