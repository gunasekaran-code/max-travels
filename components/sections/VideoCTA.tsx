import Image from "next/image";
import { Play } from "lucide-react";

export function VideoCTA() {
  return (
    <section className="relative py-24 md:py-32">
      <Image
        src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-max-black/70" />
      <div className="container-max relative text-center text-white">
        <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
          Want To Know More About? <br />
          Play Our Promotional Video Now!
        </h2>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex"
          aria-label="Play promotional video"
        >
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-max-base bg-max-base/20 text-max-base backdrop-blur transition hover:scale-110 hover:bg-max-base hover:text-max-black">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
        </a>
      </div>
    </section>
  );
}
