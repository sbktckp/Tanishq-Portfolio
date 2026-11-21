import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Tanishq Kansal — Academic Content Lead & EdTech Co-founder";
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
          background: "linear-gradient(135deg, #071426 0%, #0d1f38 100%)",
          color: "#e8eef7",
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
            background: "rgba(255,106,61,0.25)",
            filter: "blur(80px)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              color: "#ff6a3d",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>
            Tanishq Kansal
          </div>
          <div style={{ display: "flex", fontSize: 29, color: "#93a4bd", marginTop: 20, whiteSpace: "nowrap" }}>
            Academic Content Lead &amp; EdTech Co-founder
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 36, color: "#e8eef7" }}>
            Axiom Prep · Examlytics · NEET &amp; IIT-JEE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 6,
            borderRadius: 40,
            background: "linear-gradient(135deg, #ff6a3d, #b46bff)",
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
