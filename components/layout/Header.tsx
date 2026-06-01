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
import { navLinks } from "@/lib/data";
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
        "z-50",
        overlay && !scrolled ? "absolute left-0 right-0 top-0" : "relative",
      )}
    >
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
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* <Link href="#login" className="hover:text-max-base">
                Login
              </Link>
              <span className="text-white/40">or</span>
              <Link href="#register" className="hover:text-max-base">
                Register
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "fixed left-0 right-0 top-0 bg-white shadow-nav"
            : overlay
              ? "relative bg-white/95 shadow-nav backdrop-blur"
              : "relative bg-white",
        )}
      >
        <div className="container-max flex items-center justify-between gap-4 py-4 lg:py-5">
          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="max home">
            <Image
              src="/max-travels-logo-cropped.png"
              alt=""
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
              priority
            />
            <span className="font-display text-2xl font-bold text-max-black">
              Max<span className="text-max-base">Travels</span>
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-8 xl:flex">
            <ul className="flex items-center gap-8 font-medium text-max-black">
              <li>
                <Link href="/" className="text-max-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-max-base">
                  About Us
                </Link>
              </li>
              <NavDropdown label="Pages" items={navLinks.pages} />
              <NavDropdown label="Cars" items={navLinks.cars} />
              <NavDropdown label="Blog" items={navLinks.blog} />
              <li>
                <Link href="/contact" className="hover:text-max-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-max-base px-4 py-2.5 text-xs font-bold text-max-black transition hover:bg-max-black hover:text-white sm:px-5 sm:py-3 sm:text-sm"
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
            {/* <Link
              href="#cart"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-max-border text-max-black transition hover:border-max-base sm:flex"
              aria-label="Cart with 2 items"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-max-base text-[10px] font-bold text-max-black">
                2
              </span>
            </Link> */}
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
            <button
              type="button"
              onClick={onOpenMobile}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-max-border lg:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
      {scrolled && !overlay && <div className="h-[88px] lg:h-[96px]" aria-hidden />}
    </header>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <li className="group relative py-2">
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-1 transition-colors duration-200 hover:text-max-base group-hover:text-max-base"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
      </button>
      <ul className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-3 rounded-xl border border-max-border bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(19,18,34,0.12)] transition-all duration-200 before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-[''] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="block rounded-lg px-4 py-2.5 text-sm text-max-gray transition-colors duration-200 hover:bg-max-base/15 hover:text-max-black"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
