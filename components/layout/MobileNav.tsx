"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Mail, Phone, MapPin, Star, Home, Info, Car, MessageCircle, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const allLinks: { label: string; href: string; icon: LucideIcon }[] = [
    { label: "Home",     href: "/",        icon: Home          },
    { label: "About",    href: "/about",   icon: Info          },
    { label: "Overview", href: "/cars",    icon: Car           },
    { label: "Contact",  href: "/contact", icon: MessageCircle },
    { label: "Booking",  href: "/booking", icon: CalendarDays  },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] backdrop-blur-sm bg-black/50 transition-all duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 z-[70] h-full w-[min(100%,320px)] overflow-y-auto lg:hidden",
          "bg-white dark:bg-neutral-900",
          "shadow-[8px_0_48px_rgba(0,0,0,0.15)]",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-max-base via-amber-400 to-max-base" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-100 dark:border-neutral-800">
          <span className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-max-base/10">
                <Image
                  src="/max-travels-logo.png"
                  alt="Max Travels logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
            </span>
            <span className="text-neutral-900 dark:text-white">
              Max<span className="text-max-base">Travels</span>
            </span>
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              "border border-neutral-200 dark:border-neutral-700",
              "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "transition-colors duration-150",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-6 flex flex-col gap-7">

          {/* Nav Links */}
          <nav>
            <SectionLabel>Menu</SectionLabel>
            <ul className="mt-3 space-y-0.5">
              {allLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3",
                      "text-sm font-medium text-neutral-700 dark:text-neutral-300",
                      "hover:bg-neutral-50 dark:hover:bg-neutral-800",
                      "hover:text-max-base dark:hover:text-max-base",
                      "transition-colors duration-150 group",
                    )}
                  >
                    <span className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      "bg-neutral-100 dark:bg-neutral-800",
                      "text-neutral-400 dark:text-neutral-500",
                      "group-hover:bg-max-base/10 group-hover:text-max-base",
                      "transition-colors duration-150",
                    )}>
                      <link.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

          {/* Contact Info */}
          <section className="pb-2">
            <SectionLabel>Contact Info</SectionLabel>
            <ul className="mt-3 flex flex-col gap-2.5">
              <ContactRow icon={<Mail className="h-3.5 w-3.5" />}>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-max-base transition-colors">
                  {CONTACT.email}
                </a>
              </ContactRow>
              <ContactRow icon={<Phone className="h-3.5 w-3.5" />}>
                <a href={CONTACT.phoneHref} className="hover:text-max-base transition-colors">
                  {CONTACT.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<MapPin className="h-3.5 w-3.5" />}>
                {CONTACT.address}
              </ContactRow>
              <ContactRow icon={<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}>
                {CONTACT.rating}
              </ContactRow>
            </ul>
          </section>

        </div>
      </div>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
        {children}
      </span>
      <span className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-neutral-500 dark:text-neutral-400">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
        {icon}
      </span>
      <span className="pt-1 leading-snug">{children}</span>
    </li>
  );
}