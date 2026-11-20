import { Icon, type IconName } from "@/components/ui/Icon";
import { away, card, Chrome, DoneSheet, Header, label, pageCls, PhoneFrame, type Tab } from "./business-app";

/*
 * "Front desk and CRM": the front-desk app on the iPhone frame. Tabs as in the product (Desk, Bookings, Clients,
 * Activity, and the round button that scans). Pages: Desk (with the New client sheet and the QR scan sheet),
 * Bookings (with the Book sheet), Clients, and one client's record (a sub-page, with the renew-and-pay sheet).
 * Illustrative clients. frontdesk-motion.ts plays it; this markup is the finished state of the Desk page.
 */

const TABS: Tab[] = [
  { icon: "home-smile", key: "desk" },
  { icon: "calendar", key: "bookings" },
  { icon: "clipboard-list", key: "clients" },
  { icon: "clock-circle", key: "activity" },
];

const TONE = { green: "text-green-fg", amber: "text-amber-fg", red: "text-danger-fg", muted: "text-ink-faint" } as const;
export type Tone = keyof typeof TONE;
const PILL = { green: "bg-green-bg text-green-fg", amber: "bg-amber-bg text-amber-fg", red: "bg-danger-bg text-danger-fg", muted: "bg-sunken text-ink-muted" } as const;

export const Pill = ({ tone, children }: { tone: Tone; children: React.ReactNode }) => (
  <span className={`inline-flex items-center whitespace-nowrap rounded-full px-[9px] py-[3px] font-mono text-[11px] font-bold tracking-[.02em] ${PILL[tone]}`}>{children}</span>
);
export const Initial = ({ n, size = 44 }: { n: string; size?: number }) => (
  <span className="grid shrink-0 place-items-center rounded-full bg-primary-tint text-[17px] font-extrabold text-primary-pressed" style={{ width: size, height: size }}>
    {n[0]}
  </span>
);
const Search = ({ children, typeKey }: { children?: string; typeKey?: string }) => (
  <div className="flex h-[52px] items-center gap-3 rounded-[20px] bg-surface px-4 text-[16px]">
    <Icon name="search" size={20} className="shrink-0 text-ink-muted" />
    <span {...(typeKey ? { "data-type": typeKey } : {})} className={children ? "font-semibold" : "text-ink-faint"}>
      {children ?? "Find a client by name or phone"}
    </span>
  </div>
);
export const Check = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
/** A bottom sheet that waits below the page until the scene lifts it. */
export const sheetCls = "absolute inset-x-0 bottom-0 z-20 rounded-t-[40px] bg-surface px-5 pb-[34px] pt-3 opacity-0 shadow-[0_-20px_50px_rgba(26,23,38,.18)]";
export const Grabber = () => <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-line" />;
const Field = ({ l, children, type }: { l: string; children?: string; type?: string }) => (
  <div className="mb-2.5 rounded-[16px] bg-paper px-4 py-2.5">
    <p className={label}>{l}</p>
    <p className="mt-0.5 min-h-[24px] text-[16px] font-semibold" {...(type ? { "data-type": type } : {})}>
      {children}
    </p>
  </div>
);

/* ---------- Desk ---------- */

