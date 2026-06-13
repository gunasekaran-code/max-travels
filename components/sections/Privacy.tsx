import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/ui/LegalPageLayout";

const LAST_UPDATED = "13 June 2026";

export function Privacy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-relaxed text-max-gray md:text-base">
        This Privacy Policy explains how {SITE.name} Travels (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects
        information when you use our website and car rental services in
        Thoothukudi and across Tamil Nadu.
      </p>

      <LegalSection title="1. Information We Collect">
        <LegalList
          items={[
            "Contact details you provide (name, email, phone number).",
            "Booking information (dates, pickup locations, vehicle type, trip details).",
            "Payment-related information processed through secure third-party providers.",
            "Usage data such as device, browser, and pages viewed on our website.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <LegalList
          items={[
            "To process bookings and provide rental and travel services.",
            "To communicate about reservations, updates, or customer support.",
            "To improve our website, fleet offerings, and user experience.",
            "To comply with legal and regulatory obligations.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Sharing of Information">
        <p>
          We may share information with trusted service providers that help us
          operate our website and services (for example, payment processors or
          communication tools). We do not sell your personal information to third
          parties.
        </p>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p>
          We implement reasonable administrative, technical, and physical
          safeguards to protect your information. However, no method of
          transmission or storage is completely secure.
        </p>
      </LegalSection>

      <LegalSection title="5. Your Rights">
        <LegalList
          items={[
            "You may request access to or correction of your personal information.",
            "You may request deletion or object to certain processing where applicable by law.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Cookies & Analytics">
        <p>
          We may use cookies and analytics tools to understand website usage and
          improve performance. You can manage cookies through your browser
          settings.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The updated
          version will be posted on this page with a revised date.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="font-medium text-max-black underline decoration-max-base underline-offset-2 hover:text-max-base"
          >
            {CONTACT.email}
          </a>{" "}
          or{" "}
          <a
            href={CONTACT.phoneHref}
            className="font-medium text-max-black underline decoration-max-base underline-offset-2 hover:text-max-base"
          >
            {CONTACT.phone}
          </a>
          . You can also visit our{" "}
          <Link
            href="/contact"
            className="font-medium text-max-black underline decoration-max-base underline-offset-2 hover:text-max-base"
          >
            contact page
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
