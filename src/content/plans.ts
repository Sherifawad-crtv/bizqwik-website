import type { CompareGroup, Plan, PlanId } from "./types";

/**
 * Display content for the marketing page. These numbers are NOT billing logic:
 * when subscriptions ship, the backend owns plans and money (see docs/DECISIONS.md D-005).
 * Hard rules: Enterprise never shows a number; extra members never cost more than the next plan.
 */

export const plansIntro = {
  heading: "Three plans. One monthly price each.",
  lede: "Priced by active members and team size.",
  callout: {
    lead: "Extra members never cost more than the next plan.",
    text: "If extra-member charges would pass the next plan's price, you move up.",
  },
} as const;

export const plans: Plan[] = [
  {
    id: "solopreneur",
    name: "Solopreneur",
    forWho: "Independent coaches and solo studios",
    priceEgpMonthly: 1290,
    clientsIncluded: "60",
    extraClient: "25 EGP",
    summary: "The founder app and a branded booking page.",
    staff: "1",
    departments: "1",
    locations: "1",
    physicalIntegrations: "Not included",
    clientExperience: "Branded booking page",
    nextPlan: "Grow · 4,990 EGP / month · 300 members, 10 staff and all five apps",
  },
  {
    id: "grow",
    name: "Grow",
    tag: "Best fit for studios",
    forWho: "Fitness studios with a team",
    priceEgpMonthly: 4990,
    clientsIncluded: "300",
    extraClient: "20 EGP",
    summary: "All five apps, with a branded client app (PWA).",
    staff: "10",
    departments: "1",
    locations: "1",
    physicalIntegrations: "Not included",
    clientExperience: "Branded client app (PWA)",
    nextPlan: "Enterprise · Contact us · For multi-studio groups",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    forWho: "Multi-studio groups",
    priceEgpMonthly: null,
    clientsIncluded: "Custom",
    extraClient: "Custom",
    summary: "Custom limits, apps and integrations.",
    staff: "Custom",
    departments: "Custom",
    locations: "Custom",
    physicalIntegrations: "Custom",
    clientExperience: "Custom",
    nextPlan: "Custom · Contact us.",
  },
];

export const planById = (id: PlanId): Plan => plans.find((p) => p.id === id)!;

/** Which of the five apps each plan includes (plan detail panels: lit vs dimmed). */
export const planApps: Record<PlanId, { founder: string; accountant: boolean | string; frontDesk: boolean | string; coaches: boolean | string; client: string }> = {
  solopreneur: { founder: "Included", accountant: false, frontDesk: false, coaches: false, client: "Branded booking page" },
  grow: { founder: "Included", accountant: true, frontDesk: true, coaches: true, client: "Branded client app (PWA)" },
  enterprise: { founder: "Custom", accountant: "Custom", frontDesk: "Custom", coaches: "Custom", client: "Custom" },
};

/** Enterprise gets its own treatment: a numbered list, never a number. */
export const enterprisePanel = {
  summary: "Custom limits, apps and integrations.",
  listHeading: "Each limit is set with you.",
  listNote: "Set per group.",
  items: [
    "Active members included",
    "Each extra member",
    "Staff",
    "Departments",
    "Locations",
    "Apps included",
    "Member experience",
    "Physical integrations (e.g. gate access)",
  ],
} as const;

export const compareHeading = "Every plan, side by side.";

const yes = { kind: "yes" } as const;
const no = { kind: "no" } as const;
const t = (text: string) => ({ kind: "text", text }) as const;

export const compareGroups: CompareGroup[] = [
  {
    label: "Price and capacity",
    rows: [
      { label: "Price (EGP / month)", values: [t("1,290"), t("4,990"), t("Contact us")] },
      { label: "For", values: plans.map((p) => t(p.forWho)) as CompareGroup["rows"][number]["values"] },
      { label: "Active members included", values: [t("60"), t("300"), t("Custom")] },
      { label: "Each extra member", values: [t("25 EGP"), t("20 EGP"), t("Custom")] },
      { label: "Staff", values: [t("1"), t("10"), t("Custom")] },
      { label: "Departments", values: [t("1"), t("1"), t("Custom")] },
      { label: "Locations", values: [t("1"), t("1"), t("Custom")] },
    ],
  },
  {
    label: "Experience",
    rows: [
      { label: "Member experience", values: [t("Branded booking page"), t("Branded client app (PWA)"), t("Custom")] },
      { label: "Physical integrations (e.g. gate access)", values: [no, no, t("Custom")] },
    ],
  },
  {
    label: "Apps included",
    rows: [
      { label: "Founder / C-suite app", values: [yes, yes, t("Custom")] },
      { label: "Accountant dashboard", values: [no, yes, t("Custom")] },
      { label: "Front-desk / reception app", values: [no, yes, t("Custom")] },
      { label: "Coaches app (junior, senior, head)", values: [no, yes, t("Custom")] },
      { label: "Branded client app", values: [t("Booking page"), t("PWA"), t("Custom")] },
    ],
  },
];

export const compareFooter = {
  inEveryPlanLead: "In every plan:",
  inEveryPlan:
    "memberships and class bundles (monthly, 3-month, annual, class passes), freezing a membership, class schedule and booking, payment tracking (cash, card, wallet, InstaPay with receipt approval), revenue dashboard, your own branding on the member experience.",
} as const;
