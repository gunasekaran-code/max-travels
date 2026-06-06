"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const allLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Overview", href: "/cars" },
    { label: "Contact", href: "/contact" },
    { label: "Booking", href: "/booking" },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "fixed left-0 top-0 z-[70] h-full w-[min(100%,320px)] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-xl font-bold">
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 object-contain"
            />
            <span>
              Max<span className="text-max-base">Travels</span>
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-1">
            {allLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-3 font-medium text-max-black hover:bg-max-extra"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="font-times mt-8 border-t border-max-border pt-6 text-sm">
          <p>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p className="mt-2">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </p>
          <p className="mt-2">{CONTACT.address}</p>
          <p className="mt-2">{CONTACT.rating}</p>
        </div>
      </div>
    </>
  );
}
