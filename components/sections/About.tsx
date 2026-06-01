import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CONTACT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-max">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-max">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
                alt="Professional driver with rental car"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 overflow-hidden rounded-max border-4 border-white shadow-lg md:-right-8">
              <div className="relative h-40 w-32 md:h-48 md:w-40">
                <Image
                  src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80"
                  alt="Car interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -left-4 top-8 rounded-2xl bg-max-base px-6 py-5 text-center shadow-lg md:-left-8">
              <div className="font-display text-4xl font-bold text-max-black">
                50<span className="text-lg">+</span>
              </div>
              <p className="text-xs font-medium uppercase text-max-black/80">
                Years of
                <br />
                Experience
              </p>
            </div>
          </div>
          <div>
            <SectionTitle
              align="left"
              tagline="About max"
              title="Welcome to Max Travels car booking company"
              className="mb-6"
            />
            <p className="font-subheading text-lg font-medium text-max-black">
              Committed to providing our customers with ultimate service.
            </p>
            <p className="mt-4 text-max-gray">
              We combine a modern fleet, transparent pricing, and responsive support
              so every trip feels effortless—from airport pickup to long highway
              drives.
            </p>
            <ul className="mt-8 space-y-6">
              {[
                { label: "Time Awareness", percent: 90 },
                { label: "Driver Experience", percent: 70 },
              ].map((item) => (
                <li key={item.label}>
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span className="text-max-black">{item.label}</span>
                    <span className="text-max-base">{item.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-max-extra">
                    <div
                      className="h-full rounded-full bg-max-base transition-all duration-1000"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/about">Read More</Button>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-max-extra">
                  <Phone className="h-6 w-6 text-max-base" />
                </div>
                <div>
                  <p className="text-sm text-max-gray">Call to Anytime</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="font-display text-lg font-semibold hover:text-max-base"
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
