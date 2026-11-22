import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Chrome, DoneSheet, label, SuccessIcon, PhoneFrame, type Tab } from "./business-app";
import { Check, Grabber, sheetCls } from "./frontdesk-app";

/*
 * "Your gym, your brand": the white-label client app on the iPhone frame. The gym's colours, name, logo and web
 * address come from a handful of CSS variables on `[data-app]`, so one scene can re-skin the whole app. Screens follow
 * the client app (bizqwik-client-app): Home with the plan hero, the wallet and points tiles, quick actions and today's
 * classes; the floating tab bar (Home, Schedule, Bookings, Profile) with the round check-in button. Sheets: the gym's
 * "Brand your app" form (the owner's side), Book a class, Choose a plan, Top up, Check in.
 * brand-motion.ts plays it; this markup is the FINISHED state (Grove Pilates, a class bundle, 800 EGP, 121 points).
 */

/** The app's colours from one picked colour (hue 0-360, saturation and value 0-1). The picker scene drives this live. */
export type Hsv = { h: number; s: number; v: number };
export const PICK_START: Hsv = { h: 252, s: 0.76, v: 1 };
export const PICK_END: Hsv = { h: 72, s: 0.56, v: 0.5 };
const hsl = (h: number, s: number, l: number) => `hsl(${h.toFixed(0)} ${s}% ${l}%)`;
export function hexOf({ h, s, v }: Hsv) {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  };
  return `#${[f(5), f(3), f(1)].map((x) => x.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}
export function themeFrom(c: Hsv) {
  const hex = hexOf(c);
  const lum = (0.299 * parseInt(hex.slice(1, 3), 16) + 0.587 * parseInt(hex.slice(3, 5), 16) + 0.114 * parseInt(hex.slice(5, 7), 16)) / 255;
  return {
    "--app-brand": hex,
    "--app-on": lum > 0.62 ? "#1a1726" : "#ffffff",
    "--app-bg": hsl(c.h, 30, 94),
    "--app-soft": hsl(c.h, 26, 88),
    "--app-ink": hsl(c.h, 45, 13),
  } as React.CSSProperties;
}

export const GROVE = { "--app-brand": "#6b7a3a", "--app-on": "#ffffff", "--app-bg": "#f1ebdd", "--app-soft": "#e6dec9", "--app-ink": "#2b3016" } as const;
export const NEUTRAL = { "--app-brand": "#a8a5b3", "--app-on": "#ffffff", "--app-bg": "#fbfaf7", "--app-soft": "#f3f2ee", "--app-ink": "#1a1726" } as const;

const TABS: Tab[] = [
  { icon: "home-smile", key: "home" },
  { icon: "calendar", key: "schedule" },
  { icon: "ticket", key: "bookings" },
  { icon: "user-rounded", key: "profile" },
];

const brandBtn = "flex h-12 items-center justify-center rounded-[18px] bg-[var(--app-brand)] text-[16px] font-bold text-[var(--app-on)]";
const field = "mb-2.5 rounded-[16px] bg-[var(--app-soft)] px-4 py-2.5";
/** The sheets use the gym's colours too. */
const themedSheet = `${sheetCls} !bg-[var(--app-bg)] text-[var(--app-ink)]`;
const ring = "absolute inset-0 rounded-[16px] opacity-0 shadow-[inset_0_0_0_2px_var(--app-brand)] bg-[color-mix(in_srgb,var(--app-brand)_10%,transparent)]";

/** The "it worked" layer a sheet fades to: a seal, a check that draws itself, two lines. */
function Done({ name, title, sub }: { name: string; title: string; sub: string }) {
  return (
    <div data-layer={`${name}2`} className="absolute inset-x-5 top-24 flex flex-col items-center text-center opacity-0">
      <SuccessIcon id={name} themed />
      <p className="mt-6 text-[28px] font-extrabold tracking-[-.02em]">{title}</p>
      <p className="mt-2 text-[15px] opacity-70">{sub}</p>
    </div>
  );
}

const Chip = ({ children, on, tap }: { children: ReactNode; on?: boolean; tap?: string }) => (
  <span {...(tap ? { "data-tap": tap } : {})} className="relative inline-flex">
    <span className={`relative rounded-full px-4 py-2 font-mono text-[12px] font-bold tracking-[.04em] ${on ? "bg-[var(--app-ink)] text-[var(--app-bg)]" : "bg-[var(--app-soft)] opacity-80"}`}>{children}</span>
  </span>
);

/**
 * The client app's ClassCard and carousel (bizqwik-client-app, ClassCard.tsx): a tall 4:5 photo card with everything laid over
 * the picture (a dark gradient, the price or plan chip top left, the title, the time with a clock, up to three initials with a
 * head count, and a "when" pill), two to a row, as on the earlier cards.
 */
const CLASSES = [
  { title: "Reformer", time: "6:00 PM", chip: "On your plan", img: "/demo/class-reformer.webp", initials: ["You", "S"], more: "+6", when: "In 2 hrs" },
  { title: "Mat Flow", time: "7:30 PM", chip: "150 EGP", img: "/demo/class-matflow.webp", initials: ["R", "M"], more: "+4", when: "In 3 hrs" },
];
const SHADES = ["0%", "22%", "40%"];

function ClassRow() {
  return (
    <div role="list" className="flex gap-2.5">
      {CLASSES.map((c) => (
        <div key={c.title} role="listitem" className="min-w-0 flex-1">
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[1.5rem] bg-neutral-900 text-left">
            <Image src={c.img} alt="" fill sizes="260px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
            <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
              <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">{c.chip}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="line-clamp-2 text-[19px] font-extrabold leading-[1.1] text-white">{c.title}</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/80">
                <Icon name="clock-circle" size={14} /> {c.time}
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-1.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <div className="flex flex-none -space-x-1.5">
                    {c.initials.map((ini, i) => (
                      <span
                        key={ini}
                        className={`grid size-7 place-items-center rounded-full font-semibold tracking-tight ring-2 ring-black/40 ${ini === "You" ? "text-[8px]" : "text-[11px]"}`}
                        style={ini === "You" ? { background: "#fff", color: "var(--app-brand)" } : { background: `color-mix(in srgb, var(--app-brand), #fff ${SHADES[i]})`, color: "var(--app-on)" }}
                      >
                        {ini}
                      </span>
                    ))}
                  </div>
                  <span className="flex-none text-xs text-white/85">{c.more}</span>
                </div>
                <span className="flex-none rounded-full px-2.5 py-1.5 text-[10.5px] font-semibold" style={{ background: "color-mix(in srgb, var(--app-brand), #fff 45%)", color: "var(--app-ink)" }}>
                  {c.when}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <section data-page="home" className="absolute inset-0 overflow-hidden px-6 pt-[62px] text-[var(--app-ink)]">
      {/* Shown scrolled down to the day's classes, as the real app would be when someone looks at them; the status bar keeps a soft fade. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[70px] bg-gradient-to-b from-[var(--app-bg)] from-60% to-transparent" />
      <div className="-translate-y-[70px]">
      <div className="flex items-center justify-between gap-3 pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 flex-none place-items-center rounded-full bg-[var(--app-brand)] text-[18px] font-extrabold text-[var(--app-on)]">M</span>
          <div className="min-w-0">
            <p className="text-[13px] leading-tight opacity-60">Welcome back</p>
            <h3 className="truncate text-[22px] font-extrabold leading-tight tracking-[-.01em]">Hi, Mona</h3>
          </div>
        </div>
        <span className="grid size-11 place-items-center rounded-full bg-[var(--app-soft)]">
          <Icon name="calendar-mark" size={20} />
        </span>
      </div>

      <div data-hero className="relative isolate overflow-hidden rounded-[28px] bg-[var(--app-brand)] px-5 pb-[18px] pt-5 text-[var(--app-on)]">
        <Image src="/demo/app-membership-card.webp" alt="" width={900} height={719} unoptimized className="pointer-events-none absolute right-[-22%] top-1/2 -z-10 w-[78%] -translate-y-1/2 select-none" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "linear-gradient(90deg, var(--app-brand) 38%, color-mix(in srgb, var(--app-brand) 55%, transparent) 62%, transparent)" }} />
        <div className="flex items-center justify-between gap-3">
          <span data-hero-label className="truncate font-mono text-[11px] font-bold uppercase tracking-[.08em] opacity-75">CLASS BUNDLE</span>
          <span className="flex-none rounded-full bg-white/20 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[.06em]">Active</span>
        </div>
        <p data-hero-title className="mt-1 truncate text-[18px] font-bold leading-tight">10 classes</p>
        <div className="mt-2 flex items-end gap-2">
          <span data-hero-big className="text-[56px] font-extrabold leading-none tracking-[-.03em] tabular">10</span>
          <span data-hero-unit className="pb-1.5 font-mono text-[13px] opacity-85">/ 10 classes left</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
          <div data-hero-bar className="h-full origin-left rounded-full bg-[var(--app-on)]" style={{ width: "100%" }} />
        </div>
        <div className="mt-3 flex items-center">
          <span data-hero-detail className="font-mono text-[12px] opacity-80">Pay at desk · valid 3 months</span>
          <span data-tap="renew" className="ml-auto inline-flex h-8 items-center rounded-full bg-white/90 px-3.5 text-[13px] font-bold text-[var(--app-ink)]">
            <span data-hero-cta>Details</span>
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div data-tap="wallettile" className="flex items-center gap-2.5 rounded-[1.1rem] bg-[var(--app-soft)] px-3.5 py-3">
          <Image src="/demo/app-wallet.webp" alt="" width={192} height={192} unoptimized className="size-9 flex-none object-contain" />
          <span className="min-w-0">
            <span className="block text-[11px] opacity-60">Wallet</span>
            <span className="block truncate text-[15px] font-extrabold">
              <span data-val="wallet" className="tabular">800</span> EGP
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-[1.1rem] bg-[var(--app-soft)] px-3.5 py-3">
          <Image src="/demo/app-points.webp" alt="" width={192} height={192} unoptimized className="size-9 flex-none object-contain" />
          <span className="min-w-0">
            <span className="block text-[11px] opacity-60">Points</span>
            <span data-val="points" className="block truncate text-[15px] font-extrabold tabular">121</span>
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3">
        {(
          [
            ["Book a class", "calendar-add", "bookqa"],
            ["Check in", "qr-code", ""],
            ["My bookings", "ticket", ""],
          ] as [string, "calendar-add" | "qr-code" | "ticket", string][]
        ).map(([t, ic, k]) => (
          <div key={t} {...(k ? { "data-tap": k } : {})} className="flex flex-col items-center gap-2">
            <span className="grid size-14 place-items-center rounded-full bg-[var(--app-brand)] text-[var(--app-on)]">
              <Icon name={ic} size={24} />
            </span>
            <span className="text-center text-[13px] font-medium leading-tight">{t}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-2.5 flex items-center">
        <span className="text-[20px] font-extrabold tracking-[-.01em]">Today</span>
        <span className="ml-auto text-[14px] font-semibold text-[var(--app-brand)]">See all ›</span>
      </div>
      <ClassRow />
      </div>

      {/* The gym's own "Brand your app" form (the owner's side) */}
      <div data-sheet="brand" className={themedSheet} style={{ height: 690 }}>
        <Grabber />
        <p className={label}>YOUR APP</p>
        <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Brand it</p>
        <div className={field}>
          <p className={label}>APP NAME</p>
          <p data-type="appname" className="mt-0.5 min-h-[24px] text-[16px] font-semibold">Grove Pilates</p>
        </div>
        <div className={field}>
          <p className={label}>WEB ADDRESS</p>
          <p data-type="url" className="mt-0.5 min-h-[24px] text-[16px] font-semibold">grovepilates.com</p>
        </div>
        <div className={`${field} flex items-center gap-3`}>
          <span data-tap="logo" className="grid size-14 place-items-center rounded-[16px] bg-[var(--app-bg)] shadow-[inset_0_0_0_1.5px_rgba(0,0,0,.12)]">
            <span data-logo className="text-[26px] font-extrabold text-[var(--app-brand)]">G</span>
            <Icon name="upload-minimalistic" size={22} className="absolute opacity-0" data-upload />
          </span>
          <div>
            <p className={label}>LOGO</p>
            <p className="text-[14px] font-semibold opacity-70">grove-logo.png</p>
          </div>
        </div>
        <div className={field}>
          <p className={label}>COLOUR</p>
          <div className="mt-2 flex gap-3">
            {[
              ["#151515", ""],
              ["#6b7a3a", "olive"],
              ["#5a41ff", ""],
              ["#c2410c", ""],
              ["#0f766e", ""],
            ].map(([hex, k]) => (
              <span key={hex} {...(k ? { "data-tap": "swatch" } : {})} className="relative grid size-11 place-items-center rounded-full" style={{ background: hex }}>
                {k && <i data-sw-ring className="absolute -inset-1 rounded-full border-2 border-[#6b7a3a]" />}
              </span>
            ))}
          </div>
        </div>
        <span data-tap="save" className={`${brandBtn} mt-3`}>Save</span>
      </div>

      {/* Book a class */}
      <div data-sheet="book" className={themedSheet} style={{ height: 560 }}>
        <Grabber />
        <div data-layer="b1" className="absolute inset-x-5 top-12">
          <p className={label}>TODAY</p>
          <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Book a class</p>
          <div data-tap="pickclass" className="relative mb-2 flex items-center gap-3 rounded-[18px] bg-[var(--app-soft)] px-4 py-3.5">
            <span data-class-ring className={ring} />
            <span className="relative grid size-11 place-items-center rounded-[14px] bg-[var(--app-brand)] text-[var(--app-on)]"><Icon name="calendar-mark" size={22} /></span>
            <div className="relative min-w-0 flex-1">
              <p className="text-[17px] font-extrabold leading-tight">Mat Flow</p>
              <p className="mt-1 text-[12.5px] opacity-65">7:30 PM · Coach Lana · 150 EGP</p>
            </div>
          </div>
          <div className="mb-2.5 flex items-center gap-2 rounded-[18px] bg-[var(--app-soft)] px-4 py-3.5 opacity-60">
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-extrabold leading-tight">Reformer</p>
              <p className="mt-1 text-[12.5px]">6:00 PM · Coach Fatma · On your plan</p>
            </div>
          </div>
          <p className={`${label} mb-2 mt-4`}>PAY WITH</p>
          <div className="mb-4 flex gap-2">
            <Chip tap="paywallet" on={false}>Wallet · 450 EGP</Chip>
            <Chip>At the desk</Chip>
          </div>
          <span data-tap="bookit" className={brandBtn}>Book · 150 EGP</span>
        </div>
        <Done name="b" title="You're booked" sub="Mat Flow · 7:30 PM · Coach Lana" />
      </div>

      {/* Choose a plan */}
      <div data-sheet="plans" className={themedSheet} style={{ height: 600 }}>
        <Grabber />
        <div data-layer="p1" className="absolute inset-x-5 top-12">
          <p className={label}>MEMBERSHIPS AND BUNDLES</p>
          <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Choose a plan</p>
          {[
            ["Monthly plan", "1,200 EGP", false],
            ["10 classes", "950 EGP", true],
            ["3 months", "3,200 EGP", false],
          ].map(([t, p, pick]) => (
            <div key={t as string} {...(pick ? { "data-tap": "pickbundle" } : {})} className="relative mb-2 flex items-center rounded-[18px] bg-[var(--app-soft)] px-4 py-3.5">
              {pick && <span data-bundle-ring className={ring} />}
              <span className="relative text-[17px] font-bold">{t as string}</span>
              <span className="relative ml-auto text-[15px] font-bold opacity-70">{p as string}</span>
            </div>
          ))}
          <p className={`${label} mb-2 mt-4`}>PAY</p>
          <div className="mb-4 flex gap-2">
            <Chip>Wallet</Chip>
            <Chip tap="paydesk">At the desk</Chip>
            <Chip>InstaPay</Chip>
          </div>
          <span data-tap="buy" className={brandBtn}>Get the bundle</span>
        </div>
        <Done name="p" title="Bundle added" sub="10 classes · pay at the desk" />
      </div>

      {/* Top up the wallet */}
      <div data-sheet="topup" className={themedSheet} style={{ height: 520 }}>
        <Grabber />
        <div data-layer="t1" className="absolute inset-x-5 top-12">
          <p className={label}>WALLET</p>
          <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Top up</p>
          <div className="mb-4 flex gap-2.5">
            {[
              ["200", false],
              ["500", true],
              ["1,000", false],
            ].map(([a, pick]) => (
              <span key={a as string} {...(pick ? { "data-tap": "amount" } : {})} className="relative grid h-[76px] flex-1 place-items-center rounded-[20px] bg-[var(--app-soft)] text-[22px] font-extrabold">
                {pick && <i data-amount-ring className={`${ring} !rounded-[20px]`} />}
                <span className="relative">{a as string}<span className="ml-1 text-[12px] font-semibold opacity-60">EGP</span></span>
              </span>
            ))}
          </div>
          <p className="mb-4 text-[13.5px] opacity-65">Spend it on classes and plans. Store credit lasts 12 months.</p>
          <span data-tap="topupnow" className={brandBtn}>Top up 500 EGP</span>
        </div>
        <Done name="t" title="Wallet topped up" sub="+500 EGP in your wallet" />
      </div>

      {/* Check in with the desk QR */}
      <div data-sheet="scan" className="absolute inset-x-0 bottom-0 top-[70px] z-20 overflow-hidden rounded-t-[40px] bg-[#16141e] px-5 pt-3 text-white opacity-0">
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-white/25" />
        <p className="font-mono text-[11px] font-bold tracking-[.08em] text-white/50">CHECK IN</p>
        <p className="mt-1 text-[26px] font-extrabold tracking-[-.02em]">Scan the desk QR</p>
        <div className="relative mx-auto mt-10 size-[250px]">
          {["left-0 top-0 border-l-4 border-t-4 rounded-tl-[26px]", "right-0 top-0 border-r-4 border-t-4 rounded-tr-[26px]", "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-[26px]", "bottom-0 right-0 border-b-4 border-r-4 rounded-br-[26px]"].map((c) => (
            <i key={c} className={`absolute size-14 border-white ${c}`} />
          ))}
          <span data-qr className="absolute inset-[34px] grid place-items-center rounded-[22px] bg-white text-[#16141e]">
            <Icon name="qr-code" size={120} strokeWidth={1.6} />
          </span>
          <span data-scanline className="absolute inset-x-3 top-3 h-[3px] rounded-full bg-white/80 shadow-[0_0_24px_rgba(255,255,255,.8)]" />
        </div>
        <div data-scan-ok className="absolute inset-x-5 bottom-[110px] flex items-center gap-3 rounded-[24px] bg-white px-4 py-3.5 text-[#16141e] opacity-0">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--app-brand)] text-[var(--app-on)]">
            <Check size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-extrabold leading-tight">Checked in</p>
            <p className="mt-1 text-[13px] opacity-65">Grove Pilates · +1 point</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The app opening: the gym's colour, logo, name and web address. */
