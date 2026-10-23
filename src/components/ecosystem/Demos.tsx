import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/*
 * One small live product moment per role, drawn as the product's light "status card":
 * hairline border on Surface, a lavender rounded-square icon tile, a bold title, a mono
 * status pill that changes when the job is done, then the content (big number, sunken
 * well, control). ecosystem-motion.ts plays each card's loop. Figures are illustrative
 * stand-ins (brief GAP 7).
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
      <div data-btn-body className="absolute left-1/2 top-0 flex h-14 w-full -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-primary text-[17px] font-bold text-white">
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

/** Icon tile + title + the status pill that flips amber to green. */
function Header({ icon, title, a, b }: { icon: ReactNode; title: string; a: string; b: string }) {
  const pill = `${mono} rounded-[12px] px-3 py-2 text-[12px] leading-none`;
  return (
    <header className="flex items-center gap-3.5">
      <span data-tile className="grid size-[52px] shrink-0 place-items-center rounded-[18px] bg-primary-tint-strong text-primary">{icon}</span>
      <h4 className="min-w-0 text-[21px] font-extrabold leading-tight tracking-[-.015em]">{title}</h4>
      <Swap
        name="pill"
        className="ml-auto shrink-0"
        a={<span className={`${pill} block bg-amber-bg text-amber-fg`}>{a}</span>}
        b={<span className={`${pill} block bg-green-bg text-green-fg`}>{b}</span>}
      />
    </header>
  );
}

/** The light floating card every role's moment sits in. */
const Card = ({ children }: { children: ReactNode }) => (
  <div data-stage className="relative flex h-full flex-col rounded-[32px] border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(26,23,38,.04),0_20px_46px_-24px_rgba(26,23,38,.18)] sm:p-7">
    <div data-inner className="flex h-full flex-col">{children}</div>
  </div>
);

const Sub = ({ a, b }: { a: string; b: string }) => (
  <Swap name="sub" className="mt-3 text-[16px] leading-snug text-ink-muted" a={a} b={b} />
);

/* Founder: money lands, the number counts up, the pill turns green. */
export function FounderDemo() {
  return (
    <Card>
      <Header
        title="Revenue in"
        a="Pending"
        b="Received"
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 9v9h9" />
          </svg>
        }
      />
      <div className="mt-auto pt-10">
        <p className="tabular text-[42px] font-extrabold leading-none tracking-[-.03em]">
          <span data-money>+0.00</span> <span className="text-[34px]">EGP</span>
        </p>
        <Sub a="Waiting for InstaPay" b="Received today, Oct 3 · 9:41 AM" />
      </div>
    </Card>
  );
}

/* Accountant: cash out, pay, paid. */
export function AccountantDemo() {
  return (
    <Card>
      <Header title="Coach payout" a="To pay" b="Paid" icon={<Icon name="banknote" size={26} />} />
      <p data-amount className="tabular mt-10 text-[42px] font-extrabold leading-none tracking-[-.03em]">
        4,200.00 <span className="text-[34px]">EGP</span>
      </p>
      <Sub a="Coach Nour · 14 sessions · Oct" b="Coach Nour · paid Oct 3" />
      <div className="mt-auto pt-7">
        <MorphButton idle="Pay" done="Paid" />
      </div>
      <Cursor />
    </Card>
  );
}

/* Reception: scan the code, the client is in. */
const QR = (() => {
  let s = 7;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647) > 0.5;
  const N = 9;
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return Array.from({ length: N * N }, (_, i) => ({ finder: finder(i % N, Math.floor(i / N)), on: rnd() }));
})();

export function FrontDeskDemo() {
  return (
    <Card>
      <Header title="Check-in" a="Scanning" b="Checked in" icon={<Icon name="qr-code" size={26} />} />
      <div className="mt-8 flex items-center gap-6">
        <div className="relative size-[132px] shrink-0 rounded-[22px] bg-sunken p-3.5">
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
          <Swap name="sub" className="text-[24px] font-extrabold leading-tight tracking-[-.02em]" a="Hold the code to the scanner" b="Mona K." />
          <Swap name="sub2" className="mt-2 text-[16px] leading-snug text-ink-muted" a="Monthly plan" b="12 visits left" />
        </div>
      </div>
    </Card>
  );
}

/* Coaches: slide to log, the earnings move. */
export function CoachDemo() {
  return (
    <Card>
      <Header title="Log session" a="Ready" b="Logged" icon={<Icon name="clock-circle" size={26} />} />
      <div className="mt-8 flex items-center gap-5 rounded-[24px] bg-sunken px-6 py-5">
        <div className="text-center">
          <p className={`${mono} text-[14px] leading-none text-primary-pressed`}>Fri</p>
          <p className="mt-1 text-[38px] font-extrabold leading-none tracking-[-.03em]">17</p>
        </div>
        <span className="h-12 w-px bg-line" aria-hidden />
        <div className="min-w-0">
          <p className="text-[18px] font-bold leading-tight">Strength class</p>
          <p className="mt-1.5 font-mono text-[13px] leading-none text-ink-muted">6:00–6:45 PM</p>
        </div>
      </div>
      <div data-track className="relative mt-6 h-14 overflow-hidden rounded-full bg-sunken">
        <span data-fill className="absolute inset-y-0 left-0 w-14 rounded-full bg-primary/20" />
        <span data-hint className="absolute inset-0 grid place-items-center pl-10 text-[15px] font-bold text-ink-muted">Slide to log</span>
        <span data-thumb className="absolute left-1 top-1 grid size-12 place-items-center rounded-full bg-primary text-white shadow-[0_6px_14px_-4px_rgba(90,65,255,.6)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 6l6 6-6 6M13 6l6 6-6 6" /></svg>
        </span>
        <span data-logged className="absolute inset-0 flex items-center justify-center gap-1.5 bg-green-fg text-[17px] font-bold text-white opacity-0">
          <Check draw />
          Logged
        </span>
      </div>
      <div className="mt-auto flex items-end justify-between pt-7">
        <p className="tabular text-[38px] font-extrabold leading-none tracking-[-.03em]"><span data-earn>4,200.00</span> <span className="text-[30px]">EGP</span></p>
        <span data-plus className={`${mono} mb-1 rounded-[10px] bg-green-bg px-2.5 py-1.5 text-[12px] leading-none text-green-fg opacity-0`}>+150</span>
      </div>
    </Card>
  );
}

/* Client: book the class, it is confirmed. */
export function ClientDemo() {
  return (
    <Card>
      <Header title="Upcoming booking" a="Open" b="Confirmed" icon={<Icon name="calendar" size={26} />} />
      <p className="mt-8 text-[32px] font-extrabold leading-none tracking-[-.025em]">Morning Class</p>
      <p className="mt-2.5 text-[17px] leading-snug text-ink-muted">1:1 coaching · 45 minutes</p>
      <div className="mt-6 flex items-center gap-5 rounded-[24px] bg-sunken px-6 py-5">
        <div className="text-center">
          <p className={`${mono} text-[14px] leading-none text-primary-pressed`}>Oct</p>
          <p className="mt-1 text-[38px] font-extrabold leading-none tracking-[-.03em]">08</p>
        </div>
        <span className="h-12 w-px bg-line" aria-hidden />
        <div className="min-w-0">
          <p className="text-[18px] font-bold leading-tight">Thursday, October 8</p>
          <p className="mt-1.5 font-mono text-[13px] leading-none text-ink-muted">10:00–10:45 AM</p>
        </div>
      </div>
      <div className="mt-auto pt-7">
        <MorphButton idle="Book" done="Booked" loader={false} />
      </div>
      <Cursor />
    </Card>
  );
}
