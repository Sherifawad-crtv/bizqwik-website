import localFont from "next/font/local";

/*
 * Self-hosted (Latin subset, SIL OFL — licences sit next to the files).
 * Urbanist: headlines, names, prices, body. Variable 100–900, we use 500–800.
 * Space Mono: small uppercase labels, units, captions, eyebrows ONLY.
 */
export const urbanist = localFont({
  src: "../assets/fonts/urbanist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-urbanist",
  display: "swap",
});

export const spaceMono = localFont({
  src: [
    { path: "../assets/fonts/space-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../assets/fonts/space-mono-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-space-mono",
  display: "swap",
  preload: false, // labels sit below the fold's first line; Urbanist is the critical file
});

/** Handwriting for the hero's "manual process" props (sticky notes, ledger). 600 weight, ASCII subset (18 KB). */
export const caveat = localFont({
  src: "../assets/fonts/caveat-600.woff2",
  weight: "600",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});
