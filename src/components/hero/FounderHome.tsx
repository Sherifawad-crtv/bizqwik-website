import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { founderDemo as d } from "@/content/demoApp";
import { Calculator, CalendarStrip, Clipboard, Ledger, Polaroid, PunchCard, Receipt, Spreadsheet, StickyNote } from "./Chaos";
import { DESIGN, SAFE, type PieceId } from "./phone";

/*
 * The founder / department-head home ("Overview"), laid out with the product's
 * real numbers on an iPhone Pro Max screen (440 x 957 pt): 16px side padding,
 * 20px + safe area on top, 64px avatar, 28px section gaps, 64px nav pill with
 * five 52px tabs beside a 64px FAB, 12px + home-indicator below.
 * Mirrors Sherifawad-crtv/bizqwik: routes/Oversight.tsx, Shell.tsx,
 * BottomNav.tsx, Fab.tsx, HomeAvatar.tsx, Segmented.tsx, RouteTransition.tsx.
 *
 * Pieces are normal flow children, so the browser lays them out exactly like
 * the app; the hero timeline measures where each landed and flies it in.
 */

const fmt = (n: number) => n.toLocaleString("en-US");
const mono11 = "font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint";
const card = "border border-line bg-surface";

/**
 * A piece has an outer layout box (what the app's flow lays out and the timeline moves),
 * the Bizqwik face (`data-order`) and, optionally, the manual "before" face (`data-chaos`)
 * that morphs into it.
 */
function Piece({ id, outer = "", className = "", chaos, children }: { id: PieceId; outer?: string; className?: string; chaos?: ReactNode; children: ReactNode }) {
  return (
    <div data-piece={id} className={`relative ${outer}`}>
      <div data-order className={className}>
        {children}
      </div>
      {chaos}
    </div>
  );
}

function Delta({ text, tone = "good" }: { text: string; tone?: "good" | "neutral" }) {
  const cls = tone === "good" ? "bg-green-bg text-green-fg" : "bg-sunken text-ink-muted";
  return <span className={`tabular shrink-0 whitespace-nowrap rounded-full px-[9px] py-[3px] font-mono text-[11px] font-bold tracking-[.02em] ${cls}`}>{text}</span>;
}

function Kpi({ id, k, chaos }: { id: PieceId; k: (typeof d.kpis)[number]; chaos: ReactNode }) {
  const delta = "delta" in k ? k.delta : null;
  const tone = "tone" in k ? k.tone : "good";
  return (
    <Piece id={id} outer="min-w-0" chaos={chaos} className={`${card} h-full rounded-[28px] px-4 py-[14px]`}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-pressed">
          <Icon name={k.icon as IconName} size={16} />
        </span>
        <span className="ml-auto">{delta && <Delta text={delta} tone={tone} />}</span>
      </div>
      <div className={`${mono11} mt-2.5 uppercase`}>{k.label}</div>
      <div className="tabular mt-0.5 text-[24px] font-extrabold leading-[1.15] tracking-[-.02em] [overflow-wrap:anywhere]">{k.value}</div>
      <div className="mt-1 font-mono text-[12px] leading-[1.4] text-ink-faint">{k.sub}</div>
    </Piece>
  );
}

/** Rounded-top bar, square at the baseline (the product's own chart path). */
function barPath(x: number, yTop: number, w: number, yBottom: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, yBottom - yTop));
  return `M${x},${yBottom} L${x},${yTop + rr} Q${x},${yTop} ${x + rr},${yTop} L${x + w - rr},${yTop} Q${x + w},${yTop} ${x + w},${yTop + rr} L${x + w},${yBottom} Z`;
}

