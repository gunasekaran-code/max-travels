import { Clock, MapPinned, Star } from "lucide-react";
import { whyChoose } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

const icons = [Clock, MapPinned, Star];

export function WhyChoose() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-max-base/5 blur-3xl" aria-hidden />
      <div className="container-max relative">
        <SectionTitle
          tagline="Why Choose Us"
          title={
            <>
              We are innovative and passionate <br className="hidden md:block" /> about
              the work we do.
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {whyChoose.map((item, i) => {
            const Icon = icons[i] ?? Star;
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-max border border-max-border bg-white p-8 shadow-card transition hover:border-max-base/40"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-max-extra text-max-base">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-max-gray">
                  {item.description}
                </p>
                <div className="mt-6">
                  <Button href="/cars">Rent Now</Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
