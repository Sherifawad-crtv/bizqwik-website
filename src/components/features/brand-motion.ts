import { duration, ease } from "@/motion/tokens";
import type { TL } from "./demo-kit";
import { hexOf, PICK_END, PICK_START, themeFrom, type Hsv } from "./brand-app";
import { phoneKit, type PhoneColors } from "./phone-motion";

/*
 * "Your gym, your brand": a colour picker slides in beside the phone, overlapping its right edge. The pointer grabs the hue handle and drags it along the
 * slider, then the handle in the square; the whole app takes the picked colour live, frame by frame (brand colour, the
 * text on it, background, soft tiles, ink). The picker closes on the gym's green. Rows 2-4 have no phone entrance.
 */

type Q = { one: <T extends HTMLElement>(sel: string) => T; all: <T extends HTMLElement>(sel: string) => T[] };

export function buildBrand(tl: TL, stage: HTMLElement, c: PhoneColors, q: Q) {
  const { one } = q;
  const k = phoneKit(tl, c, q);
  const { phone, tapAt } = k;
  const app = one("[data-app]");
  const cursor = one("[data-cursor]");
  const square = one("[data-pk-square]");
  const sqHandle = one("[data-pk-sq-handle]");
  const hueHandle = one("[data-pk-hue-handle]");
  const hexEl = one("[data-pk-hex]");
  const st: Hsv = { ...PICK_START };
  const DRAG_HUE = duration.count * 1.8; // a slow, deliberate drag
  const DRAG_SQ = duration.count * 1.5;

  /** Paint everything from the current colour: the app's variables, both handles, the square's hue, the hex. */
  const paint = () => {
    const theme = themeFrom(st) as Record<string, string>;
    Object.entries(theme).forEach(([name, v]) => app.style.setProperty(name, v));
    hueHandle.style.left = `${(st.h / 360) * 100}%`;
    hueHandle.style.background = `hsl(${st.h} 100% 50%)`;
    sqHandle.style.left = `${st.s * 100}%`;
    sqHandle.style.top = `${(1 - st.v) * 100}%`;
    square.style.background = `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${st.h} 100% 50%))`;
    hexEl.textContent = hexOf(st).slice(1);
  };
  /** Where an element is, in the phone's own coordinates (the panel may scale the demo). */
  const at = (el: HTMLElement) => {
    const s = phone.getBoundingClientRect();
    const t = el.getBoundingClientRect();
    const kk = s.width / phone.offsetWidth || 1;
    return { x: (t.left - s.left + t.width / 2) / kk, y: (t.top - s.top + t.height / 2) / kk };
  };
  /** The pointer rides the handle while it is dragged. */
  const follow = (el: HTMLElement) => () => {
    paint();
    const p = at(el);
    cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
  };

  /* ---------- start state ---------- */
  k.reset(["home"]);
  tl.add(() => {
    Object.assign(st, PICK_START);
    paint();
  }, 0.01);
  tl.set(one("[data-picker]"), { autoAlpha: 0, x: 48 }, 0);

  /* ---------- the picker opens ---------- */
  const open = 0.7;
  tl.to(one("[data-picker]"), { autoAlpha: 1, x: 0, duration: duration.scene, ease: ease.enter }, open);

  /* ---------- the pointer grabs the hue handle and drags it ---------- */
  const grab = open + duration.scene + 0.2;
  tl.fromTo(
    cursor,
    { opacity: 0, x: () => at(hueHandle).x + 70, y: () => at(hueHandle).y + 60 },
    { opacity: 1, x: () => at(hueHandle).x, y: () => at(hueHandle).y, duration: duration.slow, ease: ease.standard, immediateRender: false },
    grab,
  );
  tl.to(cursor, { scale: 0.85, duration: duration.instant, ease: ease.standard }, grab + duration.slow + 0.1);
  const drag1 = grab + duration.slow + 0.25;
  tl.fromTo(st, { h: PICK_START.h }, { h: PICK_END.h, duration: DRAG_HUE, ease: ease.standard, immediateRender: false, onUpdate: follow(hueHandle) }, drag1);

  /* ---------- then the handle in the square: a little less saturated and darker ---------- */
  const hop = drag1 + DRAG_HUE + 0.35;
  tl.to(cursor, { x: () => at(sqHandle).x, y: () => at(sqHandle).y, scale: 1, duration: duration.slow, ease: ease.standard }, hop);
  tl.to(cursor, { scale: 0.85, duration: duration.instant, ease: ease.standard }, hop + duration.slow + 0.1);
  const drag2 = hop + duration.slow + 0.25;
  tl.fromTo(st, { s: PICK_START.s, v: PICK_START.v }, { s: PICK_END.s, v: PICK_END.v, duration: DRAG_SQ, ease: ease.standard, immediateRender: false, onUpdate: follow(sqHandle) }, drag2);
  const release = drag2 + DRAG_SQ;
  tl.to(cursor, { scale: 1, opacity: 0, duration: duration.base, ease: ease.standard }, release);

  /* ---------- close ---------- */
  const land = tapAt(one('[data-tap="closepicker"]'), release + 0.7);
  tl.to(one("[data-picker]"), { autoAlpha: 0, x: 48, duration: duration.base, ease: ease.standard }, land + 0.2);
}
