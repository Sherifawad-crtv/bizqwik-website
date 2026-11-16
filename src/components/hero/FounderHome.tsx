import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { founderDemo as d } from "@/content/demoApp";
import { Calculator, CalendarStrip, Clipboard, Ledger, Polaroid, PunchCard, Receipt, Spreadsheet, StickyNote } from "./Chaos";
import { DESIGN, SAFE, type PieceId } from "./phone";

/*
 * The founder / department-head home ("Overview"), laid out like the dev branch of the product on an iPhone Pro Max
 * screen (440 x 957 pt): 16px side padding, 20px + safe area on top, 64px avatar, 28px section gaps, four equal
 * tiles (Profit, Revenue, Active subscribers, Coach payouts), the Revenue vs coach payouts card, the next card
 * peeking under a 64px nav pill with five 50px tabs beside a 64px FAB.
 * Mirrors Sherifawad-crtv/bizqwik (dev): routes/Oversight.tsx, overview/Cards.tsx, overview/BarChart.tsx,
 * overview/Charts.tsx, components/BottomNav.tsx, HomeAvatar.tsx, Segmented.tsx, fab/FabButton.tsx.
 *
 * Pieces are normal flow children, so the browser lays them out exactly like
 * the app; the hero timeline measures where each landed and flies it in.
 */

const fmt = (n: number) => n.toLocaleString("en-US");
const label = "font-mono text-[11px] font-bold tracking-[.08em] text-ink-faint";
const card = "bg-surface";

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

/** The app's KpiTile: icon chip and change on the first row, label, big number. No caption line in the founder view. */
function Kpi({ id, k, chaos }: { id: PieceId; k: (typeof d.kpis)[number]; chaos: ReactNode }) {
  const delta = "delta" in k ? k.delta : null;
  const tone = "tone" in k ? k.tone : "good";
  const value = typeof k.value === "number" ? fmt(k.value) : k.value;
  return (
    <Piece id={id} outer="min-w-0" chaos={chaos} className={`${card} h-full rounded-[28px] px-4 py-[14px]`}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-pressed">
          <Icon name={k.icon as IconName} size={16} />
        </span>
        <span className="ml-auto">{delta && <Delta text={delta} tone={tone} />}</span>
      </div>
      <div className={`${label} mt-2.5`}>{k.label}</div>
      <div
        {...(typeof k.value === "number" ? { "data-count": k.value } : {})}
        className="tabular mt-0.5 text-[24px] font-extrabold leading-[1.15] tracking-[-.02em] [overflow-wrap:anywhere]"
      >
        {value}
      </div>
    </Piece>
  );
}

/** The app's pill selector (Segmented): sunken track, the chosen option on a surface pill. */
function Segmented({ options, active }: { options: readonly string[]; active: string }) {
  return (
    <div className="flex w-fit gap-1.5 rounded-full bg-sunken p-1">
      {options.map((o) => (
        <span key={o} className={`whitespace-nowrap rounded-full px-3.5 py-[9px] font-mono text-[12px] font-bold tracking-[.06em] ${o === active ? "bg-surface text-ink" : "text-ink-muted"}`}>
          {o}
        </span>
      ))}
    </div>
  );
}

/** Round-topped bar with a square foot on the baseline (BarChart's own path). */
function barPath(x: number, yTop: number, w: number, yBottom: number, r: number) {
  const rr = Math.min(r, Math.max(0, yBottom - yTop));
  return `M${x},${yBottom} L${x},${yTop + rr} Q${x},${yTop} ${x + rr},${yTop} L${x + w - rr},${yTop} Q${x + w},${yTop} ${x + w},${yTop + rr} L${x + w},${yBottom} Z`;
}

const niceStep = (max: number) => {
  const raw = max / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * pow;
};
const shortNum = (v: number) => (v >= 1000 ? `${Math.round(v / 100) / 10}k` : fmt(v));

/** Port of the product's BarChart: soft bars (the taller series light, behind; the other deep, in front), faint
 * gridlines with the scale on the left, plain labels underneath and a round-dot legend. */
