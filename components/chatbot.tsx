"use client";
import Image from "next/image";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant" | "system"; content: string }[]>([
    { role: "system", content: "You are a helpful assistant for Max Travels — car bookings and travel info. Speak concisely and politely." },
    { role: "assistant", content: "Hi, I'm Ava 👋 — I can help with car searches, bookings, and travel info. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = async (text: string) => {
    if (!text) return;
    const userMsg = { role: "user" as const, content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) {
        const err = await res.text();
        setMessages((m) => [...m, { role: "assistant", content: `Error: ${err}` }]);
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      let assistantText = "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        assistantText = data.output?.[0]?.content?.[0]?.text || data.result || JSON.stringify(data);
      } else {
        assistantText = await res.text();
      }

      setMessages((m) => [...m, { role: "assistant", content: assistantText }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: `Error: ${String(e)}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 overflow-hidden group transition-all duration-300 hover:scale-105"
        style={{ border: "2px solid #FFB51D", boxShadow: "0 0 20px rgba(255,181,29,0.45)" }}
        aria-label="Toggle chat"
      >
        <Image
          src="https://as2.ftcdn.net/v2/jpg/06/43/68/65/1000_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.webp"
          alt="Ava Chatbot"
          width={56}
          height={56}
          className="h-full w-full object-cover group-hover:scale-10 transition-transform duration-300"
        />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-96 h-[520px] bg-white shadow-xl rounded-xl overflow-hidden flex flex-col">

          {/* Header */}
          <div
            className="flex items-center gap-3 p-4 text-white"
            style={{ background: "linear-gradient(to right, #ffaa00, #ffc445)" }}
          >
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ background: "rgba(0,0,0,0.15)", color: "#fff" }}
            >
              <Image
                src="https://as2.ftcdn.net/v2/jpg/06/43/68/65/1000_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.webp"
                alt="Ava Chatbot"
                width={56}
                height={56}
                className="h-full w-full object-cover group-hover:scale-10 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="font-semibold">Ava — Max Travels</div>
              <div className="text-xs opacity-90">travel assistant 24x7</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={containerRef} className="p-4 flex-1 overflow-auto bg-gray-50">
            {messages
              .filter((m) => m.role !== "system")
              .map((m, i) => (
                <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="rounded-lg p-3 shadow-sm max-w-[78%] text-sm"
                    style={
                      m.role === "user"
                        ? { backgroundColor: "#FFB51D", color: "#1a1a1a" }
                        : { backgroundColor: "#fff", color: "#111827" }
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            {loading && <div className="text-sm text-gray-500">Ava is typing...</div>}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input.trim());
            }}
            className="p-3 border-t bg-white flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cars, availability, or booking..."
              className="flex-1 rounded-md border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "#FFB51D" }}
            />
            <button
              type="submit"
              className="rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "#FFB51D", color: "#1a1a1a" }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}