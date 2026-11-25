import { ImageResponse } from "next/og";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// Read once at build. Falls back to text-only until public/brand/logo.png exists.
const logoPath = join(process.cwd(), "public/brand/logo.png");
const logo = existsSync(logoPath) ? `data:image/png;base64,${await readFile(logoPath, "base64")}` : null;

/** Branded 1200x630 card. `line` replaces the default services strapline (used per service page). */
export function renderOg(line = "Corporate events · Celebrations · Portraits · Products · Delhi NCR") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0F0F",
          border: "2px solid #3A352B",
          color: "#E3C88A",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) only renders plain <img> */}
        {logo && <img src={logo} width={180} height={180} alt="" style={{ marginBottom: 28 }} />}
        <div style={{ fontSize: 76, letterSpacing: 14, fontWeight: 600 }}>TRILOCHANA</div>
        <div style={{ fontSize: 28, letterSpacing: 18, color: "#C9A45C", marginTop: 8 }}>PHOTOGRAPHY</div>
        <div style={{ width: 120, height: 2, background: "#C9A45C", margin: "36px 0" }} />
        <div style={{ fontSize: 34, color: "#F6F1E7", letterSpacing: 6 }}>{site.tagline.toUpperCase()}</div>
        <div style={{ fontSize: 24, color: "#B8B2A6", marginTop: 18 }}>
          {line}
        </div>
      </div>
    ),
    ogSize,
  );
}