function Chart() {
  const { months, revenue, payouts } = d.chart;
  const W = DESIGN.w - 32 - 36; // screen - side padding - card padding
  const H = 220;
  const padL = 34;
  const top = 10;
  const bottom = 190;
  const rawMax = Math.max(...revenue, ...payouts, 1);
  const step = niceStep(rawMax);
  const max = Math.ceil(rawMax / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
  const y = (v: number) => bottom - (v / max) * (bottom - top);
  const slot = (W - padL) / months.length;
  const barW = Math.max(10, Math.min(36, slot * 0.62));
  const r = Math.min(barW / 2, 14);
  return (
    <Piece id="chart" outer="mb-3.5" chaos={<Spreadsheet />} className={`${card} rounded-[28px] px-[18px] py-4`}>
      <div className={label}>{d.chart.title}</div>
      <div className="mt-0.5 font-mono text-[12px] text-ink-faint">{d.chart.sub}</div>
      <div className="mt-3.5">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block overflow-visible">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={W} y1={y(t)} y2={y(t)} className="stroke-line" strokeWidth={1} />
              <text x={0} y={y(t) + 4} className="fill-ink-faint text-[11px] font-medium">
                {shortNum(t)}
              </text>
            </g>
          ))}
          {months.map((m, i) => {
            const x = padL + i * slot + (slot - barW) / 2;
            return (
              <g key={m}>
                <path data-bar d={barPath(x, y(revenue[i]), barW, bottom, r)} className="fill-primary-light" />
                <path data-bar d={barPath(x, y(payouts[i]), barW, bottom, r)} className="fill-primary" />
                <text x={padL + i * slot + slot / 2} y={H - 8} textAnchor="middle" className="fill-ink-muted text-[12px] font-medium">
                  {m}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-1 flex gap-[18px]">
          {[
            ["Revenue", "bg-primary-light"],
            ["Coach payouts", "bg-primary"],
          ].map(([name, color]) => (
            <span key={name} className="flex items-center gap-[7px] text-[12px] font-medium text-ink-muted">
              <i className={`block size-2.5 rounded-full ${color}`} />
              {name}
            </span>
          ))}
        </div>
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
        <Segmented options={d.ranges} active={d.activeRange} />
        <span className="ml-auto text-right font-mono text-[11px] font-bold tracking-[.06em] text-ink-faint">{d.caption}</span>
      </Piece>

      {/* The four tiles: auto-fit minmax(150px, 1fr), gap 10 */}
      <div className="mb-3.5 grid grid-cols-2 gap-2.5">
        <Kpi id="profit" k={d.kpis[0]} chaos={<Calculator />} />
        <Kpi id="revenue" k={d.kpis[1]} chaos={<Receipt />} />
        <Kpi id="subscribers" k={d.kpis[2]} chaos={<Clipboard />} />
        <Kpi id="payouts" k={d.kpis[3]} chaos={<Ledger />} />
      </div>

      <Chart />

      {/* The next card in the app's scroll, peeking out under the nav */}
      <Piece id="sources" outer="min-h-0 flex-1" chaos={<PunchCard />} className={`${card} h-full overflow-hidden rounded-[28px] px-[18px] py-4`}>
        <div className={label}>{d.sources.title}</div>
        <div className="mt-0.5 font-mono text-[12px] text-ink-faint">{d.sources.sub}</div>
        <div className="mt-3.5">
          <Segmented options={d.sources.options} active={d.sources.active} />
        </div>
      </Piece>

      {/* Fixed bottom bar: 16px sides, 12px + home indicator below, nav pill + 64px FAB, 12px apart */}
      <div className="absolute inset-x-0 flex items-center justify-center gap-3 px-4" style={{ bottom: 12 + SAFE.bottom }}>
        <Piece id="nav" outer="shrink-0 will-change-transform" className="relative flex h-16 will-change-[opacity,transform] items-center gap-1.5 overflow-hidden rounded-full border border-white/55 bg-surface/55 px-1.5 shadow-[0_14px_34px_rgba(26,23,38,.18),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-[28px] backdrop-saturate-[1.8]">
          <span aria-hidden className="absolute left-1.5 top-[6px] size-[50px] rounded-full bg-primary-tint-strong" />
          {d.nav.map((n, i) => (
            <span key={n.label} className={`relative grid size-[50px] shrink-0 place-items-center rounded-full ${i === 0 ? "text-primary-pressed" : "text-ink-muted"}`}>
              <Icon name={n.icon as IconName} solid={i === 0} size={22} strokeWidth={1.9} />
            </span>
          ))}
        </Piece>
        <Piece id="fab" outer="shrink-0 will-change-transform" className="grid size-16 will-change-[opacity,transform] shrink-0 place-items-center rounded-full bg-primary text-surface shadow-[0_12px_30px_rgba(90,65,255,.4)]">
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
