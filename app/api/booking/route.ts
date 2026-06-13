import { NextRequest, NextResponse } from "next/server";

interface BookingData {
  name: string;
  phone: string;
  pickup: string;
  dropoff: string;
  carType: string;
  date: string;
  time: string;
  notes?: string;
}

// export const runtime = 'edge'; 

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json();

    // Validate required fields
    const requiredFields: (keyof BookingData)[] = [
      "name", "phone", "pickup", "dropoff", "carType", "date", "time",
    ];
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const phoneDigits = body.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      return NextResponse.json({ error: "Phone number must be a 10-digit mobile number without country code." }, { status: 400 });
    }

    if (body.pickup === body.dropoff) {
      return NextResponse.json({ error: "Pickup and dropoff cannot be the same location." }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];
    if (body.date < today) {
      return NextResponse.json({ error: "Booking date must be today or later." }, { status: 400 });
    }

    // Get WhatsApp credentials from environment
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE;

    if (!phoneNumberId || !accessToken || !recipientPhone) {
      console.error("WhatsApp credentials not configured:", {
        hasPhoneNumberId: !!phoneNumberId,
        hasAccessToken: !!accessToken,
        hasRecipient: !!recipientPhone,
      });
      return NextResponse.json(
        { error: "Server configuration error: missing WhatsApp credentials" },
        { status: 500 }
      );
    }

    // Format the booking message
    const bookingMessage = [
      "📅 *New Booking Request*",
      "",
      `👤 *Customer Name:* ${body.name}`,
      `📱 *Phone:* ${body.phone}`,
      "",
      "🚗 *Booking Details:*",
      `📍 *Pickup:* ${body.pickup}`,
      `📍 *Drop-off:* ${body.dropoff}`,
      `🚙 *Car Type:* ${body.carType}`,
      `📅 *Date:* ${body.date}`,
      `🕐 *Time:* ${body.time}`,
      ...(body.notes ? ["", `📝 *Special Requests:* ${body.notes}`] : []),
      "",
      "Please confirm this booking via WhatsApp or call the customer.",
    ].join("\n");

    // ✅ FIXED: Use graph.facebook.com (not graph.instagram.com)
    const whatsappUrl = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;

    console.log("Sending WhatsApp message:", {
      phoneNumberId,
      recipientPhone,
      url: whatsappUrl,
    });

    const whatsappResponse = await fetch(whatsappUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipientPhone.replace(/\D/g, ""), // Strip non-digits
        type: "text",
        text: { body: bookingMessage },
      }),
    });

    const whatsappData = await whatsappResponse.json();

    console.log("WhatsApp Response Status:", whatsappResponse.status);
    console.log(
      "WhatsApp Response:",
      JSON.stringify(whatsappData, null, 2)
    );

    if (!whatsappResponse.ok) {
      // Surface the real WhatsApp error to the server log
      console.error("WhatsApp API error:", JSON.stringify(whatsappData, null, 2));

      const apiMessage =
        whatsappData?.error?.message ?? "Failed to send WhatsApp message";

      return NextResponse.json({ error: apiMessage }, { status: 502 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking submitted successfully",
        messageId: whatsappData.messages?.[0]?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── Quick test helper (only runs in non-production) ─────────────────────────
// Hit GET /api/booking to verify your env vars are loaded correctly.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const checks = {
    WHATSAPP_PHONE_NUMBER_ID: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
    WHATSAPP_ACCESS_TOKEN: !!process.env.WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_RECIPIENT_PHONE: !!process.env.WHATSAPP_RECIPIENT_PHONE,
  };

  const allPresent = Object.values(checks).every(Boolean);

  return NextResponse.json(
    {
      status: allPresent ? "✅ All env vars loaded" : "❌ Missing env vars",
      checks,
    },
    { status: allPresent ? 200 : 500 }
  );
}