import { Box, Container, Skeleton } from "@/components/layout/layout";
import { addonsIntro, faqHeading, plansIntro } from "@/content";

/**
 * Sections the reference page does not have but the brief requires (Plans, Add-ons, FAQ). They keep
 * their nav anchors working and use the same hairline-box language; phase 7 fills them.
 */
function Shell({ id, heading, lede, slot }: { id: string; heading: string; lede?: string; slot: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-12 lg:py-20">
      <Container>
        <h2 id={`${id}-title`} className="max-w-3xl text-h3 font-extrabold text-balance">
          {heading}
        </h2>
        {lede && <p className="mt-3 max-w-2xl text-body text-ink-muted">{lede}</p>}
        <Box tone="paper" className="mt-8 p-4 lg:p-6">
          <Skeleton className="min-h-[320px]">{slot}</Skeleton>
        </Box>
      </Container>
    </section>
  );
}

export const PlansShell = () => <Shell id="plans" heading={plansIntro.heading} lede={plansIntro.lede} slot="Plans and comparison · phase 7" />;
export const AddonsShell = () => <Shell id="add-ons" heading={addonsIntro.heading} lede={addonsIntro.lede} slot="Add-ons · phase 7" />;
export const FaqShell = () => <Shell id="faq" heading={faqHeading} slot="FAQ · phase 7" />;
