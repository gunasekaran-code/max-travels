"use client";
import Image from "next/image";
import { useState } from "react";
import { Gauge, Fuel, Users, Settings2, Clock, MapPin, Wind } from "lucide-react";
import { carTypes, cars } from "@/lib/data";
import type { CarType } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

function formatRupee(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function CarListing() {
  const [activeType, setActiveType] = useState<CarType>("Sedan");

  const filtered = cars.filter((car) => car.type === activeType);

  /**
   * Layout logic:
   * – First (filtered.length - 1) cards → 3-column grid row(s)
   * – Last card → centred alone on its own row (col-span trick)
   * If count is a multiple of 3 all rows are full, no centering needed.
   */
  const remainder = filtered.length % 3;
  const hasLoneLastCard = remainder === 1;

  return (
    <section id="listings" className="bg-max-extra/40 py-20 md:py-28">
      <div className="container-max">
        <SectionTitle
          tagline="Checkout our rental fleet"
          title="Explore Most Popular Cars"
        />

        {/* ── Type filter tabs ── */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {carTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition",
                activeType === type
                  ? "bg-max-base text-max-black"
                  : "bg-white text-max-gray hover:text-max-black",
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* ── Car grid (no scroll) ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, idx) => {
            const isLastAlone =
              hasLoneLastCard && idx === filtered.length - 1;

            return (
              <article
                key={car.name}
                className={cn(
                  "overflow-hidden rounded-max bg-white shadow-card",
                  // Centre the lone last card when it would sit in col 1 of 3
                  isLastAlone && "sm:col-span-2 lg:col-start-2 lg:col-span-1",
                )}
              >
                {/* Image */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Brand badge – top left */}
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
                    {car.brand}
                  </span>

                  {/* AC badge – top right (Tempo Van only) */}
                  {car.type === "Tempo Van" && (
                    <span
                      className={cn(
                        "absolute right-4 top-4 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow",
                        car.ac
                          ? "bg-sky-500 text-white"
                          : "bg-gray-200 text-gray-700",
                      )}
                    >
                      <Wind className="h-3 w-3" />
                      {car.ac ? "AC" : "Non-AC"}
                    </span>
                  )}

                  {/* Offer ribbon – bottom left */}
                  <span className="absolute bottom-0 left-0 rounded-tr-max bg-max-base px-3 py-1 text-xs font-bold text-max-black">
                    Special Offer
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold">
                    <a href="/cars" className="hover:text-max-base">
                      {car.name}
                    </a>
                  </h3>

                  {/* Row 1 – transmission / fuel / seats */}
                  <ul className="mt-4 grid grid-cols-3 gap-2 border-b border-max-border pb-4 text-xs text-max-gray">
                    <li className="flex items-center gap-1">
                      <Settings2 className="h-3.5 w-3.5 shrink-0" />
                      {car.transmission}
                    </li>
                    <li className="flex items-center gap-1">
                      <Fuel className="h-3.5 w-3.5 shrink-0" />
                      {car.fuel}
                    </li>
                    <li className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      {car.seats}
                    </li>
                  </ul>

                  {/* Row 2 – hours / included km / extra rate */}
                  <ul className="mt-3 grid grid-cols-3 gap-2 border-b border-max-border pb-4 text-xs text-max-gray">
                    <li className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {car.hours}
                    </li>
                    <li className="flex items-center gap-1">
                      <Gauge className="h-3.5 w-3.5 shrink-0" />
                      {car.km}&nbsp;KM
                    </li>
                    <li className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      +{formatRupee(car.extraPerKm)}/km
                    </li>
                  </ul>

                  {/* Price block */}
                  <div className="mt-4 flex items-end gap-3">
                    <div>
                      <p className="text-xs text-max-gray">Offer Price</p>
                      <p className="font-display text-2xl font-bold text-max-base leading-none">
                        {formatRupee(car.price)}
                        <span className="ml-1 text-sm font-normal text-max-gray">
                          / Day
                        </span>
                      </p>
                    </div>
                    <div className="mb-0.5">
                      <p className="text-xs text-max-gray">Original</p>
                      <p className="text-sm font-medium text-max-gray line-through">
                        {formatRupee(car.originalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-4">
                    <Button href="/booking" className="text-xs">
                      Book Now
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}