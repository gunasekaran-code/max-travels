"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

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
  { id: "MUV", label: "MUV", icon: "🚙", desc: "6 passengers · Spacious" },
  { id: "Tempo Van", label: "Tempo Van", icon: "🚐", desc: "12 passengers · Groups" },
];

/* ─── Time Options (06:00 – 23:30 in 30-min steps) ─── */
const timeOptions: string[] = [];
for (let h = 6; h <= 23; h++) {
  for (const m of [0, 30]) {
    if (h === 23 && m === 30) continue;
    timeOptions.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
}

/* ─── Portal Dropdown ───────────────────────────────── */
function PortalDropdown({
  anchorRef,
  open,
  children,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  children: React.ReactNode;
}) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (open && anchorRef.current) {
      setRect(anchorRef.current.getBoundingClientRect());
    }
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, anchorRef]);

  if (!open || !rect) return null;

  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const openUpward = spaceBelow < 220 && spaceAbove > spaceBelow;

  const style: React.CSSProperties = {
    position: "fixed",
    left: rect.left,
    width: rect.width,
    zIndex: 99999,
    animation: "dropDown 0.18s cubic-bezier(.4,0,.2,1) both",
    ...(openUpward
      ? { bottom: window.innerHeight - rect.top + 6 }
      : { top: rect.bottom + 6 }),
  };

  return createPortal(
    <div style={style}>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

/* ─── Custom Select ─────────────────────────────────── */
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
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(e.target as Element)?.closest?.("[data-portal-dropdown]")
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          padding: "12px 14px",
          borderRadius: "14px",
          fontSize: "13px",
          border: `2px solid ${error ? "#f87171" : open ? "#f59e0b" : "#e2e8f0"}`,
          background: error ? "rgba(254,242,242,0.6)" : "rgba(255,255,255,0.6)",
          boxShadow: open ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "inherit",
          textAlign: "left",
          fontWeight: 500,
          color: value ? "#0f172a" : "#94a3b8",
          minWidth: 0,
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            minWidth: 0,
          }}
        >
          {value || placeholder}
        </span>
        <svg
          style={{
            width: 14,
            height: 14,
            color: "#94a3b8",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <PortalDropdown anchorRef={btnRef} open={open}>
        <div data-portal-dropdown="true" style={{ maxHeight: "200px", overflowY: "auto" }}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                width: "100%",
                padding: "10px 14px",
                textAlign: "left",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: opt === value ? "#fffbeb" : "transparent",
                color: opt === value ? "#92400e" : "#374151",
                fontWeight: opt === value ? 600 : 400,
                border: "none",
                cursor: "pointer",
                transition: "background 0.1s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {opt === value && (
                <svg
                  style={{ width: 12, height: 12, color: "#f59e0b", flexShrink: 0 }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {opt !== value && <span style={{ width: 12, flexShrink: 0 }} />}
              {opt}
            </button>
          ))}
        </div>
      </PortalDropdown>

      {error && (
        <p
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: "#ef4444",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⚠ {error}
        </p>
      )}
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
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !(e.target as Element)?.closest?.("[data-portal-dropdown]")
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  useEffect(() => {
    if (open && activeRef.current) {
      setTimeout(
        () => activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" }),
        80
      );
    }
  }, [open]);

  const fmt = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  const grouped: Record<string, string[]> = {};
  timeOptions.forEach((t) => {
    const h = t.split(":")[0];
    if (!grouped[h]) grouped[h] = [];
    grouped[h].push(t);
  });

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          padding: "12px 14px",
          borderRadius: "14px",
          fontSize: "13px",
          border: `2px solid ${error ? "#f87171" : open ? "#f59e0b" : "#e2e8f0"}`,
          background: error ? "rgba(254,242,242,0.6)" : "rgba(255,255,255,0.6)",
          boxShadow: open ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "inherit",
          textAlign: "left",
          fontWeight: 500,
          color: value ? "#0f172a" : "#94a3b8",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
          <svg
            style={{ width: 14, height: 14, flexShrink: 0 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value ? fmt(value) : "Pickup time"}
          </span>
        </span>
        <svg
          style={{
            width: 14,
            height: 14,
            color: "#94a3b8",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <PortalDropdown anchorRef={btnRef} open={open}>
        <div data-portal-dropdown="true" style={{ maxHeight: "220px", overflowY: "auto" }}>
          {Object.entries(grouped).map(([hour, times]) => (
            <div key={hour}>
              <div
                style={{
                  padding: "6px 14px 4px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                  background: "#f8fafc",
                  position: "sticky",
                  top: 0,
                }}
              >
                {Number(hour) >= 12
                  ? `${Number(hour) === 12 ? 12 : Number(hour) - 12} PM`
                  : `${Number(hour)} AM`}
              </div>
              {times.map((t) => (
                <button
                  key={t}
                  ref={t === value ? activeRef : undefined}
                  type="button"
                  onClick={() => {
                    onChange(t);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "9px 14px",
                    textAlign: "left",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: t === value ? "#fffbeb" : "transparent",
                    color: t === value ? "#92400e" : "#374151",
                    fontWeight: t === value ? 700 : 400,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (t !== value)
                      (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    if (t !== value)
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  {t === value && (
                    <svg
                      style={{ width: 12, height: 12, color: "#f59e0b", flexShrink: 0 }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {t !== value && <span style={{ width: 12, flexShrink: 0 }} />}
                  {fmt(t)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </PortalDropdown>

      {error && (
        <p
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: "#ef4444",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Car Type Picker ───────────────────────────────── */
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}
      >
        {carTypes.map((car) => (
          <button
            key={car.id}
            type="button"
            onClick={() => !disabled && onChange(car.id)}
            disabled={disabled}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              padding: "10px 6px",
              borderRadius: "14px",
              border: `2px solid ${value === car.id ? "#f59e0b" : "#e2e8f0"}`,
              background:
                value === car.id ? "rgba(254,243,199,0.6)" : "rgba(255,255,255,0.6)",
              boxShadow: value === car.id ? "0 4px 16px rgba(245,158,11,0.15)" : "none",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              transition: "all 0.2s",
              fontFamily: "inherit",
              textAlign: "center",
            }}
          >
            {value === car.id && (
              <span
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "12px",
                  height: "12px",
                  background: "#f59e0b",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  style={{ width: 8, height: 8, color: "#fff" }}
                  fill="white"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
            <span style={{ fontSize: "22px", lineHeight: 1 }}>{car.icon}</span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: value === car.id ? "#92400e" : "#374151",
                lineHeight: 1.2,
              }}
            >
              {car.label}
            </span>
            <span
              style={{
                fontSize: "9px",
                color: "#94a3b8",
                lineHeight: 1.3,
                display: "block",
              }}
            >
              {car.desc}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: "#ef4444",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Label ─────────────────────────────────────────── */
function Label({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "10px",
        fontWeight: 700,
        color: "#64748b",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
      }}
    >
      {icon}
      {children}
    </label>
  );
}

/* ─── Input ─────────────────────────────────────────── */
function TextInput({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  error,
  loading,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  loading?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "14px",
          border: `2px solid ${error ? "#f87171" : focused ? "#f59e0b" : "#e2e8f0"}`,
          boxShadow: focused ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
          fontSize: "13px",
          color: "#0f172a",
          background: "rgba(255,255,255,0.6)",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: "#ef4444",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Types ─────────────────────────────────────────── */
type FormData = {
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  carType: string;
  date: string;
  time: string;
  notes: string;
};
type Status = { type: "idle" | "loading" | "success" | "error"; message: string };
type Errors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  name: "",
  phone: "",
  pickup: "",
  dropoff: "",
  carType: "",
  date: "",
  time: "",
  notes: "",
};

/* ─── Main Component ────────────────────────────────── */
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
    if (!digits) e.phone = "Phone is required.";
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
    return dt.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isLoading = status.type === "loading";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.10s; }
        .fade-up-3 { animation-delay: 0.15s; }
        .fade-up-4 { animation-delay: 0.20s; }

        .modal-backdrop { animation: fadeIn 0.2s ease both; }
        .modal-card { animation: scaleIn 0.25s cubic-bezier(.22,1,.36,1) both; }

        .gold-btn {
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%);
          background-size: 200% 200%;
          transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.15s ease;
        }
        .gold-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.4);
        }
        .gold-btn:active:not(:disabled) { transform: translateY(0); }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
        }

        /* ── LAYOUT ── */
        .booking-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(160deg, #f5ede2 0%, #ede8df 50%, #e8e0d5 100%);
        }

        .booking-card {
          width: 100%;
          max-width: 1335px;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
          min-height: 680px;
        }

        .hero-panel {
          width: 42%;
          min-height: 680px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px 32px;
          flex-shrink: 0;
        }

        .form-panel {
          width: 58%;
          padding: 36px 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* ── ROUTE ROW ── */
        .route-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .route-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #94a3b8;
          padding-top: 13px;
        }

        /* ── DATE+TIME GRID ── */
        .datetime-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* ── NAME+PHONE GRID ── */
        .nameph-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* ────────────────────────────────────────────────────
           MOBILE  ≤ 640px  (handles 300px width)
        ──────────────────────────────────────────────────── */
        @media (max-width: 640px) {
          .booking-wrapper {
            padding: 0;
            align-items: flex-start;
          }

          .booking-card {
            flex-direction: column;
            border-radius: 0;
            min-height: 100vh;
            box-shadow: none;
          }

          .hero-panel {
            width: 100%;
            min-height: 320px;
            padding: 20px 16px 24px;
          }

          .form-panel {
            width: 100%;
            padding: 24px 16px 32px;
            justify-content: flex-start;
          }

          .nameph-grid {
            grid-template-columns: 1fr;
          }

          .datetime-grid {
            grid-template-columns: 1fr;
          }

          .route-row {
            flex-direction: column;
            gap: 6px;
          }

          .route-arrow {
            padding-top: 0;
            transform: rotate(90deg);
            align-self: center;
          }

          .route-col {
            width: 100%;
          }

          /* Shrink hero text on narrow screens */
          .hero-title {
            font-size: 1.6rem !important;
          }

          .hero-desc {
            font-size: 12px !important;
          }

          .hero-badge-row {
            gap: 6px !important;
          }

          .hero-badge {
            padding: 4px 10px !important;
            font-size: 10px !important;
          }
        }

        /* Extra narrow — 300px */
        @media (max-width: 320px) {
          .form-panel {
            padding: 20px 12px 28px;
          }

          .hero-panel {
            padding: 16px 12px 20px;
          }

          .hero-title {
            font-size: 1.35rem !important;
          }
        }

        /* scrollbar */
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
      `}</style>

      <div className="booking-wrapper">
        <div className="booking-card">

          {/* ── LEFT: Hero Panel ── */}
          <div className="hero-panel">
            {/* BG image */}
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Max Travels Logo"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            {/* Overlays */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,5,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(10,3,0,0.92) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Available Now badge */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "18px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "99px",
                padding: "5px 12px 5px 8px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  background: "#22c55e",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 0 2px rgba(34,197,94,0.3)",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Available Now
              </span>
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "-5px",
                }}
              >
                Max Travels
              </div>
              <h1
                className="hero-title"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.6rem, 5vw, 2.7rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.12,
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Your Journey,
                <br />
                Our Priority.
              </h1>
              <p
                className="hero-desc"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  marginBottom: "20px",
                  maxWidth: "280px",
                }}
              >
                Premium cab service across Thoothukudi, Tirunelveli & beyond — with instant
                WhatsApp confirmation.
              </p>

              <div className="hero-badge-row" style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {[
                  { icon: "⚡", text: "Instant Confirm" },
                  { icon: "📍", text: "12 Locations" },
                  { icon: "🛡", text: "Safe & Reliable" },
                ].map((s) => (
                  <div
                    key={s.text}
                    className="hero-badge"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "99px",
                      padding: "4px 11px",
                    }}
                  >
                    <span style={{ fontSize: "11px" }}>{s.icon}</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "11px",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form Panel ── */}
          <div className="form-panel">
            <div className="fade-up" style={{ width: "100%", maxWidth: "680px" }}>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.4rem, 4vw, 1.75rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                Book a Ride
              </h2>
              <p
                style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "22px" }}
              >
                Fill in your details below to reserve your cab.
              </p>

              {/* Status Banner */}
              {status.type !== "idle" && (
                <div
                  style={{
                    marginBottom: "18px",
                    padding: "11px 14px",
                    borderRadius: "12px",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    background:
                      status.type === "loading"
                        ? "#eff6ff"
                        : status.type === "success"
                        ? "#f0fdf4"
                        : "#fef2f2",
                    color:
                      status.type === "loading"
                        ? "#1d4ed8"
                        : status.type === "success"
                        ? "#15803d"
                        : "#dc2626",
                    border: `1px solid ${
                      status.type === "loading"
                        ? "#bfdbfe"
                        : status.type === "success"
                        ? "#bbf7d0"
                        : "#fecaca"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {status.type === "loading" && (
                    <svg
                      style={{ width: 13, height: 13, animation: "spin 1s linear infinite", flexShrink: 0 }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity=".25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  {status.message}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "7px" }}
              >
                {/* Name + Phone */}
                <div className="nameph-grid fade-up fade-up-1">
                  <div>
                    <Label
                      icon={
                        <svg
                          style={{ width: 11, height: 11 }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      }
                    >
                      Full Name
                    </Label>
                    <TextInput
                      name="name"
                      value={formData.name}
                      onChange={handleInput}
                      placeholder="Your name"
                      disabled={isLoading}
                      error={errors.name}
                    />
                  </div>
                  <div>
                    <Label
                      icon={
                        <svg
                          style={{ width: 11, height: 11 }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      }
                    >
                      Phone
                    </Label>
                    <TextInput
                      name="phone"
                      value={formData.phone}
                      onChange={handleInput}
                      placeholder="10-digit number"
                      type="tel"
                      disabled={isLoading}
                      error={errors.phone}
                    />
                  </div>
                </div>

                {/* Route */}
                <div className="fade-up fade-up-2">
                  <Label
                    icon={
                      <svg
                        style={{ width: 11, height: 11 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  >
                    Route
                  </Label>
                  <div className="route-row">
                    <div className="route-col" style={{ flex: 1, minWidth: 0 }}>
                      <CustomSelect
                        options={locations}
                        value={formData.pickup}
                        onChange={(v) => set("pickup", v)}
                        placeholder="Pickup location"
                        disabled={isLoading}
                        error={errors.pickup}
                      />
                    </div>
                    <div className="route-arrow">
                      <svg
                        style={{ width: 16, height: 16 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <div className="route-col" style={{ flex: 1, minWidth: 0 }}>
                      <CustomSelect
                        options={locations}
                        value={formData.dropoff}
                        onChange={(v) => set("dropoff", v)}
                        placeholder="Dropoff location"
                        disabled={isLoading}
                        error={errors.dropoff}
                      />
                    </div>
                  </div>
                </div>

                {/* Car Type */}
                <div className="fade-up fade-up-2">
                  <Label
                    icon={
                      <svg
                        style={{ width: 11, height: 11 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        <path
                          strokeLinecap="round"
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-.001M13 16H9m4 0h4m2 0h2v-6.268a2 2 0 00-.586-1.414l-2.732-2.732A2 2 0 0015.268 5H13v11"
                        />
                      </svg>
                    }
                  >
                    Vehicle Type
                  </Label>
                  <CarTypePicker
                    value={formData.carType}
                    onChange={(v) => set("carType", v)}
                    disabled={isLoading}
                    error={errors.carType}
                  />
                </div>

                {/* Date + Time */}
                <div className="datetime-grid fade-up fade-up-3">
                  <div>
                    <Label
                      icon={
                        <svg
                          style={{ width: 11, height: 11 }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      }
                    >
                      Travel Date
                    </Label>
                    <DateInput
                      name="date"
                      value={formData.date}
                      min={today}
                      onChange={handleInput}
                      disabled={isLoading}
                      error={errors.date}
                    />
                  </div>
                  <div>
                    <Label
                      icon={
                        <svg
                          style={{ width: 11, height: 11 }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" d="M12 6v6l4 2" />
                        </svg>
                      }
                    >
                      Pickup Time
                    </Label>
                    <TimePicker
                      value={formData.time}
                      onChange={(v) => set("time", v)}
                      disabled={isLoading}
                      error={errors.time}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="fade-up fade-up-4">
                  <Label>
                    Special Requests{" "}
                    <span
                      style={{
                        textTransform: "none",
                        fontWeight: 400,
                        color: "#cbd5e1",
                        marginLeft: "4px",
                      }}
                    >
                      (optional)
                    </span>
                  </Label>
                  <NotesInput
                    name="notes"
                    value={formData.notes}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="gold-btn"
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    letterSpacing: "0.01em",
                    fontFamily: "'Syne', sans-serif",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeOpacity=".3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Processing Booking…
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <svg
                        style={{ width: 15, height: 15 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginTop: "-6px",
                  }}
                >
                  📲 You&apos;ll receive a WhatsApp confirmation after booking.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* ── Success Modal ── */}
        {showModal && summary && (
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <div
              className="modal-card"
              style={{
                width: "100%",
                maxWidth: "460px",
                background: "#fff",
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "linear-gradient(135deg, #d97706, #f59e0b)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <svg
                      style={{ width: 22, height: 22 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "3px",
                    }}
                  >
                    Booking Confirmed!
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "12.5px" }}>
                    Your ride has been reserved successfully.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "99px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#64748b",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Summary */}
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "16px",
                  padding: "18px",
                  marginBottom: "18px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
                >
                  {[
                    { label: "Passenger", value: summary.name },
                    { label: "Phone", value: summary.phone },
                    { label: "Vehicle", value: summary.carType },
                    { label: "Date", value: fmtDate(summary.date) },
                  ].map((row) => (
                    <div key={row.label}>
                      <p
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#94a3b8",
                          marginBottom: "2px",
                        }}
                      >
                        {row.label}
                      </p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "14px",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      marginBottom: "8px",
                    }}
                  >
                    Route
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        background: "#fff",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "7px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0f172a",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📍 {summary.pickup}
                    </div>
                    <svg
                      style={{ width: 16, height: 16, color: "#f59e0b", flexShrink: 0 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div
                      style={{
                        background: "#fff",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "7px 10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#0f172a",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      🏁 {summary.dropoff}
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                    }}
                  >
                    Pickup at:
                  </span>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      borderRadius: "99px",
                      padding: "3px 10px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    🕐 {fmtTime(summary.time)}
                  </span>
                </div>

                {summary.notes && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "9px 12px",
                      background: "#fff",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        marginBottom: "3px",
                      }}
                    >
                      Note
                    </p>
                    <p style={{ fontSize: "12.5px", color: "#475569" }}>{summary.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1.5px solid #e2e8f0",
                    background: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#475569",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="gold-btn"
                  onClick={() => {
                    setShowModal(false);
                    setSummary(null);
                    setStatus({ type: "idle", message: "" });
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                  }}
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

/* ─── Date Input ────────────────────────────────────── */
function DateInput({
  name,
  value,
  min,
  onChange,
  disabled,
  error,
}: {
  name: string;
  value: string;
  min: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        type="date"
        name={name}
        value={value}
        min={min}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "14px",
          border: `2px solid ${error ? "#f87171" : focused ? "#f59e0b" : "#e2e8f0"}`,
          boxShadow: focused ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
          fontSize: "13px",
          color: value ? "#0f172a" : "#94a3b8",
          background: "rgba(255,255,255,0.6)",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          fontFamily: "inherit",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p
          style={{
            marginTop: "5px",
            fontSize: "11px",
            color: "#ef4444",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Notes Textarea ────────────────────────────────── */
function NotesInput({
  name,
  value,
  onChange,
  disabled,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Luggage, child seat, other requests…"
      rows={2}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px 14px",
        borderRadius: "14px",
        border: `2px solid ${focused ? "#f59e0b" : "#e2e8f0"}`,
        boxShadow: focused ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
        fontSize: "13px",
        color: "#0f172a",
        background: "rgba(255,255,255,0.6)",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        fontFamily: "inherit",
        resize: "none",
        lineHeight: 1.55,
        boxSizing: "border-box",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
