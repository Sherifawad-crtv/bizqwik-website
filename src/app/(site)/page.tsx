import { FeatureList } from "@/components/features/FeatureList";
import { Hero } from "@/components/hero/Hero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { FaqSection } from "@/components/plans/FaqSection";
import { PlansSection } from "@/components/plans/PlansSection";
import { StatementSection } from "@/components/sections/StatementSection";

/** The landing outline (docs/PLAN-landing-outline.md): hero, dark statement, cards, feature stage, brief sections, closing. */
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <StatementSection />
      <BenefitsSection />
      <FeatureList />
      <PlansSection />
      <FaqSection />
      <ClosingSection />
    </main>
  );
}
