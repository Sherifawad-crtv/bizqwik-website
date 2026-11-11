import { Container } from "@/components/layout/layout";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { addonGroups, addonsIntro, cta, microcopy } from "@/content";

/** Add-ons: no prices, as the brief says. Groups sit in a grid of simple outlined cards. */
export function AddonsSection() {
  return (
    <section id="add-ons" aria-labelledby="add-ons-title" className="pb-16 lg:pb-28">
      <Container>
        <div data-reveal className="mb-10 max-w-3xl lg:mb-14">
          <span aria-hidden className="mb-4 block h-px bg-ink/15" />
          <h2 id="add-ons-title" className="text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-.03em] text-balance">
            {addonsIntro.heading}
          </h2>
          <p className="mt-4 text-[19px] leading-snug text-ink-muted">{addonsIntro.lede}</p>
        </div>

        <div className="grid gap-x-4 gap-y-10 md:grid-cols-2">
          {addonGroups.map((g) => (
            <div key={g.label}>
              <h3 data-reveal className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[.08em] text-ink-muted">
                {g.label}
              </h3>
              <ul className="grid gap-4">
                {g.addons.map((a) => (
                  <li key={a.name} data-reveal className="flex items-start gap-4 rounded-card border border-line bg-surface p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-primary-tint text-primary-pressed">
                      <Icon name={a.icon as IconName} size={24} />
                    </span>
                    <div>
                      <p className="text-[18px] font-extrabold leading-tight tracking-[-.01em]">{a.name}</p>
                      <p className="mt-1.5 text-[15px] leading-snug text-ink-muted">{a.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-[17px] text-ink-muted">{microcopy.addonsLink}</p>
          <Button href={cta.primary.href}>{cta.primary.label}</Button>
        </div>
      </Container>
    </section>
  );
}
