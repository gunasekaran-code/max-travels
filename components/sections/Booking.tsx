"use client";

import React from "react";
import { MapPin, Calendar, Car, Menu } from "lucide-react";

// You can uncomment your Button component if you prefer to use it
// import { Button } from "@/components/ui/Button";

const locations = ["Downtown Hub", "Airport Terminal", "City Center", "North Branch"];
const carTypes = ["Economy", "SUV", "Luxury", "Van", "Electric"];

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Full-height card layout */}
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative min-h-[750px]">
        
        {/* ================= LEFT SIDE (Image & Banner) ================= */}
        <div 
          className="relative w-full md:w-[55%] min-h-[400px] md:h-auto bg-cover bg-center flex flex-col items-center justify-center p-10 overflow-hidden"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376712349-f02787884488?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}
        >
          {/* Subtle dark overlay for overall text readability */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Left Decorative Circles */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[1px] border-white/40 rounded-full z-0"></div>
          <div className="absolute bottom-4 left-4 w-40 h-40 border-[1px] border-white/20 rounded-full z-0"></div>

          {/* Central dark blob/circle for focal text readability */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black/60 rounded-full blur-2xl z-0"></div>

          {/* Text Content */}
          <div className="relative z-10 text-center text-white w-full max-w-sm">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg">
              Book Your Next <br /> Adventure
            </h1>
            <p className="text-sm md:text-base text-gray-100 drop-shadow-md font-medium">
              Premium car rentals connecting you to breathtaking experiences and local potentials.
            </p>
          </div>

          {/* THE CURVED DIVIDER (Visible on Desktop) */}
          <div className="hidden md:block absolute top-0 -right-[1px] h-full w-[160px] text-white z-20 pointer-events-none">
            <svg 
              preserveAspectRatio="none" 
              viewBox="0 0 100 100" 
              className="h-full w-full fill-current"
            >
              <path d="M100 0 L100 100 L50 100 C 120 70, -30 45, 60 0 Z" />
            </svg>
          </div>
        </div>

        {/* ================= RIGHT SIDE (Booking Form) ================= */}
        <div className="w-full md:w-[45%] bg-white flex flex-col justify-center p-8 md:p-14 lg:p-16 relative z-30">
          
          {/* Top Right Hamburger Menu Icon */}
          <div className="absolute top-8 right-8 cursor-pointer text-black hover:opacity-70 transition-opacity z-40">
             <Menu className="w-7 h-7" strokeWidth={2.5} />
          </div>

          <div className="max-w-md w-full mx-auto relative z-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
              Book a Car
            </h2>
            <p className="text-gray-500 mb-8 text-sm font-medium">
              Select your pickup details and vehicle preferences below to secure your ride.
            </p>

            <form 
              className="grid grid-cols-1 sm:grid-cols-2 gap-5" 
              onSubmit={(e) => e.preventDefault()}
            >
              
              {/* Pickup Field */}
              <div className="sm:col-span-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-gray-500" /> Pickup
                </label>
                <select 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white" 
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Enter a Location</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Drop-off Field */}
              <div className="sm:col-span-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-gray-500" /> Drop-off
                </label>
                <select 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white" 
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Enter a Location</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Car Type Field */}
              <div className="sm:col-span-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  <Car className="w-4 h-4 text-gray-500" /> Car Type
                </label>
                <select 
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white" 
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Your Car Type</option>
                  {carTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Date Field */}
              <div className="sm:col-span-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  <Calendar className="w-4 h-4 text-gray-500" /> Date
                </label>
                <input 
                  type="date" 
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-white" 
                />
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1c1c1c] text-white rounded-xl py-4 text-sm font-bold hover:bg-black transition-colors shadow-lg shadow-black/10"
                >
                  Book Now
                </button>
              </div>

            </form>
          </div>

          {/* Right Decorative Circles */}
          <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none overflow-hidden z-0 hidden md:block">
            {/* Solid Black Quarter Circle */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#151515] rounded-full"></div>
            {/* Outer Rings */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 border-[1px] border-black/80 rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-[18rem] h-[18rem] border-[1px] border-black/60 rounded-full"></div>
            <div className="absolute -bottom-28 -right-28 w-[20rem] h-[20rem] border-[1px] border-black/40 rounded-full"></div>
          </div>
          
        </div>
      </div>
    </main>
  );
}