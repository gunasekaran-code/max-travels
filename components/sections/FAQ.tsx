"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-max">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              tagline="Our Faqs"
              title="Frequently Asked Questions"
              className="mb-8"
            />
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-max">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=700&q=80"
                alt="Customer support"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 rounded-2xl bg-max-base px-6 py-4 text-center">
                <div className="font-display text-4xl font-bold text-max-black">
                  55
                </div>
                <p className="text-xs font-medium uppercase">
                  Years of
                  <br />
                  experience
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-max border border-max-border bg-white"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-display font-semibold text-max-black"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? -1 : index)
                  }
                  aria-expanded={openIndex === index}
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-max-base transition",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-max-gray">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
