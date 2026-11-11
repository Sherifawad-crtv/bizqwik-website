import Image from "next/image";
import { Box, Container } from "@/components/layout/layout";
import { benefits } from "@/content";

/**
 * One 3D render per card, in the order of `benefits` in content/sections.ts. Files live in public/illustrations
 * (white background; `mix-blend-multiply` lets the card colour show through, so no cut-out is needed).
 * `unoptimized`: the files are already small WebP, and re-encoding would shift the pure white the blend relies on.
 */
const ART = [
  { src: "/illustrations/checkin.webp", width: 1400, height: 1050 },
  { src: "/illustrations/payment.webp", width: 1400, height: 1050 },
  { src: "/illustrations/roster.webp", width: 1400, height: 1050 },
  { src: "/illustrations/control.webp", width: 1400, height: 1050 },
];

/** Section 4 of the outline: four outlined cards, each a title, a line and a 3D illustration. */
export function BenefitsSection() {
  return (
    <section id="benefits" aria-label="Why Bizqwik" className="py-4 lg:py-6">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <li key={b.title} data-reveal>
              <Box className="group flex h-full flex-col p-6 lg:p-8">
                <h3 className="text-[28px] font-extrabold leading-tight tracking-[-.02em]">{b.title}</h3>
                <p className="mt-3 max-w-md text-[17px] leading-snug text-ink-muted">{b.line}</p>
                <div className="mt-6 flex flex-1 items-center justify-center lg:min-h-[360px]">
                  <Image
                    {...ART[i]}
                    alt=""
                    unoptimized
                    className="h-auto w-full max-w-[460px] mix-blend-multiply transition-transform duration-(--dur-slow) ease-standard group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
                  />
                </div>
              </Box>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
