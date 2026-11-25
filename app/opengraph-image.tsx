import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Tanishq Kansal — Managing Director, AxiomPrep & Academic Content Head";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "tanishq.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #14050a 0%, #3a0c1d 100%)",
          color: "#f8edf0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#ee8aa4",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>
            Tanishq Kansal
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#c9aab4", marginTop: 20, whiteSpace: "nowrap" }}>
            Managing Director, AxiomPrep
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 36, color: "#f8edf0" }}>
            Examlytics · NEET &amp; IIT-JEE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 12,
            border: "1px solid rgba(248,237,240,0.2)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={380}
            height={475}
            alt=""
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
