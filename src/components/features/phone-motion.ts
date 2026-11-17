import { duration, ease } from "@/motion/tokens";
import { NAV_STEP, PAGE_W } from "./business-app";
import { tap, type TL } from "./demo-kit";

/*
 * The moves the phone scenes share (business-motion.ts has its own copies from before this file existed; the front
 * desk scene uses these): slide-up entry, pages that push and pop, the tab bar following Shell.tsx, bottom sheets,
 * camera zooms about the phone's centre, a pointer that reads its target when its glide starts.
 */

export type PhoneColors = { green: string; violet: string; ink: string; muted: string; pressed: string };
type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

/** How far the page underneath eases left while a new page slides over it. */
const PARALLAX = 110;
export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export function phoneKit(tl: TL, c: PhoneColors, { one, all }: Q) {
  const phone = one("[data-phone]");
  const nav = one("[data-navbar]");
  const navFade = one("[data-navfade]");
  const ind = one("[data-nav-ind]");
  const tabs = all("[data-tab]");
  const page = (n: string) => one(`[data-page="${n}"]`);

  const tapAt = (target: HTMLElement, at: number) => tap(tl, phone, target, at, true, duration.base + 0.1);
  const countTo = (el: HTMLElement, from: number, to: number, at: number, d: number = duration.count, f = fmt) => {
    const o = { v: from };
    tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, immediateRender: false, onUpdate: () => (el.textContent = f(o.v)) }, at);
  };
  const push = (from: HTMLElement, to: HTMLElement, at: number) => {
    tl.set(to, { zIndex: 2 }, at).set(from, { zIndex: 1 }, at);
    tl.to(to, { x: 0, duration: duration.scene, ease: ease.standard }, at);
    tl.to(from, { x: -PARALLAX, duration: duration.scene, ease: ease.standard }, at);
  };
  const navVisible = (on: boolean, at: number, d: number = duration.base) => tl.to([nav, navFade], { opacity: on ? 1 : 0, duration: d, ease: ease.standard }, at);
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
  /** A bottom sheet rises from below (`hidden` = how far down it waits) and goes back down. */
  const sheetUp = (el: HTMLElement, at: number) => tl.to(el, { autoAlpha: 1, y: 0, duration: duration.slow, ease: ease.enter }, at);
  const sheetDown = (el: HTMLElement, hidden: number, at: number) => tl.to(el, { autoAlpha: 0, y: hidden, duration: duration.base, ease: ease.standard }, at);
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
  /** The phone slides up from below the panel and stays put. */
  const enter = (at: number) => {
    tl.set(phone, { opacity: 0, x: 0, y: () => phone.offsetHeight + 70, scale: 1 }, 0);
    tl.fromTo(phone, { y: () => phone.offsetHeight + 70, opacity: 0 }, { y: 0, opacity: 1, duration: duration.count, ease: ease.enter, immediateRender: false }, at);
  };
  /** The start state of the shared chrome (pages off to the right but the first, bar shown, first tab active, overlays hidden). */
  const reset = (pageNames: string[]) => {
    const pages = pageNames.map(page);
    tl.set(pages, { zIndex: 0 }, 0);
    pages.slice(1).forEach((p) => tl.set(p, { x: PAGE_W }, 0));
    tl.set(pages[0], { x: 0 }, 0);
    tl.set(ind, { x: 0 }, 0);
    tabs.forEach((t, i) => {
      tl.set(t, { color: i === 0 ? c.pressed : c.muted, scale: 1 }, 0);
      tl.set(t.querySelector('[data-glyph="lin"]'), { opacity: i === 0 ? 0 : 1 }, 0);
      tl.set(t.querySelector('[data-glyph="solid"]'), { opacity: i === 0 ? 1 : 0 }, 0);
    });
    tl.set([nav, navFade], { opacity: 1 }, 0);
    tl.set(one("[data-cursor]"), { opacity: 0 }, 0);
    tl.set(one("[data-confirm]"), { autoAlpha: 0 }, 0);
    tl.set(one("[data-seal]"), { scale: 0.5 }, 0);
    tl.set(one("[data-check]"), { strokeDashoffset: 1 }, 0);
    tl.set(all("[data-ring]"), { opacity: 0, scale: 1 }, 0);
    tl.set(all("[data-c-text]"), { opacity: 0, y: 14 }, 0);
  };
  /** The full confirmation screen: rises over the app, the seal springs in, the check draws itself, a ring pulses. */
  const confirm = (at: number, stag: number) => {
    tl.to(one("[data-confirm]"), { autoAlpha: 1, duration: duration.base, ease: ease.standard }, at);
    tl.fromTo(one("[data-seal]"), { scale: 0.5 }, { scale: 1, duration: duration.slow, ease: ease.spring, immediateRender: false }, at + 0.15);
    tl.fromTo(one("[data-check]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: duration.slow, ease: ease.standard, immediateRender: false }, at + 0.4);
    tl.fromTo(all("[data-ring]"), { scale: 1, opacity: 0.55 }, { scale: 1.9, opacity: 0, duration: duration.count, ease: ease.standard, stagger: stag, immediateRender: false }, at + 0.6);
    tl.to(all("[data-c-text]"), { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: 0.08 }, at + 0.65);
  };

  return { phone, page, tapAt, countTo, push, navVisible, navTo, sheetUp, sheetDown, zoomIn, zoomOut, enter, reset, confirm };
}
