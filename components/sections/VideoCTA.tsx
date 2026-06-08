import { Play } from "lucide-react";

export function VideoCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="w-full h-full scale-125"
          src="https://www.youtube.com/embed/4nfq18MG7Mo?si=07PNaAjD9WB3YaRA&autoplay=1&mute=1&loop=1&playlist=4nfq18MG7Mo&controls=0&rel=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="absolute inset-0 bg-max-black/70" />
      <div className="container-max relative text-center text-white">
        <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl text-white">
          Want To Know More About? <br />
          Play Our Promotional Video Now!
        </h2>
      </div>
    </section>
  );
}