import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Ciwaviv Global Resource Limited | Sports, Fitness, Physiotherapy & Wellness Equipment in Nigeria",
  description:
    "Ciwaviv Global Resource Limited provides premium sports, physiotherapy, fitness, and wellness equipment in Nigeria. Supplying hospitals, clinics, gyms, athletes, and rehabilitation centers with trusted, durable and affordable health equipment.",
  keywords: [
    "Ciwaviv Global Resource Limited",
    "Ciwaviv Nigeria",
    "physiotherapy equipment Nigeria",
    "sports equipment Nigeria",
    "gym equipment supplier Nigeria",
    "fitness equipment Nigeria",
    "rehabilitation equipment Nigeria",
    "wellness equipment Nigeria",
    "medical rehabilitation tools",
    "physio tools Nigeria",
    "fitness suppliers Nigeria"
  ],
  authors: [{ name: "Ciwaviv Global Resource Limited", url: "https://ciwaviv.com" }],

  openGraph: {
    title:
      "Ciwaviv Global Resource Limited | Premium Sports, Fitness & Physiotherapy Equipment",
    description:
      "Your trusted supplier of high-quality sports, physiotherapy, wellness, and fitness equipment across Nigeria. Supporting gyms, clinics, hospitals, and individuals.",
    url: "https://ciwaviv.com",
    siteName: "Ciwaviv Global Resource Limited",
    images: [
      {
        url: "https://ciwaviv.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ciwaviv Global Resource Limited - Sports, Physiotherapy & Wellness Equipment",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Ciwaviv Global Resource Limited | Trusted Sports & Physiotherapy Equipment Supplier",
    description:
      "Ciwaviv supplies durable, high-quality fitness, rehabilitation, and physiotherapy equipment for hospitals, gyms, athletes, and wellness centers in Nigeria.",
    images: ["https://ciwaviv.com/og-image.jpg"],
    creator: "@ciwaviv",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
