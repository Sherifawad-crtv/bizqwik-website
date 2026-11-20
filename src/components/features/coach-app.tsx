import { Icon } from "@/components/ui/Icon";
import { card, Chrome, Confirm, Face, label, pageCls, PhoneFrame, type Tab } from "./business-app";
import { Check, Grabber, Pill, sheetCls } from "./frontdesk-app";

/*
 * "Coaches": the coach's app on the iPhone frame. Tabs as in the product for a coach (My Month, Clients, History and
 * the round button). The home is "My Month": the running total at the coach's tier rate, then the days
 * logged. Sheets: a day's detail and Swap a session (from the brief; the dev branch
 * of the app does not have it yet). Coach Ali is one of the Revolt team (his app avatar); the figures are illustrative.
 * coach-motion.ts plays it; this markup is the finished state of the home page.
 */

const TABS: Tab[] = [
  { icon: "home-smile", key: "mine" },
  { icon: "clipboard-list", key: "clients" },
  { icon: "clock-circle", key: "history" },
];

const DAYS: [string, string, string][] = [
  ["Sat, Nov 14", "5:52 PM", "300"],
  ["Fri, Nov 13", "6:09 PM", "300"],
  ["Thu, Nov 12", "5:55 PM", "300"],
];

function DayCard({ d, t, a, tapKey }: { d: string; t: string; a: string; tapKey?: string }) {
  return (
    <div {...(tapKey ? { "data-tap": tapKey } : {})} className={`${card} flex items-center gap-3.5 px-4 py-3.5`}>
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-bold leading-tight tracking-[-.01em]">{d}</p>
        <p className="mt-0.5 font-mono text-[13px] text-ink-muted">1 session</p>
        <p className="mt-1 font-mono text-[13px] font-semibold">{t}</p>
        <p className="mt-2">
          <Pill tone="green">LOGGED</Pill>
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="tabular text-[20px] font-extrabold tracking-[-.01em]">{a}</p>
        <p className={label}>EGP</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <section data-page="mine" className={pageCls}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="text-[28px] font-extrabold leading-[1.15] tracking-[-.02em]">Hi, Ali</div>
        <Face photo="ali" size={64} />
      </div>

      <div data-hero className={`${card} mb-3.5 flex items-baseline gap-2 px-6 py-8`}>
        <span data-val="total" className="tabular text-[64px] font-extrabold leading-none tracking-[-.03em]">
          4,500
        </span>
        <span className="font-mono text-[15px] font-bold tracking-[.06em] text-ink-faint">EGP</span>
      </div>

      {/* From the brief: swap a session with another coach, 2 hours ahead, if they accept */}
      <div data-nextcard className={`${card} mb-3.5 flex items-center gap-3 px-4 py-3`}>
        <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-primary-tint text-primary-pressed">
          <Icon name="calendar-mark" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={label}>NEXT SESSION</p>
          <p className="mt-0.5 text-[15.5px] font-bold leading-tight">Fri 20 · Strength 6:00 PM</p>
        </div>
        <span data-tap="swap" className="grid">
          <span data-swap-a="swapbtn" className="col-start-1 row-start-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[13px] font-bold text-surface">
            <Icon name="refresh-circle" size={15} />
            Swap
          </span>
          <span data-swap-b="swapbtn" className="col-start-1 row-start-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-green-bg px-3.5 text-[13px] font-bold text-green-fg opacity-0">
            <Check size={13} />
            Lana
          </span>
        </span>
      </div>

      <div className="flex items-baseline px-0.5 pb-2">
        <span className={label}>DAYS LOGGED</span>
        <span data-val="days" className="ml-auto font-mono text-[13px] text-ink-faint">15 DAYS</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <div data-dayrow>
          <DayCard d="Mon, Nov 16" t="5:52 PM" a="300" tapKey="day" />
        </div>
        {DAYS.map(([d, t, a]) => (
          <div key={d} data-dayrow>
            <DayCard d={d} t={t} a={a} />
          </div>
        ))}
      </div>

      {/* A day's detail: what each session earned, at the tier rate */}
      <div data-sheet="day" className={sheetCls} style={{ height: 430 }}>
        <Grabber />
        <p className={label}>MON, NOV 16</p>
        <p className="mb-4 mt-1 text-[26px] font-extrabold tracking-[-.02em]">1 session</p>
        <div className="flex items-center gap-3 rounded-[18px] bg-paper px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-sunken">
            <Icon name="clock-circle" size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight">Logged at 5:52 PM</p>
            <p className="mt-1 text-[12.5px] text-ink-muted">Session logged</p>
          </div>
          <p className="tabular text-[17px] font-extrabold">300 EGP</p>
        </div>
        <div className="mt-2.5 rounded-[18px] bg-primary-tint px-4 py-3.5">
          <p className="font-mono text-[11px] font-bold tracking-[.08em] text-primary-pressed">YOUR TIER</p>
          <p className="mt-1 text-[17px] font-extrabold text-primary-pressed">Senior coach · 300 EGP per session</p>
        </div>
        <p className="mt-4 font-mono text-[12px] leading-snug text-ink-faint">Logging stays open until a head settles the month. Tap a day to remove a mistake.</p>
      </div>

      {/* Swap a session */}
      <div data-sheet="swap" className={sheetCls} style={{ height: 600 }}>
        <Grabber />
        <div data-layer="s1" className="absolute inset-x-5 top-12">
          <p className={label}>FRI 20 · STRENGTH 6:00 PM</p>
          <p className="mb-3 mt-1 text-[26px] font-extrabold tracking-[-.02em]">Swap this session</p>
          <div className="mb-3 flex items-center gap-2 rounded-[14px] bg-sunken px-3 py-2 text-[12.5px] font-semibold text-ink-muted">
            <Icon name="clock-circle" size={16} />
            At least 2 hours ahead, and the other coach has to accept
          </div>
          {[
            ["Lana", "lana", "Free at 6:00 PM", true],
            ["Fatma", "fatma", "Free at 6:00 PM", false],
            ["Yassin", "yassin", "Teaching then", false],
          ].map(([n, ph, s, first]) => (
            <div key={n as string} {...(first ? { "data-tap": "pickcoach" } : {})} className="relative mb-2 flex items-center gap-3 rounded-[16px] bg-paper px-3.5 py-2.5">
              {first && <span data-pick-ring className="absolute inset-0 rounded-[16px] bg-primary/10 opacity-0 shadow-[inset_0_0_0_2px_var(--color-primary)]" />}
              <Face photo={ph as string} size={42} />
              <div className="relative min-w-0 flex-1">
                <p className="text-[15.5px] font-bold leading-tight">Coach {n as string}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-muted">{s as string}</p>
              </div>
            </div>
          ))}
          <span data-tap="sendswap" className="mt-3 flex h-12 items-center justify-center rounded-[18px] bg-primary text-[16px] font-bold text-surface">Send request</span>
        </div>
        <div data-layer="s2" className="absolute inset-x-5 top-24 flex flex-col items-center text-center opacity-0">
          <Face photo="lana" size={92} />
          <p className="mt-5 text-[24px] font-extrabold tracking-[-.02em]">
            <span data-swap-state>Waiting for Lana</span>
          </p>
          <p className="mt-2 text-[14.5px] text-ink-muted">She gets the request now. You keep the session until she accepts.</p>
          <span data-dots className="mt-5 flex gap-2">
            {[0, 1, 2].map((i) => (
              <i key={i} data-dot className="size-2.5 rounded-full bg-primary" />
            ))}
          </span>
          <span data-accepted className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-green-bg px-4 py-2 text-[14px] font-bold text-green-fg opacity-0">
            <Check size={15} />
            Accepted
          </span>
        </div>
      </div>
    </section>
  );
}

export function CoachPhone() {
  return (
    <PhoneFrame>
      <div data-pages className="absolute inset-0">
        <Home />
      </div>
      <Chrome tabs={TABS} />
      <Confirm title="Swapped" sub="Lana takes Fri 20 · Strength 6:00 PM" chip="SHE ACCEPTED · YOUR SCHEDULE IS UPDATED" />
    </PhoneFrame>
  );
}

