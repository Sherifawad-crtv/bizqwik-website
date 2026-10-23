import { gsap, ScrollTrigger, SplitText } from "@/motion/gsap";
import { duration, ease, stagger } from "@/motion/tokens";

type TL = gsap.core.Timeline;
type Role = "founder" | "accountant" | "frontDesk" | "coaches" | "client";
type Colors = { green: string; violet: string; ink: string };

const money = (n: number, sign = "") => sign + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const count = (el: HTMLElement, from: number, to: number, tl: TL, at: number, d: number, sign = "") => {
  const o = { v: from };
  // Reset the shown value as each loop begins (otherwise the previous loop's final number lingers).
  tl.add(() => (el.textContent = money(from, sign)), 0.02);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: "power2.out", onUpdate: () => (el.textContent = money(o.v, sign)) }, at);
};

/** Cross-fade a `Swap` pair (starting text a, replacement b). */
function swap(tl: TL, stage: HTMLElement, name: string, at: number) {
  const a = stage.querySelector(`[data-swap-a="${name}"]`)!;
  const b = stage.querySelector(`[data-swap-b="${name}"]`)!;
  tl.fromTo(a, { opacity: 1, y: 0 }, { opacity: 0, y: -6, duration: 0.25, ease: "power2.in" }, at).fromTo(
    b,
    { opacity: 0, y: 6, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2.2)" },
    at + 0.1,
  );
}

/** Cursor glides to a control and presses it. Returns the time the press lands. */
function tap(tl: TL, stage: HTMLElement, target: HTMLElement, at: number): number {
  const cursor = stage.querySelector<HTMLElement>("[data-cursor]")!;
  const where = () => {
    const s = stage.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    return { x: t.left - s.left + t.width * 0.62 - 16, y: t.top - s.top + t.height * 0.55 - 16 };
  };
  tl.fromTo(cursor, { opacity: 0, x: () => where().x + 54, y: () => where().y + 46, scale: 1 }, { opacity: 1, x: () => where().x, y: () => where().y, duration: 0.7, ease: "power3.out" }, at)
    .to(cursor, { scale: 0.78, duration: 0.1, ease: "power2.out" }, at + 0.75)
    .to(cursor, { scale: 1, opacity: 0, duration: 0.35, ease: "power2.out" }, at + 0.88);
  return at + 0.8;
}

/**
 * The Apple-Pay move: the pill presses, shrinks to a circle, spins, then blooms into a green
 * success pill while a check draws itself. Returns the time success has landed.
 */
function morphButton(tl: TL, stage: HTMLElement, at: number, green: string, violet: string): number {
  const btn = stage.querySelector<HTMLElement>("[data-btn]")!;
  const body = stage.querySelector<HTMLElement>("[data-btn-body]")!;
  const idle = stage.querySelector("[data-btn-idle]")!;
  const spin = stage.querySelector("[data-btn-spin]")!;
  const done = stage.querySelector("[data-btn-done]")!;
  const check = stage.querySelector("[data-btn] [data-check]")!;
  const loader = btn.dataset.loader !== undefined;
  const full = () => btn.offsetWidth;
  let t = at;

  tl.fromTo(body, { width: full, scale: 1, backgroundColor: violet }, { scale: 0.95, duration: 0.12, ease: "power2.out" }, t)
    .to(body, { scale: 1, duration: 0.3, ease: "back.out(3)" }, t + 0.12)
    .to(idle, { opacity: 0, y: -6, duration: 0.2, ease: "power2.in" }, t + 0.1);
  t += 0.2;
  if (loader) {
    tl.to(body, { width: 56, duration: 0.42, ease: "power3.inOut" }, t)
      .fromTo(spin, { opacity: 0, rotation: 0 }, { opacity: 1, duration: 0.18 }, t + 0.3)
      .to(spin, { rotation: 720, duration: 0.95, ease: "none" }, t + 0.3)
      .to(spin, { opacity: 0, duration: 0.16 }, t + 1.2);
    t += 1.25;
  }
  tl.to(body, { width: full, backgroundColor: green, duration: 0.6, ease: "expo.out" }, t)
    .fromTo(done, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, t + 0.18)
    .fromTo(check, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, t + 0.25);
  return t + 0.6;
}

