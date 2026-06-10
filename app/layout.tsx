import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/lib/constants";
import "./globals.css";
import Chatbot from "@/components/chatbot";

// ─────────────────────────────────────────────
// Font
// ─────────────────────────────────────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

// ─────────────────────────────────────────────
// SITE CONSTANTS  (add to lib/constants.ts if absent)
// ─────────────────────────────────────────────
const BUSINESS = {
  name: "Max Travels",
  legalName: "Max Travels Car Rental Services",
  phone: "+91-9566188126",
  email: "maxtravelstamilnadu@gmail.com",
  whatsapp: "+91-9566188126",
  address: {
    street: "No 75E/15, Near Perison Cinemas, Pole Pettai",
    locality: "Thoothukudi",
    region: "Tamil Nadu",
    postalCode: "628002", 
    country: "IN",
  },
  geo: {
    lat: 8.8157,
    lng: 78.1362,
  },
  serviceRadius: "150 km",
  priceRange: "₹₹",
  founded: "2021",                   
  socialProfiles: {
    facebook: "https://www.facebook.com/maxtravels",
    instagram: "https://www.instagram.com/maxtravels",
    twitter: "https://www.twitter.com/maxtravels",
  },
} as const;

// ─────────────────────────────────────────────
// Rich Structured Data helpers
// ─────────────────────────────────────────────

/** LocalBusiness + CarRental schema */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TravelAgency"],
  "@id": `${SITE.url}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/max-travels-logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.url}/max-travels-logo.png`,
  description:
    "Max Travels is Thoothukudi's #1 car rental service offering self-drive cars, airport transfers, outstation cabs, and fleet leasing. Serving Thoothukudi (Tuticorin), Tirunelveli, Madurai, and all Tamil Nadu since 2010.",
  slogan: "Thoothukudi's Most Trusted Car Rental",
  priceRange: BUSINESS.priceRange,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.lat,
    longitude: BUSINESS.geo.lng,
  },
  hasMap: `https://maps.google.com/?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`,
  areaServed: [
    {
      "@type": "City",
      name: "Thoothukudi",
      alternateName: "Tuticorin",
      sameAs: "https://en.wikipedia.org/wiki/Thoothukudi",
    },
    { "@type": "City", name: "Tirunelveli" },
    { "@type": "City", name: "Madurai" },
    { "@type": "City", name: "Nagercoil" },
    { "@type": "City", name: "Kanyakumari" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    geoRadius: "150000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    BUSINESS.socialProfiles.facebook,
    BUSINESS.socialProfiles.instagram,
    BUSINESS.socialProfiles.twitter,
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.whatsapp,
      contactType: "reservations",
      contactOption: "TollFree",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Car Rental Services in Thoothukudi",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airport Transfer – Thoothukudi Airport",
          description:
            "Reliable pick-up and drop-off at Thoothukudi (TCR) Airport with professional drivers available 24/7.",
          serviceType: "AirportTransfer",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Outstation Cab – Thoothukudi to Madurai",
          description:
            "One-way and round-trip outstation cab service from Thoothukudi to Madurai, Tirunelveli, Kanyakumari, and Chennai.",
          serviceType: "OutstationCab",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Self-Drive Car Rental Thoothukudi",
          description:
            "Well-maintained self-drive cars available for hourly, daily, and weekly rental in Thoothukudi.",
          serviceType: "CarRental",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Fleet Leasing",
          description:
            "Monthly and long-term fleet leasing solutions for businesses and corporates in Thoothukudi.",
          serviceType: "FleetLeasing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wedding Car Rental Thoothukudi",
          description:
            "Luxury and decorated car rentals for weddings and special events across Thoothukudi district.",
          serviceType: "WeddingCar",
        },
      },
    ],
  },
};

