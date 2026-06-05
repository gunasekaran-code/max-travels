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
import { Brands } from "@/components/sections/Brands";
import { Blog } from "@/components/sections/Blog";
import { Gallery } from "@/components/sections/Gallery";

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
      <Brands />
      <Blog />
      <Gallery />
    </>
  );
}
