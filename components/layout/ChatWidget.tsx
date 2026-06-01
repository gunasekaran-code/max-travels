"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-max-base text-max-black shadow-lg transition hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(100vw-2rem,380px)] rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">Quick Message</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-max-gray">
            Fill out the form and we will get back to you shortly.
          </p>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full rounded-full border px-4 py-2.5 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full rounded-full border px-4 py-2.5 text-sm"
            />
            <textarea
              placeholder="Your Message"
              required
              rows={3}
              className="w-full rounded-2xl border px-4 py-2.5 text-sm"
            />
            <Button type="submit" className="w-full justify-center">
              Submit Now
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
