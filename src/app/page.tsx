import { Ecosystem } from "@/components/ecosystem/Ecosystem";
import { Hero } from "@/components/hero/Hero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { AddonsShell, FaqShell, PlansShell } from "@/components/sections/Shells";
import { StatementSection } from "@/components/sections/StatementSection";

/** The landing outline (docs/PLAN-landing-outline.md): hero, dark statement, cards, feature stage, brief sections, closing. */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StatementSection />
      <BenefitsSection />
      <Ecosystem />
      <PlansShell />
      <AddonsShell />
      <FaqShell />
      <ClosingSection />
    </main>
  );
}
