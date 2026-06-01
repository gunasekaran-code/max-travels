import { Car, CarFront, Truck } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

const planIcons = [Car, CarFront, Truck];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container-max">
        <SectionTitle
          tagline="Pricing & Plan"
          title={
            <>
              Time Quick and Easy to <br className="hidden md:block" /> Transportation
            </>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const Icon = planIcons[i] ?? Car;
            return (
              <article
                key={plan.name}
                className="rounded-max border border-max-border bg-white p-8 shadow-card transition hover:-translate-y-1 hover:border-max-base/50"
              >
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p className="mt-3 text-sm text-max-gray">{plan.description}</p>
                <div className="mt-6 flex items-center justify-between border-b border-max-border pb-6">
                  <div>
                    <span className="font-display text-4xl font-bold text-max-base">
                      ${plan.price}
                    </span>
                    <span className="text-max-gray">/month</span>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-max-extra text-max-base">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-max-gray">{f.label}</span>
                      <span className="font-semibold text-max-black">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="#pricing">Rent Now</Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
