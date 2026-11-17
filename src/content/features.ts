import type { Feature } from "./types";

/**
 * The rows of the feature list: four bundles, one per kind of user, each with one live demo.
 * Wording comes from the brief's app blocks (headlines are its own lines); the CRM lines describe what the
 * product's client records do (register a client, sell a plan, invite to the app, refunds to the wallet).
 */
export const features: Feature[] = [
  {
    id: "business",
    title: "Run the business",
    headline: "See the whole business. Run it from one place.",
    bullets: [
      "Track revenue, profit, coach payouts and active subscribers in one dashboard.",
      "See who showed up and when, with timestamps, on time or late.",
      "Plan the whole month: dates, start times and a coach for every class.",
      "Run the monthly payout: settle, pay, mark paid.",
    ],
  },
  {
    id: "frontdesk",
    title: "Front desk and CRM",
    headline: "Every client, plan and payment at the desk, on one record.",
    bullets: [
      "Register a client, sell them a plan and send their app invite in one step.",
      "Find anyone by name or phone, and see their plan, packages and wallet on one record.",
      "Check clients in by QR code and book them into classes.",
      "Take cash, card, wallet or InstaPay. Renew or freeze a plan, and refund to the wallet.",
    ],
  },
  {
    id: "coaches",
    title: "Coaches",
    headline: "Sessions, schedules and earnings, in one app.",
    bullets: [
      "Log a session by scanning the QR in the coaches' room.",
      "See what you've earned this month at your tier's rate.",
      "Swap a session with another coach, at least 2 hours ahead, if they accept.",
    ],
  },
  {
    id: "clients",
    title: "Your gym, your brand",
    headline: "Your gym in your clients' pockets, under your brand.",
    bullets: [
      "Your gym's own name, logo, colours and web address.",
      "Clients book classes and buy memberships and bundles.",
      "Top up a wallet, earn loyalty points and check in with a QR code.",
    ],
  },
];
