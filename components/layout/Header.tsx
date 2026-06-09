"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, Search, MapPin, Mail, ChevronRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type HeaderProps = {
  overlay?: boolean;
  onOpenSidebar: () => void;
  onOpenSearch: () => void;
  onOpenMobile: () => void;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/cars", label: "Overview" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  overlay = false,
  onOpenSidebar,
  onOpenSearch,
  onOpenMobile,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Inject keyframes once via a style tag */}
      <style>{`
        /* Shine sweep animation */
        @keyframes shine-sweep {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }
        .shine-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.55) 50%,
            transparent 100%
          );
          transform: translateX(-120%) skewX(-20deg);
          animation: shine-sweep 2.4s ease-in-out infinite;
          pointer-events: none;
          border-radius: inherit;
        }

        /* Pulse glow for call button */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(234,179,8,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(234,179,8,0); }
          100% { box-shadow: 0 0 0 0 rgba(234,179,8,0); }
        }
        .pulse-call {
          animation: pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }

        /* Underline slide for nav links */
        .nav-link-item {
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--color-max-base, #eab308);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          width: 100%;
        }

        /* Logo hover spin */
        @keyframes logo-nudge {
          0%   { transform: rotate(0deg) scale(1); }
          25%  { transform: rotate(-4deg) scale(1.06); }
          75%  { transform: rotate(4deg) scale(1.06); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .logo-wrap:hover .logo-img {
          animation: logo-nudge 0.5s ease-in-out;
        }

        /* Hamburger bar morph on hover */
        .ham-btn:hover .bar-top    { transform: translateY(-1px); }
        .ham-btn:hover .bar-bottom { transform: translateY(1px); }
        .ham-btn .bar-top,
        .ham-btn .bar-bottom {
          transition: transform 0.2s ease;
        }

        /* Search button spin */
        .search-btn:hover svg {
          transform: rotate(15deg) scale(1.1);
          transition: transform 0.25s ease;
        }
        .search-btn svg {
          transition: transform 0.25s ease;
        }
      `}</style>

      <header
        className={cn(
          "z-50 w-full",
          overlay && !scrolled ? "absolute left-0 right-0 top-0" : "relative",
        )}
      >
        {/* ── Top Utility Bar ── */}
        <div className="hidden border-b border-max-border bg-max-black text-sm text-white/80 lg:block">
          <div className="container-max flex items-center justify-between py-2.5">
            <ul className="font-times flex flex-wrap items-center gap-6">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex items-center gap-2 transition-colors hover:text-max-base"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-max-base/15 transition group-hover:bg-max-base/30">
                    <Phone className="h-3 w-3 text-max-base" />
                  </span>
                  {CONTACT.emergency}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-2 transition-colors hover:text-max-base"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-max-base/15 transition group-hover:bg-max-base/30">
                    <Mail className="h-3 w-3 text-max-base" />
                  </span>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://share.google/yVTXzmjZppvosmtvL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-max-base transition-colors duration-200"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-max-base/15">
                    <MapPin className="h-3 w-3 text-max-base" />
                  </span>
                  <span>{CONTACT.address}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-max-base/15">
                  <MapPin className="h-3 w-3 text-max-base" />
                </span>
                <span>{CONTACT.rating}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Main Nav Bar ── */}
        <nav
          className={cn(
            "w-full transition-all duration-300",
            scrolled
              ? "fixed left-0 right-0 top-0 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md"
              : overlay
                ? "relative bg-white/95 shadow-nav backdrop-blur"
                : "relative bg-white",
          )}
        >
          <div className="container-max flex items-center justify-between gap-2 px-3 xs:px-4 py-3 lg:py-5">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="logo-wrap flex shrink-0 items-center gap-1.5 xs:gap-2"
              aria-label="Max Travels home"
            >
              <div className="logo-img relative h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 transition-all duration-200">
                <Image
                  src="/max-travels-logo.png"
                  alt="Max Travels Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-base xs:text-lg sm:text-2xl font-bold tracking-tight text-max-black select-none">
                  Max<span className="text-max-base">Travels</span>
                </span>
                <span className="hidden xs:block text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.18em] text-max-gray/70">
                  Premium Cab Service
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden flex-1 items-center justify-center xl:flex">
              <ul className="flex items-center gap-7 font-semibold text-base text-max-black">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "nav-link-item transition-colors hover:text-max-base",
                        pathname === href && "active text-max-base",
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1.5 xs:gap-2.5 md:gap-4 shrink-0">

              {/* ── Mobile: Shine Call Button ── */}
              <a
                href={CONTACT.phoneHref}
                aria-label="Call Anytime"
                className={cn(
                  "relative overflow-hidden",
                  "shine-btn pulse-call",
                  "flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center",
                  "rounded-full bg-max-base text-max-black",
                  "shadow-md transition-all duration-200",
                  "hover:scale-105 hover:shadow-lg active:scale-95",
                  "xs:hidden",
                )}
              >
                <Phone className="relative z-10 h-4 w-4 stroke-[2.5]" />
              </a>

              {/* ── Mobile: Shine Book Now Button ── */}
              <Link
                href="/booking"
                className={cn(
                  "relative overflow-hidden",
                  "shine-btn",
                  "inline-flex items-center gap-1",
                  "rounded-full bg-max-base",
                  "px-3 py-1.5 text-[11px] xs:px-4 xs:py-2 xs:text-xs sm:px-5 sm:py-2.5 sm:text-sm",
                  "font-bold tracking-wide text-max-black",
                  "shadow-sm transition-all duration-200",
                  "hover:scale-105 hover:bg-max-black hover:text-white hover:shadow-md",
                  "active:scale-95",
                  "xl:hidden",
                )}
              >
                <span className="relative z-10">Book Now</span>
                <ChevronRight className="relative z-10 h-3 w-3 stroke-[3]" />
              </Link>

              {/* ── Desktop Book Now (no shine — cleaner at large size) ── */}
              <Link
                href="/booking"
                className={cn(
                  "relative hidden xl:inline-flex items-center gap-1.5 overflow-hidden",
                  "rounded-full bg-max-base px-6 py-2.5 text-sm font-bold tracking-wide text-max-black",
                  "shadow-sm transition-all duration-200",
                  "hover:bg-max-black hover:text-white hover:shadow-md hover:gap-2",
                  "group",
                )}
              >
                Book Now
                <ChevronRight className="h-4 w-4 stroke-[3] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* ── Search Button ── */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Open search"
                className={cn(
                  "search-btn",
                  "hidden sm:flex h-10 w-10 items-center justify-center",
                  "rounded-full border border-max-border text-max-black",
                  "transition-all duration-200",
                  "hover:border-max-base hover:bg-max-base/10 hover:text-max-base",
                )}
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              {/* ── Desktop Call Info ── */}
              <div className="hidden items-center gap-2.5 lg:flex">
                <div>
                  <p className="font-times text-[10px] text-max-gray">Call Anytime</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="font-times text-sm font-semibold text-max-black transition-colors hover:text-max-base"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* ── Sidebar Hamburger ── */}
              <button
                type="button"
                onClick={onOpenSidebar}
                aria-label="Open menu sidebar"
                className={cn(
                  "ham-btn",
                  "hidden h-11 w-11 flex-col items-center justify-center gap-[5px]",
                  "rounded-full border border-max-border",
                  "transition-all duration-200 hover:border-max-base hover:bg-max-base/10",
                  "lg:flex",
                )}
              >
                <span className="bar-top h-0.5 w-4 rounded-full bg-max-black transition-all" />
                <span className="h-0.5 w-4 rounded-full bg-max-black" />
                <span className="bar-bottom h-0.5 w-4 rounded-full bg-max-black transition-all" />
              </button>

              {/* ── Mobile Menu Toggle ── */}
              <button
                type="button"
                onClick={onOpenMobile}
                aria-label="Open mobile menu"
                className={cn(
                  "flex h-9 w-9 xs:h-10 xs:w-10 items-center justify-center",
                  "rounded-full border border-max-black/20 bg-white",
                  "shadow-sm transition-all duration-200",
                  "hover:border-max-base hover:bg-max-base/10 hover:text-max-base",
                  "active:scale-95 lg:hidden",
                )}
              >
                <Menu className="h-4 w-4 xs:h-5 xs:w-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </nav>

        {/* Spacer when nav becomes fixed */}
        {scrolled && !overlay && (
          <div className="h-[64px] xs:h-[72px] lg:h-[88px]" aria-hidden />
        )}
      </header>
    </>
  );
}