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

function Home() {
  return (
    <section data-page="home" className="absolute inset-0 overflow-hidden px-6 pt-[62px] text-[var(--app-ink)]">
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
      <div className="flex gap-2.5">
        {[
          ["Reformer", "6:00 PM · Coach Fatma", "On your plan", "/demo/class-reformer.webp"],
          ["Mat Flow", "7:30 PM · Coach Lana", "150 EGP", "/demo/class-matflow.webp"],
        ].map(([t, s, c, img]) => (
          <div key={t} className="min-w-0 flex-1 overflow-hidden rounded-[22px] bg-[var(--app-soft)]">
            <div className="relative aspect-[3/2] w-full">
              <Image src={img} alt="" fill sizes="200px" className="object-cover" />
              <span className="absolute left-2.5 top-2.5 inline-block rounded-full bg-[var(--app-brand)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[.06em] text-[var(--app-on)]">{c}</span>
            </div>
            <div className="p-3.5 pt-3">
              <p className="truncate text-[17px] font-extrabold">{t}</p>
              <p className="mt-0.5 truncate text-[12px] opacity-65">{s}</p>
            </div>
          </div>
        ))}
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

export function BrandPhone() {
  return (
    <PhoneFrame>
      <div data-app className="absolute inset-0 bg-[var(--app-bg)]" style={GROVE as React.CSSProperties}>
        <div data-pages className="absolute inset-0">
          <Home />
        </div>
        <Chrome tabs={TABS} themed />
        <Splash />
        <DoneSheet title="You're in" themed />
      </div>
    </PhoneFrame>
  );
}
