import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/*
 * One live product moment per feature, built from the real Bizqwik app components (ported from
 * the product repo's src/components and routes): Segmented, StatePill, MoneyHero, the week
 * TimeGrid, Bookings rows, the class-roster row, PaymentCards, PackageStatusPill, DayList rows.
 * Each sits in an app "screen" (paper background, mono kicker, bold title) exactly as the app
 * draws it. ecosystem-motion.ts plays each loop. Figures and names are illustrative (brief GAP 7).
 */

const mono = "font-mono font-bold uppercase tracking-[.06em]";

const Check = ({ draw = false, size = 18 }: { draw?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path data-check={draw ? "" : undefined} pathLength={1} strokeDasharray={draw ? 1 : undefined} d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** The finger/cursor that presses a control. Positioned and animated by the timeline. */
const Cursor = () => <span data-cursor aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 size-8 rounded-full bg-ink/20 opacity-0 ring-2 ring-white/80 backdrop-blur-[2px]" />;

/**
 * The Apple-Pay-style button: press, shrink to a circle, spin, then bloom into a green
 * success pill with a drawn check. `loader={false}` skips the spinner.
 */
function MorphButton({ idle, done, loader = true }: { idle: string; done: string; loader?: boolean }) {
  return (
    <div data-btn data-loader={loader ? "" : undefined} className="relative h-14">
      <div data-btn-body className="absolute inset-x-0 top-0 mx-auto flex h-14 w-full items-center justify-center overflow-hidden rounded-[24px] bg-primary text-[17px] font-bold text-white">
        <span data-btn-idle className="absolute">{idle}</span>
        <svg data-btn-spin className="absolute size-7 opacity-0" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span data-btn-done className="absolute flex items-center gap-1.5 opacity-0">
          <Check draw />
          {done}
        </span>
      </div>
    </div>
  );
}

/** Two stacked layers in one grid cell: `a` is the starting text, `b` replaces it. Width = the longer. */
function Swap({ a, b, name, className = "" }: { a: ReactNode; b: ReactNode; name: string; className?: string }) {
  return (
    <span className={`grid ${className}`}>
      <span data-swap-a={name} className="col-start-1 row-start-1">{a}</span>
      <span data-swap-b={name} className="col-start-1 row-start-1 opacity-0">{b}</span>
    </span>
  );
}


/* ---------- Ported product components ---------- */

type Tone = "amber" | "violet" | "green" | "danger" | "sunken";
const TONES: Record<Tone, string> = {
  amber: "bg-amber-bg text-amber-fg",
  violet: "bg-primary-tint-strong text-primary-pressed",
  green: "bg-green-bg text-green-fg",
  danger: "bg-danger-bg text-danger-fg",
  sunken: "bg-sunken text-ink-muted",
};

/** StatePill / PackageStatusPill: dot + mono caps. `chip` is the squarer attendance chip. */
function Pill({ tone, children, chip = false }: { tone: Tone; children: ReactNode; chip?: boolean }) {
  return (
    <span className={`${mono} inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-[11px] leading-none ${chip ? "rounded-[8px]" : "rounded-full"} ${TONES[tone]}`}>
      {!chip && <i className="size-1.5 shrink-0 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const SwapPill = ({ name, a, b, className = "" }: { name: string; a: [Tone, string]; b: [Tone, string]; className?: string }) => (
  <Swap name={name} className={className} a={<Pill tone={a[0]}>{a[1]}</Pill>} b={<Pill tone={b[0]}>{b[1]}</Pill>} />
);

/** The app screen every feature sits in: paper, mono kicker, bold title. */
function Screen({ kicker, title, right, children }: { kicker: string; title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div data-stage className="relative w-full rounded-[28px] border border-line bg-paper p-5 shadow-[0_1px_2px_rgba(26,23,38,.04),0_24px_60px_-28px_rgba(26,23,38,.25)] sm:p-6">
      <div data-inner>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[.08em] text-ink-faint">{kicker}</p>
            <h4 className="mt-1 text-[26px] font-extrabold leading-tight tracking-[-.02em]">{title}</h4>
          </div>
          {right}
        </div>
        {children}
        <Cursor />
      </div>
    </div>
  );
}

/** Segmented control. `final` is where the loop ends (shown for reduced motion). */
function Seg({ name, options, active, final, off = [] }: { name: string; options: string[]; active: number; final?: number; off?: number[] }) {
  return (
    <div data-seg={name} data-seg-final={final ?? active} className="flex w-fit max-w-full gap-1 rounded-full bg-sunken p-1">
      {options.map((o, i) => (
        <span key={o} className={`relative flex-none rounded-full px-3.5 py-2 font-mono text-[11px] font-bold tracking-[.06em] ${off.includes(i) ? "opacity-45" : ""}`}>
          <span data-seg-bg={i} className="absolute inset-0 rounded-full bg-surface shadow-[0_1px_2px_rgba(26,23,38,.1)]" style={{ opacity: i === active ? 1 : 0 }} />
          <span data-seg-t={i} className={`relative ${i === active ? "text-ink" : "text-ink-muted"}`}>{o}</span>
        </span>
      ))}
    </div>
  );
}

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[24px] border border-line bg-surface ${className}`}>{children}</div>
);

const Kick = ({ children }: { children: ReactNode }) => <p className="font-mono text-[11px] font-bold uppercase tracking-[.08em] text-ink-faint">{children}</p>;

/** Product button, secondary variant: primary tint, small. */
const SoftButton = ({ children, ...rest }: { children: ReactNode } & React.HTMLAttributes<HTMLSpanElement>) => (
  <span {...rest} className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[16px] bg-primary-tint px-4 text-[15px] font-bold text-primary-pressed">
    {children}
  </span>
);

/* ---------- Owner: revenue (MoneyHero + month strip) ---------- */
export function RevenueDemo() {
  const stats: [string, string, string][] = [["PROFIT", "41,200", "52,800"], ["PAYOUTS", "38,000", "41,500"], ["SUBSCRIBERS", "212", "236"]];
  return (
    <Screen kicker="Owner · Overview" title="Revenue">
      <div className="mt-4">
        <Seg name="month" options={["AUG", "SEP", "OCT", "NOV"]} active={1} final={2} off={[3]} />
      </div>
      <Card className="mt-3 p-5">
        <Kick>Revenue</Kick>
        <p className="tabular mt-1.5 text-[52px] font-extrabold leading-none tracking-[-.03em]">
          <span data-rev data-final="118,400">96,400</span>
          <span className="ml-2 font-mono text-[13px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {stats.map(([k, a, b], i) => (
            <div key={k}>
              <Kick>{k}</Kick>
              <p data-st={i} data-from={a} data-final={b} className="font-mono text-[13px] text-ink-muted">{a}</p>
            </div>
          ))}
        </div>
      </Card>
    </Screen>
  );
}

/* ---------- Owner: week calendar (the app's TimeGrid) ---------- */
const HOUR = 44;
/** On a phone only the middle three days fit; the outer two appear from `sm`. */
const edge = (i: number) => (i === 0 || i === 4 ? "max-sm:hidden" : "");
const DAYS: [string, number][] = [["THU", 16], ["FRI", 17], ["SAT", 18], ["SUN", 19], ["MON", 20]];
const HOURS = ["5 PM", "6 PM", "7 PM", "8 PM"];
const CLASSES: { col: number; at: number; title: string; time: string; neu?: boolean }[] = [
  { col: 0, at: 0, title: "Yoga", time: "5:00 PM" },
  { col: 1, at: 1, title: "Strength", time: "6:00 PM" },
  { col: 2, at: 0, title: "HIIT", time: "5:00 PM" },
  { col: 3, at: 1, title: "Pilates", time: "6:00 PM" },
  { col: 4, at: 0, title: "Strength", time: "5:00 PM" },
  { col: 2, at: 2, title: "Spin", time: "7:00 PM", neu: true },
];

export function SchedulingDemo() {
  return (
    <Screen kicker="Owner · Schedule" title="Classes">
      <div className="mt-4">
        <Seg name="view" options={["DAY", "WEEK", "MONTH"]} active={1} />
      </div>
      <Card className="mt-3 overflow-hidden rounded-[20px]">
        <div className="grid grid-cols-[34px_repeat(3,minmax(0,1fr))] sm:grid-cols-[34px_repeat(5,minmax(0,1fr))] border-b border-line">
          <span />
          {DAYS.map(([d, n], i) => (
            <div key={d} className={`border-l border-line py-1.5 text-center ${edge(i)}`}>
              <p className={`font-mono text-[10px] font-bold tracking-[.06em] ${n === 17 ? "text-primary-pressed" : "text-ink-muted"}`}>{d}</p>
              <p className={`mx-auto mt-0.5 grid size-7 place-items-center rounded-full text-[15px] font-extrabold ${n === 17 ? "bg-primary text-surface" : ""}`}>{n}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[34px_repeat(3,minmax(0,1fr))] sm:grid-cols-[34px_repeat(5,minmax(0,1fr))]">
          <div className="relative" style={{ height: HOURS.length * HOUR }}>
            {HOURS.map((h, i) => (
              <span key={h} className="absolute right-1.5 font-mono text-[10px] text-ink-faint" style={{ top: i * HOUR - (i ? 6 : -2) }}>{i ? h.replace(" ", "") : ""}</span>
            ))}
          </div>
          {DAYS.map(([d], col) => (
            <div key={d} className={`relative border-l border-line ${edge(col)}`} style={{ height: HOURS.length * HOUR, backgroundImage: "linear-gradient(var(--color-line) 1px, transparent 1px)", backgroundSize: `100% ${HOUR}px` }}>
              {CLASSES.filter((c) => c.col === col).map((c) => (
                <div
                  key={c.title + c.time}
                  data-blk={c.neu ? "new" : ""}
                  className="absolute inset-x-[2px] overflow-hidden rounded-[8px] border-l-[3px] border-primary bg-primary-tint px-1.5 py-1 text-primary-pressed"
                  style={{ top: c.at * HOUR + 1, height: HOUR - 3 }}
                >
                  <p className="truncate text-[12px] font-bold leading-tight">{c.title}</p>
                  <p className="truncate font-mono text-[10px] leading-tight">{c.time}</p>
                </div>
              ))}
              {col === 1 && (
                <span aria-hidden className="absolute inset-x-0 z-[1] border-t-2 border-danger-fg" style={{ top: HOUR * 0.55 }}>
                  <i className="absolute -left-[5px] -top-[6px] size-2.5 rounded-full bg-danger-fg" />
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-3 flex justify-end">
        <SoftButton data-tap>
          <Icon name="add" size={18} />
          Add class
        </SoftButton>
      </div>
    </Screen>
  );
}

/* ---------- Front desk: bookings list + class roster ---------- */
function BookingRow({ time, title, sub, chip, last = false }: { time: string; title: string; sub: ReactNode; chip?: ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${last ? "" : "border-b border-line"}`}>
      <span className="w-[68px] shrink-0 font-mono text-[13px] font-bold">{time}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-bold">{title}</span>
        <span className="block font-mono text-[12px] text-ink-faint">{sub}</span>
      </span>
      {chip}
    </div>
  );
}

export function BookingsDemo() {
  return (
    <Screen kicker="Front desk" title="Bookings">
      <div className="mt-4">
        <Seg name="range" options={["TODAY", "TOMORROW", "THIS WEEK"]} active={0} />
      </div>
      <Card className="mt-3 overflow-hidden rounded-[20px]">
        <BookingRow time="5:00 PM" title="HIIT" sub="5 booked" chip={<Pill tone="green" chip>NOW</Pill>} />
        <BookingRow time="6:00 PM" title="Strength class" sub={<><span data-bk data-final="8">7</span> booked</>} chip={<Pill tone="violet" chip>NEXT</Pill>} />
        <BookingRow time="7:30 PM" title="Pilates" sub="3 booked" last />
      </Card>
      <div className="relative mt-3 h-[112px]">
        <div data-roster className="absolute inset-x-0 top-0 rounded-[20px] border border-line bg-sunken px-3.5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold">Mona K.</span>
              <span className="block font-mono text-[12px] text-ink-faint">On their plan</span>
            </span>
            <Swap name="att" a={<Pill tone="sunken" chip>BOOKED</Pill>} b={<Pill tone="green" chip>ARRIVED</Pill>} />
          </div>
          <div className="mt-2.5 flex gap-2">
            <span data-tap className="relative inline-flex h-9 items-center overflow-hidden rounded-[12px] border border-line bg-surface px-4 text-[13px] font-bold text-ink-muted">
              <span data-arr-on className="absolute inset-0 grid place-items-center rounded-[11px] bg-primary text-white opacity-0">Arrived</span>
              Arrived
            </span>
            <span className="inline-flex h-9 items-center rounded-[12px] border border-line bg-surface px-4 text-[13px] font-bold text-ink-muted">No-show</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Front desk: QR check-in ---------- */
const QR = (() => {
  let s = 7;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647) > 0.5;
  const N = 9;
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return Array.from({ length: N * N }, (_, i) => ({ finder: finder(i % N, Math.floor(i / N)), on: rnd() }));
})();

export function CheckInDemo() {
  return (
    <Screen kicker="Front desk" title="Check-in" right={<SwapPill name="pill" a={["amber", "SCANNING"]} b={["green", "CHECKED IN"]} className="mt-1.5 shrink-0" />}>
      <Card className="mt-4 p-4">
        <div className="flex items-center gap-5">
          <div className="relative size-[132px] shrink-0 rounded-[20px] bg-sunken p-3.5">
            <div data-qr className="grid size-full grid-cols-9 grid-rows-9 gap-px">
              {QR.map((c, i) => (
                <span key={i} className={`rounded-[1.5px] ${c.finder ? "bg-ink" : c.on ? "bg-ink/85" : "bg-transparent"}`} />
              ))}
            </div>
            <span data-scan className="absolute inset-x-3 top-3.5 h-[3px] rounded-full bg-primary opacity-0 shadow-[0_0_14px_3px_rgba(90,65,255,.55)]" />
            <span data-qr-ok className="absolute inset-0 grid scale-50 place-items-center opacity-0">
              <span className="grid size-[76px] place-items-center rounded-full bg-green-fg text-white shadow-[0_10px_24px_-6px_rgba(23,122,75,.6)]">
                <Check draw size={38} />
              </span>
            </span>
          </div>
          <div className="min-w-0">
            <Swap name="sub" className="text-[22px] font-extrabold leading-tight tracking-[-.02em]" a="Hold the code to the scanner" b="Mona K." />
            <Swap name="sub2" className="mt-2 font-mono text-[13px] text-ink-muted" a="Monthly plan" b="12 visits left" />
          </div>
        </div>
      </Card>
    </Screen>
  );
}

/* ---------- Front desk: sale with PaymentCards ---------- */
const PAY: [string, "banknote" | "card" | "wallet", string][] = [["Cash", "banknote", "Paid in cash"], ["Card", "card", "Paid by card"], ["InstaPay", "wallet", "Bank transfer"]];

export function PaymentsDemo() {
  return (
    <Screen kicker="Front desk · Sale" title="Monthly plan" right={<SwapPill name="pill" a={["amber", "DUE"]} b={["green", "PAID"]} className="mt-1.5 shrink-0" />}>
      <p data-amount className="tabular mt-4 text-[44px] font-extrabold leading-none tracking-[-.03em]">
        1,250.00 <span className="font-mono text-[13px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
      </p>
      <div data-pc data-pc-final="2" className="mt-4 grid grid-cols-3 gap-2">
        {PAY.map(([label, icon, note], i) => (
          <div key={label} data-tap={i === 2 ? "" : undefined} className="relative flex min-h-[116px] flex-col justify-between rounded-[24px] border border-line bg-surface p-3.5">
            <span data-pc-sel={i} className="absolute -inset-px rounded-[24px] border-2 border-primary bg-primary-tint" style={{ opacity: i === 0 ? 1 : 0 }} />
            <span data-pc-t={i} className={`relative ${i === 0 ? "text-primary-pressed" : "text-ink"}`}>
              <Icon name={icon} size={34} />
            </span>
            <span className="relative">
              <span className="block text-[16px] font-extrabold tracking-[-.01em]">{label}</span>
              <span className="mt-0.5 block font-mono text-[11px] text-ink-muted">{note}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <MorphButton idle="Take payment" done="Paid" />
      </div>
    </Screen>
  );
}

/* ---------- Front desk: memberships (PackageStatusPill) ---------- */
export function MembershipsDemo() {
  return (
    <Screen kicker="Front desk" title="Members">
      <Card className="mt-4 overflow-hidden rounded-[20px]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Mona K.</span>
            <span className="block font-mono text-[12px] text-ink-faint">Monthly plan · 12 visits left</span>
          </span>
          <Pill tone="green">ACTIVE</Pill>
        </div>
        <div className="relative flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span data-flash aria-hidden className="absolute inset-0 bg-primary-tint opacity-0" />
          <span className="relative min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Omar H.</span>
            <Swap name="sub" className="font-mono text-[12px] text-ink-faint" a="Monthly plan · 0 visits left" b="Monthly plan · 12 visits left" />
            <span data-tap className="mt-2 inline-block origin-left">
              <SoftButton>
                <Swap name="btn" a="Renew" b="Renewed" />
              </SoftButton>
            </span>
          </span>
          <span className="relative">
            <SwapPill name="pill" a={["sunken", "EXHAUSTED"]} b={["green", "ACTIVE"]} />
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold">Salma A.</span>
            <span className="block font-mono text-[12px] text-ink-faint">Expired Sep 30</span>
          </span>
          <Pill tone="danger">EXPIRED</Pill>
        </div>
      </Card>
    </Screen>
  );
}

/* ---------- Accountant: payout ---------- */
export function PayoutsDemo() {
  return (
    <Screen kicker="Accountant · Payouts" title="Coach Nour" right={<SwapPill name="pill" a={["violet", "SETTLED"]} b={["green", "PAID"]} className="mt-1.5 shrink-0" />}>
      <Card className="mt-4 p-5">
        <Kick>Owed · Oct</Kick>
        <p data-amount className="tabular mt-1.5 text-[48px] font-extrabold leading-none tracking-[-.03em]">
          4,200.00 <span className="font-mono text-[13px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
        </p>
        <Swap name="sub" className="mt-3 font-mono text-[13px] text-ink-muted" a="14 sessions · settled Oct 31" b="14 sessions · paid Nov 2" />
      </Card>
      <div className="mt-4">
        <MorphButton idle="Pay Coach Nour" done="Paid" />
      </div>
    </Screen>
  );
}

/* ---------- Coach: month, DayList rows ---------- */
function DayRow({ date, meta, amount }: { date: string; meta: string; amount: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-line bg-surface px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-bold tracking-[-.01em]">{date}</p>
        <p className="font-mono text-[12px] text-ink-muted">{meta}</p>
        <div className="mt-2"><Pill tone="green">LOGGED</Pill></div>
      </div>
      <div className="text-right">
        <p className="tabular text-[20px] font-extrabold leading-none tracking-[-.01em]">{amount}</p>
        <p className="mt-1 font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint">EGP</p>
      </div>
    </div>
  );
}

export function SessionsDemo() {
  return (
    <Screen kicker="Coach · My month" title="October" right={<Pill tone="amber">LOGGING</Pill>}>
      <Card className="mt-4 p-5">
        <Kick>Earned this month</Kick>
        <p className="tabular mt-1.5 text-[46px] font-extrabold leading-none tracking-[-.03em]">
          <span data-earn data-final="4,500.00">4,200.00</span> <span className="font-mono text-[13px] font-bold tracking-[.08em] text-ink-faint">EGP</span>
        </p>
      </Card>
      <div className="mt-3 flex flex-col gap-2.5">
        <Swap
          name="slot"
          a={
            <div className="flex items-center gap-3 rounded-[16px] border border-dashed border-primary/40 bg-primary-tint px-4 py-[27px] text-primary-pressed">
              <Icon name="qr-code" size={26} />
              <span className="text-[15px] font-bold">Scan the QR in the coaches' room</span>
            </div>
          }
          b={<DayRow date="Fri, Oct 17" meta="1 session · QR 6:02 PM" amount="300" />}
        />
        <DayRow date="Thu, Oct 16" meta="2 sessions · QR 5:58 PM" amount="600" />
      </div>
    </Screen>
  );
}

/* ---------- Client app ---------- */
export function ClientDemo() {
  return (
    <Screen kicker="Client app" title="Morning Class" right={<SwapPill name="pill" a={["amber", "OPEN"]} b={["green", "CONFIRMED"]} className="mt-1.5 shrink-0" />}>
      <Card className="mt-4 p-4">
        <div className="flex items-center gap-5 rounded-[20px] bg-sunken px-5 py-4">
          <div className="text-center">
            <p className={`${mono} text-[13px] leading-none text-primary-pressed`}>Oct</p>
            <p className="mt-1 text-[36px] font-extrabold leading-none tracking-[-.03em]">08</p>
          </div>
          <span className="h-11 w-px bg-line" aria-hidden />
          <div className="min-w-0">
            <p className="text-[17px] font-bold leading-tight">Thursday, October 8</p>
            <p className="mt-1.5 font-mono text-[12px] leading-none text-ink-muted">10:00–10:45 AM · 1:1 coaching</p>
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <MorphButton idle="Book" done="Booked" loader={false} />
      </div>
    </Screen>
  );
}
