import { HERO_PIN_ID } from "@/components/hero/hero-motion";
import { gsap, ScrollTrigger } from "@/motion/gsap";

/** Scroll distance (px) over which the navbar travels from wide to narrow. */
const TRAVEL = 160;
const GAP = 12; // gap between logo tile / pill / CTA in the narrow cluster
const TILE = 56; // emblem tile size

export interface NavRefs {
  header: HTMLElement;
  bar: HTMLElement;
  logo: HTMLElement;
  wordmark: HTMLElement;
  tile: HTMLElement;
  pill: HTMLElement;
  cta: HTMLElement;
}

/** Scroll position where the page's hero releases its pin (0 on pages without a hero). */
const heroEnd = () => ScrollTrigger.getById(HERO_PIN_ID)?.end ?? 0;

/**
 * Wide ⇄ narrow, scrubbed to scroll, starting only once the hero has finished.
 * Desktop: the link pill never moves. It stays dead centre; the logo (left) and
 * the CTA (right) travel in from the edges to sit beside it, and the wordmark
 * turns into the emblem tile on the way.
 * Mobile: the single pill tightens (inset, slimmer, higher).
 * Reduced motion: same two states, switched instantly at the halfway point.
 * Returns a cleanup.
 */
export function initNavbarMotion(r: NavRefs): () => void {
  const mm = gsap.matchMedia();

  mm.add(
    { desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" },
    (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

      if (desktop) {
        // How far each side item travels so it lands GAP away from the (stationary) pill.
        const logoX = () => r.pill.offsetLeft - GAP - TILE;
        const ctaX = () => r.pill.offsetLeft + r.pill.offsetWidth + GAP - (r.bar.offsetWidth - r.cta.offsetWidth);
        tl.fromTo(r.logo, { x: 0, width: () => r.wordmark.offsetWidth }, { x: logoX, width: TILE, duration: 1 }, 0)
          .fromTo(r.cta, { x: 0 }, { x: ctaX, duration: 1 }, 0)
          .fromTo(r.wordmark, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -14, duration: 0.5 }, 0)
          .fromTo(r.tile, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 0.45)
          .fromTo(r.header, { paddingTop: 20 }, { paddingTop: 12, duration: 1 }, 0);
      } else {
        const wide = () => r.bar.parentElement!.clientWidth;
        tl.fromTo(r.bar, { width: wide, height: 64 }, { width: () => wide() - 24, height: 56, duration: 1 }, 0)
          .fromTo(r.header, { paddingTop: 14 }, { paddingTop: 8, duration: 1 }, 0);
      }

      const trigger = {
        trigger: document.body,
        start: () => heroEnd(),
        end: () => heroEnd() + TRAVEL,
        invalidateOnRefresh: true,
      };

      if (reduce) {
        const snap = (self: ScrollTrigger) => tl.progress(self.progress > 0.5 ? 1 : 0);
        ScrollTrigger.create({ ...trigger, onUpdate: snap, onRefresh: snap });
      } else {
        ScrollTrigger.create({ ...trigger, scrub: 0.6, animation: tl });
      }
    },
  );

  return () => mm.revert();
}
