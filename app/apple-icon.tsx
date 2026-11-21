import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050407",
        }}
      >
        <svg width="134" height="124" viewBox="420 240 810 750" fill="none">
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} stroke="#ff6a2e" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      </div>
    ),
    { ...size },
  );
}