/** Each role's loop. Every tween states its own start value, so the loop resets itself cleanly. */
const BUILD: Record<Role, (tl: TL, stage: HTMLElement, c: Colors) => void> = {
  founder(tl, stage) {
    const amount = stage.querySelector<HTMLElement>("[data-money]")!;
    const tile = stage.querySelector("[data-tile]")!;
    tl.fromTo(tile, { scale: 1 }, { scale: 1.12, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 }, 0.5);
    count(amount, 0, 1250, tl, 0.8, 1.3, "+");
    swap(tl, stage, "pill", 2.0);
    swap(tl, stage, "sub", 2.05);
    tl.set({}, {}, 4.6);
  },
  accountant(tl, stage, c) {
    const amount = stage.querySelector("[data-amount]")!;
    tap(tl, stage, stage.querySelector<HTMLElement>("[data-btn]")!, 0.5);
    const landed = morphButton(tl, stage, 1.3, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    swap(tl, stage, "sub", landed);
    tl.fromTo(amount, { color: c.ink }, { color: c.green, duration: 0.5, ease: "power2.out" }, landed - 0.2);
    tl.set({}, {}, landed + 1.8);
  },
  frontDesk(tl, stage) {
    const scan = stage.querySelector<HTMLElement>("[data-scan]")!;
    const qr = stage.querySelector("[data-qr]")!;
    const ok = stage.querySelector("[data-qr-ok]")!;
    const okCheck = stage.querySelector("[data-qr-ok] [data-check]")!;
    const travel = () => scan.parentElement!.offsetHeight - 31;
    tl.fromTo(scan, { opacity: 0, y: 0 }, { opacity: 1, duration: 0.2 }, 0.4)
      .fromTo(scan, { y: 0 }, { y: travel, duration: 0.9, ease: "sine.inOut" }, 0.4)
      .to(scan, { y: 0, duration: 0.9, ease: "sine.inOut" }, 1.3)
      .to(scan, { y: travel, duration: 0.6, ease: "sine.inOut" }, 2.2)
      .to(scan, { opacity: 0, duration: 0.2 }, 2.75)
      .fromTo(qr, { opacity: 1, scale: 1 }, { opacity: 0.12, scale: 0.9, duration: 0.5, ease: "power2.inOut" }, 2.8)
      .fromTo(ok, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(2.2)" }, 2.9)
      .fromTo(okCheck, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, 3.15);
    swap(tl, stage, "pill", 2.95);
    swap(tl, stage, "sub", 3.1);
    swap(tl, stage, "sub2", 3.25);
    tl.set({}, {}, 5.4);
  },
  coaches(tl, stage) {
    const track = stage.querySelector<HTMLElement>("[data-track]")!;
    const thumb = stage.querySelector("[data-thumb]")!;
    const fill = stage.querySelector("[data-fill]")!;
    const hint = stage.querySelector("[data-hint]")!;
    const logged = stage.querySelector("[data-logged]")!;
    const check = stage.querySelector("[data-logged] [data-check]")!;
    const earn = stage.querySelector<HTMLElement>("[data-earn]")!;
    const plus = stage.querySelector("[data-plus]")!;
    const end = () => track.offsetWidth - 56;
    tl.fromTo(thumb, { x: 0 }, { x: () => end() * 0.18, duration: 0.35, ease: "power2.out" }, 0.5)
      .to(thumb, { x: end, duration: 0.95, ease: "power3.inOut" }, 0.95)
      .fromTo(fill, { width: 56 }, { width: () => track.offsetWidth, duration: 1.3, ease: "power2.inOut" }, 0.5)
      .to(hint, { opacity: 0, duration: 0.5 }, 0.8)
      .fromTo(logged, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" }, 1.85)
      .fromTo(check, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, 2.0)
      .fromTo(plus, { opacity: 0, y: 8, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2.4)" }, 2.1)
      .to(plus, { opacity: 0, y: -8, duration: 0.35, ease: "power2.in" }, 3.7);
    swap(tl, stage, "pill", 1.9);
    count(earn, 4200, 4350, tl, 2.15, 0.9);
    tl.set({}, {}, 5);
  },
  client(tl, stage, c) {
    tap(tl, stage, stage.querySelector<HTMLElement>("[data-btn]")!, 0.5);
    const landed = morphButton(tl, stage, 1.3, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    tl.set({}, {}, landed + 1.8);
  },
};

/** Final ("done") state for visitors who prefer reduced motion: everything the loop ends on. */
function showFinal(root: HTMLElement) {
  const css = getComputedStyle(root);
  const green = css.getPropertyValue("--color-green-fg").trim();
  const set = (sel: string, props: gsap.TweenVars) => gsap.set(root.querySelectorAll(sel), props);
  set("[data-swap-a]", { opacity: 0 });
  set("[data-swap-b]", { opacity: 1 });
  set("[data-btn-idle]", { opacity: 0 });
  set("[data-btn-done]", { opacity: 1 });
  set("[data-check]", { strokeDashoffset: 0 });
  set("[data-btn-body]", { backgroundColor: green });
  set("[data-amount]", { color: green });
  set("[data-qr-ok], [data-logged]", { opacity: 1 });
  set("[data-qr-ok]", { scale: 1 });
  set("[data-qr]", { opacity: 0.12, scale: 0.9 });
  set("[data-hint]", { opacity: 0 });
  set("[data-fill]", { width: "100%" });
  root.querySelectorAll<HTMLElement>("[data-track]").forEach((track) => gsap.set(track.querySelector("[data-thumb]"), { x: track.offsetWidth - 56 }));
  const m = root.querySelector<HTMLElement>("[data-money]");
  if (m) m.textContent = money(1250, "+");
  const earn = root.querySelector<HTMLElement>("[data-earn]");
  if (earn) earn.textContent = money(4350);
}

/**
 * Entrance (once the sheet is on screen): tag drops in, heading rises word by word, lede fades up,
 * cards rise in a stagger. Then each card's loop plays while the card is on screen and pauses off screen.
 * Reduced motion: no entrance, no loops; every demo shows its finished state.
 */
export function initEcosystemMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();
  const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const one = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  mm.add("(prefers-reduced-motion: reduce)", () => showFinal(root));

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const css = getComputedStyle(root);
    const token = (n: string) => css.getPropertyValue(n).trim();
    const colors: Colors = { green: token("--color-green-fg"), violet: token("--color-primary"), ink: token("--color-ink") };

    const tag = one("[data-eco-tag]");
    const title = one("[data-eco-title]");
    const lede = one("[data-eco-lede]");
    const cards = all("[data-eco-card]");
    const split = SplitText.create(title, { type: "words", mask: "words" });

    gsap.set([tag, lede, ...cards], { opacity: 0 });
    gsap.set(split.words, { yPercent: 110 });
    gsap.set(cards, { y: 70 });

    gsap
      .timeline({ scrollTrigger: { trigger: title, start: "top 88%", once: true } })
      .fromTo(tag, { y: -24, rotation: 6 }, { y: 0, rotation: -3, opacity: 1, duration: duration.base, ease: ease.out })
      .to(split.words, { yPercent: 0, duration: duration.slow, ease: ease.out, stagger: stagger.base }, 0.1)
      .to(lede, { opacity: 1, y: 0, duration: duration.base, ease: ease.out }, 0.45)
      .to(cards, { opacity: 1, y: 0, duration: duration.slow, ease: ease.out, stagger: stagger.loose }, 0.55);

    const loops: TL[] = [];
    all<HTMLElement>("[data-demo]").forEach((demo, i) => {
      const role = demo.dataset.demo as Role;
      const stage = demo.querySelector<HTMLElement>("[data-stage]")!;
      const inner = stage.querySelector<HTMLElement>("[data-inner]")!;
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5, delay: i * 0.25 });
      loops.push(tl);
      tl.fromTo(inner, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      BUILD[role](tl, stage, colors);
      tl.to(inner, { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" }, tl.duration());
      ScrollTrigger.create({ trigger: demo, start: "top 92%", end: "bottom 8%", onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) });
    });

    // Widths are measured in px: re-measure after a resize.
    const remeasure = () => loops.forEach((l) => l.invalidate());
    ScrollTrigger.addEventListener("refresh", remeasure);

    return () => {
      ScrollTrigger.removeEventListener("refresh", remeasure);
      split.revert();
    };
  });

  return () => mm.revert();
}
