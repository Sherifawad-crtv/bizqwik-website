import type { Metadata, Viewport } from "next";
import { spaceMono, urbanist } from "./fonts";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Bizqwik | One ecosystem. Your whole community.",
  description:
    "Five connected apps run your gym: founder, accountant, front desk, coaches and a branded client app. Plans from 1,290 EGP a month.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Foundation stage only — remove when the real page ships.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
