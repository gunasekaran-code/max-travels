import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, Compass } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Galleries", href: "/gallery" },
  { label: "Our Services", href: "/#services" },
  { label: "Our Drivers", href: "/#team" },
  { label: "Our Blog", href: "/#blog" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Your Reliable Ride", href: "/cars" },
  { label: "Express Shuttle", href: "/cars" },
  { label: "Travel in Style", href: "/cars" },
  { label: "Rental List", href: "/cars" },
];

export function Footer() {
  // Your shared Google Maps short URL
  const googleMapsUrl = "https://share.google/WJ5XwuVJu3JJ7IuHH";

  return (
    <footer className="relative bg-max-black text-white/80 overflow-hidden">
      {/* Background Decorative Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #131222 0%, rgba(19,18,34,0.95) 100%)",
        }}
        aria-hidden
      />
      
      <div className="relative z-10">
        <div className="container-max border-b border-white/10 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            
            {/* Column 1: Brand & Newsletter (Span 4) */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                <Image
                  src="/logo.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain"
                />
                <span>
                  Max<span className="text-max-base">Travels</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed">
                Premium car rental with flexible booking, transparent pricing, and
                nationwide pickup locations.
              </p>
              <form className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-white/20 focus-within:border-max-base transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
                  aria-label="Newsletter email"
                />
                <button
                  type="submit"
                  className="flex h-12 w-12 shrink-0 items-center justify-center bg-max-base text-max-black transition hover:bg-white"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Column 2: Quick Links (Span 2) */}
            <div className="sm:col-span-1 lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-white">
                Quick links
              </h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-max-base transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (Span 2) */}
            <div className="sm:col-span-1 lg:col-span-2">
              <h3 className="font-display text-lg font-semibold text-white">
                Services
              </h3>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-max-base transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Trending Location & Contact Combo (Span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-white mb-4">
                  Our Headquarters
                </h3>
                
                {/* Trending Style Map Location Card */}
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block w-full h-36 rounded-2xl overflow-hidden border border-white/10 hover:border-max-base/40 transition-all duration-300 shadow-lg hover:shadow-max-base/5"
                >
                  {/* Subtle Grid abstract background simulating map styling color-neutral */}
                  <div className="absolute inset-0 bg-neutral-900 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                  
                  {/* Neon active radar pulse inside map representation */}
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-max-base opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-max-base"></span>
                  </div>

                  {/* Glassmorphism Details Overlay Banner */}
                  <div className="absolute bottom-0 inset-x-0 bg-max-black/60 backdrop-blur-md border-t border-white/5 p-3 flex items-center justify-between transition-colors group-hover:bg-max-black/80">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-max-base group-hover:bg-max-base group-hover:text-max-black transition-colors duration-300">
                        <Compass className="h-4 w-4 animate-spin-slow" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white uppercase tracking-wider">Max Travels</p>
                        <p className="font-times text-[11px] text-white/60 truncate max-w-[180px]">
                          {CONTACT.address}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-max-base flex items-center gap-1 shrink-0 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Open Map <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              </div>

              {/* Direct Reach Contacts below card */}
              <ul className="font-times space-y-3 text-sm border-t border-white/5 pt-4">
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-max-base mt-0.5" />
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-max-base transition-colors">
                    {CONTACT.address}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-max-base mt-0.5" />
                  <a href={CONTACT.phoneHref} className="hover:text-max-base transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-max-base mt-0.5" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-max-base transition-colors">
                    {CONTACT.email}
                  </a>
                </li>
                <li>{CONTACT.rating}</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="container-max flex flex-col items-center justify-between gap-4 py-6 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="#terms" className="hover:text-max-base transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#privacy" className="hover:text-max-base transition-colors">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
