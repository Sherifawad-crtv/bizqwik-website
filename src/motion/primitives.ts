import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { duration, ease, enterFrom, press, stagger, view } from "./tokens";

/*
 * The motion kit. Everything that moves on the site is one of these, or a bespoke timeline
 * built only from motion/tokens.ts. See docs/MOTION.md for when to use which.
 *
 *   enter()          one-shot entrance of any element(s)
 *   revealOnView()   `data-reveal` convention: add the attribute, it enters when scrolled to
 *   playOnView()     start a scripted demo timeline once, when it scrolls into view
 *   replay()         restart a demo timeline from its first frame
 *   swapIn()         content changing inside a stable frame
 *   pressFeedback()  the 1 -> .95 -> 1 dip on a control
 *   scrubWords()     a statement that brightens word by word as you scroll
 */

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Targets = gsap.TweenTarget;

/** The one entrance: rises 12px, grows from 95%, fades in, on the `enter` ease. */
export function enter(targets: Targets, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: enterFrom.y, scale: enterFrom.scale },
    { opacity: 1, y: 0, scale: 1, duration: duration.enter, ease: ease.enter, ...vars },
  );
}

/**
 * `data-reveal` convention. Mark any element `data-reveal`; it enters (see enter()) when its top
 * reaches `view.start`. Elements revealed in the same moment stagger by `stagger.base`.
 * Hidden by CSS until this runs (globals.css), so there is no flash. Reduced motion: shown at once.
 * Returns a cleanup.
 */
export function revealOnView(root: ParentNode = document): () => void {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
  if (!els.length) return () => {};
  if (prefersReducedMotion()) {
    els.forEach((el) => el.setAttribute("data-revealed", ""));
    return () => {};
  }
  gsap.set(els, { opacity: 0, y: enterFrom.y, scale: enterFrom.scale });
  els.forEach((el) => el.setAttribute("data-revealed", ""));
  const triggers = ScrollTrigger.batch(els, {
    start: view.start,
    once: true,
    interval: 0.1,
    onEnter: (batch) => {
      enter(batch, { stagger: stagger.base, overwrite: true, clearProps: "transform" });
    },
  });
  return () => triggers.forEach((t) => t.kill());
}

/**
 * Scripted demos play once, when they scroll into view, and then hold their finished frame
 * (the reference does the same, with a Replay pill). `play` starts the demo; build the demo's
 * timeline paused and restart it with replay().
 */
export function playOnView(trigger: Element, play: () => void) {
  return ScrollTrigger.create({ trigger, start: view.demoStart, once: true, onEnter: play });
}

/**
 * Restart a demo from its first frame. Rewinds first (so every value returns to its starting
 * frame), then re-measures layout-dependent values (widths, positions) and plays.
 */
export function replay(tl: gsap.core.Timeline) {
  tl.pause(0);
  tl.invalidate();
  tl.restart();
}

/** Swapping content inside a stable frame (tab copy, a list changing): fade and rise, no scale. */
export function swapIn(targets: Targets) {
  return gsap.fromTo(targets, { opacity: 0, y: enterFrom.y }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter });
}

/** The press dip: 1 -> .95 -> 1 on the standard ease. */
export function pressFeedback(el: Element) {
  return gsap.fromTo(el, { scale: 1 }, { scale: press.scale, duration: duration.base / 2, ease: ease.standard, yoyo: true, repeat: 1 });
}

/**
 * Scroll-linked statement: every word starts dim and brightens in reading order as the block
 * crosses the viewport. Returns a cleanup that restores the markup.
 */
export function scrubWords(el: HTMLElement, { from = 0.22 } = {}): () => void {
  if (prefersReducedMotion()) return () => {};
  const split = SplitText.create(el, { type: "words" });
  gsap.set(split.words, { opacity: from });
  const tween = gsap.to(split.words, {
    opacity: 1,
    ease: ease.linear,
    stagger: 0.5,
    scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
  });
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    split.revert();
  };
}
