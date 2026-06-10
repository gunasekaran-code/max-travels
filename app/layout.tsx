import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/lib/constants";
import "./globals.css";
import Chatbot from "@/components/chatbot";

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
    "luxury car rental",
    "self-drive cars",
    "chauffeur service",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
    creator: "@MaxTravels",
  },
  alternates: {
    canonical: SITE.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFB51D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <link rel="canonical" href={SITE.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/max-travels-logo.png`,
              description: SITE.description,
              sameAs: [
                "https://www.facebook.com/maxtravel",
                "https://www.instagram.com/maxtravel",
                "https://www.twitter.com/maxtravel",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: "en",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <SiteShell>{children}</SiteShell>
        <Chatbot />
      </body>
    </html>
  );
}
