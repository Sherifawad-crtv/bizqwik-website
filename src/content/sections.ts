/**
 * Draft copy for the landing outline sections (phase 2 skeleton). Rewritten for fitness studios (docs/progress/0063): concrete, no filler.
 */

export const statement = {
  line1: "One system.",
  line2Before: "Your ",
  highlight: "whole studio.",
} as const;

/** The moving pills in the statement section (reference: the merchant list). Every line is a task from the brief. */
export const orbit: { label: string; icon: string }[] = [
  { label: "Check members in by QR", icon: "qr-code" },
  { label: "Book a class in seconds", icon: "calendar-mark" },
  { label: "Take cash, card or InstaPay", icon: "wallet" },
  { label: "Run the coach payout", icon: "calculator" },
  { label: "See revenue at a glance", icon: "chart-square" },
  { label: "Log every session", icon: "users-group-two-rounded" },
  { label: "Renew a plan in one tap", icon: "ticket" },
  { label: "Plan the month's classes", icon: "calendar" },
  { label: "See who is coming", icon: "clipboard-list" },
  { label: "Brand your own app", icon: "smartphone" },
  { label: "Top up a wallet", icon: "banknote" },
  { label: "Track coach attendance", icon: "clock-circle" },
];

export const benefits: { title: string; line: string }[] = [
  { title: "Check members in", line: "Scan a QR at the desk. Sell memberships and take payment in the same step." },
  { title: "Take payment any way", line: "Cash, card, wallet or InstaPay, each sale recorded with how it was paid." },
  { title: "See who's coming", line: "Members book classes. You see the roster before they arrive." },
  { title: "Know your numbers", line: "Revenue, profit, coach payouts and active members in one dashboard." },
];

export const closing = {
  statement: "Classes, members, coaches and payouts, in one system.",
} as const;
