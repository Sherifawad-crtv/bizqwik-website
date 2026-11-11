import { Box, Container } from "@/components/layout/layout";
import { Button } from "@/components/ui/Button";
import { closing, contact, contactSection, cta, nav } from "@/content";

/** Section 6 of the outline: the closing statement, three action cards and the footer. Skeleton: the statement is static (phase 8 scrubs it in). */
export function ClosingSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-3 pb-3 pt-12 lg:px-4 lg:pb-4 lg:pt-20">
      <div className="rounded-[40px] bg-ink px-6 pb-8 pt-20 text-white lg:px-16 lg:pt-28">
        <Container className="px-0 lg:px-0">
          <h2 id="contact-title" className="sr-only">
            {contactSection.heading}
          </h2>
          <p className="max-w-3xl text-[clamp(1.75rem,1rem+2.4vw,3rem)] font-bold leading-[1.1] tracking-[-.025em] text-balance">{closing.statement}</p>

          <ul className="mt-16 grid gap-3 md:grid-cols-3">
            {[
              { title: "Talk to us", action: <Button href={contact.phoneHref}>{contact.phoneDisplay}</Button> },
              { title: "Write to us", action: <Button href={contact.emailHref}>{contact.email}</Button> },
              { title: "See the plans", action: <Button href={cta.secondary.href} variant="secondary">{cta.secondary.label}</Button> },
            ].map((c) => (
              <li key={c.title} data-reveal>
                <Box tone="raised" className="flex h-full flex-col items-center gap-6 px-6 py-10 text-center">
                  <h3 className="text-[26px] font-extrabold leading-tight tracking-[-.02em]">{c.title}</h3>
                  {c.action}
                </Box>
              </li>
            ))}
          </ul>

          <footer className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[15px] text-white/70">
            <span className="font-semibold text-white">Bizqwik</span>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-white/70 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                  {n.label}
                </a>
              ))}
            </nav>
          </footer>
        </Container>
      </div>
    </section>
  );
}
