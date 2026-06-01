"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Carousel } from "@/components/ui/Carousel";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container-max">
        <SectionTitle
          align="left"
          tagline="Our Testimonial"
          title={
            <>
              What People Say <br /> about max
            </>
          }
        />
        <Carousel autoplay slidesToShow={{ base: 1, md: 2, lg: 2 }}>
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="relative rounded-max border border-max-border bg-white p-8 shadow-card"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-max-extra" />
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <cite className="font-display text-lg font-semibold not-italic text-max-black">
                    {t.name}
                  </cite>
                  <p className="text-sm text-max-gray">{t.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-max-gray">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex gap-1 text-max-base">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </blockquote>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
