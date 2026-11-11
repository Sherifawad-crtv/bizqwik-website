import { Box, Container, Skeleton } from "@/components/layout/layout";
import { benefits } from "@/content";

/** Section 4 of the outline: four outlined cards, each a title, a line and an illustration slot (phase 5). */
export function BenefitsSection() {
  return (
    <section id="benefits" aria-label="Why Bizqwik" className="py-4 lg:py-6">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <li key={b.title} data-reveal>
              <Box className="flex h-full flex-col p-6 lg:p-8">
                <h3 className="text-[28px] font-extrabold leading-tight tracking-[-.02em]">{b.title}</h3>
                <p className="mt-3 max-w-md text-[17px] leading-snug text-ink-muted">{b.line}</p>
                <Skeleton className="mt-8 min-h-[260px] flex-1 lg:min-h-[320px]">Illustration · phase 5</Skeleton>
              </Box>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
