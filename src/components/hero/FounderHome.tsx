import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { founderDemo as d } from "@/content/demoApp";
import { DESIGN, PIECES, type PieceId } from "./phone";

/*
 * The founder / department-head home ("Overview") as separate pieces, in the
 * product's own 390px design space (Tailwind sizes here are design px; the
 * PhoneMockup scales the whole space to the screen). Each piece is positioned
 * at its docked spot; the hero timeline flies it in from the scatter.
 * Mirrors Sherifawad-crtv/bizqwik `src/routes/Oversight.tsx`.
 */

const fmt = (n: number) => n.toLocaleString("en-US");
const label = "font-mono text-[11px] font-bold uppercase tracking-[.08em] text-ink-faint";
const card = "rounded-[28px] border border-line bg-surface shadow-card";

function Piece({ id, className = "", children }: { id: PieceId; className?: string; children: ReactNode }) {
  const p = PIECES[id];
  const style: CSSProperties = { left: p.left, top: p.top, width: p.w, height: p.h };
  return (
    <div data-piece={id} style={style} className={`absolute ${className}`}>
      {children}
    </div>
  );
}

function Delta({ text, tone = "good" }: { text: string; tone?: "good" | "neutral" }) {
  const cls = tone === "good" ? "bg-green-bg text-green-fg" : "bg-sunken text-ink-muted";
  return <span className={`tabular rounded-full px-[9px] py-[3px] font-mono text-[11px] font-bold ${cls}`}>{text}</span>;
}

function Kpi({ id, k }: { id: PieceId; k: (typeof d.kpis)[number] }) {
  const delta = "delta" in k ? k.delta : null;
  const tone = "tone" in k ? k.tone : "good";
  return (
    <Piece id={id} className={`${card} px-4 py-3`}>
      <div className="flex items-center">
        <span className="grid size-6 place-items-center rounded-lg bg-primary-tint text-primary-pressed">
          <Icon name={k.icon as IconName} size={16} />
        </span>
        <span className="ml-auto">{delta && <Delta text={delta} tone={tone} />}</span>
      </div>
      <div className={`${label} mt-1.5`}>{k.label}</div>
      <div className="tabular mt-0.5 text-[26px] font-extrabold leading-[1.05] tracking-[-.02em]">{k.value}</div>
      <div className="mt-[3px] whitespace-nowrap font-mono text-[12px] leading-[1.3] text-ink-faint">{k.sub}</div>
    </Piece>
  );
}

