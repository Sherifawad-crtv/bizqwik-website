import { duration, ease, stagger } from "@/motion/tokens";
import { NAV_STEP, PAGE_W } from "./business-app";
import { grow, swap, tap, typeText, type TL } from "./demo-kit";

/*
 * The "Run the business" scene: a phone-shaped founder app that flies in from a different side each time (no tilt),
 * then walks through six pages, sliding sideways like a real app, with a pointer doing the tapping:
 *   1 Overview        tiles count up, the range switches to 6M
 *   2 Analytics       scroll to the chart, tap a bar, regroup where the money came from
 *   3 Accounting      Profit & loss, add an expense, net profit moves
 *   4 Team            coaches and who showed up; open a coach and see the QR-scanned sessions
 *   5 Schedule        pick a Friday, add a weekly class
 *   6 To pay          settle the month, pay a coach
 * Every tween that repeats a property uses `to`, and the pointer reads its target when its glide starts (`lazy`),
 * so pages that slide in are found where they really are. Times are positions on the timeline (seconds).
 */

type Colors = { green: string; violet: string; ink: string; muted: string };
type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const PICKS = [
  { x: -560, y: 190 },
  { x: 600, y: -140 },
  { x: -120, y: 560 },
  { x: 420, y: -540 },
  { x: -520, y: -160 },
  { x: 560, y: 260 },
];
let plays = 0;

