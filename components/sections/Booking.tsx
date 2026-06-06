"use client";

import React, { useState, useRef, useEffect } from "react";

/* ─── Data ─────────────────────────────────────────── */
const locations = [
  "Thoothukudi Airport",
  "Thoothukudi Railway Station",
  "Thoothukudi New Bus Stand",
  "Tiruchendur",
  "Tirunelveli",
  "Madurai Airport",
  "Madurai Railway Station",
  "Nagercoil",
  "Kanyakumari",
  "Rameswaram",
  "Tenkasi",
  "Courtallam",
];

const carTypes = [
  { id: "Sedan", label: "Sedan", icon: "🚗", desc: "4 passengers · Comfortable" },
  { id: "SUV", label: "SUV", icon: "🚙", desc: "6 passengers · Spacious" },
  { id: "Tempo Van", label: "Tempo Van", icon: "🚐", desc: "12 passengers · Groups" },
];

/* ─── Time Options (06:00 – 23:30 in 30-min steps) ─── */
const timeOptions: string[] = [];
for (let h = 6; h <= 23; h++) {
  for (const m of [0, 30]) {
    if (h === 23 && m === 30) continue;
    timeOptions.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    );
  }
}

/* ─── Custom Dropdown ───────────────────────────────── */
function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-3.5 rounded-2xl text-sm transition-all duration-200
          border-2 bg-white/60 backdrop-blur-sm
          ${error ? "border-red-400 bg-red-50/40" : open ? "border-amber-500 shadow-amber-200 shadow-md" : "border-slate-200 hover:border-slate-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          text-left font-medium
        `}
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="
          absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl
          border border-slate-100 overflow-hidden
          animate-in slide-in-from-top-2 duration-200
        "
          style={{ animation: "dropDown 0.18s cubic-bezier(.4,0,.2,1) both" }}
        >
          <div className="max-h-52 overflow-y-auto scrollbar-thin">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`
                  w-full px-4 py-3 text-left text-sm transition-all duration-100
                  flex items-center gap-2
                  ${opt === value
                    ? "bg-amber-50 text-amber-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                {opt === value && (
                  <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {opt !== value && <span className="w-3.5 flex-shrink-0" />}
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

/* ─── Time Picker ───────────────────────────────────── */
function TimePicker({
  value,
  onChange,
  disabled,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && activeRef.current) {
      setTimeout(() => activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }), 60);
    }
  }, [open]);

  // Group by hour
  const grouped: Record<string, string[]> = {};
  timeOptions.forEach((t) => {
    const h = t.split(":")[0];
    if (!grouped[h]) grouped[h] = [];
    grouped[h].push(t);
  });

  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-3.5 rounded-2xl text-sm transition-all duration-200
          border-2 bg-white/60 backdrop-blur-sm
          ${error ? "border-red-400 bg-red-50/40" : open ? "border-amber-500 shadow-amber-200 shadow-md" : "border-slate-200 hover:border-slate-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          text-left font-medium
        `}
      >
        <span className={`flex items-center gap-2 ${value ? "text-slate-800" : "text-slate-400"}`}>
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          {value ? fmt(value) : "Pickup time"}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
          style={{ animation: "dropDown 0.18s cubic-bezier(.4,0,.2,1) both" }}
        >
          <div className="max-h-56 overflow-y-auto">
            {Object.entries(grouped).map(([hour, times]) => (
              <div key={hour}>
                <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 sticky top-0">
                  {Number(hour) >= 12 ? `${Number(hour) === 12 ? 12 : Number(hour) - 12} PM` : `${Number(hour)} AM`}
                </div>
                {times.map((t) => (
                  <button
                    key={t}
                    ref={t === value ? activeRef : undefined}
                    type="button"
                    onClick={() => { onChange(t); setOpen(false); }}
                    className={`
                      w-full px-4 py-2.5 text-left text-sm transition-all duration-100
                      flex items-center gap-2
                      ${t === value
                        ? "bg-amber-50 text-amber-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                      }
                    `}
                  >
                    {t === value && (
                      <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {t !== value && <span className="w-3.5 flex-shrink-0" />}
                    {fmt(t)}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

/* ─── Car Type Selector ─────────────────────────────── */
function CarTypePicker({
  value,
  onChange,
  disabled,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {carTypes.map((car) => (
          <button
            key={car.id}
            type="button"
            onClick={() => !disabled && onChange(car.id)}
            disabled={disabled}
            className={`
              relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl
              border-2 transition-all duration-200 text-center group
              ${value === car.id
                ? "border-amber-500 bg-amber-50 shadow-amber-100 shadow-lg"
                : "border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-slate-50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {value === car.id && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
            <span className="text-2xl">{car.icon}</span>
            <span className={`text-xs font-bold leading-tight ${value === car.id ? "text-amber-700" : "text-slate-700"}`}>
              {car.label}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight hidden sm:block">{car.desc}</span>
          </button>
        ))}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"><span>⚠</span>{error}</p>}
    </div>
  );
}

