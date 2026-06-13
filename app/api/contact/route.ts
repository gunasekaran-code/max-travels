import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, hasErrors } from "@/lib/validation";
import type { ContactFormData, APIResponse } from "@/lib/types";

/**
 * POST /api/contact
 * Handles contact form submissions
 */

// export const runtime = 'edge';

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    const body: unknown = await request.json();

    // Validate request body
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const formData = body as ContactFormData;

    // Validate form data
    const errors = validateContactForm(formData);
    if (hasErrors(errors)) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          data: errors,
        },
        { status: 400 }
      );
    }

    // TODO: Send email using Resend or your email service
    // For now, we'll just log the submission
    console.log("Contact form submission:", formData);

    // Example: Using Resend (uncomment when configured)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: "Max Travels <noreply@maxtravel.com>",
      to: process.env.CONTACT_EMAIL || "info@maxtravel.com",
      replyTo: formData.email,
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
        ${formData.subject ? `<p><strong>Subject:</strong> ${formData.subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }
    */

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        data: { id: `contact-${Date.now()}` },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
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
