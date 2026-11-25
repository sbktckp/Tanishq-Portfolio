import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tanishq Kansal | Managing Director, AxiomPrep & Academic Content Head",
  description:
    "Portfolio of Tanishq Kansal: Managing Director of AxiomPrep (Examlytics Group), Academic Content Head at Examlytics, NEET and IIT-JEE content and assessment design.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14050a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
