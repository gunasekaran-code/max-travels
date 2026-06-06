"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoplayPlugin from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// ─── Data with Unsplash images ────────────────────────────────────────────────

const destinations = [
  {
    id: 1,
    title: "Lake Braies",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=85",
  },
  {
    id: 2,
    title: "Dubai Skyline",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85",
  },
  {
    id: 3,
    title: "Big Ben",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=85",
  },
  {
    id: 4,
    title: "Brandenburg Gate",
    country: "Germany",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&q=85",
  },
  {
    id: 5,
    title: "Colosseum",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=85",
  },
  {
    id: 6,
    title: "Lisbon Coast",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd1af3b7?w=900&q=85",
  },
  {
    id: 7,
    title: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=85",
  },
  {
    id: 8,
    title: "Bali Rice Fields",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85",
  },
];

const filterTabs = [
  "All","Italy","Dubai","London","Berlin","Rome","Lisbon","India","China","Japan",
];

// ─── Per-slide transform config ───────────────────────────────────────────────
// Positions relative to active center (index offset: -2, -1, 0, +1, +2)
const OFFSETS: Record<number, { x: string; scale: number; rotate: number; z: number; opacity: number }> = {
  [-2]: { x: "-185%", scale: 0.62, rotate: -14, z: 1, opacity: 0.7 },
  [-1]: { x: "-95%",  scale: 0.80, rotate: -7,  z: 2, opacity: 0.85 },
  [0]:  { x: "0%",    scale: 1.00, rotate: 0,   z: 5, opacity: 1 },
  [1]:  { x: "95%",   scale: 0.80, rotate: 7,   z: 2, opacity: 0.85 },
  [2]:  { x: "185%",  scale: 0.62, rotate: 14,  z: 1, opacity: 0.7 },
};

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({
  destination,
  offsetIndex,
}: {
  destination: (typeof destinations)[0];
  offsetIndex: number; // -2 to +2
}) {
  const cfg = OFFSETS[Math.max(-2, Math.min(2, offsetIndex))] ?? OFFSETS[2];
  const isActive = offsetIndex === 0;

  return (
    <motion.div
      className="absolute top-0 left-1/2 cursor-pointer"
      style={{ translateX: "-50%" }}
      animate={{
        x: cfg.x,
        scale: cfg.scale,
        rotate: cfg.rotate,
        zIndex: cfg.z,
        opacity: cfg.opacity,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <div
        className="
          relative overflow-hidden
          w-[300px] h-[380px]
          sm:w-[360px] sm:h-[460px]
          md:w-[440px] md:h-[540px]
          lg:w-[520px] lg:h-[630px]
        "
        style={{
          borderRadius: 28,
          boxShadow: isActive
            ? "0 40px 100px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 12px 40px rgba(0,0,0,0.22)",
        }}
      >
        {/* Image */}
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 440px, 520px"
          className="object-cover"
          unoptimized
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
          }}
        />

        {/* Country pill — only on active */}
        {isActive && (
          <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
            <MapPin className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-semibold tracking-wide">
              {destination.country}
            </span>
          </div>
        )}

        {/* Bottom text — only on active */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-7">
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-1">
              {destination.country}
            </p>
            <h3
              className="text-white font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.25rem, 3vw, 1.85rem)" }}
            >
              {destination.title}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = useRef(
    AutoplayPlugin({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [autoplay.current]
  );

  const filtered =
    activeTab === "All"
      ? destinations
      : destinations.filter(
          (d) =>
            d.country.toLowerCase().includes(activeTab.toLowerCase()) ||
            d.title.toLowerCase().includes(activeTab.toLowerCase())
        );

  const visibleList = filtered.length > 0 ? filtered : destinations;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setSelectedIndex(0);
  }, [visibleList.length, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <section
      className="relative w-full bg-white overflow-hidden py-12 md:py-20"
      aria-label="Travel destination gallery"
    >
      {/* Soft white glow behind cards */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          top: "15%",
          width: "60%",
          height: "55%",
          background: "radial-gradient(ellipse, rgba(180,200,255,0.22) 0%, transparent 70%)",
        }}
      />

      {/* ── Heading ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center mb-10 px-4">
        <motion.p
          className="text-xs font-bold tracking-widest uppercase text-[#03053D]/40 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Explore the World
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#03053D] leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Top Destinations
        </motion.h2>
      </div>

      {/* ── Filter Tabs ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full overflow-x-auto pb-2 mb-12 px-4">
        <div className="flex gap-2 w-max mx-auto sm:flex-wrap sm:justify-center sm:w-full">
          {filterTabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03053D]",
                activeTab === tab
                  ? "bg-[#03053D] text-white border-[#03053D]"
                  : "bg-white text-[#03053D] border-[#03053D]/20 hover:border-[#03053D]/55",
              ].join(" ")}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              aria-pressed={activeTab === tab}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Coverflow Stage ──────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Embla is used only for gesture/loop/autoplay logic; visual layout is CSS+Framer */}
            <div ref={emblaRef} className="overflow-hidden w-full">
              {/* Hidden real slides for Embla snap logic */}
              <div className="flex">
                {visibleList.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex-shrink-0 w-full sm:w-[360px] md:w-[440px] lg:w-[520px]"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  />
                ))}
              </div>
            </div>

            {/* Visual coverflow — absolutely positioned fan */}
            <div
              className="relative w-full mx-auto overflow-visible"
              style={{ height: `clamp(380px, 55vw, 630px)` }}
            >
              {visibleList.map((dest, i) => {
                const offset = i - selectedIndex;
                // wrap around for loop
                const total = visibleList.length;
                let wrappedOffset = offset;
                if (wrappedOffset > total / 2)  wrappedOffset -= total;
                if (wrappedOffset < -total / 2) wrappedOffset += total;
                // only render -2 to +2
                if (Math.abs(wrappedOffset) > 2) return null;
                return (
                  <GalleryCard
                    key={dest.id}
                    destination={dest}
                    offsetIndex={wrappedOffset}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <motion.button
            onClick={scrollPrev}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#03053D]/15 shadow-lg text-[#03053D] focus:outline-none"
            whileHover={{ scale: 1.08, backgroundColor: "#03053D", color: "#ffffff", borderColor: "#03053D" }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2 items-center" aria-hidden>
            {visibleList.map((_, i) => (
              <motion.button
                key={i}
                className="rounded-full bg-[#03053D] focus:outline-none"
                animate={{
                  width: i === selectedIndex ? 24 : 8,
                  opacity: i === selectedIndex ? 1 : 0.22,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ height: 8 }}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={scrollNext}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#03053D] border-2 border-[#03053D] shadow-lg text-white focus:outline-none"
            whileHover={{ scale: 1.08, backgroundColor: "#ffffff", color: "#03053D" }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// Named export so `import { Gallery }` works too
export { GalleryPage as Gallery };
