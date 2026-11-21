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
          background: "linear-gradient(135deg, #faf8f3 0%, #f4e6e3 100%)",
          color: "#3b0d1f",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -140,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(179,32,77,0.3)",
            filter: "blur(80px)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#b3204d",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>
            Tanishq Kansal
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#7a5a63", marginTop: 20, whiteSpace: "nowrap" }}>
            Managing Director, AxiomPrep
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 36, color: "#3b0d1f" }}>
            Examlytics · NEET &amp; IIT-JEE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 6,
            borderRadius: 40,
            background: "linear-gradient(135deg, #b3204d, #7a1f3d)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={380}
            height={475}
            alt=""
            style={{ borderRadius: 34, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