export function buildBusiness(tl: TL, stage: HTMLElement, c: Colors, { one, all }: Q) {
  const phone = one("[data-phone]");
  const track = one("[data-track]");
  const scroll = one("[data-scroll]");
  const cap = one("[data-caption]");
  const nav = one("[data-navbar]");
  const navFade = one("[data-navfade]");
  const ind = one("[data-nav-ind]");
  const tabs = all("[data-tab]");
  const val = (n: string) => one(`[data-val="${n}"]`);
  const tapAt = (target: HTMLElement, at: number) => tap(tl, phone, target, at, true, duration.base + 0.1);

  /* ---------- helpers ---------- */
  const countTo = (el: HTMLElement, from: number, to: number, at: number, d: number = duration.count, f = fmt) => {
    const o = { v: from };
    tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, immediateRender: false, onUpdate: () => (el.textContent = f(o.v)) }, at);
  };
  const slide = (page: number, at: number) => tl.to(track, { x: -PAGE_W * page, duration: duration.scene, ease: ease.standard }, at);
  const navTo = (idx: number, at: number) => {
    tl.to(ind, { x: idx * NAV_STEP, duration: duration.base, ease: ease.standard }, at);
    tabs.forEach((t, i) => tl.to(t, { color: i === idx ? c.violet : c.muted, duration: duration.fast, ease: ease.standard }, at));
  };
  const segTo = (name: string, option: string, at: number) => {
    const sg = one(`[data-seg="${name}"]`);
    const thumb = sg.querySelector<HTMLElement>("[data-thumb]")!;
    const opt = sg.querySelector<HTMLElement>(`[data-opt="${option}"]`)!;
    tl.to(thumb, { x: () => opt.offsetLeft, width: () => opt.offsetWidth, duration: duration.base, ease: ease.standard }, at);
    sg.querySelectorAll<HTMLElement>("[data-opt]").forEach((o) => tl.to(o, { color: o === opt ? c.ink : c.muted, duration: duration.fast, ease: ease.standard }, at));
  };
  const caption = (text: string, at: number) => {
    tl.to(cap, { opacity: 0, y: -6, duration: duration.fast, ease: ease.standard }, at);
    tl.add(() => (cap.textContent = text), at + duration.fast);
    tl.fromTo(cap, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: duration.base, ease: ease.enter, immediateRender: false }, at + duration.fast);
  };
  const drift = (x: number, y: number, at: number) => tl.to(phone, { x, y, duration: duration.count, ease: ease.standard }, at);

  /* ---------- the start state (every replay returns here) ---------- */
  const deltas = all("[data-delta]");
  const first = (sg: HTMLElement) => sg.querySelector<HTMLElement>("[data-opt]")!;
  tl.set(phone, { opacity: 0, x: 0, y: 0, scale: 1 }, 0);
  tl.set(track, { x: 0 }, 0);
  tl.set(scroll, { y: 0 }, 0);
  tl.set(deltas, { opacity: 1 }, 0);
  tl.set(ind, { x: 0 }, 0);
  tabs.forEach((t, i) => tl.set(t, { color: i === 0 ? c.violet : c.muted }, 0));
  tl.set([nav, navFade], { opacity: 1 }, 0);
  tl.set(one("[data-tip]"), { opacity: 0 }, 0);
  tl.set(all("[data-bar]"), { scaleY: 0, transformOrigin: "50% 100%" }, 0);
  tl.set(all('[data-share="service"] [data-fill]'), { scaleX: 0 }, 0);
  tl.set(one('[data-share="service"]'), { opacity: 1 }, 0);
  tl.set(one('[data-share="type"]'), { opacity: 0 }, 0);
  tl.set(all('[data-share="type"] [data-fill]'), { scaleX: 0 }, 0);
  ["range", "source"].forEach((n) => {
    const sg = one(`[data-seg="${n}"]`);
    const f = first(sg);
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
    cap.textContent = "Revenue, profit and payouts, live";
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
  tl.set(cap, { opacity: 0 }, 0);
  tl.add(() => {
    plays += 1;
  }, 0);

  /* ---------- 0. the phone flies in from a different side each time ---------- */
  let pick = PICKS[0];
  tl.fromTo(
    phone,
    {
      x: () => {
        pick = PICKS[plays % PICKS.length];
        return pick.x;
      },
      y: () => pick.y,
      scale: 0.92,
      opacity: 0,
    },
    { x: 0, y: 0, scale: 1, opacity: 1, duration: duration.count, ease: ease.enter, immediateRender: false },
    0.05,
  );
  tl.fromTo(cap, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: duration.base, ease: ease.enter, immediateRender: false }, 0.9);

  /* ---------- 1. Overview ---------- */
  const tiles = ["profit", "revenue", "payouts", "subs"] as const;
  const MONTH = { profit: 365700, revenue: 587400, payouts: 221700, subs: 214 };
  const SIX = { profit: 1587300, revenue: 2555800, payouts: 968500, subs: 214 };
  tiles.forEach((k) => countTo(val(k), 0, MONTH[k], 1.0, duration.count));
  let land = tapAt(one('[data-opt="6M"]'), 2.5);
  segTo("range", "6M", land);
  tl.to(deltas, { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 0.1);
  (["profit", "revenue", "payouts"] as const).forEach((k) => countTo(val(k), MONTH[k], SIX[k], land + 0.1, duration.slow + 0.4));

  /* ---------- 2. Analytics: scroll, tap a bar, regroup ---------- */
  let t = land + 1.1;
  caption("See where the money came from", t);
  drift(-22, 6, t);
  tl.to(scroll, { y: () => -(one("[data-chartcard]").offsetTop - 96), duration: duration.scene, ease: ease.standard }, t + 0.1);
  tl.to(all("[data-bar]"), { scaleY: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight }, t + 0.8);
  land = tapAt(one('[data-bar-hit="5"]'), t + 1.5);
  tl.fromTo(one("[data-tip]"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, immediateRender: false }, land);
  tl.to(one("[data-tip]"), { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 1.2);
  t = land + 1.3;
  tl.to(scroll, { y: () => -(one("[data-pnl]").offsetTop + one("[data-pnl]").offsetHeight - 690), duration: duration.scene, ease: ease.standard }, t);
  tl.fromTo(all('[data-share="service"] [data-fill]'), { scaleX: 0 }, { scaleX: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight, immediateRender: false }, t + 0.6);
  land = tapAt(one('[data-opt="TYPE"]'), t + 1.3);
  segTo("source", "TYPE", land);
  tl.to(one('[data-share="service"]'), { opacity: 0, duration: duration.fast, ease: ease.standard }, land + 0.1);
  tl.to(one('[data-share="type"]'), { opacity: 1, duration: duration.base, ease: ease.standard }, land + 0.2);
  tl.fromTo(all('[data-share="type"] [data-fill]'), { scaleX: 0 }, { scaleX: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight, immediateRender: false }, land + 0.25);

  /* ---------- 3. Accounting: Profit & loss, add an expense ---------- */
  t = land + 1.0;
  caption("Profit and loss, with every expense", t);
  land = tapAt(one("[data-pnl]"), t + 0.1);
  slide(1, land);
  drift(20, -5, land);
  const expEl = val("expenses");
  const netEl = val("net");
  land = tapAt(one('[data-tap="addexp"]'), land + duration.scene + 0.35);
  grow(tl, one("[data-newexp]"), land + 0.05);
  countTo(expEl, 61300, 69700, land + 0.15, duration.slow, (v) => `− ${fmt(v)}`);
  countTo(netEl, 304400, 296000, land + 0.15, duration.slow);

  /* ---------- 4. Team: who showed up, open a coach ---------- */
  t = land + 1.0;
  caption("Know who showed up, and when", t);
  land = tapAt(one('[data-tab="team"]'), t + 0.1);
  slide(2, land);
  navTo(1, land);
  drift(-18, 8, land);
  tl.to(all("[data-crow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + duration.scene * 0.6);
  land = tapAt(one('[data-tap="coach"]'), land + duration.scene + 0.7);
  slide(3, land);
  drift(22, -6, land);
  tl.to(all("[data-srow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + duration.scene * 0.6);

  /* ---------- 5. Schedule: add a weekly class ---------- */
  t = land + duration.scene + 0.8;
  caption("Plan the whole month in one tap", t);
  land = tapAt(one('[data-tab="catalog"]'), t + 0.1);
  slide(4, land);
  navTo(3, land);
  drift(-20, 5, land);
  land = tapAt(one('[data-day="20"]'), land + duration.scene + 0.35);
  tl.to([nav, navFade], { opacity: 0, duration: duration.fast, ease: ease.standard }, land);
  tl.to(one("[data-sheet]"), { autoAlpha: 1, y: 0, duration: duration.slow, ease: ease.enter }, land);
  typeText(tl, one('[data-type="cls"]'), "Strength", land + 0.7, duration.slow);
  land = tapAt(one('[data-tap="addclass"]'), land + 1.6);
  tl.to(one("[data-sheet]"), { autoAlpha: 0, y: 380, duration: duration.base, ease: ease.standard }, land + 0.1);
  tl.to([nav, navFade], { opacity: 1, duration: duration.base, ease: ease.standard }, land + 0.2);
  tl.to(all("[data-newdot]"), { scale: 1, duration: duration.base, ease: ease.spring, stagger: stagger.loose }, land + 0.5);
  tl.to(one("[data-toast]"), { opacity: 1, duration: duration.base, ease: ease.enter }, land + 0.5);

  /* ---------- 6. To pay: settle the month, pay a coach ---------- */
  t = land + 1.3;
  caption("Settle the month and pay your coaches", t);
  land = tapAt(one('[data-tab="history"]'), t + 0.1);
  slide(5, land);
  navTo(4, land);
  drift(18, -6, land);
  land = tapAt(one('[data-tap="settle"]'), land + duration.scene + 0.3);
  swap(tl, phone, "settle", land + 0.05);
  tl.to(all("[data-prow]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, land + 0.2);
  land = tapAt(one('[data-tap="pay"]'), land + 1.4);
  swap(tl, phone, "pay", land + 0.05);
  drift(0, 0, land + 0.6);
}
