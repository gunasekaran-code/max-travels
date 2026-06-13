import { NextRequest } from "next/server";

type ChatMessage = {
  role?: string;
  content?: string;
};

// ✅ Remove edge runtime so we can use Node.js features if needed
// export const runtime = 'edge';

const OWNER_WHATSAPP = "919566188126"; // ← Change to your WhatsApp number

const SYSTEM_PROMPT = `You are Ava, a helpful booking assistant for Max Travels — a premium cab service in Thoothukudi (Tuticorin), Tamil Nadu.

## Our Fleet & Pricing:

### Local Packages (within city):
- Swift Dzire / Toyota Etios (Sedan, 4+1 persons) — ₹2,500 for 12hrs/80km | Extra: ₹13/km, ₹100/hr
- Hyundai Aura (Sedan, 4+1 persons) — ₹2,800 for 12hrs/80km | Extra: ₹13/km, ₹100/hr
- Innova Crysta (MUV, 6+1 persons) — ₹4,500 for 12hrs/80km | Extra: ₹18/km, ₹150/hr
- Tempo Traveller (Van, 12 persons) — ₹6,000 for 12hrs/80km | Extra: ₹20/km, ₹200/hr

### Outstation (per day, min 300km):
- Swift Dzire / Toyota Etios — ₹12/km (min ₹3,600/day) + Driver Bata ₹400/day
- Hyundai Aura — ₹13/km (min ₹3,900/day) + Driver Bata ₹400/day
- Innova Crysta — ₹18/km (min ₹5,400/day) + Driver Bata ₹500/day
- Tempo Traveller — ₹22/km (min ₹6,600/day) + Driver Bata ₹600/day

### Airport Transfer (Madurai/Tuticorin/Chennai):
- Sedan — ₹2,000 onwards
- Innova Crysta — ₹3,500 onwards

## Booking Steps (follow in order):
1. Ask which car they prefer (or suggest based on group size)
2. Ask trip type: Local, Outstation (one-way/round trip), or Airport Transfer
3. Ask pickup location (and drop location for outstation)
4. Ask date and time
5. Ask their full name and phone number
6. Confirm all details with price estimate

## Important Rules:
- Always quote prices from the fleet above
- For outstation, ask one-way or round trip — round trip = same rate both ways, no extra charge
- Toll, parking extra for all trips
- Fuel included in all packages
- Always be polite, concise, and helpful
- If asked about something unrelated to travel/cars, politely redirect

## When ALL booking details are collected (name ✓, phone ✓, car ✓, date ✓, time ✓, pickup ✓):
At the END of your confirmation message, append this exact block with no text after it:
<BOOKING_DATA>
{"name":"...","phone":"...","car":"...","date":"...","time":"...","pickup":"...","drop":"...","package":"...","price":"..."}
</BOOKING_DATA>`;

export async function POST(request: NextRequest) {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    // Filter out system messages — we pass system via systemInstruction
    const formattedContents = messages
      .filter((m) => m.role !== "system")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content ?? "" }],
      }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    const fullText = response.text ?? "";

    // ── Extract booking JSON if present ──
    let whatsappUrl: string | null = null;
    const bookingMatch = fullText.match(/<BOOKING_DATA>([\s\S]*?)<\/BOOKING_DATA>/);

    if (bookingMatch) {
      try {
        const booking = JSON.parse(bookingMatch[1].trim());

        // Build the WhatsApp message text
        const waText =
          `🚗 *New Booking — Max Travels*\n\n` +
          `👤 *Name:* ${booking.name}\n` +
          `📞 *Phone:* ${booking.phone}\n` +
          `🚘 *Car:* ${booking.car}\n` +
          `📅 *Date:* ${booking.date}\n` +
          `⏰ *Time:* ${booking.time}\n` +
          `📍 *Pickup:* ${booking.pickup}\n` +
          `🏁 *Drop:* ${booking.drop || "Local trip"}\n` +
          `📦 *Package:* ${booking.package}\n` +
          `💰 *Est. Price:* ${booking.price}\n\n` +
          `_Booked via Ava chatbot on maxtravelstamilnadu.com_`;

        whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(waText)}`;

        console.log("📋 New Booking:", booking); // Shows in server logs
      } catch (e) {
        console.error("Booking JSON parse error:", e);
      }
    }

    // Remove the hidden <BOOKING_DATA> block from what user sees
    const cleanText = fullText
      .replace(/<BOOKING_DATA>[\s\S]*?<\/BOOKING_DATA>/, "")
      .trim();

    return new Response(JSON.stringify({ text: cleanText, whatsappUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ text: "Sorry, something went wrong. Please try again.", whatsappUrl: null }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}