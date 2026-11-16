import { gsap } from "@/motion/gsap";
import { duration, enterFrom, ease, gap, press } from "@/motion/tokens";

/*
 * Small timeline helpers shared by the feature demos (features-motion.ts) and the business phone (business-motion.ts).
 */
export type TL = gsap.core.Timeline;

export const money = (n: number, dec = 2) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** Count a number up. The shown value is reset as the demo begins (the previous run's final number would linger otherwise). */
export function count(el: HTMLElement, from: number, to: number, tl: TL, at: number, dec = 2, d: number = duration.count) {
  const o = { v: from };
  tl.add(() => (el.textContent = money(from, dec)), 0.02);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, onUpdate: () => (el.textContent = money(o.v, dec)) }, at);
}

/** Type a string in, one letter at a time. */
export function typeText(tl: TL, el: HTMLElement, text: string, at: number, d: number) {
  const o = { n: 0 };
  tl.add(() => (el.textContent = ""), 0.01);
  tl.add(() => (el.textContent = ""), at);
  tl.fromTo(o, { n: 0 }, { n: text.length, duration: d, ease: ease.linear, onUpdate: () => (el.textContent = text.slice(0, Math.round(o.n))) }, at);
}

/** Cross-fade a `Swap` pair (starting content a, replacement b). */
export function swap(tl: TL, stage: HTMLElement, name: string, at: number) {
  const a = stage.querySelector(`[data-swap-a="${name}"]`)!;
  const b = stage.querySelector(`[data-swap-b="${name}"]`)!;
  tl.fromTo(a, { opacity: 1, y: 0 }, { opacity: 0, y: -enterFrom.y / 2, duration: duration.fast, ease: ease.standard }, at).fromTo(
    b,
    { opacity: 0, y: enterFrom.y / 2, scale: enterFrom.scale },
    { opacity: 1, y: 0, scale: 1, duration: duration.base, ease: ease.spring },
    at + gap.beat,
  );
}

/**
 * The pointer glides to a control and presses it. Returns the time the press lands.
 * `lazy`: the target's position is read when the glide starts, not when the timeline is built. Use it for targets that
 * move earlier in the same timeline (a page that slides in, a list that scrolls).
 */
export function tap(tl: TL, stage: HTMLElement, target: HTMLElement, at: number, lazy = false, travel: number = duration.slow): number {
  const cursor = stage.querySelector<HTMLElement>("[data-cursor]")!;
  const where = () => {
    const s = stage.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const k = s.width / stage.offsetWidth || 1; // the panel scales the demo down on phones
    return { x: (t.left - s.left + t.width * 0.6) / k, y: (t.top - s.top + t.height * 0.5) / k };
  };
  const land = at + travel + gap.beat;
  tl.fromTo(
    cursor,
    { opacity: 0, x: () => where().x + 56, y: () => where().y + 48, scale: 1 },
    { opacity: 1, x: () => where().x, y: () => where().y, duration: travel, ease: ease.standard, immediateRender: !lazy },
    at,
  )
    .to(cursor, { scale: press.scale - 0.17, duration: duration.instant, ease: ease.standard }, land)
    .to(cursor, { scale: 1, opacity: 0, duration: duration.base, ease: ease.standard }, land + duration.instant);
  return land;
}

/** The card gets taller as a section opens (`Grow` in ui.tsx). */
export function grow(tl: TL, el: HTMLElement, at: number) {
  tl.fromTo(el, { height: 0 }, { height: "auto", duration: duration.slow, ease: ease.standard }, at).fromTo(el, { opacity: 0 }, { opacity: 1, duration: duration.base, ease: ease.standard }, at + gap.beat);
}

