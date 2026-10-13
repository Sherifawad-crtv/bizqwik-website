"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contact, cta, microcopy, nav } from "@/content";
import { useActiveSection } from "@/lib/useActiveSection";
import { gsap } from "@/motion/gsap";
import { getLenis } from "@/motion/lenis";
import { duration, ease, stagger } from "@/motion/tokens";
import { initNavbarMotion } from "./motion";

const SECTION_IDS = nav.map((n) => n.href.slice(1));
const glass = "bg-surface/70 backdrop-blur-xl backdrop-saturate-150 shadow-float";

export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLAnchorElement>(null);
  const wordmark = useRef<HTMLSpanElement>(null);
  const tile = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const cta_ = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // panel is in the DOM flow (open, or animating out)
  const active = useActiveSection(SECTION_IDS);

  /* Wide ⇄ narrow, scrubbed to scroll. */
  useEffect(() => {
    const refs = {
      header: header.current,
      outer: outer.current,
      bar: bar.current,
      logo: logo.current,
      wordmark: wordmark.current,
      tile: tile.current,
      pill: pill.current,
      cta: cta_.current,
    };
    if (Object.values(refs).some((r) => !r)) return;
    return initNavbarMotion(refs as Parameters<typeof initNavbarMotion>[0]);
  }, []);

  /* Sliding active-link indicator. */
  useEffect(() => {
    const el = indicator.current;
    const container = pill.current;
    if (!el || !container) return;

    const place = (animate: boolean) => {
      const link = active ? container.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      if (!link) return void gsap.to(el, { autoAlpha: 0, duration: duration.fast });
      gsap.to(el, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        autoAlpha: 1,
        duration: animate ? duration.base : 0,
        ease: ease.out,
        overwrite: true,
      });
    };
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(container);
    return () => ro.disconnect();
  }, [active]);

  const openMenu = () => {
    setShown(true);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);

  /* Mobile menu: animate in/out, lock scroll, Escape, leave on desktop. */
  useEffect(() => {
    const el = panel.current;
    if (!el || open || !shown) return;
    gsap.to(el, {
      autoAlpha: 0,
      y: -10,
      duration: duration.fast,
      ease: ease.soft,
      onComplete: () => setShown(false),
    });
  }, [open, shown]);

  useEffect(() => {
    const el = panel.current;
    if (!open || !shown || !el) return;
    getLenis()?.stop();
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: -14, scale: 0.98, transformOrigin: "top center" },
      { autoAlpha: 1, y: 0, scale: 1, duration: duration.base, ease: ease.out },
    );
    gsap.fromTo(
      el.querySelectorAll("[data-menu-item]"),
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: duration.base, ease: ease.out, stagger: stagger.base, delay: 0.1 },
    );
    return () => getLenis()?.start();
  }, [open, shown]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", closeMenu);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", closeMenu);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-button bg-surface px-5 py-3 font-bold shadow-float focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {microcopy.skipLink}
      </a>

      <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3.5 lg:px-8 lg:pt-5">
        <div ref={outer} className="mx-auto max-w-page">
          <div
            ref={bar}
            className={`pointer-events-auto relative mx-auto flex h-16 w-full items-center justify-between rounded-[28px] pl-5 pr-2 lg:h-14 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none ${glass}`}
          >
            {/* Logo: wordmark (wide) → emblem tile (narrow, desktop). */}
            <a ref={logo} href="#top" aria-label="Bizqwik, back to top" className="relative block h-14 w-[132px] shrink-0 lg:w-[148px]">
              <span ref={wordmark} className="absolute inset-y-0 left-0 flex items-center">
                <Image src="/brand/wordmark.png" alt="Bizqwik" width={1712} height={396} priority className="h-[30px] w-auto lg:h-[34px]" />
              </span>
              <span
                ref={tile}
                data-sq
                aria-hidden
                className="absolute left-0 top-0 hidden size-14 items-center justify-center rounded-[20px] bg-surface opacity-0 shadow-float lg:flex"
              >
                <Image src="/brand/mark.png" alt="" width={386} height={403} className="h-7 w-auto" />
              </span>
            </a>

            {/* Desktop links */}
            <nav aria-label="Primary" className="hidden lg:block">
              <div ref={pill} data-sq className={`relative flex items-center gap-1 rounded-[22px] p-1.5 ${glass}`}>
                <span
                  ref={indicator}
                  aria-hidden
                  data-sq
                  className="invisible absolute left-0 top-1.5 h-11 rounded-[16px] bg-surface opacity-0 shadow-card"
                />
                {nav.map((item) => {
                  const id = item.href.slice(1);
                  const on = active === id;
                  return (
                    <a
                      key={id}
                      href={item.href}
                      data-nav={id}
                      aria-current={on ? "true" : undefined}
                      className={`relative flex h-11 items-center rounded-[16px] px-5 text-[17px] font-semibold transition-colors duration-300 ${
                        on ? "text-ink" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute left-2.5 size-1.5 rounded-full bg-primary transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                      />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Desktop CTA */}
            <div ref={cta_} className="hidden lg:block">
              <Button href={cta.primary.href}>{cta.primary.label}</Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              data-sq
              aria-label={microcopy.menuAria}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={open ? closeMenu : openMenu}
              className="grid size-12 place-items-center rounded-[18px] bg-surface shadow-card transition-transform duration-200 active:scale-95 lg:hidden"
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-[2.5px] w-6 rounded-full bg-ink transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[2.5px] w-6 rounded-full bg-ink transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
                />
              </span>
            </button>
          </div>

          {/* Mobile sheet */}
          <div
            ref={panel}
            id="mobile-menu"
            hidden={!shown}
            inert={!open}
            data-sq
            className="pointer-events-auto mt-2 rounded-card bg-surface/92 p-3 shadow-float backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {nav.map((item) => (
                  <li key={item.href} data-menu-item>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="flex h-16 items-center rounded-tile px-4 text-h3 font-bold text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 grid gap-2 border-t border-line/70 p-1 pt-4" data-menu-item>
              <Button href={cta.primary.href} size="lg" onClick={closeMenu}>
                {cta.primary.label}
              </Button>
              <a href={contact.phoneHref} className="flex h-14 items-center justify-between rounded-tile bg-surface px-5 font-semibold text-ink shadow-card">
                <span className="font-mono text-label font-bold uppercase text-ink-muted">Phone</span>
                {contact.phoneDisplay}
              </a>
              <a href={contact.emailHref} className="flex h-14 items-center justify-between rounded-tile bg-surface px-5 font-semibold text-ink shadow-card">
                <span className="font-mono text-label font-bold uppercase text-ink-muted">Email</span>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
