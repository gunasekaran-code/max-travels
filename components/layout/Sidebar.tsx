"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your request..." });

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong on the server.",
        });
        return;
      }

      setStatus({ type: "success", message: "Quote request sent successfully." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        message: "Failed to connect to the email server. Please try again.",
      });
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-max-border p-6">
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-max-border"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="font-display text-lg font-semibold">About Us</h3>
          <p className="mt-3 text-sm leading-relaxed text-max-gray">
            We connect travelers with reliable vehicles and professional drivers.
            Our mission is simple: make every rental smooth, safe, and affordable.
          </p>
          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold">Get a free quote</h3>
            {status.type !== "idle" && (
              <div
                className={cn(
                  "mt-4 rounded-2xl border px-4 py-3 text-xs font-semibold",
                  status.type === "loading" && "border-blue-200 bg-blue-50 text-blue-700",
                  status.type === "success" && "border-green-200 bg-green-50 text-green-700",
                  status.type === "error" && "border-red-200 bg-red-50 text-red-700",
                )}
              >
                {status.message}
              </div>
            )}
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                disabled={status.type === "loading"}
                className="w-full rounded-full border border-max-border px-5 py-3 text-sm focus:border-max-base focus:outline-none disabled:opacity-50"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                disabled={status.type === "loading"}
                className="w-full rounded-full border border-max-border px-5 py-3 text-sm focus:border-max-base focus:outline-none disabled:opacity-50"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message..."
                rows={4}
                required
                disabled={status.type === "loading"}
                className="w-full rounded-2xl border border-max-border px-5 py-3 text-sm focus:border-max-base focus:outline-none disabled:opacity-50"
              />
              <Button
                type="submit"
                showArrow={false}
                disabled={status.type === "loading"}
                className="disabled:pointer-events-none disabled:opacity-60"
              >
                {status.type === "loading" ? "Sending..." : "Submit Now"}
              </Button>
            </form>
          </div>
          <div className="mt-8">
            <h3 className="font-display text-lg font-semibold">Contact Info</h3>
            <ul className="font-times mt-4 space-y-3 text-sm text-max-gray">
              <li>{CONTACT.address}</li>
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-max-base">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-max-base"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.rating}</li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
