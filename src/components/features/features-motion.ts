import { gsap, ScrollTrigger } from "@/motion/gsap";
import { playOnView, replay, toggleOnView } from "@/motion/primitives";
import { duration, enterFrom, ease, gap } from "@/motion/tokens";
import { buildBusiness } from "./business-motion";
import { buildBrand } from "./brand-motion";
import { buildCoach } from "./coach-motion";
import { buildFrontDesk } from "./frontdesk-motion";
import type { TL } from "./demo-kit";

type Role = "business" | "frontdesk" | "coaches" | "clients";
type Colors = { green: string; violet: string; ink: string; muted: string; pressed: string };
type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };


/** Each bundle's scene. Every tween states its own start value, so a replay resets itself cleanly. */
const BUILD: Record<Role, (tl: TL, stage: HTMLElement, c: Colors, q: Q) => void> = {
  business: buildBusiness,

  frontdesk: buildFrontDesk,

  coaches: buildCoach,

  clients: buildBrand,
};

/** The finished frame for visitors who prefer reduced motion (the default markup is already the finished state, except the swaps). */
function showFinal(root: HTMLElement) {
  const set = (sel: string, props: gsap.TweenVars) => gsap.set(root.querySelectorAll(sel), props);
  set("[data-swap-a]", { opacity: 0 });
  set("[data-swap-b]", { opacity: 1 });
}

/**
 * Every feature row plays the shared way (docs/MOTION.md): its demo plays once when its panel scrolls into
 * view, holds the finished frame, and plays again on Replay. The text block of each row fades in and its
 * divider draws when the row is on screen. Reduced motion: no playback, every demo shows its finished state.
 */
export function initFeatureMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();
  const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  mm.add("(prefers-reduced-motion: reduce)", () => showFinal(root));

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const css = getComputedStyle(root);
    const token = (n: string) => css.getPropertyValue(n).trim();
    const colors: Colors = { green: token("--color-green-fg"), violet: token("--color-primary"), ink: token("--color-ink"), muted: token("--color-ink-muted"), pressed: token("--color-primary-pressed") };

    const timelines = new Map<Element, TL>();
    const triggers = all<HTMLElement>("[data-panel]").map((panel) => {
      const demo = panel.querySelector<HTMLElement>("[data-demo]")!;
      const stage = demo.querySelector<HTMLElement>("[data-stage]")!;
      const inner = stage.querySelector<HTMLElement>("[data-inner]")!;
      const q: Q = {
        one: <T extends HTMLElement>(sel: string) => stage.querySelector<T>(sel)!,
        all: <T extends HTMLElement>(sel: string) => Array.from(stage.querySelectorAll<T>(sel)),
      };
      const tl = gsap.timeline({ paused: true });
      // The business phone brings its own entrance (it flies in from the side).
      if (!stage.hasAttribute("data-own-entrance")) tl.fromTo(inner, { opacity: 0, y: enterFrom.y, scale: enterFrom.scale }, { opacity: 1, y: 0, scale: 1, duration: duration.enter, ease: ease.enter }, 0);
      BUILD[demo.dataset.demo as Role](tl, stage, colors, q);
      timelines.set(panel, tl);
      return playOnView(panel, () => replay(tl));
    });

    // The text block of each row: fades in and its divider draws left to right when the row is on screen
    // (192px inside the top and bottom edges, as in the reference), and both reverse when it leaves.
    // On phones the block starts visible and only reacts on leaving, as in the reference.
    // Stacked layouts (under 901px): a normal section, nothing sticks or fades.
    const stacked = window.matchMedia("(max-width: 900px)").matches;
    const phone = stacked;
    const offset = parseInt(token("--header-offset"), 10) || 96;
    const stopToggles = (stacked ? [] : all<HTMLElement>("[data-accordion]")).map((el) => {
      const rule = el.querySelector<HTMLElement>("[data-rule]")!;
      if (!phone) gsap.set(el, { opacity: 0 });
      gsap.set(rule, { scaleX: phone ? 1 : 0, transformOrigin: "left center" });
      return toggleOnView(
        el,
        (inView) => {
          if (inView) {
            gsap.to(el, { opacity: 1, duration: duration.fast, ease: ease.standard, overwrite: "auto" });
            gsap.to(rule, { scaleX: 1, duration: duration.slow, delay: gap.beat * 2, ease: ease.standard, overwrite: "auto" });
          } else {
            gsap.to(el, { opacity: 0, duration: duration.fast, ease: ease.standard, overwrite: "auto" });
            gsap.to(rule, { scaleX: 0, duration: duration.fast, ease: ease.standard, overwrite: "auto" });
          }
        },
        `-${offset * 2}px 0px -${offset * 2}px 0px`,
      );
    });

    const onClick = (e: Event) => {
      const panel = (e.target as Element).closest("[data-replay]")?.closest("[data-panel]");
      const tl = panel && timelines.get(panel);
      if (tl) replay(tl);
    };
    root.addEventListener("click", onClick);

    // Widths and heights are measured in px: re-measure after a resize.
    const remeasure = () => timelines.forEach((tl) => tl.invalidate());
    ScrollTrigger.addEventListener("refresh", remeasure);

    return () => {
      ScrollTrigger.removeEventListener("refresh", remeasure);
      root.removeEventListener("click", onClick);
      triggers.forEach((t) => t.kill());
      stopToggles.forEach((stop) => stop());
    };
  });

  return () => mm.revert();
}