function Splash() {
  return (
    <div data-splash className="pointer-events-none absolute inset-0 z-[45] flex flex-col items-center justify-center bg-[var(--app-brand)] text-[var(--app-on)] opacity-0">
      <span data-splash-logo className="grid size-[104px] place-items-center rounded-[30px] bg-white text-[52px] font-extrabold text-[var(--app-brand)] shadow-[0_24px_50px_rgba(0,0,0,.25)]">G</span>
      <p data-splash-text className="mt-7 text-[32px] font-extrabold tracking-[-.02em]">Grove Pilates</p>
      <p data-splash-text className="mt-1 font-mono text-[13px] font-bold tracking-[.06em] opacity-75">grovepilates.com</p>
    </div>
  );
}

/** The colour picker over the app (square, hue slider, hex): its handles are positioned from the colour, the scene drags them. */
function Picker() {
  const hue = (h: number) => `hsl(${h} 100% 50%)`;
  return (
    <div data-picker className="pointer-events-none absolute inset-x-4 bottom-[112px] z-[52] rounded-[28px] bg-white p-3.5 text-[#1a1726] opacity-0 shadow-[0_24px_60px_rgba(26,23,38,.28)]">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-[15px] font-extrabold">Brand colour</span>
        <span data-tap="closepicker" className="grid size-8 place-items-center rounded-full bg-[#f3f2ee]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#1a1726" strokeWidth="2" strokeLinecap="round"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </span>
      </div>
      <div data-pk-square className="relative h-[150px] w-full rounded-[16px]" style={{ background: `linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,${hue(PICK_END.h)})` }}>
        <span data-pk-sq-handle className="absolute size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,.25),0_2px_6px_rgba(0,0,0,.3)]" style={{ left: `${PICK_END.s * 100}%`, top: `${(1 - PICK_END.v) * 100}%` }} />
      </div>
      <div className="px-1 pt-4">
        <div data-pk-hue className="relative h-3 w-full rounded-full" style={{ background: "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }}>
          <span data-pk-hue-handle className="absolute top-1/2 size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,.25),0_2px_6px_rgba(0,0,0,.3)]" style={{ left: `${(PICK_END.h / 360) * 100}%`, background: hue(PICK_END.h) }} />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pb-1 pt-4 font-mono text-[13px] text-[#6d6a78]">
        <span>HEX</span>
        <span data-pk-hex className="font-bold text-[#1a1726]">{hexOf(PICK_END).slice(1)}</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export function BrandPhone() {
  return (
    <PhoneFrame>
      <div data-app className="absolute inset-0 bg-[var(--app-bg)]" style={themeFrom(PICK_END)}>
        <div data-pages className="absolute inset-0">
          <Home />
        </div>
        <Chrome tabs={TABS} themed />
        <Splash />
        <DoneSheet title="You're in" themed />
        <Picker />
      </div>
    </PhoneFrame>
  );
}
