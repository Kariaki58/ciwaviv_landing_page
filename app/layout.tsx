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
  title: "CIWAVIV | Wellness, Fitness & Rehabilitation Solutions in Nigeria",
  description:
    "CIWAVIV empowers wellness across Nigeria through innovative health solutions, including FitHub — your trusted source for premium sports, physiotherapy, and rehabilitation equipment.",
  keywords: [
    "CIWAVIV",
    "FitHub",
    "sports equipment Nigeria",
    "physiotherapy equipment",
    "wellness company",
    "health technology",
    "rehabilitation tools",
    "fitness gear",
    "gym equipment",
    "Nigeria wellness solutions",
  ],
  authors: [{ name: "CIWAVIV", url: "https://ciwaviv.com" }],
  openGraph: {
    title: "CIWAVIV | Empowering Wellness Through Innovation & Quality",
    description:
      "CIWAVIV promotes health and wellness in Nigeria through innovative solutions and brands like FitHub — offering premium sports, physiotherapy, and fitness equipment for all.",
    url: "https://ciwaviv.com",
    siteName: "CIWAVIV",
    images: [
      {
        url: "https://ciwaviv.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CIWAVIV – Wellness & Fitness Solutions in Nigeria",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CIWAVIV | Empowering Wellness & Performance in Nigeria",
    description:
      "Discover CIWAVIV — a Nigerian wellness brand dedicated to quality health solutions and equipment through its subsidiary, FitHub Health Co. Ltd.",
    images: ["https://ciwaviv.com/og-image.jpg"],
    creator: "@Ciwaviv",
  },
  metadataBase: new URL("https://ciwaviv.com"),
  alternates: {
    canonical: "https://ciwaviv.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
