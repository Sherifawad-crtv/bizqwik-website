/*
 * One small live product moment per role, built from the real app's components and tokens, and
 * stripped to what the component itself needs: no avatars, no captions, no labels.
 * Each demo is plain markup; ecosystem-motion.ts plays its loop (press, morph, success).
 * Figures are illustrative stand-ins (brief GAP 7).
 */

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

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div data-stage className="relative w-full">
    <div data-inner>{children}</div>
  </div>
);

/* Founder: a payment lands and the whole business moves. */
export function FounderDemo() {
  const bars = [38, 46, 41, 52, 60, 66];
  return (
    <Stage>
      <div className="h-11" aria-hidden />
      <p className="tabular text-[44px] font-extrabold leading-none tracking-[-.03em]" data-count>586,000</p>
      <svg className="mt-5 block w-full overflow-visible" viewBox="0 0 190 70" aria-hidden>
        <line x1="0" x2="190" y1="69.5" y2="69.5" className="stroke-line" />
        {bars.map((h, i) => (
          <rect key={i} data-bar={i === bars.length - 1 ? "last" : undefined} x={i * 32 + 4} y={70 - h} width="22" height={h} rx="5" className={i === bars.length - 1 ? "fill-primary" : "fill-primary-light"} style={{ transformOrigin: `${i * 32 + 15}px 70px` }} />
        ))}
      </svg>
      <div data-toast className="pointer-events-none absolute left-0 top-0 flex items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-4 text-white opacity-0 shadow-[0_12px_24px_-8px_rgba(26,23,38,.5)]">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-green-fg"><Check size={14} /></span>
        <span className="tabular whitespace-nowrap text-[14px] font-bold">+1,500</span>
      </div>
    </Stage>
  );
}

/* Accountant: cash out, pay, paid. */
export function AccountantDemo() {
  return (
    <Stage>
      <p data-amount className="tabular text-[44px] font-extrabold leading-none tracking-[-.03em]">
        4,200 <span className="text-[16px] font-bold tracking-normal opacity-60">EGP</span>
      </p>
      <div className="mt-6">
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
      <div className="relative mx-auto size-[148px] rounded-[22px] bg-sunken p-3.5">
        <div data-qr className="grid size-full grid-cols-9 grid-rows-9 gap-px">
          {QR.map((c, i) => (
            <span key={i} className={`rounded-[1.5px] ${c.finder ? "bg-ink" : c.on ? "bg-ink/85" : "bg-transparent"}`} />
          ))}
        </div>
        <span data-scan className="absolute inset-x-3 top-3.5 h-[3px] rounded-full bg-primary opacity-0 shadow-[0_0_14px_3px_rgba(90,65,255,.55)]" />
        <span data-qr-ok className="absolute inset-0 grid scale-50 place-items-center opacity-0">
          <span className="grid size-[84px] place-items-center rounded-full bg-green-fg text-white shadow-[0_10px_24px_-6px_rgba(23,122,75,.6)]">
            <Check draw size={42} />
          </span>
        </span>
      </div>
    </Stage>
  );
}

/* Coach: slide to log, and the earnings move. */
export function CoachDemo() {
  return (
    <Stage>
      <div data-track className="relative h-14 overflow-hidden rounded-full bg-sunken">
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
      <div className="relative mt-6 flex items-end justify-between">
        <p className="tabular text-[40px] font-extrabold leading-none tracking-[-.03em]"><span data-earn>4,200</span> <span className="text-[16px] font-bold tracking-normal text-ink-muted">EGP</span></p>
        <span data-plus className="mb-1 rounded-full bg-green-bg px-2.5 py-1 font-mono text-[12px] font-bold text-green-fg opacity-0">+150</span>
      </div>
    </Stage>
  );
}

/* Client: book, and a spot is yours. Three spots as dots; one fills when you book. */
export function ClientDemo() {
  return (
    <Stage>
      <div className="flex items-center justify-center gap-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} data-dot={i === 2 ? "you" : undefined} className="grid size-9 place-items-center rounded-full border-2 border-line bg-sunken text-white">
            {i === 2 && <span data-dot-check className="opacity-0"><Check draw size={18} /></span>}
          </span>
        ))}
      </div>
      <div className="mt-7">
        <MorphButton idle="Book" done="Booked" loader={false} />
      </div>
      <Cursor />
    </Stage>
  );
}
