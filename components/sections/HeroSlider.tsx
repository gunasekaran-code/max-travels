"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import BlurText from "@/components/BlurText";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-screen min-h-[100svh] overflow-hidden bg-max-black" aria-label="Hero">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 shrink-0 grow-0 basis-full">
              <div className="relative h-screen min-h-[100svh]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-max-black/85 via-max-black/50 to-transparent" />
                
                {/* 
                  FIX 1: Changed padding to pt-32 pb-24 so the text starts perfectly below 
                  your fixed header, and doesn't crash into the top screen boundary.
                */}
                <div className="container-max relative flex h-full pt-32 pb-24 sm:pt-40 sm:pb-28">
                  
                  {/* 
                    FIX 2: Added `justify-between` to force the text block to the top 
                    and the action buttons to the bottom of the hero space.
                  */}
                  <div className="flex h-full max-w-2xl flex-col justify-between text-white">
                    
                    {/* Top Section: Main Typography */}
                    <div>
                      <p className="mb-3 font-subheading text-sm font-bold uppercase tracking-[0.2em] text-max-base">
                        {slide.subtitle}
                      </p>
                      <BlurText
                        text={`${slide.title} ${slide.highlight}`}
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="font-display text-4xl font-black leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
                      />
                      <span className="mt-2 block font-subheading text-2xl font-semibold text-white md:text-4xl">
                        {slide.tagline}
                      </span>
                    </div>

                    {/* Bottom Section: Action CTAs */}
                    <div className="flex flex-wrap items-center gap-6">
                      <Button href="/about">Read More</Button>
                      <a
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 text-white"
                      >
                        {/* <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur transition group-hover:border-max-base group-hover:bg-max-base group-hover:text-max-black sm:h-16 sm:w-16">
                          <Play className="ml-1 h-5 w-5 fill-current sm:h-6 sm:w-6" />
                        </span>
                        <span className="font-subheading text-base font-medium sm:text-lg">
                          Watch Video
                        </span> */}
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide dots tracking along the bottom center */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              selected === i ? "w-8 bg-max-base" : "w-2 bg-white/50",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export const heroSlides = [
  {
    id: 1,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Rental",
    tagline: "Experience",
    image: "https://images.unsplash.com/photo-1593692716621-1e228b0a9224?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Booking",
    tagline: "Experience",
    image: "https://images.unsplash.com/photo-1769160944776-a5abea006d77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
  },
  {
    id: 3,
    subtitle: "Your Best",
    title: "Car",
    highlight: "Choosing",
    tagline: "Experience",
    image: "https://images.unsplash.com/photo-1720775583890-c08c9d4bf463?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
] as const;
