import { ImageResponse } from "next/og";
import siteData from "@/data/site.json";
import fs from "fs";
import path from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const logo = siteData.company.logo;

  // If logo is a local file, read it and embed as base64
  if (logo && !logo.startsWith("http")) {
    try {
      const filePath = path.join(process.cwd(), "public", logo);
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString("base64");
      const ext = path.extname(logo).replace(".", "").toLowerCase();
      const mime = ext === "svg" ? "svg+xml" : ext === "jpg" ? "jpeg" : ext;
      const dataUrl = `data:image/${mime};base64,${base64}`;

      return new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              borderRadius: "12px",
            }}
          >
            <img src={dataUrl} width={56} height={56} style={{ objectFit: "contain" }} />
          </div>
        ),
        { ...size }
      );
    } catch {
      // Fallback if file not found
    }
  }

  // Fallback: first letter of company name
  const initial = siteData.company.name.charAt(0).toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B4D3E",
          borderRadius: "12px",
          color: "white",
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        {initial}
      </div>
    ),
    { ...size }
  );
}
