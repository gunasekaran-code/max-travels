import type { Metadata } from "next";
import { Privacy } from "@/components/sections/Privacy";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.name} Travels`,
  description:
    "Read the Privacy Policy for Max Travels car rental services, including how we collect, use, and protect your information.",
  alternates: {
    canonical: `${SITE.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return <Privacy />;
}
