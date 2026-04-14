import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XBeauty — Echipamente Estetice Premium",
  description:
    "Cea mai inovatoare gamă de dispozitive estetice. Epilare laser, microneedling RF, rejuvenare fracționată — cu suport de training și marketing pentru clinica ta.",
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
      </body>
    </html>
  );
}
