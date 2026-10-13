/** Typed shapes for all page content. Components render these; they never hold copy. */

export type AppId = "founder" | "accountant" | "frontDesk" | "coaches" | "client";
export type PlanId = "solopreneur" | "grow" | "scale" | "enterprise";
export type SectionId = "top" | "ecosystem" | "apps" | "client-app" | "plans" | "compare" | "add-ons" | "faq" | "contact";

export interface Link {
  label: string;
  href: string;
}

/** Table cell: included tick (optionally with a note), not included, or text. */
export type Cell = { kind: "yes"; note?: string } | { kind: "no" } | { kind: "text"; text: string };

export interface AppSummary {
  id: AppId;
  number: string;
  title: string;
  role: string;
  usedBy: string;
  /** Solar icon name (linear weight). */
  icon: string;
}

export interface Bullet {
  /** Bold lead-in before the colon. */
  lead?: string;
  text: string;
  /** ★ rows: soft tint background. */
  highlight?: boolean;
  /** Amber tag, e.g. "Scale plan only". */
  tag?: string;
}

export interface AppBlock {
  id: AppId;
  eyebrow: string;
  usedBy: string;
  headline: string;
  bullets: Bullet[];
  /** Coaches app only. */
  tierPills?: { label: string; filled?: boolean }[];
  callout?: string;
  caption: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  tag?: string;
  forWho: string;
  /** EGP per month, excluding VAT. `null` = "Contact us"; Enterprise never shows a number. */
  priceEgpMonthly: number | null;
  clientsIncluded: string;
  extraClient: string;
  summary: string;
  staff: string;
  departments: string;
  locations: string;
  physicalIntegrations: string;
  clientExperience: string;
  nextPlan: string;
}

export interface CompareRow {
  label: string;
  values: [Cell, Cell, Cell, Cell];
}

export interface CompareGroup {
  label: string;
  rows: CompareRow[];
}

export interface Addon {
  name: string;
  line: string;
  icon: string;
}

export interface AddonGroup {
  label: string;
  addons: Addon[];
}

export interface FaqItem {
  question: string;
  answer: string;
  cta?: Link;
}