/* ─── Field Label ───────────────────────────────────── */
function Label({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
      {icon}
      {children}
    </label>
  );
}

/* ─── Main Component ───────────────────────────────── */
type FormData = {
  name: string; phone: string; pickup: string; dropoff: string;
  carType: string; date: string; time: string; notes: string;
};
type Status = { type: "idle" | "loading" | "success" | "error"; message: string };
type Errors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  name: "", phone: "", pickup: "", dropoff: "",
  carType: "", date: "", time: "", notes: "",
};

export default function BookingPage() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState<FormData | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const set = (key: keyof FormData, val: string) => {
    setFormData((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(e.target.name as keyof FormData, e.target.value);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    const digits = formData.phone.replace(/\D/g, "");
    if (!digits) e.phone = "Phone number is required.";
    else if (digits.length !== 10) e.phone = "Enter a valid 10-digit number.";
    if (!formData.pickup) e.pickup = "Select a pickup location.";
    if (!formData.dropoff) e.dropoff = "Select a dropoff location.";
    if (formData.pickup && formData.dropoff && formData.pickup === formData.dropoff)
      e.dropoff = "Pickup and dropoff can't be the same.";
    if (!formData.carType) e.carType = "Choose a car type.";
    if (!formData.date) e.date = "Select a date.";
    else if (formData.date < today) e.date = "Choose today or a future date.";
    if (!formData.time) e.time = "Select a time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setStatus({ type: "loading", message: "Processing your booking…" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSummary({ ...formData });
        setShowModal(true);
        setFormData(emptyForm);
        setStatus({ type: "success", message: "✓ Booking confirmed!" });
        setTimeout(() => setStatus({ type: "idle", message: "" }), 5000);
      } else {
        setStatus({ type: "error", message: data.error || "Booking failed. Try again." });
      }
    } catch {
      setStatus({ type: "error", message: "Connection error. Check your internet." });
    }
  };

  const fmtTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  };

  const fmtDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f0ebe3;
          min-height: 100vh;
        }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }
        .fade-up-3 { animation-delay: 0.19s; }
        .fade-up-4 { animation-delay: 0.26s; }

        /* scrollbar */
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }

        /* modal backdrop */
        .modal-backdrop {
          animation: fadeIn 0.22s ease both;
        }
        .modal-card {
          animation: scaleIn 0.28s cubic-bezier(.22,1,.36,1) both;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.5;
          cursor: pointer;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #1c0a02 100%);
        }

        .gold-btn {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%);
          background-size: 200% 200%;
          transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.15s ease;
        }
        .gold-btn:hover {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.4);
        }
        .gold-btn:active { transform: translateY(0); }

        .glass-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "linear-gradient(160deg, #f5ede2 0%, #ede8df 50%, #e8e0d5 100%)" }}>

        {/* ── Card Shell ── */}
        <div style={{ width: "100%", maxWidth: "1100px", borderRadius: "28px", overflow: "hidden", display: "flex", flexDirection: "row", boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)", minHeight: "680px" }}
          className="booking-card"
        >
          <style>{`
            @media (max-width: 768px) {
              .booking-card { flex-direction: column !important; }
              .hero-panel { min-height: 260px !important; width: 100% !important; }
              .form-panel { width: 100% !important; }
            }
          `}</style>

          {/* ── LEFT: Hero Panel ── */}
          <div className="hero-panel" style={{ width: "42%", minHeight: "680px", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 36px" }}>
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            {/* Gradient overlays */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,5,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(10,3,0,0.92) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />

            {/* Badge */}
            <div style={{ position: "absolute", top: "28px", left: "28px", display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "99px", padding: "6px 14px 6px 8px" }}>
              <span style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 0 2px rgba(34,197,94,0.3)" }} />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em" }}>Available Now</span>
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ color: "#f59e0b", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                Max Travels
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", lineHeight: 1.12, marginBottom: "16px", letterSpacing: "-0.02em" }}>
                Your Journey,<br />Our Priority.
              </h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.65, marginBottom: "28px", maxWidth: "280px" }}>
                Premium cab service across Thoothukudi, Tirunelveli & beyond — with instant WhatsApp confirmation.
              </p>

              {/* Stat chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  { icon: "⚡", text: "Instant Confirm" },
                  { icon: "📍", text: "12 Locations" },
                  { icon: "🛡", text: "Safe & Reliable" },
                ].map((s) => (
                  <div key={s.text} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "99px", padding: "5px 12px" }}>
                    <span style={{ fontSize: "12px" }}>{s.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 500 }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form Panel ── */}
          <div className="form-panel glass-card" style={{ width: "58%", padding: "40px 40px 40px 44px", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="fade-up" style={{ maxWidth: "520px", width: "100%" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                Book a Ride
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "13.5px", marginBottom: "28px" }}>
                Fill in your details below to reserve your cab.
              </p>

              {/* Status Banner */}
              {status.type !== "idle" && (
                <div style={{ marginBottom: "20px", padding: "12px 16px", borderRadius: "14px", fontSize: "13px", fontWeight: 500,
                  background: status.type === "loading" ? "#eff6ff" : status.type === "success" ? "#f0fdf4" : "#fef2f2",
                  color: status.type === "loading" ? "#1d4ed8" : status.type === "success" ? "#15803d" : "#dc2626",
                  border: `1px solid ${status.type === "loading" ? "#bfdbfe" : status.type === "success" ? "#bbf7d0" : "#fecaca"}`,
                  display: "flex", alignItems: "center", gap: "8px"
                }}>
                  {status.type === "loading" && (
                    <svg style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity=".25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="two-col">
                  <style>{`@media(max-width:540px){ .two-col { grid-template-columns: 1fr !important; } }`}</style>

                  <div className="fade-up fade-up-1">
                    <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>Full Name</Label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleInput}
                      placeholder="Your name"
                      disabled={status.type === "loading"}
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "16px", border: `2px solid ${errors.name ? "#f87171" : "#e2e8f0"}`, fontSize: "14px", color: "#0f172a", background: "rgba(255,255,255,0.6)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit" }}
                      onFocus={(e) => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.name ? "#f87171" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.name && <p style={{ marginTop: "6px", fontSize: "11.5px", color: "#ef4444", fontWeight: 500 }}>⚠ {errors.name}</p>}
                  </div>

                  <div className="fade-up fade-up-1">
                    <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}>Phone</Label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleInput}
                      placeholder="10-digit number"
                      disabled={status.type === "loading"}
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "16px", border: `2px solid ${errors.phone ? "#f87171" : "#e2e8f0"}`, fontSize: "14px", color: "#0f172a", background: "rgba(255,255,255,0.6)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit" }}
                      onFocus={(e) => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#f87171" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.phone && <p style={{ marginTop: "6px", fontSize: "11.5px", color: "#ef4444", fontWeight: 500 }}>⚠ {errors.phone}</p>}
                  </div>
                </div>

                {/* Route */}
                <div className="fade-up fade-up-2">
                  <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>Route</Label>
                  <div style={{ display: "flex", alignItems: "stretch", gap: "10px" }}>
                    <div style={{ flex: 1 }}>
                      <CustomSelect
                        options={locations}
                        value={formData.pickup}
                        onChange={(v) => set("pickup", v)}
                        placeholder="Pickup location"
                        disabled={status.type === "loading"}
                        error={errors.pickup}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", color: "#94a3b8", flexShrink: 0 }}>
                      <svg style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <CustomSelect
                        options={locations}
                        value={formData.dropoff}
                        onChange={(v) => set("dropoff", v)}
                        placeholder="Dropoff location"
                        disabled={status.type === "loading"}
                        error={errors.dropoff}
                      />
                    </div>
                  </div>
                </div>

                {/* Car Type */}
                <div className="fade-up fade-up-2">
                  <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-.001M13 16H9m4 0h4m2 0h2v-6.268a2 2 0 00-.586-1.414l-2.732-2.732A2 2 0 0015.268 5H13v11" /></svg>}>Vehicle Type</Label>
                  <CarTypePicker
                    value={formData.carType}
                    onChange={(v) => set("carType", v)}
                    disabled={status.type === "loading"}
                    error={errors.carType}
                  />
                </div>

                {/* Date + Time */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="two-col fade-up fade-up-3">
                  <div>
                    <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}>Travel Date</Label>
                    <input
                      type="date" name="date" value={formData.date} min={today}
                      onChange={handleInput}
                      disabled={status.type === "loading"}
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "16px", border: `2px solid ${errors.date ? "#f87171" : "#e2e8f0"}`, fontSize: "14px", color: formData.date ? "#0f172a" : "#94a3b8", background: "rgba(255,255,255,0.6)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit", cursor: "pointer" }}
                      onFocus={(e) => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.date ? "#f87171" : "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                    />
                    {errors.date && <p style={{ marginTop: "6px", fontSize: "11.5px", color: "#ef4444", fontWeight: 500 }}>⚠ {errors.date}</p>}
                  </div>

                  <div>
                    <Label icon={<svg style={{ width: 12, height: 12 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>}>Pickup Time</Label>
                    <TimePicker
                      value={formData.time}
                      onChange={(v) => set("time", v)}
                      disabled={status.type === "loading"}
                      error={errors.time}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="fade-up fade-up-4">
                  <Label>Special Requests <span style={{ textTransform: "none", fontWeight: 400, color: "#cbd5e1", marginLeft: "4px" }}>(optional)</span></Label>
                  <textarea
                    name="notes" value={formData.notes} onChange={handleInput}
                    placeholder="Luggage, child seat, other requests…"
                    rows={2}
                    disabled={status.type === "loading"}
                    style={{ width: "100%", padding: "14px 16px", borderRadius: "16px", border: "2px solid #e2e8f0", fontSize: "14px", color: "#0f172a", background: "rgba(255,255,255,0.6)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit", resize: "none", lineHeight: 1.55 }}
                    onFocus={(e) => { e.target.style.borderColor = "#f59e0b"; e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="gold-btn"
                  style={{ width: "100%", padding: "15px 24px", borderRadius: "16px", border: "none", fontSize: "14.5px", fontWeight: 700, color: "#fff", cursor: status.type === "loading" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", letterSpacing: "0.01em", fontFamily: "'Syne', sans-serif", opacity: status.type === "loading" ? 0.7 : 1 }}
                >
                  {status.type === "loading" ? (
                    <>
                      <svg style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="3" strokeOpacity=".3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Processing Booking…
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: "11.5px", color: "#94a3b8", marginTop: "-8px" }}>
                  📲 You&apos;ll receive a WhatsApp confirmation after booking.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* ── Success Modal ── */}
        {showModal && summary && (
          <div className="modal-backdrop" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div className="modal-card" style={{ width: "100%", maxWidth: "480px", background: "#fff", borderRadius: "28px", padding: "32px", boxShadow: "0 32px 80px rgba(0,0,0,0.25)" }}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                  <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #d97706, #f59e0b)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <svg style={{ width: 24, height: 24, color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>Booking Confirmed!</h3>
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>Your ride has been reserved successfully.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ width: "32px", height: "32px", borderRadius: "99px", border: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b", fontSize: "16px", flexShrink: 0 }}
                >✕</button>
              </div>

              {/* Summary card */}
              <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "20px", marginBottom: "20px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "Passenger", value: summary.name },
                    { label: "Phone", value: summary.phone },
                    { label: "Vehicle", value: summary.carType },
                    { label: "Date", value: fmtDate(summary.date) },
                  ].map((row) => (
                    <div key={row.label}>
                      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "3px" }}>{row.label}</p>
                      <p style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a" }}>{row.value}</p>
                    </div>
                  ))}
                </div>

                {/* Route */}
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "10px" }}>Route</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "10px", padding: "8px 12px", fontSize: "13px", fontWeight: 600, color: "#0f172a", flex: 1 }}>
                      📍 {summary.pickup}
                    </div>
                    <svg style={{ width: 18, height: 18, color: "#f59e0b", flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: "10px", padding: "8px 12px", fontSize: "13px", fontWeight: 600, color: "#0f172a", flex: 1 }}>
                      🏁 {summary.dropoff}
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8" }}>Pickup at:</span>
                  <span style={{ background: "#fef3c7", color: "#92400e", borderRadius: "99px", padding: "3px 12px", fontSize: "12.5px", fontWeight: 700 }}>
                    🕐 {fmtTime(summary.time)}
                  </span>
                </div>

                {summary.notes && (
                  <div style={{ marginTop: "12px", padding: "10px 14px", background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "4px" }}>Note</p>
                    <p style={{ fontSize: "13px", color: "#475569" }}>{summary.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: "13px", borderRadius: "14px", border: "1.5px solid #e2e8f0", background: "#fff", fontSize: "13.5px", fontWeight: 600, color: "#475569", cursor: "pointer", fontFamily: "inherit" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="gold-btn"
                  onClick={() => { setShowModal(false); setSummary(null); setStatus({ type: "idle", message: "" }); }}
                  style={{ flex: 1, padding: "13px", borderRadius: "14px", border: "none", fontSize: "13.5px", fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "'Syne', sans-serif" }}
                >
                  Book Another
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
