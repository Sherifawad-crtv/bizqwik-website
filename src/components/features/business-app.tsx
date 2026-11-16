import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Cursor } from "./ui";

/*
 * "Run the business": a phone-shaped screen (rounded corners, no bezel) that walks through the founder app, one page
 * at a time, sliding sideways like a real app. Built at 390 x 816 points and scaled to --pw px wide.
 * Pages, left to right: Overview (scrolls: tiles, chart, where the money came from), Accounting, Team, Coach,
 * Schedule, To pay. business-motion.ts plays it; this markup is the FINISHED state of page 1 (reduced motion shows it).
 * Styling follows the dev branch of the product (routes/Oversight.tsx, overview/*, BottomNav.tsx).
 */

export const PAGE_W = 390;
export const PAGE_H = 816;
export const PAGES = 6;

const label = "font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint";
const card = "rounded-[28px] bg-surface";

/* ---------- small pieces ---------- */

const Back = () => (
  <span data-back className="grid size-10 place-items-center rounded-full bg-surface shadow-[0_1px_0_rgba(26,23,38,.06)]">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  </span>
);

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
);

function Header({ kicker, title, back }: { kicker: string; title: string; back?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      {back && <Back />}
      <div>
        <p className={label}>{kicker}</p>
        <h3 className="text-[26px] font-extrabold leading-[1.15] tracking-[-.02em]">{title}</h3>
      </div>
    </div>
  );
}

function Delta({ text, tone = "good" }: { text: string; tone?: "good" | "neutral" }) {
  const cls = tone === "good" ? "bg-green-bg text-green-fg" : "bg-sunken text-ink-muted";
  return <span data-delta className={`tabular shrink-0 whitespace-nowrap rounded-full px-[9px] py-[3px] font-mono text-[11px] font-bold tracking-[.02em] ${cls}`}>{text}</span>;
}

/** The app's pill selector: sunken track, the chosen option on a surface pill that slides (`data-thumb`). */
function Seg({ name, options, widths }: { name: string; options: readonly string[]; widths: number }) {
  return (
    <div data-seg={name} className="relative flex w-fit gap-1.5 rounded-full bg-sunken p-1">
      <span data-thumb className="absolute left-0 top-1 bottom-1 rounded-full bg-surface" style={{ width: widths, transform: "translateX(4px)" }} />
      {options.map((o, i) => (
        <span key={o} data-opt={o} className={`relative z-10 whitespace-nowrap rounded-full px-3.5 py-[9px] font-mono text-[12px] font-bold tracking-[.06em] ${i === 0 ? "text-ink" : "text-ink-muted"}`}>
          {o}
        </span>
      ))}
    </div>
  );
}

function Kpi({ k, icon, name, value, delta, tone }: { k: string; icon: IconName; name: string; value: string; delta?: string; tone?: "good" | "neutral" }) {
  return (
    <div className={`${card} min-w-0 px-4 py-[14px]`}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-pressed">
          <Icon name={icon} size={16} />
        </span>
        <span className="ml-auto">{delta && <Delta text={delta} tone={tone} />}</span>
      </div>
      <div className={`${label} mt-2.5`}>{k}</div>
      <div data-val={name} className="tabular mt-0.5 text-[24px] font-extrabold leading-[1.15] tracking-[-.02em]">
        {value}
      </div>
    </div>
  );
}

/* ---------- chart + share bars (Overview) ---------- */

const MONTHS = ["MAY", "JUN", "JUL", "AUG", "SEP", "OCT"];
const REV = [312400, 348900, 371200, 429800, 506100, 587400];
const PAY = [118600, 131200, 140800, 163900, 192300, 221700];

function barPath(x: number, yTop: number, w: number, yBottom: number, r: number) {
  const rr = Math.min(r, Math.max(0, yBottom - yTop));
  return `M${x},${yBottom} L${x},${yTop + rr} Q${x},${yTop} ${x + rr},${yTop} L${x + w - rr},${yTop} Q${x + w},${yTop} ${x + w},${yTop + rr} L${x + w},${yBottom} Z`;
}

