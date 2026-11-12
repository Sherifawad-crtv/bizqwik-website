import { gsap, ScrollTrigger } from "@/motion/gsap";
import { playOnView, replay, toggleOnView } from "@/motion/primitives";
import { duration, enterFrom, ease, gap, press, stagger } from "@/motion/tokens";

type TL = gsap.core.Timeline;
type Role = "business" | "frontdesk" | "coaches" | "clients";
type Colors = { green: string; violet: string; ink: string; muted: string };
type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

const money = (n: number, dec = 2) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** Count a number up. The shown value is reset as the demo begins (the previous run's final number would linger otherwise). */
function count(el: HTMLElement, from: number, to: number, tl: TL, at: number, dec = 2, d: number = duration.count) {
  const o = { v: from };
  tl.add(() => (el.textContent = money(from, dec)), 0.02);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, onUpdate: () => (el.textContent = money(o.v, dec)) }, at);
}

/** Type a string in, one letter at a time. */
function typeText(tl: TL, el: HTMLElement, text: string, at: number, d: number) {
  const o = { n: 0 };
  tl.add(() => (el.textContent = ""), 0.01);
  tl.add(() => (el.textContent = ""), at);
  tl.fromTo(o, { n: 0 }, { n: text.length, duration: d, ease: ease.linear, onUpdate: () => (el.textContent = text.slice(0, Math.round(o.n))) }, at);
}

/** Cross-fade a `Swap` pair (starting content a, replacement b). */
function swap(tl: TL, stage: HTMLElement, name: string, at: number) {
  const a = stage.querySelector(`[data-swap-a="${name}"]`)!;
  const b = stage.querySelector(`[data-swap-b="${name}"]`)!;
  tl.fromTo(a, { opacity: 1, y: 0 }, { opacity: 0, y: -enterFrom.y / 2, duration: duration.fast, ease: ease.standard }, at).fromTo(
    b,
    { opacity: 0, y: enterFrom.y / 2, scale: enterFrom.scale },
    { opacity: 1, y: 0, scale: 1, duration: duration.base, ease: ease.spring },
    at + gap.beat,
  );
}

/** The pointer glides to a control and presses it. Returns the time the press lands. */
function tap(tl: TL, stage: HTMLElement, target: HTMLElement, at: number): number {
  const cursor = stage.querySelector<HTMLElement>("[data-cursor]")!;
  const where = () => {
    const s = stage.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const k = s.width / stage.offsetWidth || 1; // the panel scales the demo down on phones
    return { x: (t.left - s.left + t.width * 0.6) / k, y: (t.top - s.top + t.height * 0.5) / k };
  };
  const land = at + duration.slow + gap.beat;
  tl.fromTo(cursor, { opacity: 0, x: () => where().x + 56, y: () => where().y + 48, scale: 1 }, { opacity: 1, x: () => where().x, y: () => where().y, duration: duration.slow, ease: ease.standard }, at)
    .to(cursor, { scale: press.scale - 0.17, duration: duration.instant, ease: ease.standard }, land)
    .to(cursor, { scale: 1, opacity: 0, duration: duration.base, ease: ease.standard }, land + duration.instant);
  return land;
}

/** The card gets taller as a section opens (`Grow` in ui.tsx). */
function grow(tl: TL, el: HTMLElement, at: number) {
  tl.fromTo(el, { height: 0 }, { height: "auto", duration: duration.slow, ease: ease.standard }, at).fromTo(el, { opacity: 0 }, { opacity: 1, duration: duration.base, ease: ease.standard }, at + gap.beat);
}

/** Each bundle's demo. Every tween states its own start value, so a replay resets itself cleanly. */
const BRANDS = [
  { name: "Forge Athletics", url: "forgeathletics.com", hex: "#151515", letter: "F", vars: { "--app-brand": "#151515", "--app-on": "#ffffff", "--app-bg": "#fbfaf7", "--app-soft": "#f1f0ec", "--app-ink": "#151515" } },
  { name: "Grove Pilates", url: "grovepilates.com", hex: "#6B7A3A", letter: "G", vars: { "--app-brand": "#6b7a3a", "--app-on": "#ffffff", "--app-bg": "#f1ebdd", "--app-soft": "#e6dec9", "--app-ink": "#2b3016" } },
  { name: "Pulse Studio", url: "pulsestudio.fit", hex: "#5A41FF", letter: "P", vars: { "--app-brand": "#5a41ff", "--app-on": "#ffffff", "--app-bg": "#fbfaf7", "--app-soft": "#f3f2ee", "--app-ink": "#1a1726" } },
] as const;
const NEUTRAL = { "--app-brand": "#a8a5b3", "--app-on": "#ffffff", "--app-bg": "#fbfaf7", "--app-soft": "#f3f2ee", "--app-ink": "#1a1726" };

