import { ImageResponse } from "next/og";
import { LOGO_PATHS } from "@/components/Logo";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon: the hand-drawn TK monogram in white on wine. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9d1c42",
          borderRadius: 112,
        }}
      >
        <svg width="380" height="352" viewBox="420 240 810 750" fill="none">
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} stroke="#ffffff" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      </div>
    ),
    { ...size },
  );
}
