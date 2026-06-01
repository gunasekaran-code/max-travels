"use client";

import { brandLogos } from "@/lib/data";
import { Carousel } from "@/components/ui/Carousel";

export function Brands() {
  return (
    <section className="border-y border-max-border py-12">
      <div className="container-max">
        <Carousel autoplay slidesToShow={{ base: 2, md: 4, lg: 6 }}>
          {brandLogos.map((brand) => (
            <div
              key={brand}
              className="flex h-20 items-center justify-center rounded-max bg-max-extra/50 px-6"
            >
              <span className="font-display text-lg font-bold text-max-gray/60">
                {brand}
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
