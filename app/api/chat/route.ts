import { NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type ChatMessage = {
  role?: string;
  content?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages ?? [];

    const formattedContents = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content ?? "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are a helpful assistant for Max Travels — car bookings and travel info. Speak concisely and politely. Start the first interaction with: 'Hi, I'm Ava 👋 — I can help with car searches, bookings, and travel info. How can I help you today?'",
      }
    });

    // Return plain text instead of JSON
    return new Response(response.text, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error) {
    console.error("Gemini API Error:", error);

    // Keep error as JSON or change to plain text depending on your frontend error handling
    return new Response("Failed to generate response", { 
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
