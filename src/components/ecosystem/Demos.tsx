import Image from "next/image";
import type { ReactNode } from "react";

/*
 * One small live product moment per role, built from the real app's components and tokens.
 * Each demo is plain markup; ecosystem-motion.ts plays its loop (press, morph, success).
 * Everything here is illustrative: names and figures are stand-ins (brief GAP 7).
 */

const mono = "font-mono text-[10px] font-bold uppercase tracking-[.08em]";

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
    <div data-btn data-loader={loader ? "" : undefined} className="relative h-12">
      <div data-btn-body className="absolute left-1/2 top-0 flex h-12 w-full -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-primary text-[16px] font-bold text-white">
        <span data-btn-idle className="absolute">{idle}</span>
        <svg data-btn-spin className="absolute size-6 opacity-0" viewBox="0 0 24 24" fill="none" aria-hidden>
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

const Stage = ({ children }: { children: ReactNode }) => (
  <div data-stage className="relative w-full">
    <div data-inner>{children}</div>
  </div>
);

/* Founder: a payment lands and the whole business moves. */
export function FounderDemo() {
  const bars = [38, 46, 41, 52, 60, 66];
  return (
    <Stage>
      <div className="h-10" aria-hidden />
      <div className="flex items-center">
        <span className={`${mono} text-ink-faint`}>Revenue · EGP</span>
        <span className="ml-auto rounded-full bg-green-bg px-2 py-0.5 font-mono text-[10px] font-bold text-green-fg">▲ 16.1%</span>
      </div>
      <p className="tabular mt-1.5 text-[34px] font-extrabold leading-none tracking-[-.03em]" data-count>586,000</p>
      <svg className="mt-4 block w-full overflow-visible" viewBox="0 0 190 70" aria-hidden>
        <line x1="0" x2="190" y1="69.5" y2="69.5" className="stroke-line" />
        {bars.map((h, i) => (
          <rect key={i} data-bar={i === bars.length - 1 ? "last" : undefined} x={i * 32 + 4} y={70 - h} width="22" height={h} rx="5" className={i === bars.length - 1 ? "fill-primary" : "fill-primary-light"} style={{ transformOrigin: `${i * 32 + 15}px 70px` }} />
        ))}
      </svg>
      <div data-toast className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2 rounded-2xl bg-ink px-3 py-2 text-white opacity-0 shadow-[0_12px_24px_-8px_rgba(26,23,38,.5)]">
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green-fg"><Check size={12} /></span>
        <span className="whitespace-nowrap text-[12px] font-semibold">InstaPay · +1,500</span>
      </div>
    </Stage>
  );
}

/* Accountant: cash out, pay, paid. */
export function AccountantDemo() {
  return (
    <Stage>
      <div className="flex items-center gap-2.5">
        <Image src="/demo/role-coach.webp" alt="" width={40} height={40} unoptimized className="size-10 shrink-0 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[16px] font-bold leading-tight">Coach Nour</p>
          <p className={`${mono} mt-0.5 whitespace-nowrap text-ink-faint`}>14 sessions · Oct</p>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <p className={`${mono} text-ink-faint`}>Cash out</p>
        <span className="relative ml-auto h-[22px] w-[58px] shrink-0">
          <span data-status-a className={`${mono} absolute inset-0 grid place-items-center rounded-full bg-amber-bg text-amber-fg`}>To pay</span>
          <span data-status-b className={`${mono} absolute inset-0 grid place-items-center rounded-full bg-green-bg text-green-fg opacity-0`}>Paid</span>
        </span>
      </div>
      <p className="tabular mt-1 text-[32px] font-extrabold leading-none tracking-[-.02em]">
        4,200 <span className="text-[14px] font-bold tracking-normal text-ink-muted">EGP</span>
      </p>
      <div className="mt-4">
        <MorphButton idle="Pay" done="Paid" />
      </div>
      <Cursor />
    </Stage>
  );
}

/* Front desk: scan, and the client is in. */
const QR = (() => {
  let s = 7;
  const rnd = () => ((s = (s * 48271) % 2147483647) / 2147483647) > 0.5;
  const N = 9;
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return Array.from({ length: N * N }, (_, i) => ({ finder: finder(i % N, Math.floor(i / N)), on: rnd() }));
})();

