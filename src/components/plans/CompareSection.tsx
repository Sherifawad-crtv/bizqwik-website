import { Container } from "@/components/layout/layout";
import { Icon } from "@/components/ui/Icon";
import { compareFooter, compareGroups, compareHeading, microcopy, plans } from "@/content";
import type { Cell } from "@/content";

function CellView({ cell }: { cell: Cell }) {
  if (cell.kind === "no")
    return (
      <span className="text-ink-faint">
        <span aria-hidden>–</span>
        <span className="sr-only">{microcopy.notIncluded}</span>
      </span>
    );
  if (cell.kind === "yes")
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-green-fg">
        <Icon name="check-circle" size={18} />
        <span className={cell.note ? "" : "sr-only"}>{cell.note ?? microcopy.included}</span>
      </span>
    );
  return <span>{cell.text}</span>;
}

/** Every plan side by side. Wide screens get a table with Grow tinted; phones get one block per plan, so nothing scrolls sideways. */
export function CompareSection() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="pb-16 lg:pb-28">
      <Container>
        <h2 id="compare-title" data-reveal className="mb-8 max-w-3xl text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-extrabold leading-[1.1] tracking-[-.025em]">
          {compareHeading}
        </h2>

        {/* Table, from 768px */}
        <div data-reveal className="hidden overflow-hidden rounded-card border border-line md:block">
          <table className="w-full table-fixed border-collapse text-left text-[15px]">
            <caption className="sr-only">{compareHeading}</caption>
            <colgroup>
              <col className="w-[28%]" />
              {plans.map((p) => (
                <col key={p.id} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-line">
                <td />
                {plans.map((p) => (
                  <th key={p.id} scope="col" className={`px-4 py-5 text-[18px] font-extrabold ${p.tag ? "bg-primary-tint" : ""}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            {compareGroups.map((g) => (
              <tbody key={g.label}>
                <tr>
                  <th colSpan={5} scope="colgroup" className="bg-sunken px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[.08em] text-ink-muted">
                    {g.label}
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.label} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3.5 font-semibold">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className={`px-4 py-3.5 ${plans[i].tag ? "bg-primary-tint" : ""}`}>
                        <CellView cell={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        {/* One block per plan, under 768px */}
        <div className="grid gap-4 md:hidden">
          {plans.map((p, pi) => (
            <div key={p.id} data-reveal className={`rounded-card border border-line p-5 ${p.tag ? "bg-primary-tint" : "bg-surface"}`}>
              <h3 className="text-[22px] font-extrabold tracking-[-.02em]">{p.name}</h3>
              {compareGroups.map((g) => (
                <dl key={g.label} className="mt-4">
                  <dt className="font-mono text-[12px] font-bold uppercase tracking-[.08em] text-ink-muted">{g.label}</dt>
                  {g.rows.map((r) => (
                    <div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[15px] last:border-b-0">
                      <dd className="order-2 text-right font-semibold">
                        <CellView cell={r.values[pi]} />
                      </dd>
                      <dt className="order-1 text-ink-muted">{r.label}</dt>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
          ))}
        </div>

        <p data-reveal className="mt-6 max-w-4xl text-[16px] leading-relaxed text-ink-muted">
          <strong className="font-extrabold text-ink">{compareFooter.inEveryPlanLead}</strong> {compareFooter.inEveryPlan}
        </p>
      </Container>
    </section>
  );
}
