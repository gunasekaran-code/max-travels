"use client";

import Image from "next/image";
import { useState } from "react";
import { Gauge, Fuel, Users, Settings2 } from "lucide-react";
import { carBrands, cars } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CarListing() {
  const [activeBrand, setActiveBrand] = useState<string>("Tesla");

  return (
    <section id="listings" className="bg-max-extra/40 py-20 md:py-28">
      <div className="container-max">
        <SectionTitle
          tagline="Checkout our new cars"
          title="Explore Most Popular Cars"
        />
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {carBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setActiveBrand(brand)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition",
                activeBrand === brand
                  ? "bg-max-base text-max-black"
                  : "bg-white text-max-gray hover:text-max-black",
              )}
            >
              {brand}
            </button>
          ))}
        </div>
        <Carousel autoplay slidesToShow={{ base: 1, md: 2, lg: 3 }}>
          {cars.map((car) => (
            <article
              key={car.name}
              className="overflow-hidden rounded-max bg-white shadow-card"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold">
                  {car.brand}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">
                  <a href="/cars" className="hover:text-max-base">
                    {car.name}
                  </a>
                </h3>
                <ul className="mt-4 grid grid-cols-3 gap-2 border-b border-max-border pb-4 text-xs text-max-gray">
                  <li className="flex items-center gap-1">
                    <Settings2 className="h-3.5 w-3.5" />
                    {car.transmission}
                  </li>
                  <li className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5" />
                    {car.mileage}
                  </li>
                  <li className="flex items-center gap-1">
                    <Fuel className="h-3.5 w-3.5" />
                    {car.fuel}
                  </li>
                </ul>
                <ul className="mt-3 grid grid-cols-3 gap-2 text-xs text-max-gray">
                  <li>{car.plan}</li>
                  <li>{car.age}</li>
                  <li className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {car.seats}
                  </li>
                </ul>
                <p className="mt-4 text-sm text-max-gray">
                  Starting From{" "}
                  <span className="font-display text-xl font-bold text-max-base">
                    {formatPrice(car.price)}
                  </span>
                  <span className="text-max-gray">/ Day</span>
                </p>
                <div className="mt-4">
                  <Button href="/cars" className="text-xs">
                    Details Now
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
