import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function LetsTalk() {
  return (
    <section className="relative py-20 md:py-24">
      <Image
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-max-black/80" />
      <div className="container-max relative flex flex-col items-center justify-between gap-8 text-center text-white md:flex-row md:text-left">
        <div>
          <p className="text-sm uppercase tracking-widest text-max-base">
            Rent Your Car
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl text-white">
            Interested in Renting?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/contact">Contact Us</Button>
          <Button href="/cars" variant="outline" className="border-white text-white hover:bg-white hover:text-max-black">
            Rent Now
          </Button>
        </div>
      </div>
    </section>
  );
}
