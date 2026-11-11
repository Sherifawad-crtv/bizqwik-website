import { Box, Container } from "@/components/layout/layout";
import { benefits } from "@/content";
import { CheckInArt, ControlArt, PaymentArt, RosterArt } from "./BenefitArt";

/** One illustration per card, in the order of `benefits` in content/sections.ts. */
const ART = [CheckInArt, PaymentArt, RosterArt, ControlArt];

/** Section 4 of the outline: four outlined cards, each a title, a line and an illustration drawn from our product pieces. */
export function BenefitsSection() {
  return (
    <section id="benefits" aria-label="Why Bizqwik" className="py-4 lg:py-6">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => {
            const Art = ART[i];
            return (
              <li key={b.title} data-reveal>
                <Box className="group flex h-full flex-col p-6 lg:p-8">
                  <h3 className="text-[28px] font-extrabold leading-tight tracking-[-.02em]">{b.title}</h3>
                  <p className="mt-3 max-w-md text-[17px] leading-snug text-ink-muted">{b.line}</p>
                  <div className="mt-8 flex flex-1 items-center lg:min-h-[340px]">
                    <Art />
                  </div>
                </Box>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
