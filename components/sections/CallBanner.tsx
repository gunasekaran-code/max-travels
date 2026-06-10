import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

export function CallBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-max">
          <Image
            src="https://images.unsplash.com/photo-1755083754967-3edea1c4803b?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Max Travels Logo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-max-black/75" />
          <div className="relative flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
            <div className="text-white">
              <p className="text-sm uppercase tracking-widest text-max-base">
                Available 24/7
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl text-white">
                Call Any Time For Booking
              </h2>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-max-base text-max-black">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-white/70">Call Emergency</p>
                <a
                  href={`tel:${CONTACT.emergency.replace(/\s/g, "")}`}
                  className="font-display text-lg font-semibold hover:text-max-base"
                >
                  {CONTACT.emergency}
                </a>
              </div>
            </div>
            <Button href="/cars">Rent Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
