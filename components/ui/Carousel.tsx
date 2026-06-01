"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  slidesToShow?: { base?: number; md?: number; lg?: number };
  gap?: number;
};

export function Carousel({
  children,
  className,
  autoplay = false,
  loop = true,
  slidesToShow = { base: 1, md: 2, lg: 3 },
  gap = 24,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start", slidesToScroll: 1 },
    autoplay ? [Autoplay({ delay: 5000, stopOnInteraction: false })] : [],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const basis =
    slidesToShow.lg === 1
      ? "basis-full"
      : slidesToShow.lg === 2
        ? "basis-full md:basis-1/2"
        : "basis-full md:basis-1/2 lg:basis-1/3";

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ gap }}>
          {children.map((child, i) => (
            <div key={i} className={cn("min-w-0 shrink-0 grow-0", basis)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev && !loop}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-max-border bg-white text-max-black transition hover:border-max-base hover:bg-max-base disabled:opacity-40"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext && !loop}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-max-border bg-white text-max-black transition hover:border-max-base hover:bg-max-base disabled:opacity-40"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
