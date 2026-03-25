import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { TrackingScripts } from "@/components/TrackingScripts";
import "./globals.css";

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontBody = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Landing Page Template",
  description: "Professionelle Landing Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <TrackingScripts />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
