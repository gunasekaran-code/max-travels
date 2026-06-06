"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchPopupProps = {
  open: boolean;
  onClose: () => void;
};

const searchItems = [
  {
    title: "Home",
    href: "/",
    description: "Max Travels car rental home page",
    keywords: "home max travels taxi cab rental tamil nadu thoothukudi",
  },
  {
    title: "About Us",
    href: "/about",
    description: "Learn about Max Travels and our service promise",
    keywords: "about company team story reliable drivers experience",
  },
  {
    title: "Cars",
    href: "/cars",
    description: "Browse vehicles, pricing, and rental options",
    keywords: "cars overview vehicles sedan suv tempo van rental price fleet",
  },
  {
    title: "Booking",
    href: "/booking",
    description: "Book your trip with pickup, drop, date, and car type",
    keywords: "booking book now reserve cab taxi pickup dropoff date time",
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "View Max Travels photos and travel moments",
    keywords: "gallery photos images car travel trips",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Send an enquiry or contact the team",
    keywords: "contact email phone call enquiry message quote support",
  },
  {
    title: "Services",
    href: "/#services",
    description: "Airport pickup, local rental, outstation trips, and tours",
    keywords: "services airport pickup drop local outstation tour travel",
  },
  {
    title: "Popular Cars",
    href: "/#popular-cars",
    description: "Quick access to frequently booked vehicles",
    keywords: "popular cars sedan suv tempo traveller vehicle book",
  },
  {
    title: "Pricing",
    href: "/#pricing",
    description: "Compare travel plans and rental packages",
    keywords: "pricing price packages plans rate cost rental",
  },
  {
    title: "FAQ",
    href: "/#faq",
    description: "Answers about booking, payment, pickup, and support",
    keywords: "faq questions help payment cancellation booking support",
  },
];

export function SearchPopup({ open, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return searchItems.slice(0, 5);

    return searchItems
      .map((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
        const title = item.title.toLowerCase();
        const score =
          title === normalizedQuery
            ? 4
            : title.includes(normalizedQuery)
              ? 3
              : haystack.includes(normalizedQuery)
                ? 2
                : normalizedQuery
                    .split(/\s+/)
                    .filter((word) => word.length > 1 && haystack.includes(word)).length;

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 6);
  }, [normalizedQuery]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[80] bg-black/70 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-[90] w-[calc(100%-2rem)] max-w-[680px] -translate-x-1/2 -translate-y-1/2 transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Search"
      >
        <form
          className="flex overflow-hidden rounded-full border border-white/70 bg-white shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, cars, booking..."
            className="flex-1 px-6 py-5 text-max-black focus:outline-none"
          />
          <button
            type="submit"
            className="flex w-16 items-center justify-center bg-max-base text-max-black"
            aria-label="Submit search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl">
          <div className="border-b border-zinc-100 px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-max-base">
              {normalizedQuery ? "Related pages" : "Popular searches"}
            </p>
          </div>
          <div className="max-h-[320px] overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-amber-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-max-black group-hover:text-amber-700">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-max-gray">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-max-base transition group-hover:translate-x-1" />
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-semibold text-max-black">No matching pages found</p>
                <p className="mt-1 text-xs text-max-gray">
                  Try words like booking, cars, pricing, gallery, or contact.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-12 text-white"
          aria-label="Close search"
        >
          <X className="h-8 w-8" />
        </button>
      </div>
    </>
  );
}
