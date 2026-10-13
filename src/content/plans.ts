import type { CompareGroup, Plan, PlanId } from "./types";

/**
 * Display content for the marketing page. These numbers are NOT billing logic:
 * when subscriptions ship, the backend owns plans and money (see docs/DECISIONS.md D-005).
 * Hard rules: Enterprise never shows a number; extra clients never cost more than the next plan.
 */

export const plansIntro = {
  heading: "Four plans. One monthly price each.",
  lede: "Start small. Move up as you grow.",
  callout: {
    lead: "Extra clients never cost more than the next plan.",
    text: "If extra-client charges would pass the next plan's price, you simply move up.",
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
    nextPlan: "Grow · 4,990 EGP / month · 300 clients, 10 staff and all five apps",
  },
  {
    id: "grow",
    name: "Grow",
    tag: "Best fit for studios",
    forWho: "Studios and gyms with a team",
    priceEgpMonthly: 4990,
    clientsIncluded: "300",
    extraClient: "20 EGP",
    summary: "All five apps, with a branded client app (PWA).",
    staff: "10",
    departments: "1",
    locations: "1",
    physicalIntegrations: "Not included",
    clientExperience: "Branded client app (PWA)",
    nextPlan: "Scale · 14,990 EGP / month · 1,500 clients, 5 departments and a native app on the app stores",
  },
  {
    id: "scale",
    name: "Scale",
    forWho: "Clubs with several departments",
    priceEgpMonthly: 14990,
    clientsIncluded: "1,500",
    extraClient: "12 EGP",
    summary: "Several departments, 2–3 locations and a native app on the app stores.",
    staff: "5 per department",
    departments: "5",
    locations: "2–3",
    physicalIntegrations: "Included",
    clientExperience: "Native app on the app stores",
    nextPlan: "Enterprise · Contact us · For large or multi-site communities",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    forWho: "Large or multi-site communities",
    priceEgpMonthly: null,
    clientsIncluded: "Custom",
    extraClient: "Custom",
    summary: "Everything is custom, built around your community.",
    staff: "Custom",
    departments: "Custom",
    locations: "Custom",
    physicalIntegrations: "Custom",
    clientExperience: "Custom",
    nextPlan: "Let's talk · Contact us to set yours up.",
  },
];

export const planById = (id: PlanId): Plan => plans.find((p) => p.id === id)!;

/** Which of the five apps each plan includes (plan detail panels: lit vs dimmed). */
export const planApps: Record<PlanId, { founder: string; accountant: boolean | string; frontDesk: boolean | string; coaches: boolean | string; client: string }> = {
  solopreneur: { founder: "Included", accountant: false, frontDesk: false, coaches: false, client: "Branded booking page" },
  grow: { founder: "Included", accountant: true, frontDesk: true, coaches: true, client: "Branded client app (PWA)" },
  scale: { founder: "Included, per department", accountant: true, frontDesk: true, coaches: true, client: "Native app on the app stores" },
  enterprise: { founder: "Custom", accountant: "Custom", frontDesk: "Custom", coaches: "Custom", client: "Custom" },
};

/** Enterprise gets its own treatment: a numbered list, never a number. */
export const enterprisePanel = {
  summary: "Everything is custom, built around your community.",
  listHeading: "Every part of the plan is set around you.",
  listNote: "Large or multi-site communities get all of these tailored.",
  items: [
    "Active clients included",
    "Each extra client",
    "Staff",
    "Departments",
    "Locations",
    "Apps included",
    "Client experience",
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
      { label: "Price (EGP / month)", values: [t("1,290"), t("4,990"), t("14,990"), t("Contact us")] },
      { label: "For", values: plans.map((p) => t(p.forWho)) as CompareGroup["rows"][number]["values"] },
      { label: "Active clients included", values: [t("60"), t("300"), t("1,500"), t("Custom")] },
      { label: "Each extra client", values: [t("25 EGP"), t("20 EGP"), t("12 EGP"), t("Custom")] },
      { label: "Staff", values: [t("1"), t("10"), t("5 per department"), t("Custom")] },
      { label: "Departments", values: [t("1"), t("1"), t("5"), t("Custom")] },
      { label: "Locations", values: [t("1"), t("1"), t("2–3"), t("Custom")] },
    ],
  },
  {
    label: "Experience",
    rows: [
      { label: "Client experience", values: [t("Branded booking page"), t("Branded client app (PWA)"), t("Native app on the app stores"), t("Custom")] },
      { label: "Physical integrations (e.g. gate access)", values: [no, no, { kind: "yes", note: "Included" }, t("Custom")] },
    ],
  },
  {
    label: "Apps included",
    rows: [
      { label: "Founder / C-suite app", values: [yes, yes, { kind: "yes", note: "per department" }, t("Custom")] },
      { label: "Accountant dashboard", values: [no, yes, yes, t("Custom")] },
      { label: "Front-desk / reception app", values: [no, yes, yes, t("Custom")] },
      { label: "Coaches app (junior, senior, head)", values: [no, yes, yes, t("Custom")] },
      { label: "Branded client app", values: [t("Booking page"), t("PWA"), t("Native app on the stores"), t("Custom")] },
    ],
  },
];

export const compareFooter = {
  inEveryPlanLead: "In every plan:",
  inEveryPlan:
    "memberships and class bundles (monthly, 3-month, annual, class passes), freezing a membership, class schedule and booking, payment tracking (cash, card, wallet, InstaPay with receipt approval), revenue dashboard, your own branding on the client experience.",
} as const;
