"use client";

import Image from "next/image";
import { useState } from "react";
import { teamMembers } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function Team() {
  const [active, setActive] = useState(0);
  const member = teamMembers[active];

  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container-max">
        <SectionTitle tagline="Our Drivers" title="Meet Our Premium Drivers" />
        <div className="grid gap-10 lg:grid-cols-12">
          <ul className="space-y-3 lg:col-span-5">
            {teamMembers.map((m, i) => (
              <li key={m.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-max border p-4 text-left transition",
                    active === i
                      ? "border-max-base bg-max-base/10"
                      : "border-max-border bg-white hover:border-max-base/50",
                  )}
                >
                  <div className="text-center">
                    <span className="font-display text-2xl font-bold text-max-base">
                      {m.years}
                    </span>
                    <p className="text-[10px] uppercase leading-tight text-max-gray">
                      Years
                      <br />
                      Exp.
                    </p>
                  </div>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image src={m.thumb} alt="Max Travels Logo" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold">{m.name}</h4>
                    <p className="text-sm text-max-gray">{m.role}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="relative aspect-[4/3] overflow-hidden rounded-max lg:col-span-7">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