/** FAQ schema — powers Google FAQ rich results + AI answer boxes */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best car rental service in Thoothukudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Max Travels is the most trusted car rental in Thoothukudi (Tuticorin), offering 24/7 service, professional drivers, a modern fleet, and transparent pricing for airport transfers, outstation cabs, self-drive, and corporate leasing.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a car rental cost in Thoothukudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Car rental prices in Thoothukudi start from ₹12/km for economy sedans. SUV rentals start from ₹18/km. Max Travels offers flat-rate airport transfers, hourly packages from ₹299, and outstation trips at competitive per-km rates with no hidden charges.",
      },
    },
    {
      "@type": "Question",
      name: "Does Max Travels offer airport pickup and drop in Thoothukudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Max Travels provides 24/7 airport transfer services to and from Thoothukudi (TCR) Airport. Drivers track flight arrivals in real-time to ensure on-time pickup even for delayed flights.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a cab from Thoothukudi to Madurai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Max Travels operates daily outstation cab services from Thoothukudi to Madurai (approx. 160 km). One-way and round-trip options are available in Sedan, SUV, and Tempo Traveller. Book online or call/WhatsApp 24/7.",
      },
    },
    {
      "@type": "Question",
      name: "Is self-drive car rental available in Thoothukudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Max Travels offers self-drive car rentals in Thoothukudi for hourly, daily, and weekly periods. A valid driving licence and government-issued ID are required. Fuel-inclusive and fuel-exclusive plans are both available.",
      },
    },
    {
      "@type": "Question",
      name: "Does Max Travels operate on all days including holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Max Travels operates 365 days a year, 24 hours a day including public holidays, festivals, and weekends. Emergency bookings are also accepted on short notice.",
      },
    },
    {
      "@type": "Question",
      name: "What types of vehicles are available for rent in Thoothukudi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Max Travels offers a wide fleet including hatchbacks, sedans (Swift Dzire, Etios), SUVs (Innova Crysta, Ertiga), Tempo Travellers for groups, and luxury cars for weddings and corporate events in Thoothukudi.",
      },
    },
  ],
};

/** BreadcrumbList — helps Google understand site hierarchy */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Car Rental Thoothukudi",
      item: `${SITE.url}/car-rental-thoothukudi`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Airport Transfer",
      item: `${SITE.url}/airport-transfer-thoothukudi`,
    },
  ],
};

/** WebSite schema + Sitelinks SearchBox */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: BUSINESS.name,
  description: SITE.description,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─────────────────────────────────────────────
