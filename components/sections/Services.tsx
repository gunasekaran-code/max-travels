import { Car, CarTaxiFront, Plane, Shield } from "lucide-react";
import { services } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";

const icons = {
  car: Car,
  taxi: CarTaxiFront,
  sport: Plane,
  insurance: Shield,
} as const;

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-max-base/10 blur-3xl" aria-hidden />
      <div className="container-max relative">
        <SectionTitle
          tagline="What We're Offering"
          title={
            <>
              Services We&apos;re Providing <br className="hidden md:block" /> to
              Customers
            </>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Car;
            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-max border border-max-border bg-white p-8 shadow-card transition hover:-translate-y-1 hover:border-max-base/30 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="absolute -right-4 -top-4 font-display text-8xl font-bold text-max-extra">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-max-extra text-max-base transition group-hover:bg-max-base group-hover:text-max-black">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">
                    <a href="#services" className="hover:text-max-base">
                      {service.title}
                    </a>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-max-gray">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
