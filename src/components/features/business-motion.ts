import { duration, ease, stagger } from "@/motion/tokens";
import { NAV_STEP, PAGE_H, PAGE_W } from "./business-app";
import { grow, swap, tap, typeText, type TL } from "./demo-kit";

/*
 * The "Run the business" scene: a phone-shaped founder app that slides up into place and stays there, then walks
 * through the app. Pages are stacked; a new page slides in from the right over the old one (which eases left),
 * and going back reverses it, like the app. A pointer does the tapping.
 *   1 Overview        tiles count up, the range switches to 6M
 *   2 Analytics       scroll to the chart, ZOOM IN on it, tap a bar, zoom out, regroup where the money came from
 *   3 Accounting      (a sub-page: no tab bar) Profit & loss, add an expense, go back
 *   4 Team            coaches and who showed up; open a coach (sub-page), see the QR-scanned sessions, go back
 *   5 Schedule        pick a Friday, add a weekly class
 *   6 To pay          settle the month, ZOOM IN, pay a coach, the app's confirm sheet and its success icon (ring and check drawing themselves)
 * The tab bar follows Shell.tsx: tabs show it, sub-pages hide it, the active tab's glyph turns solid and violet.
 * Every tween that repeats a property uses `to`, and the pointer reads its target when its glide starts (`lazy`),
 * so pages that slide in are found where they really are. Times are positions on the timeline (seconds).
 */

type Colors = { green: string; violet: string; ink: string; muted: string; pressed: string };
type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
/** How far the page underneath eases left while a new page slides over it. */
const PARALLAX = 110;
const ZOOM = { chart: 1.4, pay: 1.32 };

