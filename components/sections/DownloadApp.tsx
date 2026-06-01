import Image from "next/image";
import Link from "next/link";

export function DownloadApp() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-max-black" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1619767886555-ef6afc3f097f?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="container-max relative">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="text-sm uppercase tracking-widest text-max-base">
              Download Our App
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              max User Friendly <br /> App Available
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Get our mobile app for easy booking, trip management, and instant
              support on the go.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-max-base hover:text-max-black"
              >
                App Store
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-max-base hover:text-max-black"
              >
                Google Play
              </Link>
            </div>
          </div>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="relative aspect-[9/16] max-h-[480px] w-full overflow-hidden rounded-3xl border-4 border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80"
                alt="Mobile app preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
