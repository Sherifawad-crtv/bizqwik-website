import { gsap, ScrollTrigger } from "@/motion/gsap";
import { DESIGN, FRAME_MARGIN, POLAROID, SCATTER, SCREEN, type PieceId } from "./phone";

/** Scroll distance of the pinned hero, in viewport heights. */
const PIN_VH = 1.9;
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
    const chaosFaces = all<HTMLElement>("[data-chaos]");
    gsap.set(chaosFaces, { xPercent: -50, yPercent: -50 });

    count.textContent = fmt(0);

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.to(text, { y: -90, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0)
      .fromTo(phoneWrap, { y: 0 }, { y: () => END_TOP - phoneWrap.offsetTop, ease: "power2.inOut", duration: 0.82 }, 0)
      .to(fade, { autoAlpha: 0, duration: 0.4 }, 0.3)
      .fromTo(screen, { backgroundColor: css.getPropertyValue("--color-surface") }, { backgroundColor: css.getPropertyValue("--color-paper"), duration: 0.3 }, 0.2);

    ordered.forEach((id, i) => {
      const t0 = 0.02 + i * 0.045;
      // Flight. Function values: re-measured on every ScrollTrigger refresh (resize, font load).
      const from = { x: () => scatter(id).x, y: () => scatter(id).y, rotation: SCATTER[id].rot, scale: () => scatter(id).scale };
      tl.fromTo(piece(id), from, { x: 0, y: 0, rotation: 0, scale: 1, ease: "power3.inOut", duration: 0.5 }, t0);

      // Morph, mid-flight: the manual thing reshapes into the card, and dissolves into its Bizqwik face.
      const order = piece(id).querySelector<HTMLElement>("[data-order]")!;
      const chaos = piece(id).querySelector<HTMLElement>("[data-chaos]");
      if (!chaos) return;
      const radius = `${Math.min(parseFloat(getComputedStyle(order).borderTopLeftRadius) || 0, 9999)}px`;
      // Blur lives on the masked body when there is one, so the shell's drop-shadow filter is untouched.
      const blurTarget = chaos.querySelector<HTMLElement>("[data-chaos-body]") ?? chaos;
      tl.fromTo(
        chaos,
        { autoAlpha: 1, rotation: Number(chaos.dataset.rot) },
        { autoAlpha: 0, rotation: 0, width: () => order.offsetWidth, height: () => order.offsetHeight, borderRadius: radius, ease: "power2.inOut", duration: 0.3 },
        t0 + 0.16,
      )
        .fromTo(blurTarget, { filter: "blur(0px)" }, { filter: "blur(7px)", ease: "power2.inOut", duration: 0.3 }, t0 + 0.16)
        .fromTo(
          order,
          { autoAlpha: 0, filter: "blur(8px)", scale: 0.94 },
          { autoAlpha: 1, filter: "blur(0px)", scale: 1, ease: "power2.out", duration: 0.28 },
          t0 + 0.24,
        );

      // The polaroid's photo is the avatar: frame, caption and tape fall away while the square photo
      // shrinks and settles into the round avatar's place (the shell's radius rounds it off).
      const photo = chaos.querySelector<HTMLElement>("[data-polaroid-photo]");
      if (photo) {
        const shift = POLAROID.h / 2 - (POLAROID.pad + POLAROID.photo / 2); // photo centre -> frame centre
        tl.to(chaos.querySelectorAll("[data-polaroid-fade]"), { autoAlpha: 0, ease: "power1.in", duration: 0.14 }, t0 + 0.16).fromTo(
          photo,
          { scale: 1, y: 0, filter: "sepia(0.18) saturate(0.9)" },
          { scale: () => order.offsetWidth / POLAROID.photo, y: shift, filter: "sepia(0) saturate(1)", ease: "power2.inOut", duration: 0.3 },
          t0 + 0.16,
        );
      }
    });
    // Bottom bar rises in from below the screen: nav pill, then its sibling FAB.
    tl.fromTo(piece("nav"), { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 0.3 }, 0.6)
      .fromTo(piece("fab"), { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 0.3 }, 0.66)
      .fromTo(chrome, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.6)
      .fromTo(bars, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, ease: "power2.out", duration: 0.28, stagger: 0.02 }, 0.62);

    const counter = { v: 0 };
    tl.to(counter, { v: target, ease: "power2.out", duration: 0.45, onUpdate: () => (count.textContent = fmt(Math.round(counter.v))) }, 0.5);

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
