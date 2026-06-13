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
                  src="/max-travels-logo.png"
                  alt="Max Travels Logo"
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
                
{/* Trending Style Map Location Card (Real Map Image) */}
<a 
  href={googleMapsUrl} 
  target="_blank" 
  rel="noopener noreferrer"
  className="group relative block w-full h-36 rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-max-base/60 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-max-base/5 bg-neutral-100"
>
  {/* Actual Map Graphic Image (with light yellow/warm tint filter) */}
  <div className="absolute inset-0 w-full h-full grayscale-[20%] sepia-[10%] brightness-[95%] contrast-[90%] pointer-events-none">
    <img
      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60" 
      alt="Location Map"
      className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
    />
    {/* Subtle gradient overlay to smoothly fade map into the bottom banner */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/40" />
  </div>
  
  {/* Soft ambient yellow glow behind the pulse */}
  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-max-base/30 blur-md pointer-events-none" />

  {/* Neon active radar pulse centered directly over the map graphic */}
  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex h-3.5 w-3.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-max-base opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-max-base border-2 border-white shadow-sm"></span>
  </div>

  {/* Frosted Light Glassmorphism Details Overlay Banner */}
  <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-md border-t border-neutral-200/50 p-3 flex items-center justify-between transition-colors group-hover:bg-white/95">
    <div className="flex items-center gap-2.5 min-w-0">
      {/* Compass Icon Wrapper */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-max-base/10 text-max-black group-hover:bg-max-base transition-colors duration-300">
        <Compass className="h-4 w-4 animate-spin-slow text-max-black" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-max-black uppercase tracking-wider">Max Travels</p>
        <p className="font-sans text-[11px] font-medium text-neutral-600 truncate max-w-[180px]">
          {CONTACT.address}
        </p>
      </div>
    </div>
    <span className="text-xs font-semibold text-max-black flex items-center gap-1 shrink-0 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      Open Map <ArrowRight className="h-3 w-3 text-max-base" />
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
              <Link
                href="/terms-of-service"
                className="hover:text-max-base transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-max-base transition-colors"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
