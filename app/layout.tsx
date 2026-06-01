import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/lib/constants";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins-old",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "car rental",
    "vehicle booking",
    "airport transfer",
    "fleet leasing",
    "premium cars",
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: "/max-travels-logo-cropped.png",
    shortcut: "/max-travels-logo-cropped.png",
    apple: "/max-travels-logo-cropped.png",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: "/max-travels-logo.png",
        width: 1200,
        height: 1200,
        alt: `${SITE.name} car rental`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/max-travels-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFB51D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen overflow-x-hidden">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
