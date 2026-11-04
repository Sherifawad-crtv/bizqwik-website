import { gsap, ScrollTrigger, SplitText } from "@/motion/gsap";
import { duration, ease, stagger } from "@/motion/tokens";

type TL = gsap.core.Timeline;
type Role = "revenue" | "scheduling" | "bookings" | "checkin" | "payments" | "memberships" | "payouts" | "sessions" | "client";
type Colors = { green: string; violet: string; ink: string; muted: string };

const money = (n: number, sign = "", dec = 2) => sign + n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

const count = (el: HTMLElement, from: number, to: number, tl: TL, at: number, d: number, sign = "", dec = 2) => {
  const o = { v: from };
  // Reset the shown value as each loop begins (otherwise the previous loop's final number lingers).
  tl.add(() => (el.textContent = money(from, sign, dec)), 0.02);
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: "power2.out", onUpdate: () => (el.textContent = money(o.v, sign, dec)) }, at);
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

/** Segmented control: the white thumb moves from option `from` to option `to`. */
function seg(tl: TL, stage: HTMLElement, name: string, from: number, to: number, at: number, c: Colors) {
  const root = stage.querySelector(`[data-seg="${name}"]`)!;
  const q = (k: string, i: number) => root.querySelector(`[data-seg-${k}="${i}"]`)!;
  tl.fromTo(q("bg", from), { opacity: 1 }, { opacity: 0, duration: 0.3 }, at)
    .fromTo(q("bg", to), { opacity: 0 }, { opacity: 1, duration: 0.3 }, at)
    .fromTo(q("t", from), { color: c.ink }, { color: c.muted, duration: 0.3 }, at)
    .fromTo(q("t", to), { color: c.muted }, { color: c.ink, duration: 0.3 }, at);
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

  tl.fromTo(body, { width: full, scale: 1, borderRadius: 24, backgroundColor: violet }, { width: full, scale: 0.95, borderRadius: 24, backgroundColor: violet, duration: 0.12, ease: "power2.out", immediateRender: false }, t)
    .to(body, { scale: 1, duration: 0.3, ease: "back.out(3)" }, t + 0.12)
    .fromTo(idle, { opacity: 1, y: 0 }, { opacity: 0, y: -6, duration: 0.2, ease: "power2.in" }, t + 0.1);
  t += 0.2;
  if (loader) {
    tl.to(body, { width: 56, borderRadius: 28, duration: 0.42, ease: "power3.inOut" }, t)
      .fromTo(spin, { opacity: 0, rotation: 0 }, { opacity: 1, duration: 0.18 }, t + 0.3)
      .to(spin, { rotation: 720, duration: 0.95, ease: "none" }, t + 0.3)
      .to(spin, { opacity: 0, duration: 0.16 }, t + 1.2);
    t += 1.25;
  }
  tl.to(body, { width: full, borderRadius: 24, backgroundColor: green, duration: 0.6, ease: "expo.out" }, t)
    .fromTo(done, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, t + 0.18)
    .fromTo(check, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, t + 0.25);
  return t + 0.6;
}

