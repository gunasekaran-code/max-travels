"use client";

import { Car, Truck, Users } from "lucide-react";
import { popularCategories } from "@/lib/data";
import { Carousel } from "@/components/ui/Carousel";
import { SectionTitle } from "@/components/ui/SectionTitle";

const icons = [Car, Car, Truck, Users, Car, Car];

export function PopularCars() {
  return (
    <section className="relative py-20 md:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-max-black/90" aria-hidden />
      <div className="container-max relative">
        <SectionTitle
          tagline="Popular Car"
          title="Most Popular Cartypes"
          light
        />
        <Carousel autoplay slidesToShow={{ base: 1, md: 2, lg: 3 }}>
          {popularCategories.map((cat, i) => {
            const Icon = icons[i] ?? Car;
            return (
              <a
                key={cat.name}
                href={cat.href}
                className="block rounded-max border border-white/10 bg-white/5 p-8 text-center text-white backdrop-blur transition hover:border-max-base hover:bg-white/10"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-max-base/20 text-max-base">
                  <Icon className="h-8 w-8" />
                </div>
                <h4 className="font-display text-lg font-semibold text-white">{cat.name}</h4>
                <p className="mt-2 text-sm text-white/60">{cat.count} Cars</p>
              </a>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
