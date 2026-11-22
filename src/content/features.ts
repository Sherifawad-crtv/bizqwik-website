import type { Feature } from "./types";

/**
 * The rows of the feature list: four bundles, one per kind of user, each with one live demo.
 * Wording comes from the brief's app blocks (headlines are its own lines); the CRM lines describe what the
 * product's member records do (register, sell a plan, invite to the app, refund to the wallet).
 */
export const features: Feature[] = [
  {
    id: "business",
    title: "Run the business",
    headline: "Revenue, attendance, schedule and payouts.",
    bullets: [
      "Revenue, profit, coach payouts and active members in one dashboard.",
      "See which coaches showed up, with times, on time or late.",
      "Plan the month: dates, start times and a coach for every class.",
      "Run the monthly payout: settle, pay, mark paid.",
    ],
  },
  {
    id: "frontdesk",
    title: "Front desk and CRM",
    headline: "Every member, plan and payment on one record.",
    bullets: [
      "Register a member, sell a plan and send the app invite in one step.",
      "Find anyone by name or phone. Plan, packages and wallet are on one record.",
      "Check members in and book them into classes.",
      "Take cash, card, wallet or InstaPay. Renew or freeze a plan, refund to the wallet.",
    ],
  },
  {
    id: "coaches",
    title: "Coaches",
    headline: "Sessions, schedule and earnings.",
    bullets: [
      "Log your sessions and see every day you've worked.",
      "See this month's earnings at your tier's rate.",
      "Swap a session with another coach, at least 2 hours ahead, if they accept.",
    ],
  },
  {
    id: "clients",
    title: "Your studio, your brand",
    headline: "Your studio's own app.",
    bullets: [
      "Your studio's name, logo, colours and web address.",
      "Members book classes and buy memberships and bundles.",
      "Top up a wallet, earn points and check in with a QR code.",
    ],
  },
];