export function FrontDeskDemo() {
  return (
    <Stage>
      <div className="relative mx-auto size-[120px] rounded-[18px] bg-sunken p-3">
        <div data-qr className="grid size-full grid-cols-9 grid-rows-9 gap-px">
          {QR.map((c, i) => (
            <span key={i} className={`rounded-[1.5px] ${c.finder ? "bg-ink" : c.on ? "bg-ink/85" : "bg-transparent"}`} />
          ))}
        </div>
        <span data-scan className="absolute inset-x-2 top-3 h-[3px] rounded-full bg-primary opacity-0 shadow-[0_0_14px_3px_rgba(90,65,255,.55)]" />
        <span data-qr-ok className="absolute inset-0 grid scale-50 place-items-center opacity-0">
          <span className="grid size-[68px] place-items-center rounded-full bg-green-fg text-white shadow-[0_10px_24px_-6px_rgba(23,122,75,.6)]">
            <Check draw size={34} />
          </span>
        </span>
      </div>
      <div data-who className="mt-4 flex items-center gap-2.5 rounded-2xl bg-sunken p-2 opacity-0">
        <Image src="/demo/role-client.webp" alt="" width={36} height={36} unoptimized className="size-9 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-tight">Mona K.</p>
          <p className={`${mono} text-green-fg`}>Checked in</p>
        </div>
      </div>
    </Stage>
  );
}

/* Coach: slide to log, and the earnings move. */
export function CoachDemo() {
  return (
    <Stage>
      <p className={`${mono} text-ink-faint`}>Strength · Fri 6:00 PM</p>
      <p className="mt-1 text-[22px] font-extrabold leading-tight tracking-[-.02em]">Log session</p>
      <div data-track className="relative mt-3.5 h-12 overflow-hidden rounded-full bg-sunken">
        <span data-fill className="absolute inset-y-0 left-0 w-12 rounded-full bg-primary/20" />
        <span data-hint className="absolute inset-0 grid place-items-center pl-8 text-[14px] font-bold text-ink-muted">Slide to log</span>
        <span data-thumb className="absolute left-1 top-1 grid size-10 place-items-center rounded-full bg-primary text-white shadow-[0_6px_14px_-4px_rgba(90,65,255,.6)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 6l6 6-6 6M13 6l6 6-6 6" /></svg>
        </span>
        <span data-logged className="absolute inset-0 flex items-center justify-center gap-1.5 bg-green-fg text-[15px] font-bold text-white opacity-0">
          <Check draw />
          Logged
        </span>
      </div>
      <div className="relative mt-4 flex items-end justify-between">
        <div>
          <p className={`${mono} text-ink-faint`}>Earned this month</p>
          <p className="tabular mt-0.5 text-[26px] font-extrabold leading-none tracking-[-.02em]"><span data-earn>4,200</span> <span className="text-[13px] font-bold tracking-normal text-ink-muted">EGP</span></p>
        </div>
        <span data-plus className="mb-0.5 rounded-full bg-green-bg px-2 py-1 font-mono text-[11px] font-bold text-green-fg opacity-0">+150</span>
      </div>
    </Stage>
  );
}

/* Client: book, and it is yours. */
export function ClientDemo() {
  return (
    <Stage>
      <p className={`${mono} text-ink-faint`}>Calisthenics</p>
      <p className="mt-1 text-[24px] font-extrabold leading-tight tracking-[-.02em]">Fri · 6:00 PM</p>
      <div className="relative mt-2 h-[24px]">
        <span data-spots-a className="absolute left-0 top-0.5 text-[14px] font-semibold text-ink-muted">3 spots left</span>
        <span data-spots-b className="absolute left-0 top-0.5 text-[14px] font-semibold text-green-fg opacity-0">You're in · 2 left</span>
        <span data-pts className="pointer-events-none absolute right-0 top-0 rounded-full bg-primary px-2.5 py-1 font-mono text-[11px] font-bold leading-none text-white opacity-0 shadow-[0_8px_18px_-6px_rgba(90,65,255,.6)]">+20 pts</span>
      </div>
      <div className="relative mt-4">
        <MorphButton idle="Book" done="Booked" loader={false} />
      </div>
      <Cursor />
    </Stage>
  );
}
