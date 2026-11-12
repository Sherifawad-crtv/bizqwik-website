import Link from "next/link";
import { Box, Container } from "@/components/layout/layout";
import { Button } from "@/components/ui/Button";
import { brand, business, closing, contact, contactSection, cta } from "@/content";
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

          <footer className="mt-20 grid items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[15px] text-white/60 md:grid-cols-3">
            <span>
              © {YEAR} {brand.name}
            </span>
            <nav aria-label="Footer" className="flex gap-6 md:justify-center">
              <Link href="/support" className="inline-flex min-h-11 items-center font-medium text-white/80 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                Support
              </Link>
              <Link href="/privacy" className="inline-flex min-h-11 items-center font-medium text-white/80 transition-colors duration-(--dur-instant) ease-standard hover:text-white">
                Privacy
              </Link>
            </nav>
            <span className="md:text-right">
              {business.area}, {business.city}, {business.country}
            </span>
          </footer>
        </div>
      </Container>
    </section>
  );
}
