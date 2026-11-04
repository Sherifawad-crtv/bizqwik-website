"use client";

import { useEffect } from "react";

/*
 * Squircle corners for every `[data-sq]` element, in every browser.
 *
 * CSS `corner-shape: squircle` only exists in Chromium, so iOS Safari and Firefox showed plain
 * round corners. This draws the same shape (a superellipse of exponent 4, the spec's `squircle`)
 * as a `clip-path: path()`, sized to each element and kept in sync by a ResizeObserver.
 *
 * The path is drawn with the even-odd rule as: a big rectangle (keeps the shadow, which lives
 * outside the box) + the border box (cuts the box) + the squircle (puts the box back). So the
 * element's own fill is shaped by the squircle while its box-shadow and focus ring survive.
 * The element's border-radius is shrunk so the painted fill always covers the squircle's corners.
 */

const SAMPLES = 14;
const SHADOW_ROOM = 200;
const COVER = 0.5; // painted radius = COVER x squircle radius (n=4 corner sits ~0.54 closer to the corner)

const f = (n: number) => Math.round(n * 100) / 100;

function squirclePath(w: number, h: number, r: number): string {
  const m = SHADOW_ROOM;
  let d = `M${-m} ${-m}H${w + m}V${h + m}H${-m}ZM0 0H${w}V${h}H0Z`;
  const arc = (cx: number, cy: number, sx: number, sy: number, swap: boolean, reverse: boolean) => {
    let out = "";
    for (let i = 0; i <= SAMPLES; i++) {
      const t = ((reverse ? SAMPLES - i : i) / SAMPLES) * (Math.PI / 2);
      const a = Math.sqrt(Math.cos(t));
      const b = Math.sqrt(Math.sin(t));
      const [u, v] = swap ? [b, a] : [a, b];
      out += `L${f(cx + sx * r * u)} ${f(cy + sy * r * v)}`;
    }
    return out;
  };
  d += `M${f(r)} 0H${f(w - r)}`;
  d += arc(w - r, r, 1, -1, true, false); // top-right
  d += `V${f(h - r)}`;
  d += arc(w - r, h - r, 1, 1, false, false); // bottom-right
  d += `H${f(r)}`;
  d += arc(r, h - r, -1, 1, false, true); // bottom-left
  d += `V${f(r)}`;
  d += arc(r, r, -1, -1, false, false); // top-left
  return `path(evenodd, "${d}Z")`;
}

function shape(el: HTMLElement) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  if (!w || !h) return;
  el.style.borderRadius = "";
  const cs = getComputedStyle(el).borderTopLeftRadius;
  let radius = parseFloat(cs) || 0;
  if (cs.endsWith("%")) radius = (radius / 100) * Math.min(w, h);
  radius = Math.min(radius, w / 2, h / 2);
  if (radius < 2) {
    el.style.clipPath = "";
    return;
  }
  el.style.borderRadius = `${f(radius * COVER)}px`;
  el.style.clipPath = squirclePath(w, h, radius);
}

export function Squircle() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const ro = new ResizeObserver((entries) => entries.forEach((e) => shape(e.target as HTMLElement)));
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-sq]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        ro.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      ro.disconnect();
    };
  }, []);
  return null;
}
