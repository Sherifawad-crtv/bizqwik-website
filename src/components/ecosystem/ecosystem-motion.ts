import { gsap, ScrollTrigger } from "@/motion/gsap";
import { playOnView, replay, toggleOnView } from "@/motion/primitives";
import { duration, enterFrom, ease, gap, press, stagger } from "@/motion/tokens";

type TL = gsap.core.Timeline;
type Role = "revenue" | "scheduling" | "bookings" | "checkin" | "payments" | "memberships" | "payouts" | "sessions" | "client";
type Colors = { green: string; violet: string; ink: string; muted: string };

const money = (n: number, sign = "", dec = 2) => sign + n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

const count = (el: HTMLElement, from: number, to: number, tl: TL, at: number, d: number = duration.count, sign = "", dec = 2) => {
  const o = { v: from };
  // Reset the shown value as the demo begins (otherwise the previous run's final number lingers).
  tl.add(() => (el.textContent = money(from, sign, dec)), 0.02);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: ease.standard, onUpdate: () => (el.textContent = money(o.v, sign, dec)) }, at);
};

/** Cross-fade a `Swap` pair (starting text a, replacement b). */
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

/** Cursor glides to a control and presses it. Returns the time the press lands. */
function tap(tl: TL, stage: HTMLElement, target: HTMLElement, at: number): number {
  const cursor = stage.querySelector<HTMLElement>("[data-cursor]")!;
  const where = () => {
    const s = stage.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    return { x: t.left - s.left + t.width * 0.62 - 16, y: t.top - s.top + t.height * 0.55 - 16 };
  };
  const land = at + duration.slow + gap.beat;
  tl.fromTo(cursor, { opacity: 0, x: () => where().x + 54, y: () => where().y + 46, scale: 1 }, { opacity: 1, x: () => where().x, y: () => where().y, duration: duration.slow, ease: ease.standard }, at)
    .to(cursor, { scale: press.scale - 0.17, duration: duration.instant, ease: ease.standard }, land)
    .to(cursor, { scale: 1, opacity: 0, duration: duration.base, ease: ease.standard }, land + duration.instant);
  return land;
}

/** Segmented control: the white thumb moves from option `from` to option `to`. */
function seg(tl: TL, stage: HTMLElement, name: string, from: number, to: number, at: number, c: Colors) {
  const root = stage.querySelector(`[data-seg="${name}"]`)!;
  const q = (k: string, i: number) => root.querySelector(`[data-seg-${k}="${i}"]`)!;
  tl.fromTo(q("bg", from), { opacity: 1 }, { opacity: 0, duration: duration.fast, ease: ease.standard }, at)
    .fromTo(q("bg", to), { opacity: 0 }, { opacity: 1, duration: duration.fast, ease: ease.standard }, at)
    .fromTo(q("t", from), { color: c.ink }, { color: c.muted, duration: duration.fast, ease: ease.standard }, at)
    .fromTo(q("t", to), { color: c.muted }, { color: c.ink, duration: duration.fast, ease: ease.standard }, at);
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
  const turns = 2;
  let t = at;

  // Width is stated on both ends: a width measured while the panel was hidden would be 0.
  tl.fromTo(body, { width: full, scale: 1, borderRadius: 24, backgroundColor: violet }, { width: full, scale: press.scale, borderRadius: 24, backgroundColor: violet, duration: duration.instant, ease: ease.standard, immediateRender: false }, t)
    .to(body, { scale: 1, duration: duration.fast, ease: ease.spring }, t + duration.instant)
    .fromTo(idle, { opacity: 1, y: 0 }, { opacity: 0, y: -enterFrom.y / 2, duration: duration.fast, ease: ease.standard }, t + gap.beat);
  t += duration.fast;
  if (loader) {
    const spinAt = t + duration.base * 0.75;
    tl.to(body, { width: 56, borderRadius: 28, duration: duration.base, ease: ease.standard }, t)
      .fromTo(spin, { opacity: 0, rotation: 0 }, { opacity: 1, duration: duration.fast }, spinAt)
      .to(spin, { rotation: 360 * turns, duration: duration.spin * turns, ease: ease.linear }, spinAt)
      .to(spin, { opacity: 0, duration: duration.fast }, spinAt + duration.spin * turns - duration.fast);
    t = spinAt + duration.spin * turns;
  }
  tl.to(body, { width: full, borderRadius: 24, backgroundColor: green, duration: duration.slow, ease: ease.standard }, t)
    .fromTo(done, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: duration.fast, ease: ease.spring }, t + duration.slow * 0.3)
    .fromTo(check, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: duration.base, ease: ease.standard }, t + duration.slow * 0.4);
  return t + duration.slow;
}

