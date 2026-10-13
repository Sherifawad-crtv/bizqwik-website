import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/motion/SmoothScroll";
import { spaceMono, urbanist } from "./fonts";
import { seo } from "@/content";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
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
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
