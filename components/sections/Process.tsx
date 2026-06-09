import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section className="bg-max-extra/50 py-16 md:py-24 overflow-hidden">
      <div className="container-max">
        <SectionTitle tagline="Steps" title="Car Rental Process" />

        {/* Mobile: horizontal snap scroll | Desktop: 4-col grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide
                        sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0
                        xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="group relative shrink-0 w-[72vw] snap-start
                         sm:w-auto
                         rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image — shorter square-ish ratio */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] xl:aspect-[4/5]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 72vw, (max-width: 1280px) 50vw, 25vw"
                />

                {/* Dark gradient base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Step number badge — top left */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center
                                   rounded-full
                                   bg-white/15 backdrop-blur-md
                                   border border-white/30
                                   font-display text-sm font-bold text-white
                                   shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Glassmorphism content pill — bottom */}
                <div className="absolute bottom-4 left-3 right-3">
                  <div className="rounded-xl px-4 py-3
                                  bg-white/10 backdrop-blur-xl
                                  border border-white/20
                                  shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]">
                    <h3 className="font-display text-base font-semibold text-white leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Hover: soft glow ring */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0
                                transition-all duration-300
                                group-hover:ring-white/25 group-hover:ring-inset" />
              </div>
            </article>
          ))}
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {processSteps.map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 rounded-full bg-max-base/40"
            />
          ))}
        </div>
      </div>
    </section>
  );
}