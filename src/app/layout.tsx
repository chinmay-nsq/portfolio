import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const title = "Chinmay Lale — Software Engineer";
const description =
  "Software Engineer building GenieHire, an AI recruitment platform, at Nsquare Experts. Full-stack developer across React, React Native, Node.js and AWS — with a soft spot for astronomy and fighter jets.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Chinmay Lale",
    "Software Engineer",
    "Full-stack developer",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "GenieHire",
    "Nsquare Experts",
  ],
  authors: [{ name: "Chinmay Kalyan Lale" }],
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {/* Without JS the loader would never part – hide it. */}
        <noscript>
          <style>{`.grain{display:none}[role="status"][aria-label="Loading portfolio"]{display:none!important}`}</style>
        </noscript>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