function Chart() {
  const W = PAGE_W - 32 - 36;
  const H = 200;
  const padL = 34;
  const top = 10;
  const bottom = 170;
  const max = 600000;
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const slot = (W - padL) / MONTHS.length;
  const barW = Math.min(36, slot * 0.62);
  return (
    <div data-chartcard className={`${card} mb-3.5 px-[18px] py-4`}>
      <div className={label}>REVENUE VS COACH PAYOUTS</div>
      <div className="mt-0.5 font-mono text-[12px] text-ink-faint">MAY – OCT 2026 · BY MONTH · EGP</div>
      <div className="relative mt-3.5">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block overflow-visible">
          {[0, 200000, 400000, 600000].map((t) => (
            <g key={t}>
              <line x1={padL} x2={W} y1={y(t)} y2={y(t)} className="stroke-line" strokeWidth={1} />
              <text x={0} y={y(t) + 4} className="fill-ink-faint text-[11px] font-medium">
                {t === 0 ? "0" : `${t / 1000}k`}
              </text>
            </g>
          ))}
          {MONTHS.map((m, i) => {
            const x = padL + i * slot + (slot - barW) / 2;
            return (
              <g key={m}>
                <path data-bar d={barPath(x, y(REV[i]), barW, bottom, 14)} className="fill-primary-light" />
                <path data-bar d={barPath(x, y(PAY[i]), barW, bottom, 14)} className="fill-primary" />
                <rect data-bar-hit={i} x={padL + i * slot} y={0} width={slot} height={bottom} fill="transparent" />
                <text x={padL + i * slot + slot / 2} y={H - 8} textAnchor="middle" className="fill-ink-muted text-[12px] font-medium">
                  {m}
                </text>
              </g>
            );
          })}
        </svg>
        <div
          data-tip
          className="pointer-events-none absolute right-1 top-1 w-[150px] rounded-lg bg-ink px-3 py-2 font-mono text-[11px] font-semibold leading-[1.6] text-surface opacity-0"
        >
          <div className="font-extrabold">OCT</div>
          <div>Revenue 587,400</div>
          <div>Payouts 221,700</div>
          <div>Profit 365,700</div>
        </div>
        <div className="mt-1 flex gap-[18px]">
          {[
            ["Revenue", "bg-primary-light"],
            ["Coach payouts", "bg-primary"],
          ].map(([n, c]) => (
            <span key={n} className="flex items-center gap-[7px] text-[12px] font-medium text-ink-muted">
              <i className={`block size-2.5 rounded-full ${c}`} />
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICE: [string, string, number][] = [
  ["Group classes", "412,300", 70],
  ["Private training", "126,800", 22],
  ["Drop-in", "34,500", 6],
  ["Other", "13,800", 2],
];
const TYPE: [string, string, number][] = [
  ["Memberships", "362,100", 62],
  ["Class bundles", "177,000", 30],
  ["Drop-ins", "34,500", 6],
  ["Other", "13,800", 2],
];

function Shares({ name, rows, hidden }: { name: string; rows: [string, string, number][]; hidden?: boolean }) {
  return (
    <div data-share={name} className={`col-start-1 row-start-1 flex flex-col gap-3 ${hidden ? "opacity-0" : ""}`}>
      {rows.map(([l, v, pct]) => (
        <div key={l}>
          <div className="mb-[5px] flex items-baseline gap-2">
            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">{l}</span>
            <span className="tabular text-[14px] font-extrabold">{v}</span>
            <span className="tabular w-10 text-right font-mono text-[12px] font-semibold text-ink-faint">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-sunken">
            <div data-fill className="h-full origin-left rounded-[0_4px_4px_0] bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- pages ---------- */

const pageCls = "relative h-[816px] w-[390px] shrink-0 overflow-hidden px-4 pt-[56px]";

function Overview() {
  return (
    <section data-page="overview" className={pageCls}>
      <div data-scroll>
        <div className="mb-7 flex items-center justify-between gap-3">
          <div className="text-[28px] font-extrabold leading-[1.15] tracking-[-.02em]">Hi, Karim</div>
          <Image src="/demo/founder-photo.webp" alt="" width={64} height={64} unoptimized className="size-16 shrink-0 rounded-full object-cover" />
        </div>

        <div className="mb-3 flex items-center gap-2.5">
          <Seg name="range" options={["MONTH", "3M", "6M", "12M"]} widths={68} />
          <span className="ml-auto text-right font-mono text-[11px] font-bold tracking-[.06em] text-ink-faint">OCT 2026</span>
        </div>

        <div className="mb-3.5 grid grid-cols-2 gap-2.5">
          <Kpi k="PROFIT" icon="chart-square" name="profit" value="365,700" delta="▲ 16.5%" />
          <Kpi k="REVENUE" icon="wallet" name="revenue" value="587,400" delta="▲ 16.1%" />
          <Kpi k="ACTIVE SUBSCRIBERS" icon="users-group-rounded" name="subs" value="214" />
          <Kpi k="COACH PAYOUTS" icon="banknote" name="payouts" value="221,700" delta="▲ 15.3%" tone="neutral" />
        </div>

        <Chart />

        <div className={`${card} mb-3.5 px-[18px] py-4`}>
          <div className={label}>WHERE THE MONEY CAME FROM</div>
          <div className="mt-0.5 font-mono text-[12px] text-ink-faint">OCT 2026 · EGP</div>
          <div className="mt-3.5 mb-3.5">
            <Seg name="source" options={["SERVICE", "TYPE"]} widths={86} />
          </div>
          <div className="grid">
            <Shares name="service" rows={SERVICE} />
            <Shares name="type" rows={TYPE} hidden />
          </div>
        </div>

        <div data-pnl className={`${card} mb-3 flex items-center gap-2.5 px-[18px] py-4`}>
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-pressed">
            <Icon name="banknote" size={16} />
          </span>
          <span className="flex-1 text-[15px] font-bold">Profit &amp; loss</span>
          <span className="text-ink-faint">
            <Chevron />
          </span>
        </div>
        <div className="h-[110px]" />
      </div>
    </section>
  );
}

const EXPENSES: [string, string][] = [
  ["Rent", "45,000"],
  ["Utilities", "9,800"],
  ["Marketing", "6,500"],
];

function Accounting() {
  const line = "flex items-baseline justify-between border-t border-line py-3 text-[15px]";
  return (
    <section data-page="accounting" className={pageCls}>
      <Header kicker="BUSINESS" title="Accounting" back />
      <div className={`${card} mb-3.5 px-[18px] py-4`}>
        <div className={label}>PROFIT &amp; LOSS</div>
        <div className="mt-0.5 mb-2 font-mono text-[12px] text-ink-faint">OCT 2026 · EGP</div>
        <div className={`${line} border-t-0`}>
          <span>Revenue</span>
          <span className="tabular font-bold">587,400</span>
        </div>
        <div className={line}>
          <span>Coach payouts</span>
          <span className="tabular font-bold text-ink-muted">− 221,700</span>
        </div>
        <div className={line}>
          <span className="font-bold">Gross profit</span>
          <span className="tabular font-extrabold">365,700</span>
        </div>
        <div className={line}>
          <span>Expenses</span>
          <span data-val="expenses" className="tabular font-bold text-ink-muted">
            − 69,700
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between rounded-[16px] bg-primary-tint px-3.5 py-3">
          <span className="text-[15px] font-bold text-primary-pressed">Net profit</span>
          <span data-val="net" className="tabular text-[24px] font-extrabold tracking-[-.02em] text-primary-pressed">
            296,000
          </span>
        </div>
      </div>

      <div className={`${card} px-[18px] py-4`}>
        <div className="mb-1 flex items-center">
          <div className={label}>EXPENSES</div>
          <span data-tap="addexp" className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[13px] font-bold text-surface">
            <Icon name="add" size={15} strokeWidth={2.4} />
            Add expense
          </span>
        </div>
        {EXPENSES.map(([n, v]) => (
          <div key={n} className="flex items-baseline justify-between border-t border-line py-3 text-[15px]">
            <span>{n}</span>
            <span className="tabular font-semibold text-ink-muted">{v}</span>
          </div>
        ))}
        <div data-newexp className="overflow-hidden">
          <div className="flex items-baseline justify-between border-t border-line py-3 text-[15px]">
            <span className="font-semibold">Equipment</span>
            <span className="tabular font-semibold text-primary-pressed">8,400</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const COACHES: { n: string; tier: string; sub: string; tone: "green" | "amber" | "muted"; status: string }[] = [
  { n: "Nour", tier: "Senior coach · 300 EGP", sub: "Strength · 5:52 PM", tone: "green", status: "On time" },
  { n: "Omar", tier: "Junior coach · 250 EGP", sub: "Yoga · 5:09 PM", tone: "amber", status: "9 min late" },
  { n: "Salma", tier: "Head coach · 500 EGP", sub: "Mobility · 6:58 PM", tone: "green", status: "On time" },
  { n: "Adel", tier: "Junior coach · 250 EGP", sub: "Off today", tone: "muted", status: "—" },
];
const TONE = { green: "text-green-fg", amber: "text-amber-fg", muted: "text-ink-faint" } as const;

function Team() {
  return (
    <section data-page="team" className={pageCls}>
      <Header kicker="YOUR TEAM" title="Team" />
      <div className="flex flex-col gap-2.5">
        {COACHES.map((c, i) => (
          <div key={c.n} data-crow {...(i === 0 ? { "data-tap": "coach" } : {})} className={`${card} flex items-center gap-3 px-4 py-3.5`}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-tint text-[17px] font-extrabold text-primary-pressed">{c.n[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold leading-tight">Coach {c.n}</p>
              <p className="mt-1 text-[12.5px] leading-tight text-ink-muted">{c.tier}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className={`inline-flex items-center gap-1.5 text-[13px] font-bold ${TONE[c.tone]}`}>
                <i className="size-1.5 rounded-full bg-current" />
                {c.status}
              </p>
              <p className="mt-1 font-mono text-[11px] text-ink-faint">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const SESSIONS: [string, string, string, "green" | "amber"][] = [
  ["Sat 14", "Strength · 5:52 PM", "On time", "green"],
  ["Fri 13", "Strength · 6:09 PM", "9 min late", "amber"],
  ["Thu 12", "Strength · 5:55 PM", "On time", "green"],
  ["Wed 11", "Strength · 5:48 PM", "On time", "green"],
];

function Coach() {
  return (
    <section data-page="coach" className={pageCls}>
      <Header kicker="SENIOR COACH" title="Coach Nour" back />
      <div className="mb-3.5 grid grid-cols-2 gap-2.5">
        <div className={`${card} px-4 py-[14px]`}>
          <div className={label}>SESSIONS</div>
          <div className="tabular mt-0.5 text-[24px] font-extrabold tracking-[-.02em]">14</div>
        </div>
        <div className={`${card} px-4 py-[14px]`}>
          <div className={label}>EARNED · EGP</div>
          <div className="tabular mt-0.5 text-[24px] font-extrabold tracking-[-.02em]">4,200</div>
        </div>
      </div>
      <div className={`${card} px-[18px] py-4`}>
        <div className={label}>SESSIONS · SCANNED BY QR</div>
        <div className="mt-2">
          {SESSIONS.map(([d, w, st, tone]) => (
            <div key={d} data-srow className="flex items-center gap-3 border-t border-line py-3 first:border-t-0">
              <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-sunken text-ink">
                <Icon name="qr-code" size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight">{d}</p>
                <p className="mt-1 text-[12.5px] leading-tight text-ink-muted">{w}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 text-[13px] font-bold ${TONE[tone]}`}>
                <i className="size-1.5 rounded-full bg-current" />
                {st}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXISTING = new Set([2, 4, 9, 11, 16, 18, 23, 25, 30]); // Yoga on Mondays and Wednesdays
const FRIDAYS = new Set([6, 13, 20, 27]);

function Schedule() {
  const cells: (number | null)[] = [...Array.from({ length: 30 }, (_, i) => i + 1), null, null, null, null, null]; // November 2026 starts on a Sunday
  return (
    <section data-page="schedule" className={pageCls}>
      <Header kicker="WHAT YOU SELL" title="Schedule" />
      <div className={`${card} px-[14px] py-4`}>
        <div className="mb-3 flex items-center px-1">
          <span className={label}>NOVEMBER 2026</span>
          <span data-toast className="ml-auto rounded-full bg-green-bg px-2.5 py-1 font-mono text-[11px] font-bold text-green-fg opacity-0">
            4 classes added
          </span>
        </div>
        <div className="mb-1 grid grid-cols-7 text-center font-mono text-[11px] font-bold text-ink-faint">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} className="py-1">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((n, i) => (
            <div key={i} {...(n ? { "data-day": n } : {})} className="flex h-[58px] flex-col items-center pt-2">
              {n && (
                <>
                  <span className={`grid size-7 place-items-center rounded-full text-[14px] font-semibold ${n === 16 ? "bg-ink text-surface" : ""}`}>{n}</span>
                  <span className="mt-1 flex gap-0.5">
                    {EXISTING.has(n) && <i className="size-1.5 rounded-full bg-ink-faint/60" />}
                    {FRIDAYS.has(n) && <i data-newdot className="size-1.5 rounded-full bg-primary" />}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div data-sheet className="absolute inset-x-0 bottom-0 z-20 rounded-t-[40px] bg-surface px-5 pb-[34px] pt-3 opacity-0 shadow-[0_-20px_50px_rgba(26,23,38,.18)]">
        <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-line" />
        <p className="mb-4 text-[22px] font-extrabold tracking-[-.02em]">New class</p>
        {[
          ["TITLE", <span key="t" data-type="cls" className="font-semibold">Strength</span>],
          ["TIME", <span key="ti" className="font-semibold">6:00 PM</span>],
          ["COACH", <span key="c" className="font-semibold">Coach Nour</span>],
        ].map(([l, v]) => (
          <div key={l as string} className="mb-2.5 rounded-[16px] bg-paper px-4 py-2.5">
            <p className={label}>{l}</p>
            <p className="mt-0.5 text-[16px]">{v as ReactNode}</p>
          </div>
        ))}
        <div className="mb-4 flex items-center justify-between rounded-[16px] bg-paper px-4 py-3">
          <span className="text-[15px] font-semibold">Repeat every Friday</span>
          <span className="relative h-6 w-10 rounded-full bg-primary">
            <i className="absolute right-0.5 top-0.5 size-5 rounded-full bg-surface" />
          </span>
        </div>
        <span data-tap="addclass" className="flex h-12 items-center justify-center rounded-[18px] bg-primary text-[16px] font-bold text-surface">
          Add class
        </span>
      </div>
    </section>
  );
}

const PAYEES: [string, string, string][] = [
  ["Nour", "14 sessions · Senior", "4,200.00"],
  ["Omar", "12 sessions · Junior", "3,000.00"],
  ["Salma", "11 sessions · Head", "5,500.00"],
  ["Adel", "11 sessions · Junior", "2,750.00"],
];

function Pay() {
  return (
    <section data-page="pay" className={pageCls}>
      <Header kicker="SETTLED · READY" title="To pay" />
      <div className={`${card} mb-3.5 flex items-center gap-3 px-[18px] py-4`}>
        <div className="flex-1">
          <div className={label}>OCTOBER 2026</div>
          <div className="tabular mt-0.5 text-[24px] font-extrabold tracking-[-.02em]">15,450.00 <span className="text-[13px] font-semibold tracking-normal text-ink-muted">EGP</span></div>
        </div>
        <span data-tap="settle" className="grid">
          <span data-swap-a="settle" className="col-start-1 row-start-1 inline-flex h-10 items-center rounded-full bg-ink px-4 text-[14px] font-bold text-surface">Settle month</span>
          <span data-swap-b="settle" className="col-start-1 row-start-1 inline-flex h-10 items-center gap-1.5 rounded-full bg-green-bg px-4 text-[14px] font-bold text-green-fg opacity-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            Settled
          </span>
        </span>
      </div>
      <div data-payees className="flex flex-col gap-2.5">
        {PAYEES.map(([n, s, a], i) => (
          <div key={n} data-prow className={`${card} flex items-center gap-3 px-4 py-3.5`}>
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-tint text-[17px] font-extrabold text-primary-pressed">{n[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold leading-tight">Coach {n}</p>
              <p className="mt-1 text-[12.5px] leading-tight text-ink-muted">{s}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="tabular text-[15px] font-extrabold">{a}</p>
              {i === 0 ? (
                <span data-tap="pay" className="mt-1 inline-grid justify-items-end">
                  <span data-swap-a="pay" className="col-start-1 row-start-1 inline-flex h-8 items-center rounded-full bg-ink px-3.5 text-[13px] font-bold text-surface">Pay</span>
                  <span data-swap-b="pay" className="col-start-1 row-start-1 inline-flex h-8 items-center gap-1.5 rounded-full bg-green-fg px-3 text-[13px] font-bold text-white opacity-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    Paid
                  </span>
                </span>
              ) : (
                <span className="mt-1 inline-flex h-8 items-center rounded-full bg-ink px-3.5 text-[13px] font-bold text-surface">Pay</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- chrome: status bar, bottom nav ---------- */

const NAV: IconName[] = ["home-smile", "users-group-rounded", "clipboard-list", "tag", "clock-circle"];
export const NAV_STEP = 50 + 6;

function Chrome() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[58px] bg-gradient-to-b from-paper from-65% to-paper/0">
        <div className="flex items-center justify-between px-[34px] pt-[14px] text-[15px] font-semibold tabular">
          <span>9:41</span>
          <span className="flex items-center gap-[6px]" aria-hidden>
            <svg width="17" height="11" viewBox="0 0 19 12" fill="currentColor"><rect x="0" y="7.5" width="3.2" height="4.5" rx="1" /><rect x="5.3" y="5" width="3.2" height="7" rx="1" /><rect x="10.6" y="2.5" width="3.2" height="9.5" rx="1" /><rect x="15.8" y="0" width="3.2" height="12" rx="1" /></svg>
            <svg width="24" height="12" viewBox="0 0 27 13" fill="none"><rect x="0.6" y="0.6" width="23" height="11.8" rx="3.6" stroke="currentColor" strokeOpacity=".4" /><rect x="2.3" y="2.3" width="19.6" height="8.4" rx="2.2" fill="currentColor" /></svg>
          </span>
        </div>
      </div>

      <div data-navfade aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-b from-paper/0 to-paper to-[78%]" style={{ height: 126 }} />
      <div data-navbar className="absolute inset-x-0 z-40 flex items-center justify-center gap-3 px-4" style={{ bottom: 26 }}>
        <div className="relative flex h-16 items-center gap-1.5 overflow-hidden rounded-full border border-white/55 bg-surface/55 px-1.5 shadow-[0_14px_34px_rgba(26,23,38,.18),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-[28px] backdrop-saturate-[1.8]">
          <span data-nav-ind aria-hidden className="absolute left-1.5 top-[6px] size-[50px] rounded-full bg-primary-tint-strong" />
          {NAV.map((n, i) => (
            <span key={n} data-tab={["home", "team", "clients", "catalog", "history"][i]} className={`relative grid size-[50px] shrink-0 place-items-center rounded-full ${i === 0 ? "text-primary-pressed" : "text-ink-muted"}`}>
              <Icon name={n} size={22} strokeWidth={1.9} />
            </span>
          ))}
        </div>
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-surface shadow-[0_12px_30px_rgba(90,65,255,.4)]">
          <Icon name="add" size={28} strokeWidth={2.4} />
        </span>
      </div>
    </>
  );
}

/**
 * The phone. `data-phone` is the moving thing (it flies in and drifts); the pointer lives inside it so it moves along.
 * `--pw` is its width in px (the height keeps the screen's 390:816 shape).
 */
export function BusinessPhone() {
  return (
    <div data-stage data-own-entrance className="relative w-full">
      <p data-caption className="absolute left-0 top-0 z-10 hidden max-w-[200px] text-[17px] font-bold leading-snug tracking-[-.01em] min-[901px]:block">
        Revenue, profit and payouts, live
      </p>
      <div
        data-phone
        data-inner
        className="relative mx-auto overflow-hidden rounded-[44px] bg-paper shadow-[0_28px_70px_rgba(26,23,38,.16),0_0_0_1px_rgba(26,23,38,.05)] [--pw:282] max-[900px]:[--pw:262]"
        style={{ width: "calc(var(--pw) * 1px)", height: "calc(var(--pw) * 2.0923px)" }}
      >
        <div className="origin-top-left" style={{ width: PAGE_W, height: PAGE_H, transform: "scale(calc(var(--pw) / 390))" }}>
          <div className="relative size-full overflow-hidden">
            <div data-track className="flex" style={{ width: PAGE_W * PAGES }}>
              <Overview />
              <Accounting />
              <Team />
              <Coach />
              <Schedule />
              <Pay />
            </div>
            <Chrome />
          </div>
        </div>
        <Cursor />
      </div>
    </div>
  );
}
