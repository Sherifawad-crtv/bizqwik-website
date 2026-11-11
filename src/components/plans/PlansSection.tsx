import { Box, Container } from "@/components/layout/layout";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cta, microcopy, plans, plansIntro, vatNote } from "@/content";
import type { Plan } from "@/content";

const fmt = (n: number) => n.toLocaleString("en-US");

/** The four or five facts that decide a plan; the full list is in the comparison below. */
function facts(p: Plan): [string, string][] {
  if (p.priceEgpMonthly === null) return [["Everything", "Custom, built around you"]];
  return [
    ["Active clients included", p.clientsIncluded],
    ["Each extra client", p.extraClient],
    ["Staff", p.staff],
    ["Departments", p.departments],
    ["Locations", p.locations],
  ];
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = plan.tag !== undefined;
  const dark = featured;
  return (
    <li data-reveal>
      <Box tone={dark ? "dark" : "surface"} className="flex h-full flex-col p-6 lg:p-7">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <h3 className="text-[26px] font-extrabold leading-none tracking-[-.02em]">{plan.name}</h3>
          {plan.tag && (
            <span className="rounded-full bg-primary px-3 py-1 text-[13px] font-bold leading-none text-white">{plan.tag}</span>
          )}
        </div>
        <p className={`mt-3 min-h-[44px] text-[16px] leading-snug ${dark ? "text-white/70" : "text-ink-muted"}`}>{plan.forWho}</p>

        <div className="mt-8 min-h-[72px]">
          {plan.priceEgpMonthly === null ? (
            <p className="text-[40px] font-extrabold leading-none tracking-[-.03em]">Contact us</p>
          ) : (
            <p className="flex items-baseline gap-2">
              <span className="text-[48px] font-extrabold leading-none tracking-[-.035em]">{fmt(plan.priceEgpMonthly)}</span>
              <span className={`text-[16px] font-semibold ${dark ? "text-white/70" : "text-ink-muted"}`}>EGP / month</span>
            </p>
          )}
        </div>

        <p className={`mt-4 text-[16px] leading-snug ${dark ? "text-white/85" : "text-ink"}`}>{plan.summary}</p>

        <dl className={`mt-6 flex-1 border-t ${dark ? "border-white/15" : "border-line"}`}>
          {facts(plan).map(([k, v]) => (
            <div key={k} className={`flex items-baseline justify-between gap-4 border-b py-3 text-[15px] ${dark ? "border-white/15" : "border-line"}`}>
              <dt className={dark ? "text-white/70" : "text-ink-muted"}>{k}</dt>
              <dd className="text-right font-bold">{v}</dd>
            </div>
          ))}
        </dl>

        <p className={`mt-5 flex items-start gap-2 text-[14px] leading-snug ${dark ? "text-white/70" : "text-ink-muted"}`}>
          <Icon name="check-circle" size={17} className="mt-px shrink-0" />
          {plan.clientExperience}
        </p>

        <Button href={cta.primary.href} variant={dark ? "secondary" : "primary"} className="mt-6 w-full">
          {plan.priceEgpMonthly === null ? microcopy.enterpriseLink : cta.primary.label}
        </Button>
      </Box>
    </li>
  );
}

/** Section 7: the four plans as equal cards (Grow inverted), then the one rule that matters about extra clients. */
export function PlansSection() {
  return (
    <section id="plans" aria-labelledby="plans-title" className="py-16 lg:py-28">
      <Container>
        <div data-reveal className="mb-10 max-w-3xl lg:mb-14">
          <span aria-hidden className="mb-4 block h-px bg-ink/15" />
          <h2 id="plans-title" className="text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-.03em] text-balance">
            {plansIntro.heading}
          </h2>
          <p className="mt-4 text-[19px] leading-snug text-ink-muted">{plansIntro.lede}</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </ul>

        <div data-reveal className="mt-4 flex flex-col gap-2 rounded-card border border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[17px] leading-snug">
            <strong className="font-extrabold">{plansIntro.callout.lead}</strong>{" "}
            <span className="text-ink-muted">{plansIntro.callout.text}</span>
          </p>
          <p className="text-[14px] text-ink-muted sm:text-right">{vatNote}</p>
        </div>
      </Container>
    </section>
  );
}
