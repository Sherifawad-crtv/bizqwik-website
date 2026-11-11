"use client";

import { useEffect } from "react";

/*
 * Squircle surfaces, in every browser, drawn as vectors.
 *
 * CSS `corner-shape: squircle` only exists in Chromium, so this paints the same shape (a superellipse of
 * exponent 4, the spec's `squircle`) as an SVG `background-image`, sized to each element. SVG is crisp at
 * any pixel density, the hairline is a true stroke that follows the curve, and a CSS `filter: drop-shadow`
 * on the element follows the painted shape (a box-shadow or clip-path would not).
 *
 * An element opts in with `data-sq` and describes itself with CSS variables (globals.css documents them):
 *   --sq-r        corner radius          --sq-fill   fill colour
 *   --sq-stroke   hairline colour        --sq-sw     hairline width
 *   --sq-drop     a filter, e.g. var(--drop-card)
 * Before this runs (and without JS) the same variables paint a plain rounded rectangle.
 * Glass (backdrop-filter) surfaces do not use this: they keep a plain radius and box-shadow.
 */

const f = (n: number) => Math.round(n * 100) / 100;

/** Closed superellipse (n = 4) outline of a w x h box with corner radius r, as an SVG path. */
function squirclePath(w: number, h: number, r: number, ox: number, oy: number): string {
  const n = Math.min(90, Math.max(24, Math.ceil(r * 1.8)));
  const pts: string[] = [];
  const corner = (cx: number, cy: number, sx: number, sy: number, from: number) => {
    for (let i = 0; i <= n; i++) {
      const t = (from + (i / n) * (Math.PI / 2)) % (Math.PI * 2);
      const c = Math.cos(t);
      const s = Math.sin(t);
      const x = cx + sx * r * Math.sign(c) * Math.sqrt(Math.abs(c));
      const y = cy + sy * r * Math.sign(s) * Math.sqrt(Math.abs(s));
      pts.push(`${f(ox + x)} ${f(oy + y)}`);
    }
  };
  // Clockwise from the top edge: top-right, bottom-right, bottom-left, top-left.
  corner(w - r, r, 1, 1, (3 * Math.PI) / 2);
  corner(w - r, h - r, 1, 1, 0);
  corner(r, h - r, 1, 1, Math.PI / 2);
  corner(r, r, 1, 1, Math.PI);
  return `M${pts[0]}L${pts.slice(1).join("L")}Z`;
}

const px = (v: string) => parseFloat(v) || 0;

function shape(el: HTMLElement) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  if (!w || !h) return;
  const cs = getComputedStyle(el);
  const v = (name: string) => cs.getPropertyValue(name).trim();
  const radius = Math.min(px(v("--sq-r")), w / 2, h / 2);
  const fill = v("--sq-fill") || "transparent";
  const stroke = v("--sq-stroke");
  const sw = stroke ? px(v("--sq-sw")) || 1 : 0;
  if (radius < 2) {
    el.style.backgroundImage = "";
    el.removeAttribute("data-sq-ready");
    return;
  }
  const inset = sw / 2;
  const d = squirclePath(w - sw, h - sw, Math.max(radius - inset, 1), inset, inset);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<path d="${d}" fill="${fill}"${sw ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"` : ""}/></svg>`;
  el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  el.setAttribute("data-sq-ready", "");
}

export function Squircle() {
  useEffect(() => {
    const ro = new ResizeObserver((entries) => entries.forEach((e) => shape(e.target as HTMLElement)));
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll<HTMLElement>("[data-sq]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        ro.observe(el);
      });
    scan();

    // State changes that move a CSS variable (selected tab, hover, focus) repaint the shape.
    const refresh = (target: EventTarget | null) => {
      const el = (target as Element | null)?.closest?.<HTMLElement>("[data-sq]");
      if (el) requestAnimationFrame(() => shape(el));
    };
    const onPointer = (e: Event) => refresh(e.target);
    const events = ["pointerover", "pointerout", "focusin", "focusout"] as const;
    events.forEach((n) => document.addEventListener(n, onPointer, true));

    const mo = new MutationObserver((records) => {
      scan();
      records.forEach((r) => r.type === "attributes" && refresh(r.target));
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "aria-selected", "aria-expanded"] });
    return () => {
      mo.disconnect();
      ro.disconnect();
      events.forEach((n) => document.removeEventListener(n, onPointer, true));
    };
  }, []);
  return null;
}
