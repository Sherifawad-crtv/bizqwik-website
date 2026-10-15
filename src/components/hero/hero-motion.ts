import { gsap, ScrollTrigger } from "@/motion/gsap";
import { DESIGN, FRAME_MARGIN, SCATTER, SCREEN, type PieceId } from "./phone";

/** Scroll distance of the pinned hero, in viewport heights. */
const PIN_VH = 2.2;
/** Where the phone's top edge ends up (px from viewport top): just below the navbar. */
const END_TOP = 96;
/** Other code (the navbar) reads when the hero ends through this id. */
export const HERO_PIN_ID = "hero-pin";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Pinned hero, scrubbed to scroll:
 *   0 → 1  hero text drifts up and out; the phone rises to centre stage;
 *          the pieces start as the manual stuff a gym runs on (sticky note,
 *          receipt, ledger, spreadsheet...), fly in from tilted scatter positions
 *          and morph mid-flight into the founder-home components, docking where
 *          the real layout puts them; status bar,
 *          nav pill, FAB, chart bars and the revenue count-up finish the screen.
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
    const bars = all<SVGPathElement>("[data-bar]");
    const piece = (id: PieceId) => one(`[data-piece="${id}"]`);
    const target = Number(count.dataset.count);
    const css = getComputedStyle(root);

    const k = () => screen.offsetWidth / DESIGN.w; // design pt -> screen px

    /** Tilted start position for a piece, as an offset from where the real layout docks it (design pt). */
    const scatter = (id: keyof typeof SCATTER) => {
      const p = SCATTER[id];
      const el = piece(id);
      const kk = k();
      const phoneHalf = DESIGN.w / 2 + FRAME_MARGIN;
      const sideSpace = root.clientWidth / 2 / kk - phoneHalf; // phone edge -> viewport edge
      // Narrow viewports: shrink the scattered pieces so the phone still reads as empty.
      const f = gsap.utils.clamp(0.62, 1, root.clientWidth / 900);
      const sc = p.scale * f;
      const w = el.offsetWidth * sc;
      const ideal = 60 + w / 2 + p.reach * Math.max(0, sideSpace - w - 80);
      const d = Math.min(ideal, sideSpace - w * 0.55); // on narrow screens pieces overlap the phone
      const cx = p.side < 0 ? -FRAME_MARGIN - d : DESIGN.w + FRAME_MARGIN + d;
      const screenTop = phoneWrap.offsetTop + SCREEN.top * phoneWrap.offsetHeight;
      const visibleH = (root.clientHeight - screenTop) / kk;
      return {
        x: cx - (el.offsetLeft + el.offsetWidth / 2),
        y: p.fy * visibleH - (el.offsetTop + el.offsetHeight / 2),
        scale: sc,
      };
    };

    const ordered = (Object.keys(SCATTER) as (keyof typeof SCATTER)[]).sort((a, b) => SCATTER[a].order - SCATTER[b].order);

    // Manual faces are centred on their piece; the timeline morphs them into the Bizqwik face.
    // Each manual face gets the order card's 1px hairline (transparent for now) so it can become that card.
    const chaosFaces = all<HTMLElement>("[data-chaos]");
    gsap.set(chaosFaces, { xPercent: -50, yPercent: -50, borderWidth: 1, borderStyle: "solid", borderColor: "rgba(227,225,218,0)" });

    count.textContent = fmt(0);

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.to(text, { y: -90, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0)
      .fromTo(phoneWrap, { y: 0 }, { y: () => END_TOP - phoneWrap.offsetTop, ease: "power2.inOut", duration: 0.82 }, 0)
      .to(fade, { autoAlpha: 0, duration: 0.4 }, 0.3)
      .fromTo(screen, { backgroundColor: css.getPropertyValue("--color-surface") }, { backgroundColor: css.getPropertyValue("--color-paper"), duration: 0.3 }, 0.2);

    // Morph timings, in timeline units (the whole timeline is ~1.2 long).
    const MORPH = 0.55; // length of one piece's transformation
    ordered.forEach((id, i) => {
      const t0 = 0.02 + i * 0.04;
      // Flight. Function values: re-measured on every ScrollTrigger refresh (resize, font load).
      const from = { x: () => scatter(id).x, y: () => scatter(id).y, rotation: SCATTER[id].rot, scale: () => scatter(id).scale };
      tl.fromTo(piece(id), from, { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut", duration: 0.5 }, t0);

      const order = piece(id).querySelector<HTMLElement>("[data-order]")!;
      const chaos = piece(id).querySelector<HTMLElement>("[data-chaos]");
      if (!chaos) return;

      /*
       * The manual thing BECOMES the empty app card, then the app's content arrives under it:
       *  1. shape, corners, tilt, colour, edge and shadow tween into the card's;
       *  2. its own contents fade out early, while it is still solid paper;
       *  3. the Bizqwik face fades in underneath the nearly finished card;
       *  4. only then does the shell dissolve, so there is never a see-through moment.
       */
      const m0 = t0 + 0.08;
      const radius = `${Math.min(parseFloat(getComputedStyle(order).borderTopLeftRadius) || 0, 9999)}px`;
      const startBg = getComputedStyle(chaos).backgroundColor;
      const startShadow = getComputedStyle(chaos).boxShadow;
      const noShadow = startShadow.replace(/rgba?\([^)]*\)/g, "rgba(26, 23, 38, 0)").replace(/-?\d+(\.\d+)?px/g, "0px");

      tl.fromTo(
        chaos,
        { autoAlpha: 1, rotation: Number(chaos.dataset.rot), backgroundColor: startBg, boxShadow: startShadow },
        {
          rotation: 0,
          width: () => order.offsetWidth,
          height: () => order.offsetHeight,
          borderRadius: radius,
          backgroundColor: css.getPropertyValue("--color-surface"),
          borderColor: css.getPropertyValue("--color-line"),
          boxShadow: noShadow,
          ease: "power3.inOut",
          duration: MORPH * 0.8,
        },
        m0,
      )
        .to(chaos.firstElementChild, { autoAlpha: 0, ease: "power1.in", duration: MORPH * 0.4 }, m0)
        .fromTo(order, { autoAlpha: 0, scale: 0.985 }, { autoAlpha: 1, scale: 1, ease: "power2.out", duration: MORPH * 0.4 }, m0 + MORPH * 0.5)
        .to(chaos, { autoAlpha: 0, ease: "none", duration: MORPH * 0.15 }, m0 + MORPH * 0.85);

      if (chaos.dataset.torn !== undefined) tl.fromTo(chaos, { maskSize: "14px 100%" }, { maskSize: "1px 100%", ease: "power2.inOut", duration: MORPH * 0.6 }, m0);
    });
    // Bottom bar rises in from below the screen: nav pill, then its sibling FAB.
    tl.fromTo(piece("nav"), { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 0.35 }, 0.78)
      .fromTo(piece("fab"), { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 0.35 }, 0.84)
      .fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, 0.7)
      // Bars grow once the chart's own face is in (the spreadsheet has fully become the card).
      .fromTo(bars, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, ease: "power2.out", duration: 0.25, stagger: 0.015 }, 0.84);

    const counter = { v: 0 };
    tl.to(counter, { v: target, ease: "power2.out", duration: 0.5, onUpdate: () => (count.textContent = fmt(Math.round(counter.v))) }, 0.6);

    ScrollTrigger.create({
      id: HERO_PIN_ID,
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * PIN_VH}`,
      pin: true,
      anticipatePin: 1,
      scrub: 0.7,
      animation: tl,
      invalidateOnRefresh: true,
      refreshPriority: 10, // measured before the navbar, which starts where this ends
    });

    // Intro (time-based): the scattered pieces ease in once. Nav pill and FAB belong to the scroll timeline.
    gsap.fromTo(
      all('[data-piece]:not([data-piece="nav"]):not([data-piece="fab"])'),
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
