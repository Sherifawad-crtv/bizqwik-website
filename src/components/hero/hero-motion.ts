import { gsap, ScrollTrigger } from "@/motion/gsap";
import { DESIGN, FRAME_MARGIN, PIECES, SCREEN, type PieceId } from "./phone";

/** Scroll distance of the pinned hero, in viewport heights. */
const PIN_VH = 1.9;
/** Where the phone's top edge ends up (px from viewport top): just below the navbar. */
const END_TOP = 96;

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Pinned hero, scrubbed to scroll:
 *   0 → 1  hero text drifts up and out; the phone rises to centre stage;
 *          nine UI pieces fly in from tilted scatter positions around the
 *          phone and dock into the founder home; status bar, nav, chart bars
 *          and the revenue count-up finish the screen.
 * Reduced motion: no pin, no scrub. The finished screen is shown as-is.
 */
export function initHeroMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    root.dataset.ready = "true";
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const one = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
    const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    const text = one("[data-hero-text]");
    const phoneWrap = one("[data-phone-wrap]");
    const screen = one("[data-screen]");
    const chrome = one("[data-chrome]");
    const fade = one("[data-hero-fade]");
    const count = one("[data-count]");
    const bars = all<SVGRectElement>("[data-bar]");
    const piece = (id: PieceId) => one(`[data-piece="${id}"]`);
    const target = Number(count.dataset.count);
    const css = getComputedStyle(root);

    const k = () => screen.offsetWidth / DESIGN.w; // design px -> screen px

    /** Tilted start position for a piece, as an offset from its docked spot (design px). */
    const scatter = (id: PieceId) => {
      const p = PIECES[id];
      const kk = k();
      const phoneHalf = DESIGN.w / 2 + FRAME_MARGIN;
      const sideSpace = root.clientWidth / 2 / kk - phoneHalf; // phone edge -> viewport edge
      // Narrow viewports: shrink the scattered pieces so the phone still reads as empty.
      const f = gsap.utils.clamp(0.62, 1, root.clientWidth / 900);
      const sc = p.scale * f;
      const w = p.w * sc;
      const ideal = 60 + w / 2 + p.reach * Math.max(0, sideSpace - w - 80);
      const d = Math.min(ideal, sideSpace - w * 0.55); // on narrow screens pieces overlap the phone
      const cx = p.side < 0 ? -FRAME_MARGIN - d : DESIGN.w + FRAME_MARGIN + d;
      const screenTop = phoneWrap.offsetTop + SCREEN.top * phoneWrap.offsetHeight;
      const visibleH = (root.clientHeight - screenTop) / kk;
      return {
        x: cx - (p.left + p.w / 2),
        y: p.fy * visibleH - (p.top + p.h / 2),
        rotation: p.rot,
        scale: sc,
      };
    };

    const ordered = (Object.keys(PIECES) as PieceId[]).filter((id) => id !== "nav").sort((a, b) => PIECES[a].order - PIECES[b].order);

    count.textContent = fmt(0);
    gsap.set(bars, { transformOrigin: "50% 100%" });

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.to(text, { y: -90, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0)
      .fromTo(phoneWrap, { y: 0 }, { y: () => END_TOP - phoneWrap.offsetTop, ease: "power2.inOut", duration: 0.82 }, 0)
      .to(fade, { autoAlpha: 0, duration: 0.4 }, 0.3)
      .fromTo(screen, { backgroundColor: css.getPropertyValue("--color-surface") }, { backgroundColor: css.getPropertyValue("--color-paper"), duration: 0.3 }, 0.2);

    ordered.forEach((id, i) => {
      // Function values: re-measured on every ScrollTrigger refresh (resize, font load).
      const from = { x: () => scatter(id).x, y: () => scatter(id).y, rotation: PIECES[id].rot, scale: () => scatter(id).scale };
      tl.fromTo(piece(id), from, { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut", duration: 0.5 }, 0.02 + i * 0.045);
    });
    tl.fromTo(piece("nav"), { y: 140, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 0.3 }, 0.62)
      .fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.6)
      .fromTo(bars, { scaleY: 0 }, { scaleY: 1, ease: "power2.out", duration: 0.28, stagger: 0.02 }, 0.62);

    const counter = { v: 0 };
    tl.to(counter, { v: target, ease: "power2.out", duration: 0.45, onUpdate: () => (count.textContent = fmt(Math.round(counter.v))) }, 0.5);

    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * PIN_VH}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.7,
      animation: tl,
      invalidateOnRefresh: true,
    });

    // Intro (time-based): the scattered pieces ease in once.
    gsap.fromTo(
      all('[data-piece]:not([data-piece="nav"])'), // the nav pill's opacity belongs to the scroll timeline
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.9, ease: "power2.out", stagger: 0.07, delay: 0.15 },
    );
    root.dataset.ready = "true";

    return () => {
      count.textContent = fmt(target);
    };
  });

  return () => mm.revert();
}
