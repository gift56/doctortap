import {
  PUBLIC_CONTACT_OFFICE,
  PUBLIC_FOOTER_CONTACT,
} from "@/config/constants/public/routes";
import { CONTACT_PAGE_DESCRIPTION } from "@/lib/seo/contact-page-metadata";

interface ContactPageJsonLdProps {
  siteUrl: string;
}

export function ContactPageJsonLd({ siteUrl }: ContactPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Our Medical Support Team",
    description: CONTACT_PAGE_DESCRIPTION,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "DoctorTap",
      url: siteUrl,
      telephone: PUBLIC_FOOTER_CONTACT.phone,
      email: PUBLIC_FOOTER_CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: PUBLIC_CONTACT_OFFICE.addressLines.join(", "),
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