// Metadata export (Next.js App Router)
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  // ── Title: primary keyword first, brand second ──
  title: {
    default: "Car Rental in Thoothukudi | Max Travels – 24/7 Cab Service Tuticorin",
    template: `%s | Max Travels – Car Rental Thoothukudi`,
  },

  // ── Description: answer-first, 145–155 chars ──
  description:
    "Book car rental in Thoothukudi (Tuticorin) instantly. Max Travels offers 24/7 airport transfers, outstation cabs, self-drive & fleet leasing. ₹12/km onwards. Call now!",

  // ── Keyword cluster: primary + LSI + geo modifiers ──
  keywords: [
    // Primary geo-keywords
    "car travels near me",
    "car travels Thoothukudi",
    "car rental in Thoothukudi",
    "car rental Tuticorin",
    "cab service Thoothukudi",
    "taxi Thoothukudi",
    // Airport transfer
    "airport transfer Thoothukudi",
    "Thoothukudi airport cab",
    "TCR airport taxi",
    // Outstation
    "Thoothukudi to Madurai cab",
    "Thoothukudi to Tirunelveli taxi",
    "Thoothukudi to Chennai cab",
    "Thoothukudi to Kanyakumari taxi",
    "outstation cab Thoothukudi",
    // Self-drive
    "self drive car rental Thoothukudi",
    "rent a car Thoothukudi",
    // Wedding / luxury
    "wedding car rental Thoothukudi",
    "luxury car rental Thoothukudi",
    // Corporate
    "corporate cab service Thoothukudi",
    "fleet leasing Thoothukudi",
    // LSI / semantic
    "best cab service Tuticorin",
    "24/7 car rental Thoothukudi",
    "Max Travels Thoothukudi",
    "Max Travels car rental",
    "book cab Thoothukudi",
  ],

  authors: [{ name: BUSINESS.name, url: SITE.url }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Travel & Transportation",
  classification: "Car Rental / Cab Service",

  // ── Crawling directives ──
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FFB51D" },
    ],
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: BUSINESS.name,
    title: "Car Rental in Thoothukudi | Max Travels – Best Cab Service Tuticorin",
    description:
      "Thoothukudi's most trusted car rental since 2010. Airport transfers, outstation cabs, self-drive & luxury cars. 24/7 service. Book online or WhatsApp now.",
    images: [
      {
        url: `${SITE.url}/og-max-travels-thoothukudi.jpg`, // 1200×630 OG image
        width: 1200,
        height: 630,
        alt: "Max Travels – Car Rental & Cab Service in Thoothukudi (Tuticorin), Tamil Nadu",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: "summary_large_image",
    site: "@MaxTravels",
    creator: "@MaxTravels",
    title: "Car Rental in Thoothukudi | Max Travels – Book 24/7",
    description:
      "Airport transfers, outstation cabs & self-drive cars in Thoothukudi. Best rates guaranteed. Call or WhatsApp to book instantly.",
    images: {
      url: `${SITE.url}/og-max-travels-thoothukudi.jpg`,
      alt: "Max Travels car rental Thoothukudi",
    },
  },

  // ── Canonical & hreflang ──
  alternates: {
    canonical: SITE.url,
    languages: {
      "en-IN": SITE.url,
      "ta-IN": `${SITE.url}/ta`, // Tamil version (add when ready)
    },
  },

  // ── Verification tags ──
  verification: {
    google: "google0ca8e857aa872b9f.html",
  },

  // ── App / PWA manifest ──
  manifest: "/site.webmanifest",

  // ── Additional meta for GEO / AI ──
  other: {
    // Explicit geographic targeting (GEO signal for AI engines)
    "geo.region": "IN-TN",
    "geo.placename": "Thoothukudi, Tamil Nadu, India",
    "geo.position": `${BUSINESS.geo.lat};${BUSINESS.geo.lng}`,
    ICBM: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`,
    "ai:content-type": "local-service",
    "ai:service-category": "car-rental",
    "ai:location": "Thoothukudi, Tamil Nadu, India",
    // Language / region
    language: "en-IN",
    "content-language": "en-IN",
    // Business contact (AEO – AI assistants parse these)
    "business:contact_data:phone_number": BUSINESS.phone,
    "business:contact_data:email": BUSINESS.email,
    "business:contact_data:website": SITE.url,
    "business:contact_data:locality": "Thoothukudi",
    "business:contact_data:region": "Tamil Nadu",
    "business:contact_data:country_name": "India",
  },
};

// ─────────────────────────────────────────────
// Viewport export
// ─────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFB51D" },
    { media: "(prefers-color-scheme: dark)", color: "#FFB51D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  colorScheme: "light",
};

// ─────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" dir="ltr" className={poppins.variable}>
      <head>
        {/* ── Charset & viewport (Next.js handles these but explicit for clarity) ── */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />

        {/* ── Preconnect to critical origins for Core Web Vitals ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />

        {/* ── Canonical (Next.js also injects this via alternates, belt-and-braces) ── */}
        <link rel="canonical" href={SITE.url} />

        {/* ── PWA manifest ── */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* ───────────────────────────────────────────────────────
            STRUCTURED DATA  (JSON-LD)
            All schemas are embedded separately so Google can
            parse each independently — do NOT merge into one block.
        ─────────────────────────────────────────────────────── */}

        {/* 1. LocalBusiness + CarRental */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* 2. FAQ — enables Google FAQ rich results + AI answer boxes */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* 3. BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {/* 4. WebSite + Sitelinks SearchBox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* ── Google Analytics 4 (deferred load) ── */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MHLFQPKYRS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MHLFQPKYRS', {
                page_location: window.location.href,
                page_title: document.title,
                send_page_view: true
              });
            `,
          }}
        />
      </head>

      <body className="min-h-screen overflow-x-hidden antialiased">
        {/*
          ── GEO / AEO HIDDEN ENTITY LAYER ──
          Invisible to users. Parsed by crawlers & AI agents to build
          a crisp, citation-worthy knowledge graph entry for Max Travels.
          Keep it in valid HTML so it's not treated as cloaking.
        */}
        <div
          itemScope
          itemType="https://schema.org/LocalBusiness"
          className="sr-only"
          aria-hidden="true"
        >
          <span itemProp="name">Max Travels</span>
          <span itemProp="alternateName">Max Travels Car Rental Thoothukudi</span>
          <span itemProp="description">
            Max Travels is Thoothukudi&apos;s best car rental company offering 24/7
            airport transfers, outstation cabs, self-drive cars, wedding cars, and
            corporate fleet leasing across Thoothukudi, Tuticorin, Tirunelveli,
            Madurai, and all of Tamil Nadu.
          </span>
          <span itemProp="telephone">{BUSINESS.phone}</span>
          <span itemProp="email">{BUSINESS.email}</span>
          <span itemProp="url">{SITE.url}</span>
          <span
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="streetAddress">{BUSINESS.address.street}</span>
            <span itemProp="addressLocality">Thoothukudi</span>
            <span itemProp="addressRegion">Tamil Nadu</span>
            <span itemProp="postalCode">{BUSINESS.address.postalCode}</span>
            <span itemProp="addressCountry">IN</span>
          </span>
          <span
            itemProp="geo"
            itemScope
            itemType="https://schema.org/GeoCoordinates"
          >
            <span itemProp="latitude">{BUSINESS.geo.lat}</span>
            <span itemProp="longitude">{BUSINESS.geo.lng}</span>
          </span>
          <span itemProp="openingHours">Mo-Su 00:00-24:00</span>
          <span itemProp="priceRange">₹₹</span>
        </div>

        <SiteShell>{children}</SiteShell>
        <Chatbot />
      </body>
    </html>
  );
}