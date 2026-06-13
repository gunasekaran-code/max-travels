"use client";
import Image from "next/image";
import { useState } from "react";
import { teamMembers } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export default function Teams() {
  const [active, setActive] = useState(0);
  const member = teamMembers[active];

  return (
    <section id="team" className="py-20 md:py-28">
      <div className="container-max">
        <SectionTitle tagline="Our Team" title="Meet Our Premium Team" />

        <div className="grid gap-10 lg:grid-cols-12">

          {/* LEFT — driver list */}
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
                  {/* thumbnail */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={m.thumb}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* name + role */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold truncate">
                      {m.name}
                    </h4>
                    <p className="text-sm text-max-gray">{m.role}</p>
                  </div>

                  {/* years experience */}
                  <div className="text-center shrink-0">
                    <span className="font-display text-2xl font-bold text-max-base">
                      {m.years}
                    </span>
                    <p className="text-[10px] uppercase leading-tight text-max-gray">
                      Years
                      <br />
                      Exp.
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT — large photo + name overlay */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-max lg:col-span-7">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* name + role at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-base md:text-lg text-white/80 font-medium tracking-wide">
                {member.role}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {member.years} Years Experience
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}