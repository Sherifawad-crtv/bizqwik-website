/**
 * Draft copy for the landing outline sections (phase 2 skeleton). Taken from the brief's own lines;
 * the statement uses the FINAL tagline. Reword in phase 8 (copy review), not before.
 */

export const statement = {
  line1: "One ecosystem.",
  line2Before: "Your ",
  highlight: "whole community.",
} as const;

/** The moving pills in the statement section (reference: the merchant list). Every line is a task from the brief. */
export const orbit: { label: string; icon: string }[] = [
  { label: "Check clients in by QR", icon: "qr-code" },
  { label: "Book classes in seconds", icon: "calendar-mark" },
  { label: "Take payment your way", icon: "wallet" },
  { label: "Run the monthly payout", icon: "calculator" },
  { label: "See revenue at a glance", icon: "chart-square" },
  { label: "Log sessions by scanning", icon: "users-group-two-rounded" },
  { label: "Renew a plan in one tap", icon: "ticket" },
  { label: "Plan the whole month", icon: "calendar" },
  { label: "See who is coming", icon: "clipboard-list" },
  { label: "Brand your own app", icon: "smartphone" },
  { label: "Top up a wallet", icon: "banknote" },
  { label: "Track staff attendance", icon: "clock-circle" },
];

export const benefits: { title: string; line: string }[] = [
  { title: "Check clients in fast", line: "Check clients in by QR code, sell memberships and take payment at the desk." },
  { title: "Take payment your way", line: "Cash, card, wallet or InstaPay. Every sale is recorded with how it was paid." },
  { title: "Know who is coming", line: "Clients book classes and say they're coming. You see the roster before they arrive." },
  { title: "Stay in control", line: "Revenue, profit, coach payouts and subscribers in one dashboard." },
];

export const closing = {
  statement: "Run your gym, your team and your payouts from one place. Every app stays in sync.",
} as const;
