import Link from "next/link";
import { CONTACT, SITE } from "@/lib/constants";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
} from "@/components/ui/LegalPageLayout";

const LAST_UPDATED = "13 June 2026";

export function Terms() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
      <p className="text-sm leading-relaxed text-max-gray md:text-base">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
        {SITE.name} Travels website and any car rental or travel services we
        provide. By accessing or using our services, you agree to these Terms.
      </p>

      <LegalSection title="1. Booking & Service Availability">
        <LegalList
          items={[
            "Vehicle and service availability may change without prior notice.",
            "Booking requests are subject to confirmation by Max Travels.",
            "Quoted prices apply only after your reservation is confirmed.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Payments, Pricing & Taxes">
        <LegalList
          items={[
            "Prices shown at the time of booking apply to the confirmed reservation.",
            "Applicable taxes, tolls, parking, or surcharges may be charged separately.",
            "You agree to pay all charges incurred during the rental period.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Cancellations & Refunds">
        <p>
          Cancellation policies may vary by vehicle type and booking conditions.
          Any refund, if applicable, will follow the policy communicated at the
          time of booking. Contact us as early as possible if you need to modify
          or cancel a reservation.
        </p>
      </LegalSection>

      <LegalSection title="4. Driver Requirements & Valid Documents">
        <LegalList
          items={[
            "For self-drive rentals, a valid driving license and government-issued ID are required.",
            "For chauffeur services, the assigned driver must meet applicable legal requirements.",
            "Additional deposits or verification may be required for certain vehicle categories.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Use of the Vehicle">
        <LegalList
          items={[
            "You agree to use the vehicle responsibly and in compliance with all applicable laws.",
            "You are responsible for damage caused by misuse, negligence, or unauthorized use.",
            "Smoking, illegal activities, and reckless driving are strictly prohibited.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Liability & Disclaimer">
        <p>
          To the maximum extent permitted by law, Max Travels shall not be liable
          for indirect or consequential damages arising from the use of our
          services. We do not exclude liability that cannot be excluded under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Your continued use of the
          website or services after changes are posted constitutes acceptance of
          the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>
          If you have questions about these Terms, contact us at{" "}
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
          . You can also reach us through our{" "}
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
