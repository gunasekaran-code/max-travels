import type { Metadata } from "next";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { SlidingText } from "@/components/sections/SlidingText";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Counter } from "@/components/sections/Counter";
import { VideoCTA } from "@/components/sections/VideoCTA";
import { Pricing } from "@/components/sections/Pricing";
import { CallBanner } from "@/components/sections/CallBanner";
import { PopularCars } from "@/components/sections/PopularCars";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LetsTalk } from "@/components/sections/LetsTalk";
import { Team } from "@/components/sections/Team";
import { Blog } from "@/components/sections/Blog";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Car Rental Services | Max Travels",
  description:
    "Book luxury and premium cars for any occasion. Airport transfers, self-drive rentals, and chauffeur services with Max Travels. Best rates guaranteed.",
  keywords: [
    "car rental",
    "luxury cars",
    "airport transfer",
    "self-drive",
    "chauffeur",
    "premium car rental",
    "vehicle booking",
  ],
  openGraph: {
    title: "Premium Car Rental Services | Max Travels",
    description:
      "Book luxury and premium cars for any occasion. Airport transfers, self-drive rentals, and chauffeur services.",
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: `${SITE.url}/max-travels-logo.png`,
        width: 1200,
        height: 630,
        alt: "Max Travels - Premium Car Rental",
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
      <WhyChoose />
      <Counter />
      <VideoCTA />
      <Pricing />
      <CallBanner />
      <PopularCars />
      <Testimonials />
      <FAQ />
      <LetsTalk />
      <Team />
      <Blog />
    </>
  );
}
