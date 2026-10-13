"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef } from "react";
import { FounderPieces, ScreenChrome } from "./FounderHome";
import { DESIGN, FRAME, SCREEN } from "./phone";

const pct = (n: number) => `${n * 100}%`;
const screenBox = { left: pct(SCREEN.left), top: pct(SCREEN.top), width: pct(SCREEN.width), height: pct(SCREEN.height) };

/**
 * Empty iPhone frame + the founder home built in HTML.
 * Layers, bottom to top: clipped screen (app background + status bar) →
 * frame image (transparent screen) → pieces layer (unclipped, so pieces can
 * scatter outside the phone). The 390px design space is scaled to the screen
 * width via --k, kept in sync by a ResizeObserver.
 */
export const PhoneMockup = forwardRef<HTMLDivElement, { alt: string }>(function PhoneMockup({ alt }, ref) {
  const screen = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screen.current;
    const host = root.current;
    if (!el || !host) return;
    const set = () => host.style.setProperty("--k", String(el.offsetWidth / DESIGN.w));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={(node) => {
        root.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      role="img"
      aria-label={alt}
      data-phone
      className="relative"
      style={{ width: "var(--phone-w)", aspectRatio: `${FRAME.w} / ${FRAME.h}`, ["--k" as string]: 0.85 }}
    >
      {/* Clipped screen */}
      <div
        ref={screen}
        data-screen
        className="absolute overflow-hidden bg-surface"
        style={{ ...screenBox, borderRadius: `calc(var(--phone-w) * ${SCREEN.radius})` }}
      >
        <div className="origin-top-left" style={{ transform: "scale(var(--k))" }}>
          <ScreenChrome />
        </div>
      </div>

      <Image src="/devices/iphone-frame.webp" alt="" width={FRAME.w} height={FRAME.h} priority className="pointer-events-none absolute inset-0 size-full select-none" />

      {/* Pieces: above the frame, never clipped */}
      <div className="absolute" style={screenBox} aria-hidden>
        <div data-design className="origin-top-left" style={{ width: DESIGN.w, height: DESIGN.h, transform: "scale(var(--k))" }}>
          <FounderPieces />
        </div>
      </div>
    </div>
  );
});
