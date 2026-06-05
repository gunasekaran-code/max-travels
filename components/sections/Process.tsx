import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section className="bg-max-extra/50 py-20 md:py-28">
      <div className="container-max">
        <SectionTitle tagline="Steps" title="Car Rental Process" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <article
              key={step.title}
              className="group relative overflow-hidden rounded-max"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={step.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-max-black/90 via-max-black/40 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-max-base font-display text-lg font-bold text-max-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