function Chart() {
  const { months, revenue, payouts } = d.chart;
  const W = 314;
  const top = 8;
  const bottom = 66;
  const max = Math.max(...revenue, ...payouts) * 1.15;
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const slot = W / months.length;
  const barW = 14;
  return (
    <Piece id="chart" className={`${card} px-[18px] py-3.5`}>
      <div className={label}>{d.chart.title}</div>
      <div className="mt-0.5 font-mono text-[11px] uppercase text-ink-faint">{d.chart.sub}</div>
      <div className="mt-2 flex gap-4">
        {[
          ["Revenue", "bg-primary"],
          ["Coach payouts", "bg-primary-light"],
        ].map(([name, color]) => (
          <span key={name} className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[.04em] text-ink-muted">
            <i className={`block size-2.5 rounded-[3px] ${color}`} />
            {name}
          </span>
        ))}
      </div>
      <svg width={W} height={86} viewBox={`0 0 ${W} 86`} className="mt-1 block overflow-visible">
        {[top, (top + bottom) / 2, bottom].map((gy) => (
          <line key={gy} x1={0} x2={W} y1={gy} y2={gy} className="stroke-line" strokeWidth={1} />
        ))}
        {months.map((m, i) => {
          const cx = (i + 0.5) * slot;
          return (
            <g key={m}>
              <rect data-bar x={cx - barW - 1} y={y(revenue[i])} width={barW} height={bottom - y(revenue[i])} rx={4} className="fill-primary" />
              <rect data-bar x={cx + 1} y={y(payouts[i])} width={barW} height={bottom - y(payouts[i])} rx={4} className="fill-primary-light" />
              <text x={cx} y={82} textAnchor="middle" className="fill-ink-faint font-mono text-[9px] font-bold uppercase" letterSpacing=".06em">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
    </Piece>
  );
}

function Nav() {
  return (
    <Piece id="nav" className="flex items-center gap-3">
      <div className="relative flex h-16 items-center gap-1.5 rounded-full border border-white/55 bg-surface/60 px-1.5 shadow-float backdrop-blur-xl backdrop-saturate-150">
        <span aria-hidden className="absolute left-1.5 top-1.5 size-[52px] rounded-full bg-primary-tint-strong" />
        {d.nav.map((n, i) => (
          <span key={n.label} className={`relative grid size-[52px] place-items-center rounded-full ${i === 0 ? "text-primary-pressed" : "text-ink-muted"}`}>
            <Icon name={n.icon as IconName} size={22} />
          </span>
        ))}
      </div>
      <span className="grid size-16 place-items-center rounded-full bg-primary text-white shadow-[0_12px_30px_rgba(90,65,255,.4)]">
        <Icon name="add" size={26} />
      </span>
    </Piece>
  );
}

/** Pieces layer: sits above the frame so scattered pieces can leave the screen. */
export function FounderPieces() {
  return (
    <>
      <Piece id="greeting" className="flex items-center text-[28px] font-extrabold leading-[1.15] tracking-[-.02em]">
        {d.greeting}
      </Piece>
      <Piece id="avatar" className="grid place-items-center rounded-full text-[22px] font-extrabold text-surface">
        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg,#7b5cff,#4a2fe0)" }} />
        <span className="relative">{d.initials}</span>
      </Piece>

      <Piece id="range" className="flex items-center gap-2.5">
        <div className="flex gap-1.5 rounded-full bg-sunken p-1">
          {d.ranges.map((r) => (
            <span key={r} className={`rounded-full px-3.5 py-[9px] font-mono text-[12px] font-bold uppercase tracking-[.06em] ${r === d.activeRange ? "bg-surface text-ink" : "text-ink-muted"}`}>
              {r}
            </span>
          ))}
        </div>
        <span className="ml-auto font-mono text-[11px] font-bold uppercase tracking-[.06em] text-ink-faint">{d.caption}</span>
      </Piece>

      <Piece id="revenue" className={`${card} px-5 py-4`}>
        <div className="flex items-center">
          <span className={label}>{d.revenue.label}</span>
          <span className="ml-auto">
            <Delta text={d.revenue.delta} />
          </span>
        </div>
        <div data-count={d.revenue.value} className="tabular mt-1.5 text-[48px] font-extrabold leading-none tracking-[-.03em]">
          {fmt(d.revenue.value)}
        </div>
        <div className="mt-1.5 font-mono text-[12px] leading-[1.35] text-ink-faint">{d.revenue.sub}</div>
      </Piece>

      <Kpi id="profit" k={d.kpis[0]} />
      <Kpi id="payouts" k={d.kpis[1]} />
      <Kpi id="subscribers" k={d.kpis[2]} />
      <Kpi id="wallet" k={d.kpis[3]} />
      <Chart />
      <Nav />
    </>
  );
}

/** Clipped screen layer (behind the frame): the app background and status bar. */
export function ScreenChrome() {
  return (
    <div data-chrome style={{ width: DESIGN.w, height: DESIGN.h }} className="relative">
      <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between px-[34px] pt-1 text-[15px] font-bold tabular">
        <span>9:41</span>
        <span className="flex items-center gap-1.5" aria-hidden>
          <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1.5 4a9.5 9.5 0 0 1 13 0M4 6.7a6 6 0 0 1 8 0M6.6 9.2a2.4 2.4 0 0 1 2.8 0" /></svg>
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x="0.6" y="0.6" width="22" height="10.8" rx="3.2" stroke="currentColor" strokeOpacity=".4" /><rect x="2.2" y="2.2" width="17" height="7.6" rx="2" fill="currentColor" /><rect x="24" y="4" width="1.8" height="4" rx=".9" fill="currentColor" fillOpacity=".4" /></svg>
        </span>
      </div>
    </div>
  );
}
