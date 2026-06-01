import { marqueeItems } from "@/lib/data";

export function SlidingText() {
  // Duplicate items for seamless continuous looping
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="overflow-hidden border-y border-max-border bg-max-black py-4" aria-hidden>
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="mx-6 flex shrink-0 items-center gap-6 font-display text-sm font-medium tracking-[0.2em] uppercase text-white/90 md:text-base"
          >
            {/* Alternating filled and outlined typography style */}
            {i % 2 === 0 ? (
              <span>{item}</span>
            ) : (
              <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)" }}
              >
                {item}
              </span>
            )}
            
            {/* Mini geometric diamond/square spacer instead of a heavy dot */}
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-max-base opacity-80" />
          </div>
        ))}
      </div>
    </section>
  );
}