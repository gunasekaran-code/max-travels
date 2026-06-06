"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  Phone,
  Search,
  MapPin,
  Mail,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeaderProps = {
  overlay?: boolean;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
  onOpenMobile: () => void;
};

export function Header({
  overlay = false,
  onOpenSidebar,
  onOpenSearch,
  onOpenMobile,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 w-full",
        overlay && !scrolled ? "absolute left-0 right-0 top-0" : "relative",
      )}
    >
      {/* Top Utility Bar (Hidden on Mobile) */}
      <div className="hidden border-b border-max-border bg-max-black text-sm text-white/80 lg:block">
        <div className="container-max flex items-center justify-between py-3">
          <ul className="font-times flex flex-wrap items-center gap-6">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-max-base" />
              <a href={CONTACT.phoneHref} className="hover:text-max-base">
                {CONTACT.emergency}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-max-base" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-max-base">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-max-base" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-max-base" />
              <span>{CONTACT.rating}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={cn(
          "transition-all duration-300 w-full",
          scrolled
            ? "fixed left-0 right-0 top-0 bg-white shadow-nav"
            : overlay
              ? "relative bg-white/95 shadow-nav backdrop-blur"
              : "relative bg-white",
        )}
      >
        {/* Adjusted padding on small viewports (px-2.5 xs:px-4) to save valuable pixels */}
        <div className="container-max flex items-center justify-between gap-1 px-2.5 xs:px-4 py-3 lg:py-5">

          {/* Logo Brand Segment */}
          <Link href="/" className="flex shrink-0 items-center gap-1 xs:gap-2" aria-label="max home">
            <div className="relative h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 transition-all duration-200">
              <Image
                src="/max-travels-logo.png"
                alt="Max Travels Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Font responsive steps: text-base at 300px, text-lg at 350px, text-2xl above */}
            <span className="font-display text-base xs:text-lg sm:text-2xl font-bold text-max-black tracking-tight select-none">
              Max<span className="text-max-base">Travels</span>
            </span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden flex-1 items-center justify-center gap-8 xl:flex">
            <ul className="flex items-center gap-8 font-medium text-max-black">
              <li><Link href="/" className="text-max-base">Home</Link></li>
              <li><Link href="/about" className="hover:text-max-base">About Us</Link></li>
              <li><Link href="/cars" className="hover:text-max-base">Cars</Link></li>
              <li><Link href="/gallery" className="hover:text-max-base">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-max-base">Contact</Link></li>
            </ul>
          </div>

          {/* Right Action Trigger Controls */}
          <div className="flex items-center gap-1 xs:gap-3 md:gap-5 shrink-0">

            {/* NEW: Compact Phone Icon Button for screens under 400px (300px optimized) */}
            <a
              href={CONTACT.phoneHref}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-max-extra border border-max-base/30 text-max-base transition hover:bg-max-base hover:text-max-black xs:hidden"
              aria-label="Call Anytime"
            >
              <Phone className="h-4 w-4 stroke-[2.5]" />
            </a>

            {/* UPDATED: Decreased padding/font size on ultra-small screens (px-2.5 py-1.5 text-[10px]) */}
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-max-base px-2.5 py-1.5 text-[10px] font-bold text-max-black transition hover:bg-max-black hover:text-white xs:px-4 xs:py-2.5 xs:text-xs sm:px-5 sm:py-3 sm:text-sm"
            >
              Booking
            </Link>

            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-max-border text-max-black transition hover:border-max-base hover:text-max-base sm:flex"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Desktop Call Element (Stays hidden on mobile, visible on lg screens) */}
            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-max-extra">
                <Phone className="h-5 w-5 text-max-base" />
              </div>
              <div>
                <p className="font-times text-xs text-max-gray">Call Anytime</p>
                <a
                  href={CONTACT.phoneHref}
                  className="font-times text-sm font-semibold text-max-black hover:text-max-base"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenSidebar}
              className="hidden h-11 w-11 flex-col items-center justify-center gap-1 rounded-full border border-max-border lg:flex"
              aria-label="Open menu sidebar"
            >
              <span className="h-0.5 w-4 rounded bg-max-black" />
              <span className="h-0.5 w-4 rounded bg-max-black" />
              <span className="h-0.5 w-4 rounded bg-max-black" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={onOpenMobile}
              className="flex h-8 w-8 xs:h-11 xs:w-11 items-center justify-center rounded-full border border-max-black/30 bg-white text-max-black shadow-sm transition active:scale-95 lg:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="h-4 w-4 xs:h-6 xs:w-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </nav>
      {scrolled && !overlay && <div className="h-[72px] xs:h-[88px] lg:h-[96px]" aria-hidden />}
    </header>
  );
}