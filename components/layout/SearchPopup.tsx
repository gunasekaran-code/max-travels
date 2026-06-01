"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchPopupProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchPopup({ open, onClose }: SearchPopupProps) {
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
          "fixed left-1/2 top-1/2 z-[90] w-[min(100%-2rem,600px)] -translate-x-1/2 -translate-y-1/2 transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Search"
      >
        <form
          className="flex overflow-hidden rounded-full bg-white shadow-2xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="site-search" className="sr-only">
            Search
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search Here..."
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
