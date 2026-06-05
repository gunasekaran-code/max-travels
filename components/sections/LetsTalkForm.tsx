"use client";

import React, { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react";
import { validateContactForm, hasErrors } from "@/lib/validation";
import type { ContactFormData, FormErrors, Status } from "@/lib/types";
import { CONTACT } from "@/lib/constants";

const LetsTalkContact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const fieldErrors = validateContactForm(formData);
    if (fieldErrors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof ContactFormData] }));
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validateContactForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      return;
    }

    setStatus("loading");

    try {
      // Try to send via backend if available, otherwise use Resend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setErrors({});
        setTouched({});

        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      setStatus("error");
      console.error("Failed to send message:", error);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: CONTACT.phone,
      href: CONTACT.phoneHref,
    },
    {
      icon: Mail,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: CONTACT.address,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-max-black/5 to-transparent">
      <div className="container-max">
        <div className="mb-16 text-center">
          <p className="section-tagline">Get In Touch</p>
          <h2 className="section-title">Let&apos;s Talk About Your Journey</h2>
          <p className="mx-auto mt-4 max-w-2xl text-max-gray">
            Have questions about our rental services? We&apos;re here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="rounded-2xl border border-max-border bg-white p-8 transition hover:shadow-card">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-max-base/10">
                <Icon className="h-6 w-6 text-max-base" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-max-black">{label}</h3>
              {href ? (
                <a href={href} className="text-max-gray hover:text-max-base transition">
                  {value}
                </a>
              ) : (
                <p className="text-max-gray">{value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg md:p-12">
          {status === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700 border border-green-200">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p>Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-700 border border-red-200">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>Something went wrong. Please try again or contact us directly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-max-black mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    touched.name && errors.name
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-max-border bg-white focus:border-max-base focus:ring-2 focus:ring-max-base/10"
                  }`}
                  disabled={status === "loading"}
                />
                {touched.name && errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-max-black mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    touched.email && errors.email
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-max-border bg-white focus:border-max-base focus:ring-2 focus:ring-max-base/10"
                  }`}
                  disabled={status === "loading"}
                />
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-max-black mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    touched.phone && errors.phone
                      ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-max-border bg-white focus:border-max-base focus:ring-2 focus:ring-max-base/10"
                  }`}
                  disabled={status === "loading"}
                />
                {touched.phone && errors.phone && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-max-black mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-max-border bg-white px-4 py-3 outline-none transition focus:border-max-base focus:ring-2 focus:ring-max-base/10"
                  disabled={status === "loading"}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-max-black mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Tell us about your inquiry..."
                rows={5}
                className={`w-full rounded-lg border px-4 py-3 outline-none transition resize-none ${
                  touched.message && errors.message
                    ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-max-border bg-white focus:border-max-base focus:ring-2 focus:ring-max-base/10"
                }`}
                disabled={status === "loading"}
              />
              {touched.message && errors.message && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="thm-btn w-full justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            <p className="text-center text-sm text-max-gray">
              We typically respond within 24 hours. Thank you for your patience!
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LetsTalkContact;
