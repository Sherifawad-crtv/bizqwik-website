import Image from "next/image";
import { Box, Container } from "@/components/layout/layout";
import { benefits } from "@/content";

/**
 * One 3D clay render per card, in the order of `benefits` in content/sections.ts (check-in, payment, who's coming,
 * numbers). Files live in public/illustrations, 1400 x 1050 WebP on a lavender backdrop, shown as a rounded tile.
 */
const ART = [
  { src: "/illustrations/benefit-checkin.webp", width: 1400, height: 1050 },
  { src: "/illustrations/benefit-payment.webp", width: 1400, height: 1050 },
  { src: "/illustrations/benefit-roster.webp", width: 1400, height: 1050 },
  { src: "/illustrations/benefit-numbers.webp", width: 1400, height: 1050 },
];

/** Section 4 of the outline: four outlined cards, each a title, a line and a 3D illustration. */
export function BenefitsSection() {
  return (
    <section id="benefits" aria-label="Why Bizqwik" className="py-4 lg:py-6">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <li key={b.title} data-reveal>
              <Box className="flex h-full flex-col p-6 lg:p-8">
                <h3 className="text-[28px] font-extrabold leading-tight tracking-[-.02em]">{b.title}</h3>
                <p className="mt-3 max-w-md text-[17px] leading-snug text-ink-muted">{b.line}</p>
                <div className="mt-6 flex flex-1 items-end">
                  <Image {...ART[i]} alt="" sizes="(min-width: 1024px) 560px, (min-width: 640px) 45vw, 100vw" className="h-auto w-full rounded-[24px]" />
                </div>
              </Box>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