const BUILD: Record<Role, (tl: TL, stage: HTMLElement, c: Colors, q: Q) => void> = {
  business(tl, stage, _c, { one, all }) {
    const [team, schedule, payout] = all("[data-grow]");
    count(one("[data-count]"), 96400, 118400, tl, 0.55, 0);
    tl.fromTo(all("[data-bar]"), { scaleY: 0 }, { scaleY: 1, duration: duration.slow, ease: ease.standard, stagger: stagger.tight }, 0.55);
    grow(tl, team, 2.4);
    tl.fromTo(all("[data-row]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, 2.7);
    tl.fromTo(all("[data-pop]"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: duration.fast, ease: ease.spring, stagger: stagger.loose }, 3.3);
    grow(tl, schedule, 4.4);
    tl.fromTo(one("[data-new]"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.spring }, 4.9);
    grow(tl, payout, 6.2);
    const land = tap(tl, stage, one('[data-tap="pay"]'), 7.2);
    swap(tl, stage, "pay", land + 0.05);
    swap(tl, stage, "sub", land + 0.1);
  },

  frontdesk(tl, stage, _c, { one, all }) {
    const list = one('[data-layer="list"]');
    const record = one('[data-layer="record"]');
    typeText(tl, one('[data-type="search"]'), "Mona", 0.7, 0.8);
    all("[data-res]").forEach((el) => tl.fromTo(el, { height: () => el.offsetHeight, opacity: 1 }, { height: 0, opacity: 0, duration: duration.slow, ease: ease.standard }, 2.0));
    const open = tap(tl, stage, one('[data-tap="row"]'), 3.1);
    tl.fromTo(list, { opacity: 1, y: 0 }, { opacity: 0, y: -8, duration: duration.fast, ease: ease.standard }, open + 0.05)
      .fromTo(record, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter }, open + 0.25);
    const checkin = tap(tl, stage, one('[data-tap="checkin"]'), open + 1.5);
    swap(tl, stage, "checkin", checkin + 0.05);
    swap(tl, stage, "seen", checkin + 0.1);
    const renew = tap(tl, stage, one('[data-tap="renew"]'), checkin + 1.1);
    swap(tl, stage, "renew", renew + 0.05);
    swap(tl, stage, "renews", renew + 0.1);
  },

  coaches(tl, stage, _c, { one, all }) {
    const fresh = one("[data-new]");
    tl.fromTo(all("[data-grow] ~ div, [data-new] ~ div"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.enter, stagger: stagger.base }, 0.7);
    grow(tl, fresh, 2.0);
    count(one("[data-count]"), 4200, 4500, tl, 2.2, 2);
    swap(tl, stage, "paid", 5.4);
  },

  clients(tl, stage, _c, { one, all }) {
    const app = one("[data-app]");
    const sw = one("[data-swatch]");
    const logoEd = one("[data-logo-ed]");
    const appLogo = one("[data-app-logo]");
    const hex = one("[data-hex]");
    const name = one('[data-type="name"]');
    const appName = one('[data-type="appname"]');
    const url = one('[data-type="url"]');
    const dots = all("[data-dot]");

    tl.add(() => {
      hex.textContent = "#------";
      appLogo.textContent = "Y";
      logoEd.textContent = "F";
    }, 0.01);
    tl.set(app, NEUTRAL, 0);
    tl.set(sw, { background: "#a8a5b3" }, 0);

    BRANDS.forEach((b, i) => {
      const at = 0.6 + i * 4.2;
      typeText(tl, name, b.name, at, 0.8);
      typeText(tl, appName, b.name, at, 0.8);
      typeText(tl, url, b.url, at + 0.5, 0.8);
      if (i === 0) swap(tl, stage, "logo", at + 1.3);
      const paint = at + 1.5;
      tl.add(() => {
        hex.textContent = b.hex;
        appLogo.textContent = b.letter;
        logoEd.textContent = b.letter;
      }, paint);
      tl.to(sw, { background: b.vars["--app-brand"], duration: duration.fast, ease: ease.standard }, paint)
        .to(logoEd, { background: b.vars["--app-brand"], color: b.vars["--app-on"], duration: duration.base, ease: ease.standard }, paint)
        .to(app, { ...b.vars, duration: duration.slow, ease: ease.standard }, paint)
        .fromTo(dots[i], { scale: 1 }, { scale: 1.4, duration: duration.fast, ease: ease.spring, yoyo: true, repeat: 1 }, paint);
    });
  },
};

/** The finished frame for visitors who prefer reduced motion (the default markup is already the finished state, except the swaps and layers). */
function showFinal(root: HTMLElement) {
  const set = (sel: string, props: gsap.TweenVars) => gsap.set(root.querySelectorAll(sel), props);
  set("[data-swap-a]", { opacity: 0 });
  set("[data-swap-b]", { opacity: 1 });
  set('[data-layer="list"]', { opacity: 0 });
  set('[data-layer="record"]', { opacity: 1 });
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
    const colors: Colors = { green: token("--color-green-fg"), violet: token("--color-primary"), ink: token("--color-ink"), muted: token("--color-ink-muted") };

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
      tl.fromTo(inner, { opacity: 0, y: enterFrom.y, scale: enterFrom.scale }, { opacity: 1, y: 0, scale: 1, duration: duration.enter, ease: ease.enter }, 0);
      BUILD[demo.dataset.demo as Role](tl, stage, colors, q);
      timelines.set(panel, tl);
      return playOnView(panel, () => replay(tl));
    });

    // The text block of each row: fades in and its divider draws left to right when the row is on screen
    // (192px inside the top and bottom edges, as in the reference), and both reverse when it leaves.
    // On phones the block starts visible and only reacts on leaving, as in the reference.
    // Stacked layouts (under 901px): the title and headline are sticky and always shown while the row is on screen, so no fade.
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
