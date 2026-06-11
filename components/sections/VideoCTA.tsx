export function VideoCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* Fullscreen YouTube background — covers entire section on all screens */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "calc(100% + 200px)",
            height: "calc(100% + 200px)",
            minWidth: "177.78vh", 
            minHeight: "56.25vw", 
          }}
          src="https://www.youtube.com/embed/278IRQ6HSi4?autoplay=1&mute=1&loop=1&playlist=278IRQ6HSi4&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1"
          title="Travel background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Light dark overlay — just enough for text legibility, not a black screen */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="container-max relative text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">
          Discover the World With Us
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl text-white leading-tight">
          Every Road Tells a Story. <br />
          Let Us Drive Yours.
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/75 max-w-xl mx-auto">
          From scenic highways to hidden destinations — travel in comfort, arrive in style.
        </p>
      </div>

    </section>
  );
}