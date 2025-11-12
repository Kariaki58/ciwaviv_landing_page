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
  title: "FitHub Health Co. Ltd | Quality Sports, Physiotherapy & Wellness Equipment in Nigeria",
  description:
    "FitHub Health Co. Ltd promotes wellness through premium sports, physiotherapy, and health equipment. We partner with trusted brands to make fitness and rehabilitation accessible across Nigeria.",
  keywords: [
    "FitHub Nigeria",
    "sports equipment",
    "physiotherapy equipment",
    "wellness company Nigeria",
    "fitness gear",
    "gym equipment",
    "rehabilitation tools",
    "health and fitness Nigeria",
  ],
  authors: [{ name: "FitHub Health Co. Ltd", url: "https://fithub.com.ng" }],
  openGraph: {
    title: "FitHub Health Co. Ltd | Wellness, Fitness & Rehabilitation Equipment",
    description:
      "Explore quality sports, physiotherapy, and wellness equipment from FitHub Health Co. Ltd — empowering individuals, clinics, and gyms across Nigeria.",
    url: "https://ciwaviv.com",
    siteName: "FitHub Health Co. Ltd",
    images: [
      {
        url: "https://fithub.com.ng/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitHub Health Co. Ltd – Wellness & Fitness Equipment",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FitHub Health Co. Ltd | Quality Sports & Physiotherapy Equipment",
    description:
      "Making fitness and rehabilitation accessible through durable, affordable, and effective health equipment in Nigeria.",
    images: ["https://fithub.com.ng/og-image.jpg"],
    creator: "@FitHub_NG",
  },
  metadataBase: new URL("https://fithub.com.ng"),
  alternates: {
    canonical: "https://fithub.com.ng",
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
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
