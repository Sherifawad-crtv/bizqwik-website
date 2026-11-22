import type { FaqItem } from "./types";

/** Answers use only facts in the brief. No FAQs on trials, demos, contracts, security, uptime, migration, cancellation or support hours. */
export const faqHeading = "Questions studio owners ask.";

export const faq: FaqItem[] = [
  {
    question: "How does pricing work?",
    answer: "Each plan has one monthly price in EGP, excluding 14% VAT, which is added on the invoice. Enterprise is priced on request.",
  },
  {
    question: "What if I have more members than my plan includes?",
    answer:
      "Each extra active member is charged at your plan's rate: 25 EGP on Solopreneur, 20 EGP on Grow. Extras never cost more than the next plan: if they would, you move up.",
  },
  {
    question: "Which plan is right for me?",
    answer:
      "Solopreneur: independent coaches and solo studios. Grow: studios with a team, and our best fit for fitness studios. Enterprise: multi-studio groups and large operators.",
    cta: { label: "See plans", href: "#plans" },
  },
  {
    question: "What do my members get?",
    answer:
      "An experience under your brand: your studio's name, logo, colours and web address. Solopreneur gets a branded booking page, Grow a branded client app (PWA), Enterprise a custom build. Members check in with a QR code, book classes, buy memberships and bundles, top up a wallet, earn points and freeze their own plan.",
  },
  {
    question: "How do I get started?",
    answer: "Call 01000401407 or email info@bizqwik.com. We set up your studio with you.",
    cta: { label: "Contact sales", href: "#contact" },
  },
];
