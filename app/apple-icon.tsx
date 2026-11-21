import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: same monogram, full-bleed (iOS applies its own rounding). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #0f2d46 0%, #06121d 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 36,
            width: 108,
            height: 30,
            borderRadius: 9,
            background: "linear-gradient(90deg, #2aace2, #eef2f5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 75,
            top: 36,
            width: 30,
            height: 108,
            borderRadius: 9,
            background: "#eef2f5",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 116,
            top: 114,
            width: 30,
            height: 30,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #f7931e, #f05a1a)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
