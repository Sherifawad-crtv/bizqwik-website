import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/content";

export const alt = `${brand.name}: ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share image: the wordmark and the tagline on the page's paper colour. */
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/wordmark.png"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 36, padding: 96, background: "#F3F2EE" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={432} height={100} alt="" />
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#1A1726", maxWidth: 900 }}>{brand.tagline}</div>
      </div>
    ),
    size,
  );
}
