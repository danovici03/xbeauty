import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site-url";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { CookieBanner } from "@/components/cookie-banner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_OG_IMAGE = "/og-default.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "XBeauty — Echipamente Estetice Premium",
    template: "%s | XBeauty",
  },
  description:
    "Distribuitor de echipamente profesionale pentru saloane: epilare laser diodă, solarii Ultrasun, microneedling RF, remodelare corporală. Training și suport tehnic inclus.",
  applicationName: "XBeauty",
  authors: [{ name: "XBeauty", url: SITE_URL }],
  keywords: [
    "epilare laser diodă",
    "solarii profesionale",
    "ultrasun",
    "echipamente estetica",
    "microneedling RF",
    "xbeauty",
    "aparate saloane",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "XBeauty",
    title: "XBeauty — Echipamente Estetice Premium",
    description:
      "Distribuitor de echipamente profesionale pentru saloane de înfrumusețare. Epilare laser diodă, solarii, rejuvenare, remodelare — cu training și suport tehnic.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "XBeauty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XBeauty — Echipamente Estetice Premium",
    description:
      "Distribuitor de echipamente profesionale pentru saloane de înfrumusețare.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-800 bg-white selection:bg-pink-500 selection:text-white overflow-x-hidden">
        {children}
        <ScrollToTop />
        <CookieBanner />
        <Analytics />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
