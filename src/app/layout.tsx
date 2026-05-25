import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"]
});

export const metadata: Metadata = {
  title: "LukHook",
  description: "Premium Denmark fishing map and trip planning platform with spots, fish guides, gear, tactics and legal checks.",
  icons: {
    icon: "/lukhook-mark-plain.svg",
    apple: "/lukhook-mark-plain.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#003049",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} scroll-smooth`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
