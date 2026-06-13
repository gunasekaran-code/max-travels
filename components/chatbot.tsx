"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const INITIAL_MESSAGES: { role: "user" | "assistant" | "system"; content: string }[] = [
  {
    role: "system",
    content:
      "You are Ava, a helpful assistant for Max Travels — car bookings and travel info. Speak concisely and politely.",
  },
  {
    role: "assistant",
    content:
      "Hi, I'm Ava 👋 — I can help with car searches, bookings, and travel info. How can I help you today?",
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null); // ✅ WhatsApp button URL
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-open after 10 seconds
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, whatsappUrl]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setWhatsappUrl(null); // Reset WhatsApp button on each new message

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${err}` }]);
        return;
      }

      const data = await res.json();
      const assistantText = data.text || "Sorry, I couldn't respond. Please try again.";

      setMessages((m) => [...m, { role: "assistant", content: assistantText }]);

      // ✅ If booking is complete, show the WhatsApp confirm button
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
      }

    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Error: ${String(e)}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setWhatsappUrl(null); // ✅ Clear WhatsApp button on restart
  };

  return (
    <>
      <style>{`
        /* ── FAB toggle bubble ── */
        .ava-fab {
          position: fixed;
          bottom: 24px;
          right: 20px;
          z-index: 9999;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2.5px solid #FFB51D;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: transform 0.2s ease;
          animation: ava-glow 2.5s ease-in-out infinite;
        }
        .ava-fab:hover { transform: scale(1.08); animation: none; }
        @keyframes ava-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,181,29,0.45); }
          50%      { box-shadow: 0 0 0 9px rgba(255,181,29,0); }
        }

        /* ── Floating panel — shared base ── */
        .ava-panel {
          position: fixed;
          z-index: 9998;
          display: flex;
          flex-direction: column;
          background: #fff;
          overflow: hidden;
          border-radius: 20px;
          box-shadow:
            0 8px 40px rgba(0,0,0,0.18),
            0 2px 12px rgba(0,0,0,0.10);
          transition:
            transform 0.32s cubic-bezier(.4,0,.2,1),
            opacity 0.25s ease;
        }
        .ava-panel.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: auto; }
        .ava-panel.shut { transform: scale(0.92) translateY(20px); opacity: 0; pointer-events: none; }

        /* ── DESKTOP (≥641px): bottom-right floating card ── */
        @media (min-width: 641px) {
          .ava-panel {
            bottom: 90px;
            right: 24px;
            width: 360px;
            height: 500px;
          }
        }

        /* ── MOBILE STANDARD (320px–640px) ── */
        @media (max-width: 640px) and (min-width: 301px) {
          .ava-panel {
            bottom: 97px;
            right: 15px;
            left: 94px;
            width: auto;
            height: 510px;
            border-radius: 19px;
          }
          .ava-fab {
            bottom: 22px;
            right: 22px;
            width: 50px;
            height: 50px;
          }
        }

        /* ── ULTRA-NARROW (≤300px wide) ── */
        @media (max-width: 300px) {
          .ava-panel {
            left: 8px;
            right: 8px;
            width: auto;
            bottom: 84px;
            height: 420px;
            border-radius: 16px;
          }
          .ava-fab {
            bottom: 16px;
            right: 10px;
            width: 46px;
            height: 46px;
            border-width: 2px;
          }
          .ava-hd { padding: 9px 10px; gap: 7px; }
          .ava-hd-av { width: 34px; height: 34px; }
          .ava-hd-name { font-size: 12px; }
          .ava-hd-sub  { font-size: 10px; }
          .ava-hd-btn  { width: 26px; height: 26px; }
          .ava-hd-btn svg { width: 13px; height: 13px; }
          .ava-msgs { padding: 10px 10px 6px; gap: 8px; }
          .ava-bbl  { font-size: 12px; padding: 7px 10px; max-width: 88%; }
          .ava-bar  { padding: 7px 9px; gap: 6px; }
          .ava-inp  { font-size: 12px; padding: 7px 9px; }
          .ava-inp::placeholder { font-size: 11px; }
          .ava-send { width: 32px; height: 32px; border-radius: 8px; }
          .ava-send svg { width: 14px; height: 14px; }
        }

        /* ── Small phone override (≤380px but >300px) ── */
        @media (max-width: 380px) and (min-width: 301px) {
          .ava-panel { height: 430px; }
        }

        /* ── Header ── */
        .ava-hd {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: linear-gradient(135deg, #ffaa00, #ffc445);
          flex-shrink: 0;
          border-radius: 18px 18px 0 0;
        }
        .ava-hd-av {
          width: 42px; height: 42px;
          border-radius: 50%;
          overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.5);
        }
        .ava-hd-info { flex: 1; min-width: 0; }
        .ava-hd-name { font-weight: 700; font-size: 14px; color: #fff; line-height: 1.25; }
        .ava-hd-sub {
          font-size: 11px; color: rgba(255,255,255,0.88);
          display: flex; align-items: center; gap: 5px;
        }
        .ava-hd-sub::before {
          content: ''; display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%; background: #4ade80; flex-shrink: 0;
        }
        .ava-hd-btns { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
        .ava-hd-btn {
          width: 30px; height: 30px;
          border-radius: 8px; border: none;
          background: rgba(255,255,255,0.22);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .ava-hd-btn:hover { background: rgba(255,255,255,0.38); }
        .ava-hd-btn svg {
          width: 15px; height: 15px;
          stroke: currentColor; fill: none;
          stroke-width: 2.2;
          stroke-linecap: round; stroke-linejoin: round;
        }

        /* ── Messages ── */
        .ava-msgs {
          flex: 1; overflow-y: auto;
          padding: 14px 14px 8px;
          background: #f7f7f5;
          display: flex; flex-direction: column; gap: 10px;
          scroll-behavior: smooth;
        }
        .ava-msgs::-webkit-scrollbar { width: 3px; }
        .ava-msgs::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }

        .ava-row { display: flex; }
        .ava-row.user      { justify-content: flex-end; }
        .ava-row.assistant { justify-content: flex-start; }

        .ava-bbl {
          max-width: 78%;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.55;
          word-break: break-word;
        }
        .ava-bbl.user {
          background: #FFB51D; color: #1a1a1a;
          border-bottom-right-radius: 3px;
        }
        .ava-bbl.assistant {
          background: #fff; color: #111827;
          border: 1px solid #ece9e2;
          border-bottom-left-radius: 3px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        /* Typing dots */
        .ava-dots { display: flex; gap: 4px; align-items: center; padding: 2px; }
        .ava-dots i {
          display: inline-block; width: 5px; height: 5px;
          border-radius: 50%; background: #FFB51D;
          animation: ava-dot 1.1s ease-in-out infinite;
        }
        .ava-dots i:nth-child(2) { animation-delay: .18s; }
        .ava-dots i:nth-child(3) { animation-delay: .36s; }
        @keyframes ava-dot {
          0%,80%,100% { transform: translateY(0); opacity: .45; }
          40%          { transform: translateY(-5px); opacity: 1; }
        }

        /* ── WhatsApp confirm button ── */
        .ava-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          margin-top: 2px;
          transition: background 0.15s, transform 0.1s;
          border: none;
          cursor: pointer;
          max-width: 78%;
        }
        .ava-wa-btn:hover  { background: #1ebe5d; }
        .ava-wa-btn:active { transform: scale(0.97); }
        .ava-wa-btn svg { flex-shrink: 0; }

        /* ── Input bar ── */
        .ava-bar {
          padding: 9px 12px;
          border-top: 1px solid #eeeae3;
          background: #fff;
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
          border-radius: 0 0 18px 18px;
        }
        .ava-inp {
          flex: 1; min-width: 0;
          border: 1.5px solid #FFB51D;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 13px; outline: none;
          background: #fff; color: #111;
          transition: border-color .15s, box-shadow .15s;
        }
        .ava-inp:focus {
          border-color: #e6a000;
          box-shadow: 0 0 0 3px rgba(255,181,29,.15);
        }
        .ava-inp::placeholder { color: #b8b3a9; font-size: 12px; }
        .ava-send {
          width: 36px; height: 36px;
          border-radius: 10px; border: none;
          background: #FFB51D; color: #1a1a1a;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, transform .1s;
        }
        .ava-send:hover  { background: #e6a000; }
        .ava-send:active { transform: scale(0.93); }
        .ava-send svg {
          width: 16px; height: 16px;
          stroke: currentColor; fill: none;
          stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
        }
      `}</style>

      {/* ── FAB toggle ── */}
      <button
        className="ava-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ava chat" : "Chat with Ava"}
      >
        <Image
          src="/assistant.png"
          alt="Ava"
          width={58}
          height={58}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </button>

      {/* ── Floating chat panel ── */}
      <div
        className={`ava-panel ${open ? "open" : "shut"}`}
        role="dialog"
        aria-modal="false"
        aria-label="Ava travel assistant"
      >
        {/* Header */}
        <div className="ava-hd">
          <div className="ava-hd-av">
            <Image
              src="/assistant.png"
              alt="Ava"
              width={42}
              height={42}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="ava-hd-info">
            <div className="ava-hd-name">Ava — Max Travels</div>
            <div className="ava-hd-sub">travel assistant 24x7</div>
          </div>
          <div className="ava-hd-btns">
            {/* Restart */}
            <button
              className="ava-hd-btn"
              onClick={handleRestart}
              title="Restart chat"
              aria-label="Restart chat"
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            {/* Close */}
            <button
              className="ava-hd-btn"
              onClick={() => setOpen(false)}
              title="Close chat"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={containerRef} className="ava-msgs">
          {messages
            .filter((m) => m.role !== "system")
            .map((m, i) => (
              <div key={i} className={`ava-row ${m.role}`}>
                <div className={`ava-bbl ${m.role}`}>{m.content}</div>
              </div>
            ))}

          {/* ✅ WhatsApp confirm button — appears after booking is complete */}
          {whatsappUrl && (
            <div className="ava-row assistant">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ava-wa-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                ✅ Confirm Booking on WhatsApp
              </a>
            </div>
          )}

          {/* Typing dots */}
          {loading && (
            <div className="ava-row assistant">
              <div className="ava-bbl assistant">
                <div className="ava-dots"><i /><i /><i /></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          className="ava-bar"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input.trim());
          }}
        >
          <input
            className="ava-inp"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cars, bookings..."
            aria-label="Message Ava"
          />
          <button type="submit" className="ava-send" aria-label="Send">
            <svg viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}