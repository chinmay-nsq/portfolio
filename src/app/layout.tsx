import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import AppShell from "@/components/AppShell";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, absoluteUrl, siteMeta } from "@/lib/site";
import "./globals.css";

const display = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const sans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

const ogImage = {
  url: absoluteUrl(siteMeta.ogImage.path),
  width: siteMeta.ogImage.width,
  height: siteMeta.ogImage.height,
  alt: siteMeta.ogImage.alt,
  type: "image/jpeg",
};

export const metadata: Metadata = {
  title: { default: siteMeta.title, template: `%s | ${siteMeta.name}` },
  description: siteMeta.description,
  applicationName: `${siteMeta.name} — Portfolio`,
  keywords: [
    "Chinmay Lale",
    "Chinmay Kalyan Lale",
    "Software Engineer",
    "Full-stack developer",
    "React developer",
    "Next.js developer",
    "Node.js",
    "React Native",
    "AWS",
    "GenieHire",
    "Nsquare Experts",
    "portfolio",
  ],
  authors: [{ name: "Chinmay Kalyan Lale", url: SITE_URL }],
  creator: "Chinmay Kalyan Lale",
  category: "technology",
  alternates: { canonical: absoluteUrl("/") },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: `${siteMeta.name} — Portfolio`,
    title: siteMeta.title,
    description: siteMeta.description,
    locale: siteMeta.locale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Paste your Search Console token into the NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION variable to verify ownership via a meta tag.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: siteMeta.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <body>
        <JsonLd />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