/** Port of the product's RevenueChart: one EGP axis, two series, revenue direct-labelled. */
function Chart() {
  const { months, revenue, payouts } = d.chart;
  const W = DESIGN.w - 32 - 36; // screen - side padding - card padding
  const H = 210;
  const top = 26;
  const bottom = 172;
  const max = Math.max(...revenue, ...payouts) * 1.15;
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const slot = W / months.length;
  const barW = Math.max(6, Math.min(18, slot / 3));
  return (
    <Piece id="chart" outer="min-h-0 flex-1" chaos={<Spreadsheet />} className={`${card} h-full overflow-hidden rounded-2xl px-[18px] py-4`}>
      <div className={`${mono11} uppercase`}>{d.chart.title}</div>
      <div className="mt-0.5 font-mono text-[12px] uppercase text-ink-faint">{d.chart.sub}</div>
      <div className="mt-3.5">
        <div className="mb-2 flex gap-4">
          {[
            ["Revenue", "bg-primary"],
            ["Coach payouts", "bg-primary-light"],
          ].map(([name, color]) => (
            <span key={name} className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[.04em] text-ink-muted">
              <i className={`block size-2.5 rounded-[3px] ${color}`} />
              {name}
            </span>
          ))}
        </div>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block overflow-visible">
          {[top, (top + bottom) / 2, bottom].map((gy) => (
            <line key={gy} x1={0} x2={W} y1={gy} y2={gy} className="stroke-line" strokeWidth={1} />
          ))}
          {months.map((m, i) => {
            const cx = (i + 0.5) * slot;
            return (
              <g key={m}>
                <path data-bar d={barPath(cx - barW - 1, y(revenue[i]), barW, bottom, 4)} className="fill-primary" />
                <path data-bar d={barPath(cx + 1, y(payouts[i]), barW, bottom, 4)} className="fill-primary-light" />
                <text x={cx - barW / 2 - 1} y={y(revenue[i]) - 8} textAnchor="middle" className="fill-ink text-[11px] font-extrabold">
                  {Math.round(revenue[i] / 100) / 10}k
                </text>
                <text x={cx} y={H - 4} textAnchor="middle" className="fill-ink-faint font-mono text-[10px] font-bold uppercase" letterSpacing=".06em">
                  {m}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Piece>
  );
}

/** The screen content: normal flow, positioned with the product's real paddings. */
export function FounderPieces() {
  return (
    <div className="absolute inset-0 flex flex-col px-4 pb-[21px]" style={{ paddingTop: 20 + SAFE.top }}>
      {/* HomeAvatar: greeting opposite a 64px avatar, 28px below */}
      <div className="mb-7 flex items-center justify-between gap-3">
        <Piece id="greeting" chaos={<StickyNote />} className="text-[28px] font-extrabold leading-[1.15] tracking-[-.02em]">
          {d.greeting}
        </Piece>
        <Piece id="avatar" outer="size-16 shrink-0" chaos={<Polaroid />} className="size-full overflow-hidden rounded-full">
          <Image src={d.avatar} alt="" width={64} height={64} unoptimized priority className="size-full object-cover" />
        </Piece>
      </div>

      {/* Range selector + caption */}
      <Piece id="range" outer="mb-3" chaos={<CalendarStrip />} className="flex items-center gap-2.5">
        <div className="flex w-fit gap-1.5 rounded-full bg-sunken p-1">
          {d.ranges.map((r) => (
            <span key={r} className={`whitespace-nowrap rounded-full px-3.5 py-[9px] font-mono text-[12px] font-bold uppercase tracking-[.06em] ${r === d.activeRange ? "bg-surface text-ink" : "text-ink-muted"}`}>
              {r}
            </span>
          ))}
        </div>
        <span className="ml-auto text-right font-mono text-[11px] font-bold uppercase tracking-[.06em] text-ink-faint">{d.caption}</span>
      </Piece>

      {/* Revenue hero */}
      <Piece id="revenue" outer="mb-2.5" chaos={<Receipt />} className={`${card} rounded-[28px] px-5 pb-[18px] pt-5`}>
        <div className="flex items-center gap-2">
          <span className={`${mono11} uppercase`}>{d.revenue.label}</span>
          <span className="ml-auto">
            <Delta text={d.revenue.delta} />
          </span>
        </div>
        <div data-count={d.revenue.value} className="tabular mt-2 text-[56px] font-extrabold leading-none tracking-[-.03em] [overflow-wrap:anywhere]">
          {fmt(d.revenue.value)}
        </div>
        <div className="mt-2 font-mono text-[12px] leading-[1.4] text-ink-faint">{d.revenue.sub}</div>
      </Piece>

      {/* KPI tiles: auto-fit minmax(150px, 1fr), gap 10 */}
      <div className="mb-3.5 grid grid-cols-2 gap-2.5">
        <Kpi id="profit" k={d.kpis[0]} chaos={<Calculator />} />
        <Kpi id="payouts" k={d.kpis[1]} chaos={<Ledger />} />
        <Kpi id="subscribers" k={d.kpis[2]} chaos={<Clipboard />} />
        <Kpi id="wallet" k={d.kpis[3]} chaos={<PunchCard />} />
      </div>

      <Chart />

      {/* Fixed bottom bar: 16px sides, 12px + home indicator below, nav pill + 64px FAB, 12px apart */}
      <div className="absolute inset-x-0 flex items-center justify-center gap-3 px-4" style={{ bottom: 12 + SAFE.bottom }}>
        <Piece id="nav" outer="shrink-0" className="relative flex h-16 items-center gap-1.5 overflow-hidden rounded-full border border-white/55 bg-surface/55 px-1.5 shadow-[0_14px_34px_rgba(26,23,38,.18),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-[28px] backdrop-saturate-[1.8]">
          <span aria-hidden className="absolute left-1.5 top-[6px] size-[52px] rounded-full bg-primary-tint-strong" />
          {d.nav.map((n, i) => (
            <span key={n.label} className={`relative grid size-[52px] shrink-0 place-items-center rounded-full ${i === 0 ? "text-primary-pressed" : "text-ink-muted"}`}>
              <Icon name={n.icon as IconName} solid={i === 0} size={22} strokeWidth={1.9} />
            </span>
          ))}
        </Piece>
        <Piece id="fab" outer="shrink-0" className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-surface shadow-[0_12px_30px_rgba(90,65,255,.4)]">
          <Icon name="add" size={28} strokeWidth={2.4} />
        </Piece>
      </div>
    </div>
  );
}

/** Clipped screen layer (behind the frame): status bar at the device's real position. */
export function ScreenChrome() {
  return (
    <div data-chrome style={{ width: DESIGN.w, height: DESIGN.h }} className="relative">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[44px] text-[17px] font-semibold tabular" style={{ height: SAFE.top, paddingTop: 6 }}>
        <span>9:41</span>
        <span className="flex items-center gap-[7px]" aria-hidden>
          <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor"><rect x="0" y="7.5" width="3.2" height="4.5" rx="1" /><rect x="5.3" y="5" width="3.2" height="7" rx="1" /><rect x="10.6" y="2.5" width="3.2" height="9.5" rx="1" /><rect x="15.8" y="0" width="3.2" height="12" rx="1" /></svg>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1.6 4.4a10.2 10.2 0 0 1 13.8 0M4.2 7.2a6.5 6.5 0 0 1 8.6 0M6.9 9.9a2.6 2.6 0 0 1 3.2 0" /></svg>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.6" y="0.6" width="23" height="11.8" rx="3.6" stroke="currentColor" strokeOpacity=".4" /><rect x="2.3" y="2.3" width="19.6" height="8.4" rx="2.2" fill="currentColor" /><rect x="25" y="4.4" width="1.8" height="4.2" rx=".9" fill="currentColor" fillOpacity=".4" /></svg>
        </span>
      </div>
    </div>
  );
}
