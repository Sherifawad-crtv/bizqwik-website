import Image from "next/image";
import { Box, Container } from "@/components/layout/layout";
import { Button } from "@/components/ui/Button";
import { brand, closing, contact, contactSection, cta, nav, vatNoteShort } from "@/content";
import { ClosingStatement } from "./ClosingStatement";

const YEAR = new Date().getFullYear();

/** Section 6 of the outline: the closing statement (brightens word by word), three action cards and the footer. */
export function ClosingSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-(--gutter) pt-12 lg:pt-20">
      <Container>
        <div className="rounded-[40px] bg-ink px-6 pb-8 pt-20 text-white lg:px-16 lg:pt-28">
          <h2 id="contact-title" className="sr-only">
            {contactSection.heading}
          </h2>
          <ClosingStatement>{closing.statement}</ClosingStatement>

          <ul className="mt-16 grid gap-4 md:grid-cols-3">
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

          <footer className="mt-20 border-t border-white/15 pt-10 text-[15px] text-white/70">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
              <div>
                <Image src="/brand/wordmark.png" alt="Bizqwik" width={1712} height={396} className="h-8 w-auto brightness-0 invert" />
                <p className="mt-4 max-w-xs leading-snug">{brand.tagline}</p>
              </div>
              <nav aria-label="Footer" className="flex flex-col gap-3">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[.08em] text-white/50">Explore</span>
                {nav.map((n) => (
                  <a key={n.href} href={n.href} className="w-fit text-white/80 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                    {n.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[.08em] text-white/50">Contact</span>
                <a href={contact.phoneHref} className="w-fit text-white/80 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                  {contact.phoneDisplay}
                </a>
                <a href={contact.emailHref} className="w-fit text-white/80 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-white/15 pt-6 text-[14px] text-white/50">
              <span>© {YEAR} {brand.name}</span>
              <span>{vatNoteShort}</span>
            </div>
          </footer>
        </div>
      </Container>
    </section>
  );
}
