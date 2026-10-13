import type { Link, SectionId } from "./types";

/**
 * Site-wide facts, nav, SEO and microcopy.
 * Source: BIZQWIK_LANDING_PAGE_BRIEF.md (content only). Marked FINAL there: do not reword.
 */

export const brand = {
  name: "Bizqwik",
  tagline: "One ecosystem. Your whole community.",
} as const;

export const contact = {
  phoneDisplay: "01000401407",
  // TODO(owner): confirm tel: format and whether the number is on WhatsApp.
  phoneHref: "tel:+201000401407",
  email: "info@bizqwik.com",
  emailHref: "mailto:info@bizqwik.com?subject=Set%20up%20my%20gym",
} as const;

export const nav: { label: string; href: `#${SectionId}` }[] = [
  { label: "The apps", href: "#apps" },
  { label: "Plans", href: "#plans" },
  { label: "Add-ons", href: "#add-ons" },
  { label: "FAQ", href: "#faq" },
];

export const cta = {
  primary: { label: "Talk to us", href: "#contact" },
  secondary: { label: "See plans", href: "#plans" },
} satisfies Record<string, Link>;

export const seo = {
  title: "Bizqwik | One ecosystem. Your whole community.",
  description:
    "Five connected apps run your gym: founder, accountant, front desk, coaches and a branded client app. Plans from 1,290 EGP a month.",
} as const;

export const microcopy = {
  planLink: "See what's included",
  enterpriseLink: "Contact us",
  addonsLink: "Want to add something? Talk to us.",
  callAria: "Call Bizqwik",
  menuAria: "Open menu",
  copied: "Copied",
  bestFit: "Best fit for studios",
  included: "Included",
  notIncluded: "Not included",
  skipLink: "Skip to content",
  notFound: "This page isn't here. Back to Bizqwik.",
} as const;

export const vatNote = "All prices are EGP per month, excluding 14% VAT. VAT is added on the invoice.";
export const vatNoteShort = "All prices are EGP per month, excluding 14% VAT.";
