import type { Metadata } from "next";
import { Terms } from "@/components/sections/Terms";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE.name} Travels`,
  description:
    "Read the Terms of Service for Max Travels car rental services, including booking, payments, cancellations, and liability.",
  alternates: {
    canonical: `${SITE.url}/terms-of-service`,
  },
};

export default function TermsPage() {
  return <Terms />;
}
