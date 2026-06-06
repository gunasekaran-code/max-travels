import { NextRequest, NextResponse } from "next/server";

interface MailRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

const resendApiUrl = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml({ name, email, message }: Required<MailRequestBody>): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #f59e0b; padding: 24px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Max Travels Inquiry</h2>
      </div>
      <div style="padding: 30px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
        <p style="margin-top: 0;">You have received a new message from your website contact form:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; width: 100px; border-bottom: 1px solid #f3f4f6;">Name:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${safeEmail}" style="color: #f59e0b;">${safeEmail}</a></td>
          </tr>
        </table>

        <div style="background-color: #f9fafb; border-left: 4px solid #f59e0b; padding: 16px; margin-top: 20px; font-style: italic;">
          "${safeMessage}"
        </div>
      </div>
      <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
        Sent via Max Travels Lead Capture Engine
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MailRequestBody;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error: missing Resend API key" },
        { status: 500 }
      );
    }

    const resendResponse = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "gunasekaran.code@gmail.com",
        subject: `New Message from ${name}`,
        html: buildEmailHtml({ name, email, message }),
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", JSON.stringify(resendData, null, 2));
      return NextResponse.json(
        { error: resendData?.message ?? "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message_id: resendData?.id ?? String(resendData) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling mail request:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
