"use client";

import React, { useState } from "react";

export default function ContactPage() {
  // Form submission state trackers
  const [formData, setFormData] = useState({ name: "", number: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "number") {
      // 1. Remove all non-digit characters
      const cleanedValue = value.replace(/\D/g, "");

      // 2. Optional: Limit the length (e.g., max 10 digits)
      if (cleanedValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      }
      return;
    }

    // Handle other inputs normally
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent cleanly! Check your inbox." });
        setFormData({ name: "", number: "", message: "" }); // Clear inputs on success
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong on the server." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Failed to connect to the number server. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-[1250px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative min-h-[750px]">

        {/* ================= LEFT SIDE (Image & Banner) ================= */}
        <div
          className="relative w-full md:w-[55%] min-h-[520px] md:h-auto bg-cover bg-center flex flex-col items-center justify-between p-8 pt-14 text-center sm:p-10 md:pt-16 overflow-hidden"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[1px] border-white/40 rounded-full z-0"></div>
          <div className="absolute bottom-4 left-4 w-40 h-40 border-[1px] border-white/20 rounded-full z-0"></div>

          <div className="absolute left-1/2 top-12 h-44 w-[min(85%,420px)] -translate-x-1/2 rounded-full bg-black/50 blur-3xl z-0"></div>
          <div className="absolute left-1/2 top-1/2 h-44 w-[min(80%,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/45 blur-3xl z-0"></div>

          <div className="relative z-10 w-full max-w-md">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
              Start Your Journey <br /> With Us Today
            </h1>
          </div>

          <p className="relative z-10 max-w-md text-center text-sm md:text-base text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] font-semibold leading-relaxed">
            Connecting travelers to local potentials and breathtaking experiences in Wakatobi Island and beyond.
          </p>

          <div className="relative z-10 h-16" aria-hidden />

          <div className="hidden md:block absolute top-0 -right-[1px] h-full w-[160px] text-white z-20 pointer-events-none">
            <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="h-full w-full fill-current">
              <path d="M100 0 L100 100 L50 100 C 120 70, -30 45, 60 0 Z" />
            </svg>
          </div>
        </div>

        {/* ================= RIGHT SIDE (Contact Form) ================= */}
        <div className="w-full md:w-[45%] bg-white flex flex-col justify-center p-8 md:p-14 lg:p-16 relative z-30">

          <div className="absolute top-8 right-8 cursor-pointer text-black hover:opacity-70 transition-opacity z-40">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="12" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>

          <div className="max-w-md w-full mx-auto relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
              Car Rental in Thoothukudi
            </h1>
            <p className="text-gray-500 mb-6 text-sm font-medium">
              If you’re searching for <strong>car travels near me</strong>, reach out to Max Travels. We offer <strong>car rental Thoothukudi</strong>, <strong>cab service Thoothukudi</strong>, and <strong>taxi Thoothukudi</strong> for airport pickup, outstation trips, and local travel.
            </p>
          
            {/* Notification Banner State Feedbacks */}
            {status.type !== "idle" && (
              <div className={`mb-4 p-3.5 text-xs rounded-xl font-semibold transition-all ${status.type === "loading" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                  status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" :
                    "bg-red-50 text-red-700 border border-red-200"
                }`}>
                {status.message}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  disabled={status.type === "loading"}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">number</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Enter your number"
                  required
                  disabled={status.type === "loading"}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>


              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you plan?"
                  rows={4}
                  required
                  disabled={status.type === "loading"}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none placeholder:text-gray-400 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full bg-[#1c1c1c] text-white rounded-xl py-4 text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-black/10 mt-2 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {status.type === "loading" ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none overflow-hidden z-0">
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#151515] rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 border-[1px] border-black/80 rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-[18rem] h-[18rem] border-[1px] border-black/60 rounded-full"></div>
            <div className="absolute -bottom-28 -right-28 w-[20rem] h-[20rem] border-[1px] border-black/40 rounded-full"></div>
          </div>

        </div>
      </div>
    </main>
  );
}
