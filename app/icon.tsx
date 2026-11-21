import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Monogram favicon: bold "T" + orange full stop (mirrors the "Tanishq." wordmark). Pure shapes, no font needed. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          borderRadius: 116,
          background: "linear-gradient(135deg, #0f2d46 0%, #06121d 100%)",
        }}
      >
        {/* T top bar */}
        <div
          style={{
            position: "absolute",
            left: 104,
            top: 104,
            width: 304,
            height: 84,
            borderRadius: 24,
            background: "linear-gradient(90deg, #2aace2, #eef2f5)",
          }}
        />
        {/* T stem */}
        <div
          style={{
            position: "absolute",
            left: 214,
            top: 104,
            width: 84,
            height: 304,
            borderRadius: 24,
            background: "#eef2f5",
          }}
        />
        {/* orange dot */}
        <div
          style={{
            position: "absolute",
            left: 330,
            top: 322,
            width: 86,
            height: 86,
            borderRadius: 9999,
            background: "linear-gradient(135deg, #f7931e, #f05a1a)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
