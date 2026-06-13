import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { SlidingText } from "@/components/sections/SlidingText";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Counter } from "@/components/sections/Counter";
import { VideoCTA } from "@/components/sections/VideoCTA";
import { Pricing } from "@/components/sections/Pricing";
import { CallBanner } from "@/components/sections/CallBanner";
import { FAQ } from "@/components/sections/FAQ";
import { LetsTalk } from "@/components/sections/LetsTalk";
import Teams from "@/components/sections/Team";
import { Blog } from "@/components/sections/Blog";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Car Rental Services in Thoothukudi | Max Travels – Affordable to Luxury",
  description:
    "Max Travels offers car rentals for every budget — economy hatchbacks to luxury sedans. Airport transfers, outstation trips, self-drive & chauffeur. Easy booking.",
  keywords: [
    // Budget & economy
    "affordable car rental",
    "cheap car hire",
    "economy car rental",
    "budget car rental Thoothukudi",
    // Mid-range
    "car rental Thoothukudi",
    "cab booking Thoothukudi",
    "outstation car rental",
    "monthly car rental",
    // Premium
    "luxury car rental",
    "premium car hire",
    "chauffeur service Thoothukudi",
    // Service types
    "airport transfer Thoothukudi",
    "self-drive car rental",
    "corporate car rental",
    "wedding car rental",
    "one way cab Thoothukudi",
    // Brand
    "Max Travels",
    "Max Travels car rental",
  ],
  openGraph: {
    title: "Car Rental for Every Budget | Max Travels Thoothukudi",
    description:
      "Hatchbacks to luxury sedans — Max Travels has the right car at the right price. Airport pickups, outstation trips, self-drive & chauffeur services. Book now!",
    type: "website",
    locale: "en_IN",         
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/max-travels-logo.png`,
        width: 1200,
        height: 630,
        alt: "Max Travels - Car Rental Thoothukudi | Economy to Luxury",
      },
    ],
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <SlidingText />
      <Services />
      <Process />
      <Testimonials />
      <WhyChoose />
      <Counter />
      <VideoCTA />
      <Pricing />
      <CallBanner />
      <FAQ />
      <LetsTalk />
      <Teams />
      <Blog />
    </>
  );
}
