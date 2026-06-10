import Image from "next/image";
import { CounterStat } from "@/components/ui/CounterStat";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { counters } from "@/lib/data";

export function Counter() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-max">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              tagline="fun facts"
              title="experience freedom on our car booking service"
              className="mb-6"
            />
            <p className="text-max-gray">
              Trusted by thousands of renters nationwide with clean vehicles,
              flexible terms, and support whenever you need it.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {counters.map((c) => (
                <div
                  key={c.label}
                  className="rounded-max border border-max-border bg-white p-6 shadow-card"
                >
                  <CounterStat
                    value={c.value}
                    suffix={c.suffix}
                    label={c.label}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-max">
              <Image
                src="https://i.pinimg.com/736x/fb/3a/92/fb3a9277937b6f2ebd0174b4c7c302c1.jpg"
                alt="Car on road"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-max">
              <Image
                src="https://i.pinimg.com/1200x/b7/00/82/b70082528c04ca740cd72652c8c0b963.jpg"
                alt="Luxury vehicle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
