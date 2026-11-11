/**
 * Draft copy for the landing outline sections (phase 2 skeleton). Taken from the brief's own lines;
 * the statement uses the FINAL tagline. Reword in phase 8 (copy review), not before.
 */

export const statement = {
  line1: "One ecosystem.",
  line2Before: "Your ",
  highlight: "whole community.",
} as const;

export const benefits: { title: string; line: string }[] = [
  { title: "Check clients in fast", line: "Check clients in by QR code, sell memberships and take payment at the desk." },
  { title: "Take payment your way", line: "Cash, card, wallet or InstaPay. Every sale is recorded with how it was paid." },
  { title: "Know who is coming", line: "Clients book classes and say they're coming. You see the roster before they arrive." },
  { title: "Stay in control", line: "Revenue, profit, coach payouts and subscribers in one dashboard." },
];

export const closing = {
  statement: "Run your gym, your team and your payouts from one place. Every app stays in sync.",
} as const;
