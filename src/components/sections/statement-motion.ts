import { gsap, ScrollTrigger } from "@/motion/gsap";
import { mapRange, scrubRange } from "@/motion/primitives";
import { duration, ease, scrubSmooth } from "@/motion/tokens";

/*
 * The dark statement section, recreated from the reference page's source (docs/MOTION.md section 7).
 *
 * Scroll (scrubbed, no easing): a small pill at the top of the box grows into the full box. `c` runs 0 to 1
 * across the last 60% of the section's pass through the viewport and drives the clip-path, the headline
 * (rises from -250px, grows from 60%, fades in) and the logo (drops from the pill to the centre).
 * Time: the pills sit on an arc and move through eleven slots. Every few seconds the list advances a slot
 * and each pill glides (an overdamped spring in the reference) to its next slot; the centre slot is highlighted.
 */

const SLOTS = 11;
const CENTER = 5;
const SLOT_PX = 90; // list travel per slot
const SCALE = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7, 0.6, 0.5];
const DESKTOP = {
  y: [-460, -360, -300, -210, -110, 0, 110, 210, 300, 360, 460],
  opacity: [0, 0, 0.3, 0.4, 0.6, 1, 0.6, 0.4, 0.3, 0, 0],
  // The arc: slots further from the centre sit further right.
  x: Array.from({ length: SLOTS }, (_, i) => Math.abs(i / SLOTS - CENTER / SLOTS) ** 1.6 * 1500 + 60),
};
const COMPACT = {
  y: [-300, -240, -190, -135, -70, 0, 70, 135, 190, 240, 300],
  opacity: [0, 0, 0, 0.4, 0.6, 1, 0.6, 0.4, 0, 0, 0],
  x: Array.from({ length: SLOTS }, () => 0),
};
const LAYOUT = {
  desktop: { halfWidth: 223, pillHeight: 224, from: 0.4, to: 1, logoFrom: -250, logoTo: 0, ...DESKTOP },
  tablet: { halfWidth: 223, pillHeight: 224, from: 0.4, to: 1, logoFrom: -250, logoTo: -160, ...COMPACT },
  mobile: { halfWidth: 140, pillHeight: 140, from: 0.35, to: 0.8, logoFrom: -240, logoTo: -100, ...COMPACT },
};
const END_RADIUS = 40;
const HIGHLIGHT = "rgba(255,255,255,0.12)";
const QUIET = "rgba(255,255,255,0)";

type Layout = (typeof LAYOUT)[keyof typeof LAYOUT];

export function initStatementMotion(root: HTMLElement): () => void {
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const content = q("[data-st-content]");
  const anim = q("[data-st-anim]");
  const logo = q("[data-st-logo]");
  const pills = Array.from(root.querySelectorAll<HTMLElement>("[data-st-pill]"));
  const mm = gsap.matchMedia();

  const slotOf = (i: number, current: number) => {
    const s = (i + current) % pills.length;
    return s >= SLOTS - 1 ? 0 : s;
  };

  const place = (L: Layout, current: number, compact: boolean, instant: boolean) =>
    pills.forEach((pill, i) => {
      const slot = slotOf(i, current);
      const vars = {
        x: L.x[slot],
        xPercent: compact ? -50 : 0,
        y: L.y[slot] - pill.offsetHeight / 2,
        scale: SCALE[slot],
        opacity: L.opacity[slot],
        backgroundColor: slot === CENTER ? HIGHLIGHT : QUIET,
      };
      // A pill that wraps to the far end jumps; the rest glide.
      if (instant || Math.abs(slot - CENTER) > 4) gsap.set(pill, vars);
      else gsap.to(pill, { ...vars, duration: duration.scene, ease: ease.enter, overwrite: true });
    });

  const applyScroll = (L: Layout, progress: number) => {
    const c = mapRange(progress, [L.from, L.to], [0, 1]);
    const side = 50 * (1 - c);
    const half = L.halfWidth * (1 - c);
    const bottom = 100 * (1 - c);
    const height = L.pillHeight * (1 - c);
    const radius = mapRange(c, [0.8, 1], [112, END_RADIUS]);
    content.style.clipPath = `inset(0px calc(${side}% - ${half}px) calc(${bottom}% - ${height}px) calc(${side}% - ${half}px) round ${radius}px)`;
    gsap.set(anim, { y: mapRange(c, [0, 1], [-250, 0]), scale: mapRange(c, [0, 1], [0.6, 1]), opacity: c });
    gsap.set(logo, { xPercent: -50, yPercent: -50, y: mapRange(c, [0, 1], [L.logoFrom, L.logoTo]) });
  };

  const setup = (L: Layout, compact: boolean) => {
    gsap.set(pills, { transformOrigin: compact ? "center center" : "left center" });
    place(L, 0, compact, true);
    const stopScrub = scrubRange(content, (p) => applyScroll(L, p), { smooth: compact ? scrubSmooth.touch : 0 });

    // The list: starts fast, settles to a slow drift, advances a slot every SLOT_PX of travel.
    let listY = 0;
    let velocity = 3;
    let current = 0;
    const idle = 0.4;
    const tick = (_time: number, delta: number) => {
      velocity += (idle - velocity) * 0.003 * delta;
      listY += velocity * gsap.ticker.deltaRatio(60);
      const next = Math.round(listY / SLOT_PX) % pills.length;
      if (next !== current) {
        current = next;
        place(L, current, compact, false);
      }
    };
    const view = ScrollTrigger.create({
      trigger: content,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    return () => {
      gsap.ticker.remove(tick);
      view.kill();
      stopScrub();
    };
  };

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      tablet: "(min-width: 641px) and (max-width: 900px) and (prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 640px) and (prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      const { reduce, desktop, tablet } = ctx.conditions as Record<string, boolean>;
      if (reduce) {
        // Finished state: the full box, the list at rest.
        content.style.clipPath = "";
        gsap.set(anim, { clearProps: "all" });
        gsap.set(logo, { xPercent: -50, yPercent: -50, y: 0 });
        place(window.innerWidth > 900 ? LAYOUT.desktop : LAYOUT.tablet, 0, window.innerWidth <= 900, true);
        return;
      }
      return setup(desktop ? LAYOUT.desktop : tablet ? LAYOUT.tablet : LAYOUT.mobile, !desktop);
    },
  );

  return () => mm.revert();
}
