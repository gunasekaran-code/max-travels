"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { X, MapPin, Phone, Mail, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const [formData, setFormData] = useState({ name: "", number: "", message: "" });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "number") {
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your request..." });

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong on the server." });
        return;
      }

      setStatus({ type: "success", message: "Quote request sent successfully." });
      setFormData({ name: "", number: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Failed to connect. Please try again." });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] backdrop-blur-sm bg-black/50 transition-all duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] h-full w-full max-w-sm overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "bg-white dark:bg-neutral-900",
          "shadow-[−8px_0_48px_rgba(0,0,0,0.18)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-max-base via-amber-400 to-max-base" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
          <span className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-max-base/10">
              <Image
                src="/max-travels-logo.png"
                alt="Max Travels Logo"
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
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              "border border-neutral-200 dark:border-neutral-700",
              "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "transition-colors duration-150",
            )}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-8">

          {/* About Us */}
          <section>
            <SectionLabel>About Us</SectionLabel>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              We connect travelers with reliable vehicles and professional drivers.
              Our mission is simple: make every journey smooth, safe, and affordable.
            </p>
          </section>

          <Divider />

          {/* Quote Form */}
          <section>
            <SectionLabel>Get a free quote</SectionLabel>

            {status.type !== "idle" && (
              <div
                className={cn(
                  "mt-4 flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-xs font-medium",
                  status.type === "loading" && "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
                  status.type === "success" && "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
                  status.type === "error" && "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
                )}
              >
                <span className="mt-0.5">
                  {status.type === "success" && "✓"}
                  {status.type === "error" && "✕"}
                  {status.type === "loading" && "⋯"}
                </span>
                {status.message}
              </div>
            )}

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FloatingInput
                type="text"
                name="name"
                label="Your name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={status.type === "loading"}
                required
              />
              <FloatingInput
                type="tel"
                name="number"
                label="Phone number"
                value={formData.number}
                onChange={handleInputChange}
                disabled={status.type === "loading"}
                required
                inputMode="numeric"
              />
              <div className="relative">
                <textarea
                  name="message"
                  id="sidebar-message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  disabled={status.type === "loading"}
                  placeholder=" "
                  className={cn(
                    "peer w-full rounded-2xl border px-4 pt-5 pb-2 text-sm bg-neutral-50 dark:bg-neutral-800",
                    "border-neutral-200 dark:border-neutral-700",
                    "focus:border-max-base focus:outline-none focus:ring-2 focus:ring-max-base/20",
                    "text-neutral-900 dark:text-white",
                    "placeholder-transparent resize-none",
                    "disabled:opacity-50 transition-all duration-200",
                  )}
                />
                <label
                  htmlFor="sidebar-message"
                  className={cn(
                    "absolute left-4 top-3.5 text-xs text-neutral-400 transition-all duration-200 pointer-events-none",
                    "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs",
                    "peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-max-base",
                    formData.message && "top-2 text-[10px] text-max-base",
                  )}
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className={cn(
                  "flex w-full items-center justify-center gap-2",
                  "rounded-full bg-max-base px-6 py-3 text-sm font-semibold text-white",
                  "hover:bg-max-base/90 active:scale-[0.98]",
                  "transition-all duration-150",
                  "disabled:pointer-events-none disabled:opacity-60",
                  "shadow-lg shadow-max-base/25",
                )}
              >
                <Send className="h-4 w-4" />
                {status.type === "loading" ? "Sending…" : "Submit Now"}
              </button>
            </form>
          </section>

          <Divider />

          {/* Contact Info */}
          <section className="pb-6">
            <SectionLabel>Contact Info</SectionLabel>
            <ul className="mt-4 space-y-3">
              <ContactRow icon={<MapPin className="h-4 w-4" />}>
                {CONTACT.address}
              </ContactRow>
              <ContactRow icon={<Phone className="h-4 w-4" />}>
                <a href={CONTACT.phoneHref} className="hover:text-max-base transition-colors">
                  {CONTACT.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail className="h-4 w-4" />}>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-max-base transition-colors">
                  {CONTACT.email}
                </a>
              </ContactRow>
              <ContactRow icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" />}>
                {CONTACT.rating}
              </ContactRow>
            </ul>
          </section>

        </div>
      </aside>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
        {children}
      </h3>
      <span className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
}

function Divider() {
  return <hr className="border-neutral-100 dark:border-neutral-800" />;
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

type FloatingInputProps = {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function FloatingInput({ type, name, label, value, onChange, disabled, required, inputMode }: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={`sidebar-${name}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder=" "
        inputMode={inputMode}
        className={cn(
          "peer w-full rounded-full border px-4 pt-5 pb-2 text-sm bg-neutral-50 dark:bg-neutral-800",
          "border-neutral-200 dark:border-neutral-700",
          "focus:border-max-base focus:outline-none focus:ring-2 focus:ring-max-base/20",
          "text-neutral-900 dark:text-white",
          "placeholder-transparent",
          "disabled:opacity-50 transition-all duration-200",
        )}
      />
      <label
        htmlFor={`sidebar-${name}`}
        className={cn(
          "absolute left-4 text-neutral-400 transition-all duration-200 pointer-events-none",
          "top-3.5 text-xs",
          "peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs",
          "peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-max-base",
          value && "top-1.5 text-[10px] text-max-base",
        )}
      >
        {label}
      </label>
    </div>
  );
}