function Desk() {
  return (
    <section data-page="desk" className={pageCls}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-[28px] font-extrabold leading-[1.15] tracking-[-.02em]">Hi, Dina</div>
        <Initial n="D" size={64} />
      </div>
      <Search />
      <div className="mt-3.5 flex h-16 items-center justify-center gap-2.5 rounded-[28px] bg-primary text-[17px] font-bold text-surface">
        <Check size={22} />
        Check someone in
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {(
          [
            ["New client", "user-plus", "newclient"],
            ["Drop-in pass", "ticket", ""],
            ["Guest invitation", "gift", ""],
          ] as [string, IconName, string][]
        ).map(([t, ic, k]) => (
          <div key={t} {...(k ? { "data-tap": k } : {})} className={`${card} flex min-h-[76px] flex-col items-center justify-center gap-1.5 p-2 text-center text-[13px] font-bold`}>
            <Icon name={ic} size={22} />
            {t}
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {[
          ["checked", "39", "Checked in today"],
          ["dropins", "6", "Drop-ins"],
          ["active", "11", "In the last 2h"],
        ].map(([k, v, t]) => (
          <span key={k} className="rounded-full bg-sunken px-3 py-1.5 text-[13px] font-semibold text-ink-muted">
            <b data-val={k} className="font-mono text-[14px] font-extrabold text-ink">
              {v}
            </b>{" "}
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 mb-2 flex items-center">
        <span className="text-[18px] font-extrabold tracking-[-.01em]">Next up</span>
        <span className="ml-auto text-[13px] font-bold text-primary-pressed">All bookings</span>
      </div>
      <div className={`${card} overflow-hidden`}>
        {[
          ["Strength", "6:00 PM · Coach Ali", "8 booked"],
          ["Yoga", "7:30 PM · Coach Lana", "5 booked"],
        ].map(([t, s, b], i) => (
          <div key={t} className={`flex items-center gap-3 px-4 py-3 ${i ? "border-t border-line" : ""}`}>
            <span className="grid size-10 place-items-center rounded-[12px] bg-sunken">
              <Icon name="calendar-mark" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight">{t}</p>
              <p className="mt-1 text-[12.5px] text-ink-muted">{s}</p>
            </div>
            <span className="text-[13px] font-semibold text-ink-muted">{b}</span>
          </div>
        ))}
      </div>

      {/* New client: two steps, then done */}
      <div data-sheet="new" className={sheetCls} style={{ height: 560 }}>
        <Grabber />
        <div data-layer="n1" className="absolute inset-x-5 top-12">
          <p className={label}>NEW CLIENT · STEP 1 OF 2</p>
          <p className="mb-4 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Who is joining?</p>
          <Field l="FULL NAME" type="name">Mona Khaled</Field>
          <Field l="PHONE" type="phone">01012345678</Field>
          <Field l="EMAIL" type="email">mona@example.com</Field>
          <span data-tap="next1" className="mt-3 flex h-12 items-center justify-center rounded-[18px] bg-primary text-[16px] font-bold text-surface">Next</span>
        </div>
        <div data-layer="n2" className="absolute inset-x-5 top-12 opacity-0">
          <p className={label}>NEW CLIENT · STEP 2 OF 2</p>
          <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Pick a plan</p>
          {[
            ["Monthly plan", "1,200 EGP"],
            ["3 months", "3,200 EGP"],
            ["10-class pack", "950 EGP"],
          ].map(([t, p], i) => (
            <div key={t} {...(i === 0 ? { "data-tap": "plan" } : {})} className="relative mb-2 flex items-center rounded-[16px] bg-paper px-4 py-3">
              {i === 0 && <span data-plan-ring className="absolute inset-0 rounded-[16px] bg-primary/10 opacity-0 shadow-[inset_0_0_0_2px_var(--color-primary)]" />}
              <span className="relative text-[16px] font-semibold">{t}</span>
              <span className="relative ml-auto text-[15px] font-bold text-ink-muted">{p}</span>
            </div>
          ))}
          <div className="mb-3 mt-3 flex items-center gap-2">
            {["Cash", "Card", "InstaPay"].map((m, i) => (
              <span key={m} className={`rounded-full px-4 py-2 font-mono text-[12px] font-bold tracking-[.04em] ${i === 0 ? "bg-ink text-surface" : "bg-sunken text-ink-muted"}`}>
                {m}
              </span>
            ))}
          </div>
          <div className="mb-4 flex items-center justify-between rounded-[16px] bg-paper px-4 py-3">
            <span className="text-[15px] font-semibold">Send the app invite</span>
            <span className="relative h-6 w-10 rounded-full bg-primary">
              <i className="absolute right-0.5 top-0.5 size-5 rounded-full bg-surface" />
            </span>
          </div>
          <span data-tap="register" className="flex h-12 items-center justify-center rounded-[18px] bg-primary text-[16px] font-bold text-surface">Register client</span>
        </div>
        <div data-layer="n3" className="absolute inset-x-5 top-28 flex flex-col items-center text-center opacity-0">
          <span data-seal-s className="grid size-24 place-items-center rounded-full bg-green-fg text-white shadow-[0_16px_36px_rgba(23,122,75,.3)]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path data-check-s pathLength={1} d="M5.5 12.5l4.2 4.2L18.5 8" style={{ strokeDasharray: 1, strokeDashoffset: 0 }} />
            </svg>
          </span>
          <p className="mt-6 text-[28px] font-extrabold tracking-[-.02em]">Client created</p>
          <p className="mt-2 text-[15px] text-ink-muted">Monthly plan sold · app invite sent to mona@example.com</p>
        </div>
      </div>

      {/* QR scan */}
      <div data-sheet="scan" className="absolute inset-x-0 bottom-0 top-[70px] z-20 overflow-hidden rounded-t-[40px] bg-ink px-5 pt-3 text-surface opacity-0">
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-white/25" />
        <p className="font-mono text-[11px] font-bold tracking-[.08em] text-white/50">CHECK-IN</p>
        <p className="mt-1 text-[26px] font-extrabold tracking-[-.02em]">Scan a QR</p>
        <div className="relative mx-auto mt-10 size-[250px]">
          {["left-0 top-0 border-l-4 border-t-4 rounded-tl-[26px]", "right-0 top-0 border-r-4 border-t-4 rounded-tr-[26px]", "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-[26px]", "bottom-0 right-0 border-b-4 border-r-4 rounded-br-[26px]"].map((c) => (
            <i key={c} className={`absolute size-14 border-white ${c}`} />
          ))}
          <span data-qr className="absolute inset-[34px] grid place-items-center rounded-[22px] bg-surface text-ink">
            <Icon name="qr-code" size={120} strokeWidth={1.6} />
          </span>
          <span data-scanline className="absolute inset-x-3 top-3 h-[3px] rounded-full bg-primary-light shadow-[0_0_24px_var(--color-primary-light)]" />
        </div>
        <div data-scan-ok className="absolute inset-x-5 bottom-[110px] flex items-center gap-3 rounded-[24px] bg-surface px-4 py-3.5 text-ink opacity-0">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-fg text-white">
            <Check size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[17px] font-extrabold leading-tight">Mona Khaled</p>
            <p className="mt-1 text-[13px] text-ink-muted">Checked in · Monthly plan, valid</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bookings ---------- */

const DAYS: [string, string][] = [["M", "16"], ["T", "17"], ["W", "18"], ["T", "19"], ["F", "20"], ["S", "21"], ["S", "22"]];

function Bookings() {
  return (
    <section data-page="bookings" className={pageCls} style={away}>
      <Header kicker="FRONT DESK" title="Bookings" />
      <div className="mb-4 flex justify-between">
        {DAYS.map(([d, n], i) => (
          <span key={n} className={`flex h-[62px] w-[46px] flex-col items-center justify-center rounded-[18px] ${i === 0 ? "bg-ink text-surface" : "bg-surface"}`}>
            <span className="font-mono text-[11px] font-bold opacity-60">{d}</span>
            <span className="mt-1 text-[17px] font-extrabold">{n}</span>
          </span>
        ))}
      </div>
      {[
        ["Strength", "6:00 PM · Coach Ali · Studio", "8", true],
        ["Yoga", "7:30 PM · Coach Lana · Studio", "5", false],
      ].map(([t, s, n, first]) => (
        <div key={t as string} className={`${card} mb-2.5 px-4 py-3.5`}>
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-extrabold leading-tight">{t}</p>
              <p className="mt-1 text-[12.5px] text-ink-muted">{s}</p>
            </div>
            <span className="tabular text-right font-mono text-[12px] font-bold text-ink-muted">
              <b {...(first ? { "data-val": "booked" } : {})} className="text-[18px] font-extrabold text-ink">{n as string}</b> / 12
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex -space-x-2">
              {["K", "S", "O"].map((x) => (
                <span key={x} className="grid size-7 place-items-center rounded-full border-2 border-surface bg-primary-tint text-[11px] font-extrabold text-primary-pressed">{x}</span>
              ))}
              {first && (
                <span data-newchip className="grid size-7 place-items-center rounded-full border-2 border-surface bg-primary text-[11px] font-extrabold text-surface">M</span>
              )}
            </span>
            <span {...(first ? { "data-tap": "book" } : {})} className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[13px] font-bold text-surface">
              <Icon name="add" size={14} strokeWidth={2.6} />
              Book a client
            </span>
          </div>
        </div>
      ))}

      <div data-sheet="book" className={sheetCls} style={{ height: 470 }}>
        <Grabber />
        <p className={label}>STRENGTH · 6:00 PM</p>
        <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Book a client</p>
        <div className="mb-3"><Search>mo</Search></div>
        {[
          ["Mona Khaled", "Active", "green", true],
          ["Moustafa Ali", "Expired", "red", false],
          ["Mohamed Samir", "Active", "green", false],
        ].map(([n, st, tone, first]) => (
          <div key={n as string} className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0">
            <Initial n={n as string} size={40} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight">{n as string}</p>
              <p className="mt-1"><Pill tone={tone as Tone}>{st as string}</Pill></p>
            </div>
            {first ? (
              <span data-tap="bookmona" className="grid">
                <span data-swap-a="bookmona" className="col-start-1 row-start-1 inline-flex h-9 items-center rounded-full bg-primary px-4 text-[13px] font-bold text-surface">Book</span>
                <span data-swap-b="bookmona" className="col-start-1 row-start-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-green-fg px-3.5 text-[13px] font-bold text-white opacity-0"><Check size={13} />Booked</span>
              </span>
            ) : (
              <span className={`inline-flex h-9 items-center rounded-full border border-line px-4 text-[13px] font-bold ${st === "Expired" ? "text-ink-faint" : ""}`}>{st === "Expired" ? "Options" : "Book"}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Clients ---------- */

const CLIENTS: [string, string, Tone, string, string][] = [
  ["Mona Khaled", "Active · Monthly plan", "green", "01012345678", "mona"],
  ["Moustafa Ali", "Expired", "red", "01198765432", ""],
  ["Sara Mostafa", "Frozen", "muted", "01234567890", ""],
  ["Omar Hassan", "10-class pack · 6 left", "green", "01555123456", ""],
  ["Dalia Samir", "Ends in 3 days", "amber", "01099887766", ""],
];

function Clients() {
  return (
    <section data-page="clients" className={pageCls} style={away}>
      <Header kicker="FRONT DESK" title="Clients" />
      <Search typeKey="search">Mona</Search>
      <div className={`${card} mt-3 px-4`}>
        {CLIENTS.map(([n, st, tone, ph, k], i) => (
          <div key={n} {...(k ? { "data-tap": k } : { "data-res": "" })} className="overflow-hidden">
            <div className={`flex items-center gap-3 py-3 ${i ? "border-t border-line" : ""}`}>
              <Initial n={n} />
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-bold leading-tight">{n}</p>
                <p className="mt-1 font-mono text-[12px] text-ink-faint">{ph}</p>
              </div>
              <Pill tone={tone}>{st}</Pill>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- One client's record (a sub-page) ---------- */

const RECORD: [string, string][] = [
  ["Plan", "Monthly plan · until Dec 16"],
  ["Package", "10-class pack · 6 of 10 left"],
  ["Wallet", "250.00 EGP"],
  ["Last check-in", "Today, 5:52 PM"],
  ["Coach", "Coach Ali"],
];
const HISTORY: [string, string][] = [
  ["Booked Strength", "Today · 6:00 PM"],
  ["Checked in", "Today · 5:52 PM"],
  ["Paid · Monthly plan · 1,200 EGP", "Cash · today"],
  ["App invite sent", "Today"],
  ["Registered", "Today"],
];

function Record() {
  return (
    <section data-page="record" className={pageCls} style={away}>
      <Header kicker="CLIENT" title="Mona Khaled" back />
      <div data-crmcard className={`${card} mb-3 px-[18px] py-4`}>
        <div className="mb-1 flex items-center">
          <span className={label}>ONE RECORD</span>
          <span className="ml-auto"><Pill tone="green">Active</Pill></span>
        </div>
        {RECORD.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 border-t border-line py-2.5 text-[14.5px] first:border-t-0">
            <span className="text-ink-muted">{k}</span>
            <span className="text-right font-bold">{v}</span>
          </div>
        ))}
      </div>
      <div className={`${card} px-[18px] py-4`}>
        <span className={label}>HISTORY</span>
        {HISTORY.map(([t, s], i) => (
          <div key={t} className="flex items-start gap-3 py-2.5">
            <span className="flex flex-col items-center self-stretch">
              <i className="mt-1.5 size-2 rounded-full bg-primary" />
              {i < HISTORY.length - 1 && <i className="mt-1 w-px flex-1 bg-line" />}
            </span>
            <div>
              <p className="text-[14.5px] font-semibold leading-tight">{t}</p>
              <p className="mt-0.5 font-mono text-[11.5px] text-ink-faint">{s}</p>
            </div>
          </div>
        ))}
      </div>

      {/* A sub-page has no tab bar; its actions float where the bar was */}
      <div className="absolute inset-x-0 flex justify-center" style={{ bottom: 26 }}>
        <div className="flex gap-2 rounded-[32px] border border-line bg-surface p-2 shadow-[0_14px_34px_rgba(26,23,38,.18)]">
          <span data-tap="renew" className="inline-flex h-12 items-center rounded-[24px] bg-primary px-6 text-[16px] font-bold text-surface">Renew</span>
          <span className="inline-flex h-12 items-center rounded-[24px] bg-sunken px-5 text-[16px] font-bold">Freeze</span>
          <span className="inline-flex h-12 items-center rounded-[24px] bg-sunken px-5 text-[16px] font-bold text-danger-fg">Refund</span>
        </div>
      </div>

      <div data-sheet="pay" className={sheetCls} style={{ height: 600 }}>
        <Grabber />
        <p className={label}>MONA KHALED</p>
        <p className="mt-1 text-[26px] font-extrabold tracking-[-.02em]">Renew monthly plan</p>
        <p className="tabular mb-4 mt-1 text-[34px] font-extrabold tracking-[-.03em]">1,200.00 <span className="text-[14px] font-semibold tracking-normal text-ink-muted">EGP</span></p>
        {(
          [
            ["Cash", "banknote", ""],
            ["Card", "card", ""],
            ["Wallet", "wallet", "250.00 EGP available"],
            ["InstaPay", "banknote", "instapay"],
          ] as [string, IconName, string][]
        ).map(([m, ic, note]) => (
          <div key={m} {...(m === "InstaPay" ? { "data-tap": "instapay" } : {})} className="relative mb-2 flex items-center gap-3 rounded-[16px] bg-paper px-4 py-3">
            {m === "InstaPay" && <span data-method-ring className="absolute inset-0 rounded-[16px] bg-primary/10 opacity-0 shadow-[inset_0_0_0_2px_var(--color-primary)]" />}
            <Icon name={ic} size={20} className="relative" />
            <span className="relative text-[16px] font-semibold">{m}</span>
            {note && note !== "instapay" && <span className="relative ml-auto text-[13px] text-ink-muted">{note}</span>}
          </div>
        ))}
        <div data-receipt className="overflow-hidden">
          <div className="mt-1 flex items-center gap-3 rounded-[16px] bg-primary-tint px-4 py-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-surface text-primary-pressed">
              <Icon name="document-text" size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14.5px] font-bold leading-tight">Receipt from Mona</p>
              <p className="mt-1 text-[12.5px] text-ink-muted">1,200.00 EGP · waiting for approval</p>
            </div>
            <span data-tap="approve" className="grid">
              <span data-swap-a="approve" className="col-start-1 row-start-1 inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-bold text-surface">Approve</span>
              <span data-swap-b="approve" className="col-start-1 row-start-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-green-fg px-3.5 text-[13px] font-bold text-white opacity-0"><Check size={13} />Approved</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FrontDeskPhone() {
  return (
    <PhoneFrame>
      <div data-pages className="absolute inset-0">
        <Desk />
        <Bookings />
        <Clients />
        <Record />
      </div>
      <Chrome tabs={TABS} />
      <DoneSheet title="Plan renewed" />
    </PhoneFrame>
  );
}