/** Each feature's loop. Every tween states its own start value, so the loop resets itself cleanly. */
const BUILD: Record<Role, (tl: TL, stage: HTMLElement, c: Colors) => void> = {
  revenue(tl, stage, c) {
    const q = <T extends HTMLElement>(sel: string) => stage.querySelector<T>(sel)!;
    seg(tl, stage, "month", 1, 2, 0.6, c);
    count(q("[data-rev]"), 96400, 118400, tl, 0.8, 1.4, "", 0);
    [[41200, 52800], [38000, 41500], [212, 236]].forEach(([a, b], i) => count(q(`[data-st="${i}"]`), a, b, tl, 0.9, 1.3, "", 0));
    tl.set({}, {}, 4.4);
  },
  scheduling(tl, stage) {
    const blocks = Array.from(stage.querySelectorAll<HTMLElement>("[data-blk]"));
    const fresh = blocks.find((b) => b.dataset.blk === "new")!;
    const rest = blocks.filter((b) => b !== fresh);
    tl.fromTo(rest, { opacity: 0, scale: 0.9, y: 6 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.12 }, 0.3);
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 1.9);
    tl.fromTo(fresh, { opacity: 0, scale: 0.6, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(2)" }, landed + 0.1);
    tl.set({}, {}, landed + 2.2);
  },
  bookings(tl, stage) {
    const roster = stage.querySelector("[data-roster]")!;
    const arrived = stage.querySelector("[data-arr-on]")!;
    const bk = stage.querySelector<HTMLElement>("[data-bk]")!;
    tl.fromTo(roster, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5);
    count(bk, 7, 8, tl, 0.6, 0.35, "", 0);
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 1.7);
    tl.fromTo(arrived, { opacity: 0 }, { opacity: 1, duration: 0.3 }, landed);
    swap(tl, stage, "att", landed);
    tl.set({}, {}, landed + 2);
  },
  checkin(tl, stage) {
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
  payments(tl, stage, c) {
    const cards = stage.querySelector<HTMLElement>("[data-pc]")!;
    const amount = stage.querySelector("[data-amount]")!;
    const pickAt = tap(tl, stage, stage.querySelector<HTMLElement>('[data-pc] [data-tap]')!, 0.4);
    tl.fromTo(cards.querySelector('[data-pc-sel="0"]'), { opacity: 1 }, { opacity: 0, duration: 0.3 }, pickAt)
      .fromTo(cards.querySelector('[data-pc-sel="2"]'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, pickAt)
      .fromTo(cards.querySelector('[data-pc-t="0"]'), { color: c.violet }, { color: c.ink, duration: 0.3 }, pickAt)
      .fromTo(cards.querySelector('[data-pc-t="2"]'), { color: c.ink }, { color: c.violet, duration: 0.3 }, pickAt);
    const btn = stage.querySelector<HTMLElement>("[data-btn]")!;
    tap(tl, stage, btn, 1.9);
    const landed = morphButton(tl, stage, 2.7, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    tl.fromTo(amount, { color: c.ink }, { color: c.green, duration: 0.5, ease: "power2.out" }, landed - 0.2);
    tl.set({}, {}, landed + 1.8);
  },
  memberships(tl, stage) {
    const flash = stage.querySelector("[data-flash]")!;
    const landed = tap(tl, stage, stage.querySelector<HTMLElement>("[data-tap]")!, 0.6);
    tl.fromTo(stage.querySelector("[data-tap]"), { scale: 1 }, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, landed - 0.05);
    swap(tl, stage, "btn", landed + 0.1);
    swap(tl, stage, "pill", landed + 0.2);
    swap(tl, stage, "sub", landed + 0.2);
    tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }, landed + 0.2);
    tl.set({}, {}, landed + 2.6);
  },
  payouts(tl, stage, c) {
    const amount = stage.querySelector("[data-amount]")!;
    tap(tl, stage, stage.querySelector<HTMLElement>("[data-btn]")!, 0.5);
    const landed = morphButton(tl, stage, 1.3, c.green, c.violet);
    swap(tl, stage, "pill", landed - 0.1);
    swap(tl, stage, "sub", landed);
    tl.fromTo(amount, { color: c.ink }, { color: c.green, duration: 0.5, ease: "power2.out" }, landed - 0.2);
    tl.set({}, {}, landed + 1.8);
  },
  sessions(tl, stage) {
    const earn = stage.querySelector<HTMLElement>("[data-earn]")!;
    swap(tl, stage, "slot", 1.0);
    count(earn, 4200, 4500, tl, 1.15, 1.0);
    tl.set({}, {}, 4.6);
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
    const colors: Colors = { green: token("--color-green-fg"), violet: token("--color-primary"), ink: token("--color-ink"), muted: token("--color-ink-muted") };

    const tag = one("[data-eco-tag]");
    const title = one("[data-eco-title]");
    const lede = one("[data-eco-lede]");
    const cards = all("[data-eco-card]");
    const copyIn = () => gsap.fromTo(all("[data-eco-copy]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: duration.base, ease: ease.out });
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

    // Only the role shown on the stage plays, and only while the stage is on screen.
    const loops: { demo: HTMLElement; tl: TL; shown: boolean }[] = [];
    const sync = () =>
      loops.forEach((l) => {
        const active = l.demo.dataset.active === "true";
        if (active && inView) {
          if (!l.shown) l.tl.invalidate().restart();
          else l.tl.play();
        } else l.tl.pause();
        l.shown = active;
      });
    let inView = false;
    all<HTMLElement>("[data-demo]").forEach((demo) => {
      const role = demo.dataset.demo as Role;
      const stage = demo.querySelector<HTMLElement>("[data-stage]")!;
      const inner = stage.querySelector<HTMLElement>("[data-inner]")!;
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5 });
      loops.push({ demo, tl, shown: false });
      tl.fromTo(inner, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      BUILD[role](tl, stage, colors);
      tl.to(inner, { opacity: 0, y: -6, duration: 0.4, ease: "power2.in" }, tl.duration());
    });
    ScrollTrigger.create({
      trigger: one("[data-eco-card]"),
      start: "top 92%",
      end: "bottom 8%",
      onToggle: (self) => {
        inView = self.isActive;
        sync();
      },
    });
    // Switching role: React flips data-active; restart that role's loop and fade the copy in.
    const watch = new MutationObserver(() => {
      sync();
      copyIn();
    });
    watch.observe(one("#eco-stage"), { attributes: true, subtree: true, attributeFilter: ["data-active"] });

    // Widths are measured in px: re-measure after a resize.
    const remeasure = () => loops.forEach((l) => l.tl.invalidate());
    ScrollTrigger.addEventListener("refresh", remeasure);

    return () => {
      ScrollTrigger.removeEventListener("refresh", remeasure);
      watch.disconnect();
      split.revert();
    };
  });

  return () => mm.revert();
}
