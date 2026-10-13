import { gsap, ScrollTrigger } from "@/motion/gsap";

/** Scroll distance (px) over which the navbar travels from wide to narrow. */
const TRAVEL = 160;
const GAP = 12; // gap between logo tile, pill and CTA in the narrow cluster
const TILE = 56; // emblem tile size

export interface NavRefs {
  header: HTMLElement;
  outer: HTMLElement;
  bar: HTMLElement;
  logo: HTMLElement;
  wordmark: HTMLElement;
  tile: HTMLElement;
  pill: HTMLElement;
  cta: HTMLElement;
}

/**
 * Wide (top of page) ⇄ narrow (scrolled). Scrubbed to scroll position.
 * Desktop: logo/pill/CTA spread across the page gather into one centred cluster
 * and the wordmark turns into the emblem tile.
 * Mobile: the single pill tightens (inset, slimmer, higher).
 * Reduced motion: same two states, switched instantly. Returns a cleanup.
 */
export function initNavbarMotion(r: NavRefs): () => void {
  const mm = gsap.matchMedia();

  mm.add(
    { desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" },
    (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

      if (desktop) {
        const wide = () => r.outer.clientWidth;
        const narrow = () => TILE + r.pill.offsetWidth + r.cta.offsetWidth + GAP * 2;
        tl.fromTo(r.bar, { width: wide }, { width: narrow, duration: 1 }, 0)
          .fromTo(r.logo, { width: () => r.wordmark.offsetWidth }, { width: TILE, duration: 1 }, 0)
          .fromTo(r.wordmark, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -14, duration: 0.5 }, 0)
          .fromTo(r.tile, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.45)
          .fromTo(r.header, { paddingTop: 20 }, { paddingTop: 12, duration: 1 }, 0);
      } else {
        const wide = () => r.outer.clientWidth;
        tl.fromTo(r.bar, { width: wide, height: 64 }, { width: () => wide() - 24, height: 56, duration: 1 }, 0)
          .fromTo(r.header, { paddingTop: 14 }, { paddingTop: 8, duration: 1 }, 0);
      }

      if (reduce) {
        const snap = (self: ScrollTrigger) => tl.progress(self.progress > 0.5 ? 1 : 0);
        ScrollTrigger.create({ trigger: document.body, start: "top top", end: `+=${TRAVEL}`, onUpdate: snap, onRefresh: snap });
      } else {
        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: `+=${TRAVEL}`,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
        });
      }
    },
  );

  return () => mm.revert();
}