/** Each feature's loop. Every tween states its own start value, so the loop resets itself cleanly. */
const BUILD: Record<Role, (tl: TL, stage: HTMLElement, c: Colors) => void> = {
  revenue(tl, stage, c) {
    const q = <T extends HTMLElement>(sel: string) => stage.querySelector<T>(sel)!;
    seg(tl, stage, "month", 1, 2, 0.6, c);
    count(q("[data-rev]"), 96400, 118400, tl, 0.8, duration.count, "", 0);
    [[41200, 52800], [38000, 41500], [212, 236]].forEach(([a, b], i) => count(q(`[data-st="${i}"]`), a, b, tl, 0.9, duration.count, "", 0));
  },
  scheduling(tl, stage) {
    const blocks = Array.from(stage.querySelectorAll<HTMLElement>("[data-blk]"));
    const fresh = blocks.find((b) => b.dataset.blk === "new")!;
    const rest = blocks.filter((b) => b !== fresh);
    tl.fromTo(rest, { opacity: 0, scale: 0.9, y: 6 }, { opacity: 1, scale: 1, y: 0, duration: duration.base, ease: ease.spring, stagger: stagger.base }, 0.3);
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 1.9);
    tl.fromTo(fresh, { opacity: 0, scale: 0.6, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: duration.enter, ease: ease.spring }, landed + 0.1);
  },
  bookings(tl, stage) {
    const roster = stage.querySelector("[data-roster]")!;
    const arrived = stage.querySelector("[data-arr-on]")!;
    const bk = stage.querySelector<HTMLElement>("[data-bk]")!;
    tl.fromTo(roster, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: duration.enter, ease: ease.standard }, 0.5);
    count(bk, 7, 8, tl, 0.6, duration.fast, "", 0);
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 1.7);
    tl.fromTo(arrived, { opacity: 0 }, { opacity: 1, duration: duration.fast }, landed);
    swap(tl, stage, "att", landed);
  },
  checkin(tl, stage) {
    const scan = stage.querySelector<HTMLElement>("[data-scan]")!;
    const qr = stage.querySelector("[data-qr]")!;
    const ok = stage.querySelector("[data-qr-ok]")!;
    const okCheck = stage.querySelector("[data-qr-ok] [data-check]")!;
    const travel = () => scan.parentElement!.offsetHeight - 31;
    const sweep = duration.count;
    const found = 0.4 + sweep * 2 + duration.slow; // two sweeps and a closing pass, then the code is read
    tl.fromTo(scan, { opacity: 0, y: 0 }, { opacity: 1, duration: duration.fast }, 0.4)
      .fromTo(scan, { y: 0 }, { y: travel, duration: sweep, ease: ease.standard }, 0.4)
      .to(scan, { y: 0, duration: sweep, ease: ease.standard }, 0.4 + sweep)
      .to(scan, { y: travel, duration: duration.slow, ease: ease.standard }, 0.4 + sweep * 2)
      .to(scan, { opacity: 0, duration: duration.fast }, found - duration.fast)
      .fromTo(qr, { opacity: 1, scale: 1 }, { opacity: 0.12, scale: 0.9, duration: duration.enter, ease: ease.standard }, found)
      .fromTo(ok, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: duration.enter, ease: ease.spring }, found + gap.beat)
      .fromTo(okCheck, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: duration.base, ease: ease.standard }, found + duration.fast);
    swap(tl, stage, "pill", found + gap.beat);
    swap(tl, stage, "sub", found + duration.fast);
    swap(tl, stage, "sub2", found + duration.base);
  },
  payments(tl, stage, c) {
    const cards = stage.querySelector<HTMLElement>("[data-pc]")!;
    const amount = stage.querySelector("[data-amount]")!;
    const pickAt = tap(tl, stage, stage.querySelector<HTMLElement>('[data-pc] [data-tap]')!, 0.4);
    tl.fromTo(cards.querySelector('[data-pc-sel="0"]'), { opacity: 1 }, { opacity: 0, duration: duration.fast }, pickAt)
      .fromTo(cards.querySelector('[data-pc-sel="2"]'), { opacity: 0 }, { opacity: 1, duration: duration.fast }, pickAt)
      .fromTo(cards.querySelector('[data-pc-t="0"]'), { color: c.violet }, { color: c.ink, duration: duration.fast }, pickAt)
      .fromTo(cards.querySelector('[data-pc-t="2"]'), { color: c.ink }, { color: c.violet, duration: duration.fast }, pickAt);
    const btn = stage.querySelector<HTMLElement>("[data-btn]")!;
    tap(tl, stage, btn, 1.9);
    const landed = morphButton(tl, stage, 2.7, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    tl.fromTo(amount, { color: c.ink }, { color: c.green, duration: duration.enter, ease: ease.standard }, landed - 0.2);
  },
  memberships(tl, stage) {
    const flash = stage.querySelector("[data-flash]")!;
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 0.6);
    tl.fromTo(stage.querySelector("[data-tap]"), { scale: 1 }, { scale: 0.94, duration: duration.instant, yoyo: true, repeat: 1 }, landed - 0.05);
    swap(tl, stage, "btn", landed + 0.1);
    swap(tl, stage, "pill", landed + 0.2);
    swap(tl, stage, "sub", landed + 0.2);
    tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: duration.fast, yoyo: true, repeat: 1 }, landed + 0.2);
  },
  payouts(tl, stage, c) {
    const amount = stage.querySelector("[data-amount]")!;
    tap(tl, stage, stage.querySelector<HTMLElement>("[data-btn]")!, 0.5);
    const landed = morphButton(tl, stage, 1.3, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    swap(tl, stage, "sub", landed);
    tl.fromTo(amount, { color: c.ink }, { color: c.green, duration: duration.enter, ease: ease.standard }, landed - 0.2);
  },
  sessions(tl, stage) {
    const earn = stage.querySelector<HTMLElement>("[data-earn]")!;
    swap(tl, stage, "slot", 1.0);
    count(earn, 4200, 4500, tl, 1.15, duration.count);
  },
  client(tl, stage, c) {
    tap(tl, stage, stage.querySelector<HTMLElement>("[data-btn]")!, 0.5);
    const landed = morphButton(tl, stage, 1.3, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
  },
};

/** Final ("done") state for visitors who prefer reduced motion: everything the loop ends on. */
function showFinal(root: HTMLElement) {
  const css = getComputedStyle(root);
  const green = css.getPropertyValue("--color-green-fg").trim();
  const violet = css.getPropertyValue("--color-primary").trim();
  const ink = css.getPropertyValue("--color-ink").trim();
  const muted = css.getPropertyValue("--color-ink-muted").trim();
  const set = (sel: string, props: gsap.TweenVars) => gsap.set(root.querySelectorAll(sel), props);
  set("[data-swap-a]", { opacity: 0 });
  set("[data-swap-b]", { opacity: 1 });
  set("[data-btn-idle]", { opacity: 0 });
  set("[data-btn-done]", { opacity: 1 });
  set("[data-check]", { strokeDashoffset: 0 });
  set("[data-btn-body]", { backgroundColor: green });
  set("[data-amount]", { color: green });
  set("[data-qr-ok]", { opacity: 1, scale: 1 });
  set("[data-qr]", { opacity: 0.12, scale: 0.9 });
  set("[data-arr-on]", { opacity: 1 });
  root.querySelectorAll<HTMLElement>("[data-final]").forEach((el) => (el.textContent = el.dataset.final!));
  root.querySelectorAll<HTMLElement>("[data-seg]").forEach((el) => {
    const f = el.dataset.segFinal;
    el.querySelectorAll<HTMLElement>("[data-seg-bg]").forEach((bg) => gsap.set(bg, { opacity: bg.dataset.segBg === f ? 1 : 0 }));
    el.querySelectorAll<HTMLElement>("[data-seg-t]").forEach((t) => gsap.set(t, { color: t.dataset.segT === f ? ink : muted }));
  });
  root.querySelectorAll<HTMLElement>("[data-pc]").forEach((el) => {
    const f = el.dataset.pcFinal;
    el.querySelectorAll<HTMLElement>("[data-pc-sel]").forEach((x) => gsap.set(x, { opacity: x.dataset.pcSel === f ? 1 : 0 }));
    el.querySelectorAll<HTMLElement>("[data-pc-t]").forEach((x) => gsap.set(x, { color: x.dataset.pcT === f ? violet : ink }));
  });
}

/**
 * Every feature row plays the shared way (docs/MOTION.md): its demo plays once when its panel scrolls into
 * view, holds the finished frame, and plays again on Replay. Reduced motion: no playback, every demo shows
 * its finished state.
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
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(inner, { opacity: 0, y: enterFrom.y, scale: enterFrom.scale }, { opacity: 1, y: 0, scale: 1, duration: duration.enter, ease: ease.enter }, 0);
      BUILD[demo.dataset.demo as Role](tl, stage, colors);
      timelines.set(panel, tl);
      return playOnView(panel, () => replay(tl));
    });

    // The text block of each row: it fades in and its divider draws left to right when the row is on screen
    // (192px inside the top and bottom edges, as in the reference), and both reverse when it leaves.
    // On phones the block starts visible and only reacts on leaving, as in the reference.
    const phone = window.matchMedia("(max-width: 640px)").matches;
    const offset = parseInt(token("--header-offset"), 10) || 96;
    const stopToggles = all<HTMLElement>("[data-accordion]").map((el) => {
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

    // Widths are measured in px: re-measure after a resize.
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
