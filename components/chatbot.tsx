"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
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

  // Auto-open after 10 seconds
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom when messages change
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
        // Try common fields
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
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"
        aria-label="Toggle chat"
      >
        <Bot className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 w-96 h-[520px] bg-white shadow-xl rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-600 to-rose-500 text-white">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              {/* Simple female avatar initials */}
              <span className="text-sm">Ava</span>
            </div>
            <div>
              <div className="font-semibold">Ava — Max Travels</div>
              <div className="text-xs opacity-90">travel assistant 24x7</div>
            </div>
          </div>

          <div ref={containerRef} className="p-4 flex-1 overflow-auto bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.role === "user" ? "bg-red-600 text-white" : "bg-white text-gray-900"} rounded-lg p-3 shadow-sm max-w-[78%]`}>
                  <div className="text-sm">{m.content}</div>
                </div>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-500">Ava is typing...</div>}
          </div>

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
              className="flex-1 rounded-md border px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-md bg-red-600 px-4 py-2 text-white text-sm">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}