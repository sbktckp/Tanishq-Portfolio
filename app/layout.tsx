import type { Metadata, Viewport } from "next";
import Providers from "@/components/Providers";
import { Bricolage_Grotesque, Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanishq Kansal | Managing Director, AxiomPrep & Academic Content Head",
  description:
    "Portfolio of Tanishq Kansal: Managing Director of AxiomPrep (Examlytics Group), Academic Content Head at Examlytics, NEET and IIT-JEE content and assessment design.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf4f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${caveat.variable} antialiased`}
    >
      <body>
        {/* SVG filters for the rubber-stamp look */}
        <svg width="0" height="0" aria-hidden className="absolute">
          <filter id="stamp">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.85"
              result="speck"
            />
            <feComposite in="SourceGraphic" in2="speck" operator="in" result="eroded" />
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" result="warp" />
            <feDisplacementMap in="eroded" in2="warp" scale="3" />
          </filter>
        </svg>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
