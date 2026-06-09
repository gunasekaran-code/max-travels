import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-14 md:py-20 lg:py-28">
      <div className="container-max px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ── Image block ── */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">

            {/* Main image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:rounded-max">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
                alt="Professional driver with rental car"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Floating thumbnail — bottom right */}
            <div
              className="absolute -bottom-5 -right-2 overflow-hidden rounded-xl
                         border-[3px] border-white shadow-lg
                         sm:-bottom-6 sm:-right-4 sm:rounded-max sm:border-4
                         md:-right-6"
            >
              <div className="relative h-28 w-24 sm:h-36 sm:w-28 md:h-44 md:w-36">
                <Image
                  src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80"
                  alt="Car interior"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
            </div>

            {/* Experience badge — left side */}
            <div
              className="absolute -left-2 top-6 rounded-xl bg-max-base px-4 py-3 text-center shadow-lg
                         sm:-left-4 sm:rounded-2xl sm:px-5 sm:py-4
                         md:-left-6 md:px-6 md:py-5"
            >
              <div className="font-display text-2xl font-bold text-max-black sm:text-3xl md:text-4xl">
                5<span className="text-sm sm:text-base md:text-lg">+</span>
              </div>
              <p className="mt-0.5 text-[10px] font-medium uppercase leading-tight text-max-black/80 sm:text-xs">
                Years of
                <br />
                Experience
              </p>
            </div>
          </div>

          {/* ── Content block ── */}
          <div className="mt-6 lg:mt-0">
            <SectionTitle
              align="left"
              tagline="About max"
              title="Welcome to Max Travels car booking company"
              className="mb-5 md:mb-6"
            />

            <p className="font-subheading text-base font-medium text-max-black sm:text-lg">
              Committed to providing our customers with ultimate service.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-max-gray sm:mt-4 sm:text-base">
              We combine a modern fleet, transparent pricing, and responsive
              support so every trip feels effortless—from airport pickup to long
              highway drives.
            </p>

            {/* Progress bars */}
            <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
              {[
                { label: "Time Awareness", percent: 90 },
                { label: "Driver Experience", percent:85 },
              ].map((item) => (
                <li key={item.label}>
                  <div className="mb-2 flex justify-between text-xs font-medium sm:text-sm">
                    <span className="text-max-black">{item.label}</span>
                    <span className="text-max-base">{item.percent}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-max-extra sm:h-2">
                    <div
                      className="h-full rounded-full bg-max-base transition-all duration-1000"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
              <Button href="/about">Read More</Button>

              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center
                             rounded-full bg-max-extra
                             sm:h-14 sm:w-14"
                >
                  <Phone className="h-5 w-5 text-max-base sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-xs text-max-gray sm:text-sm">
                    Call Anytime
                  </p>
                  
                  {/* Fixed the missing <a tag here */}
                  <a
                    href={CONTACT.phoneHref}
                    className="font-display text-base font-semibold hover:text-max-base sm:text-lg"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}