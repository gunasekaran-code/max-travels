import { Play } from "lucide-react";

export function VideoCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Video Embed */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          className="w-full h-full object-cover scale-125"
          src="https://www.youtube.com/embed/nJXRuY6Yc-4?autoplay=1&mute=1&loop=1&playlist=nJXRuY6Yc-4&controls=1&rel=0"
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
        <a
          href="https://www.youtube.com/watch?v=nJXRuY6Yc-4"
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