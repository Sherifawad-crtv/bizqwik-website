import { gsap, ScrollTrigger, SplitText } from "@/motion/gsap";
import { duration, ease, stagger } from "@/motion/tokens";

/**
 * Entrance (once the sheet is on screen): tag drops in, heading rises word by word, lede fades up,
 * cards rise in a stagger. Then "sync" (scrubbed): as you scroll through the row, each icon tile lights
 * up violet in turn, and the arrow after it; scrolling back un-lights them.
 * Reduced motion: nothing animates; everything is shown, all lit.
 */
export function initEcosystemMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();
  const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const one = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  const tiles = all<HTMLElement>("[data-eco-tile]");
  const links = all<HTMLElement>("[data-eco-link] > span");

  mm.add("(prefers-reduced-motion: reduce)", () => {
    [...tiles, ...links].forEach((el) => el.toggleAttribute("data-on", true));
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tag = one("[data-eco-tag]");
    const title = one("[data-eco-title]");
    const lede = one("[data-eco-lede]");
    const cards = all("[data-eco-card]");
    const connectors = all("[data-eco-link]");
    const split = SplitText.create(title, { type: "words", mask: "words" });

    gsap.set([tag, lede, ...cards, ...connectors], { opacity: 0 });
    gsap.set(split.words, { yPercent: 110 });
    gsap.set(cards, { y: 70 });

    gsap
      .timeline({ scrollTrigger: { trigger: one("[data-eco-title]"), start: "top 88%", once: true } })
      .fromTo(tag, { y: -24, rotation: 6 }, { y: 0, rotation: -3, opacity: 1, duration: duration.base, ease: ease.out })
      .to(split.words, { yPercent: 0, duration: duration.slow, ease: ease.out, stagger: stagger.base }, 0.1)
      .to(lede, { opacity: 1, y: 0, duration: duration.base, ease: ease.out }, 0.45)
      .to(cards, { opacity: 1, y: 0, duration: duration.slow, ease: ease.out, stagger: stagger.loose }, 0.55)
      .to(connectors, { opacity: 1, duration: duration.base, ease: ease.soft, stagger: stagger.loose }, 0.9);

    // Sync: stateless, so scrubbing in either direction is always right.
    const n = tiles.length;
    ScrollTrigger.create({
      trigger: one("[data-eco-grid]"),
      start: "top 72%",
      end: "top 36%",
      onUpdate: (self) => {
        tiles.forEach((el, i) => el.toggleAttribute("data-on", self.progress > (i + 0.35) / n));
        links.forEach((el, i) => el.toggleAttribute("data-on", self.progress > (i + 1) / n));
      },
    });

    return () => split.revert();
  });

  return () => mm.revert();
}