export function buildBusiness(tl: TL, _stage: HTMLElement, c: Colors, { one, all }: Q) {
  const phone = one("[data-phone]");
  const scroll = one("[data-scroll]");
  const nav = one("[data-navbar]");
  const navFade = one("[data-navfade]");
  const ind = one("[data-nav-ind]");
  const tabs = all("[data-tab]");
  const val = (n: string) => one(`[data-val="${n}"]`);
  const page = (n: string) => one(`[data-page="${n}"]`);
  const tapAt = (target: HTMLElement, at: number) => tap(tl, phone, target, at, true, duration.base + 0.1);

  /* ---------- helpers ---------- */
  const countTo = (el: HTMLElement, from: number, to: number, at: number, d: number = duration.count, f = fmt) => {
    const o = { v: from };
    tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, immediateRender: false, onUpdate: () => (el.textContent = f(o.v)) }, at);
  };
  /** A new page slides in from the right and the old one eases left. */
  const push = (from: HTMLElement, to: HTMLElement, at: number) => {
    tl.set(to, { zIndex: 2 }, at).set(from, { zIndex: 1 }, at);
    tl.to(to, { x: 0, duration: duration.scene, ease: ease.standard }, at);
    tl.to(from, { x: -PARALLAX, duration: duration.scene, ease: ease.standard }, at);
  };
  /** Back: the page you left slides away to the right and the one underneath comes back. */
  const pop = (from: HTMLElement, to: HTMLElement, at: number) => {
    tl.set(to, { zIndex: 1 }, at).set(from, { zIndex: 2 }, at);
    tl.to(from, { x: PAGE_W, duration: duration.scene, ease: ease.standard }, at);
    tl.to(to, { x: 0, duration: duration.scene, ease: ease.standard }, at);
  };
  const navVisible = (on: boolean, at: number, d: number = duration.base) =>
    tl.to([nav, navFade], { opacity: on ? 1 : 0, duration: d, ease: ease.standard }, at);
  /** The bar's tab change, as BottomNav does it: the circle slides, the glyph turns solid and violet, the others go back to outline and grey. */
  const navTo = (idx: number, at: number) => {
    tl.to(ind, { x: idx * NAV_STEP, duration: duration.base, ease: ease.standard }, at);
    tabs.forEach((t, i) => {
      const on = i === idx;
      tl.to(t, { color: on ? c.pressed : c.muted, duration: duration.fast, ease: ease.standard }, at);
      tl.to(t.querySelector('[data-glyph="lin"]'), { opacity: on ? 0 : 1, duration: duration.fast, ease: ease.standard }, at);
      tl.to(t.querySelector('[data-glyph="solid"]'), { opacity: on ? 1 : 0, duration: duration.fast, ease: ease.standard }, at);
    });
    tl.fromTo(tabs[idx], { scale: 1 }, { scale: 0.88, duration: duration.instant, ease: ease.standard, yoyo: true, repeat: 1, immediateRender: false }, at - 0.1);
  };
  const segTo = (name: string, option: string, at: number) => {
    const sg = one(`[data-seg="${name}"]`);
    const thumb = sg.querySelector<HTMLElement>("[data-thumb]")!;
    const opt = sg.querySelector<HTMLElement>(`[data-opt="${option}"]`)!;
    tl.to(thumb, { x: () => opt.offsetLeft, width: () => opt.offsetWidth, duration: duration.base, ease: ease.standard }, at);
    sg.querySelectorAll<HTMLElement>("[data-opt]").forEach((o) => tl.to(o, { color: o === opt ? c.ink : c.muted, duration: duration.fast, ease: ease.standard }, at));
  };
  /**
   * Camera zoom: scale the phone about its centre and shift it so `focus` stays in the middle of the panel.
   * Measured when the zoom starts (the phone is at rest then), converted to the phone's own px.
   */
  const zoomIn = (focus: () => Element, scale: number, at: number, d: number) => {
    const shift = (axis: "x" | "y") => () => {
      const p = phone.getBoundingClientRect();
      const f = focus().getBoundingClientRect();
      const k = p.width / phone.offsetWidth || 1;
      const off = axis === "x" ? f.left + f.width / 2 - (p.left + p.width / 2) : f.top + f.height / 2 - (p.top + p.height / 2);
      return (-off / k) * scale;
    };
    tl.to(phone, { scale, x: shift("x"), y: shift("y"), duration: d, ease: ease.standard }, at);
  };
  const zoomOut = (at: number, d: number) => tl.to(phone, { scale: 1, x: 0, y: 0, duration: d, ease: ease.standard }, at);

  /* ---------- the start state (every replay returns here) ---------- */
  const deltas = all("[data-delta]");
  const pages = ["overview", "accounting", "team", "coach", "schedule", "pay"].map(page);
  tl.set(pages, { zIndex: 0 }, 0);
  pages.slice(1).forEach((p) => tl.set(p, { x: PAGE_W }, 0));
  tl.set(pages[0], { x: 0 }, 0);
  tl.set(phone, { opacity: 0, x: 0, y: () => phone.offsetHeight + 70, scale: 1 }, 0);
  tl.set(scroll, { y: 0 }, 0);
  tl.set(deltas, { opacity: 1 }, 0);
  tl.set(ind, { x: 0 }, 0);
  tabs.forEach((t, i) => {
    tl.set(t, { color: i === 0 ? c.pressed : c.muted, scale: 1 }, 0);
    tl.set(t.querySelector('[data-glyph="lin"]'), { opacity: i === 0 ? 0 : 1 }, 0);
    tl.set(t.querySelector('[data-glyph="solid"]'), { opacity: i === 0 ? 1 : 0 }, 0);
  });
  tl.set([nav, navFade], { opacity: 1 }, 0);
  tl.set(one("[data-tip]"), { opacity: 0 }, 0);
  tl.set(all("[data-bar]"), { scaleY: 0, transformOrigin: "50% 100%" }, 0);
  tl.set(all('[data-share="service"] [data-fill]'), { scaleX: 0 }, 0);
  tl.set(one('[data-share="service"]'), { opacity: 1 }, 0);
  tl.set(one('[data-share="type"]'), { opacity: 0 }, 0);
  tl.set(all('[data-share="type"] [data-fill]'), { scaleX: 0 }, 0);
  ["range", "source"].forEach((n) => {
    const sg = one(`[data-seg="${n}"]`);
    const f = sg.querySelector<HTMLElement>("[data-opt]")!;
    tl.set(sg.querySelector("[data-thumb]"), { x: () => f.offsetLeft, width: () => f.offsetWidth }, 0);
    sg.querySelectorAll<HTMLElement>("[data-opt]").forEach((o) => tl.set(o, { color: o === f ? c.ink : c.muted }, 0));
  });
  tl.add(() => {
    val("profit").textContent = "0";
    val("revenue").textContent = "0";
    val("payouts").textContent = "0";
    val("subs").textContent = "0";
    val("expenses").textContent = "− 61,300";
    val("net").textContent = "304,400";
  }, 0.01);
  tl.set(one("[data-newexp]"), { height: 0, opacity: 0 }, 0);
  tl.set(all("[data-crow]"), { opacity: 0, y: 10 }, 0);
  tl.set(all("[data-srow]"), { opacity: 0, y: 10 }, 0);
  tl.set(all("[data-prow]"), { opacity: 0, y: 10 }, 0);
  tl.set(all("[data-newdot]"), { scale: 0 }, 0);
  tl.set(one("[data-toast]"), { opacity: 0 }, 0);
  tl.set(one("[data-sheet]"), { autoAlpha: 0, y: 380 }, 0);
  tl.set(one('[data-type="cls"]'), { opacity: 1 }, 0);
  tl.set(one("[data-cursor]"), { opacity: 0 }, 0);
  tl.set(one("[data-paid-scrim]"), { opacity: 0 }, 0);
  tl.set(one("[data-paid]"), { autoAlpha: 0, yPercent: 100, height: 372 }, 0);
  tl.set(one('[data-layer="pay1"]'), { opacity: 1 }, 0);
  tl.set(one('[data-layer="pay2"]'), { opacity: 0 }, 0);
  tl.set(one("[data-ok-circle]"), { scale: 0.7, opacity: 0 }, 0);
  tl.set(one("[data-ok-ring]"), { strokeDashoffset: 176 }, 0);
  tl.set(one("[data-ok-check]"), { strokeDashoffset: 42 }, 0);

  /* ---------- 0. the phone slides up into place, then stays put ---------- */
  tl.fromTo(
    phone,
    { y: () => phone.offsetHeight + 70, opacity: 0 },
    { y: 0, opacity: 1, duration: duration.count, ease: ease.enter, immediateRender: false },
    0.05,
  );

  /* ---------- 1. Overview ---------- */
  const tiles = ["profit", "revenue", "payouts", "subs"] as const;
  const MONTH = { profit: 365700, revenue: 587400, payouts: 221700, subs: 214 };
  const SIX = { profit: 1587300, revenue: 2555800, payouts: 968500, subs: 214 };
  tiles.forEach((k) => countTo(val(k), 0, MONTH[k], 1.0, duration.count));
  let land = tapAt(one('[data-opt="6M"]'), 2.4);
  segTo("range", "6M", land);
  tl.to(deltas, { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 0.1);
  (["profit", "revenue", "payouts"] as const).forEach((k) => countTo(val(k), MONTH[k], SIX[k], land + 0.1, duration.slow + 0.4));

  /* ---------- 2. Analytics: scroll to the chart, zoom in, tap a bar, zoom out, regroup ---------- */
  let t = land + 1.1;
  tl.to(scroll, { y: () => -(one("[data-chartcard]").offsetTop - 96), duration: duration.scene, ease: ease.standard }, t);
  const zin = t + duration.scene + 0.15;
  zoomIn(() => one("[data-chartcard]"), ZOOM.chart, zin, duration.count);
  tl.to(all("[data-bar]"), { scaleY: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight }, zin + 0.5);
  land = tapAt(one('[data-bar-hit="5"]'), zin + duration.count + 0.1);
  tl.fromTo(one("[data-tip]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, immediateRender: false }, land);
  tl.to(one("[data-tip]"), { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 1.3);
  zoomOut(land + 1.4, duration.count);
  t = land + 1.4 + duration.count + 0.1;
  tl.to(scroll, { y: () => -(one("[data-pnl]").offsetTop + one("[data-pnl]").offsetHeight - (PAGE_H - 126)), duration: duration.scene, ease: ease.standard }, t);
  tl.fromTo(all('[data-share="service"] [data-fill]'), { scaleX: 0 }, { scaleX: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight, immediateRender: false }, t + 0.6);
  land = tapAt(one('[data-opt="TYPE"]'), t + 1.3);
  segTo("source", "TYPE", land);
  tl.to(one('[data-share="service"]'), { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 0.1);
  tl.to(one('[data-share="type"]'), { opacity: 1, duration: duration.base, ease: ease.standard }, land + 0.2);
  tl.fromTo(all('[data-share="type"] [data-fill]'), { scaleX: 0 }, { scaleX: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight, immediateRender: false }, land + 0.25);

  /* ---------- 3. Accounting (a sub-page: no tab bar): add an expense, go back ---------- */
  land = tapAt(one("[data-pnl]"), land + 1.3);
  push(page("overview"), page("accounting"), land);
  navVisible(false, land, duration.fast);
  const expEl = val("expenses");
  const netEl = val("net");
  land = tapAt(one('[data-tap="addexp"]'), land + duration.scene + 0.3);
  grow(tl, one("[data-newexp]"), land + 0.05);
  countTo(expEl, 61300, 69700, land + 0.15, duration.slow, (v) => `− ${fmt(v)}`);
  countTo(netEl, 304400, 296000, land + 0.15, duration.slow);
  land = tapAt(one('[data-page="accounting"] [data-tap="back"]'), land + 1.5);
  pop(page("accounting"), page("overview"), land);
  navVisible(true, land + 0.2);

  /* ---------- 4. Team: who showed up, open a coach (a sub-page), go back ---------- */
  land = tapAt(one('[data-tab="team"]'), land + duration.scene + 0.3);
  push(page("overview"), page("team"), land);
  navTo(1, land);
  tl.to(all("[data-crow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + duration.scene * 0.6);
  land = tapAt(one('[data-tap="coach"]'), land + duration.scene + 0.7);
  push(page("team"), page("coach"), land);
  navVisible(false, land, duration.fast);
  tl.to(all("[data-srow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + duration.scene * 0.6);
  land = tapAt(one('[data-page="coach"] [data-tap="back"]'), land + duration.scene + 1.3);
  pop(page("coach"), page("team"), land);
  navVisible(true, land + 0.2);

  /* ---------- 5. Schedule: add a weekly class ---------- */
  land = tapAt(one('[data-tab="catalog"]'), land + duration.scene + 0.2);
  push(page("team"), page("schedule"), land);
  navTo(3, land);
  land = tapAt(one('[data-day="20"]'), land + duration.scene + 0.35);
  navVisible(false, land, duration.fast);
  tl.to(one("[data-sheet]"), { autoAlpha: 1, y: 0, duration: duration.slow, ease: ease.enter }, land);
  typeText(tl, one('[data-type="cls"]'), "Strength", land + 0.7, duration.slow);
  land = tapAt(one('[data-tap="addclass"]'), land + 1.6);
  tl.to(one("[data-sheet]"), { autoAlpha: 0, y: 380, duration: duration.base, ease: ease.standard }, land + 0.1);
  navVisible(true, land + 0.2);
  tl.to(all("[data-newdot]"), { scale: 1, duration: duration.base, ease: ease.spring, stagger: stagger.loose }, land + 0.5);
  tl.to(one("[data-toast]"), { opacity: 1, duration: duration.base, ease: ease.enter }, land + 0.5);

  /* ---------- 6. To pay: settle the month, zoom in, pay a coach, a confirmation screen ---------- */
  land = tapAt(one('[data-tab="history"]'), land + 1.8);
  push(page("schedule"), page("pay"), land);
  navTo(4, land);
  land = tapAt(one('[data-tap="settle"]'), land + duration.scene + 0.3);
  swap(tl, phone, "settle", land + 0.05);
  tl.to(all("[data-prow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + 0.2);
  const zin2 = land + 0.9;
  zoomIn(() => one("[data-payees]"), ZOOM.pay, zin2, duration.count);
  land = tapAt(one('[data-tap="pay"]'), zin2 + duration.count + 0.1);

  // Pay opens the app's confirm sheet (scrim, a sheet sliding up) while the camera pulls back
  const open = land + 0.15;
  zoomOut(open, duration.count);
  tl.to(one("[data-paid-scrim]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, open);
  tl.to(one("[data-paid]"), { autoAlpha: 1, yPercent: 0, duration: duration.fast + 0.03, ease: ease.enter }, open);
  land = tapAt(one('[data-tap="markpaid"]'), open + duration.count * 0.6);

  // the sheet's content gives way to the app's success icon: a tinted circle pops in with a spring, then the ring and the check draw themselves
  const ok = land + 0.1;
  tl.to(one('[data-layer="pay1"]'), { opacity: 0, duration: duration.instant, ease: ease.standard }, ok);
  tl.to(one('[data-layer="pay2"]'), { opacity: 1, duration: duration.instant, ease: ease.standard }, ok);
  tl.to(one("[data-paid]"), { height: 250, duration: duration.fast, ease: ease.standard }, ok); // the app's sheet hugs its content
  tl.to(one("[data-ok-circle]"), { scale: 1, duration: duration.base, ease: ease.spring }, ok + 0.05);
  tl.to(one("[data-ok-circle]"), { opacity: 1, duration: duration.fast, ease: ease.standard }, ok + 0.05);
  tl.to(one("[data-ok-ring]"), { strokeDashoffset: 0, duration: duration.enter, ease: ease.standard }, ok + 0.05);
  tl.to(one("[data-ok-check]"), { strokeDashoffset: 0, duration: duration.fast, ease: ease.enter }, ok + 0.4);

  // after a short hold the sheet leaves, as the app's does, and the list shows Coach Ali as paid
  const out = ok + 0.4 + duration.fast + 0.9;
  tl.to(one("[data-paid]"), { yPercent: 100, duration: duration.fast, ease: ease.standard }, out);
  tl.to(one("[data-paid-scrim]"), { opacity: 0, duration: duration.fast, ease: ease.standard }, out);
  swap(tl, phone, "pay", out + 0.3);
}
