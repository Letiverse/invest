import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ReleaseGuard } from "@/components/deck/ReleaseGuard";
import { getReleaseVersion } from "@/lib/release";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const OG_IMAGE_LANDSCAPE = "https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/gemini-2.5-flash-image_Add_Text_in_Letiverse_Style_and_theme_Across_Middle_Of_Frame_Saying_Letiverse-1.jpg";
const OG_IMAGE_PORTRAIT  = "https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com/gemini-2.5-flash-image_Add_Word_Letiverse_at_Bottom_Central_full_width-1.jpg";

const OG_IMAGE_PROVENANCE = {
  "letiverse:og-landscape-provenance": "GM",
  "letiverse:og-portrait-provenance": "GM",
} as const;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Letiverse AI — Investment Opportunity",
  description: "Letiverse AI is raising £995k to build the spatial web. £50/share · £1,000 minimum · Closes 18 October 2026.",
  keywords: ["Letiverse", "investment", "spatial web", "AI", "3D technology", "seed round", "startup", "equity"],
  authors: [{ name: "Letiverse", url: "https://letiverse.co.uk" }],
  creator: "Letiverse",
  publisher: "Letiverse",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE_URL },
  other: OG_IMAGE_PROVENANCE,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Letiverse AI",
    title: "Letiverse AI — Investment Opportunity",
    description: "Letiverse AI is raising £995k to build the spatial web. £50/share · £1,000 minimum · Closes 18 October 2026.",
    images: [
      {
        url: OG_IMAGE_LANDSCAPE,
        width: 1200,
        height: 630,
        alt: "Letiverse — The Spatial Web Investment Deck",
      },
      {
        url: OG_IMAGE_PORTRAIT,
        width: 630,
        height: 1200,
        alt: "Letiverse — Investment Opportunity",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@letiverse",
    creator: "@letiverse",
    title: "Letiverse AI — Investment Opportunity",
    description: "Letiverse AI is raising £995k to build the spatial web. £50/share · £1,000 minimum · Closes 18 October 2026.",
    images: [OG_IMAGE_LANDSCAPE],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050D1C',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Vercel Blob CDN — all slide media is served from here */}
        <link rel="preconnect" href="https://tjtvxp4xul5oynxz.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        {/* Preconnect to Mux — background video streams are served from here */}
        <link rel="preconnect" href="https://stream.mux.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://stream.mux.com" />
      </head>
      <body className="min-h-full overflow-x-hidden bg-[#050D1C] text-white">
        {/* Skip navigation — WCAG 2.4.1 */}
        <a
          href="#deck-main"
          className="absolute -top-full left-4 z-100 rounded-md bg-[#34E9E2] px-4 py-2 text-[#050D1C] font-semibold outline-none focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <ReleaseGuard currentRelease={getReleaseVersion()} />
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
