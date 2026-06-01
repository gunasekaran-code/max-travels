"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { Carousel } from "@/components/ui/Carousel";

export function Gallery() {
  return (
    <section className="pb-0 pt-4">
      <Carousel autoplay slidesToShow={{ base: 2, md: 4, lg: 6 }} gap={0}>
        {galleryImages.map((src, i) => (
          <a
            key={i}
            href="/cars"
            className="group relative block aspect-square overflow-hidden"
          >
            <Image src={src} alt="" fill className="object-cover transition duration-500 group-hover:scale-110" sizes="200px" />
            <span className="absolute inset-0 flex items-center justify-center bg-max-black/0 text-white transition group-hover:bg-max-black/50">
              <Instagram className="h-8 w-8 opacity-0 transition group-hover:opacity-100" />
            </span>
          </a>
        ))}
      </Carousel>
    </section>
  );
}
