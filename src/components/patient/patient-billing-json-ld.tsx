import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import {
  PATIENT_BILLING_PAGE_SIZE,
  type BillingInvoice,
} from "@/lib/patient/patient-billing";
import { PATIENT_BILLING_PAGE_DESCRIPTION } from "@/lib/seo/patient-billing-metadata";

interface PatientBillingJsonLdProps {
  invoices: BillingInvoice[];
  currentPage: number;
  totalItems: number;
  siteUrl: string;
}

export function PatientBillingJsonLd({
  invoices,
  currentPage,
  totalItems,
  siteUrl,
}: PatientBillingJsonLdProps) {
  const pageUrl =
    currentPage > 1
      ? `${siteUrl}${PATIENT_ROUTES.billing}?page=${currentPage}`
      : `${siteUrl}${PATIENT_ROUTES.billing}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Billing & Statements",
    description: PATIENT_BILLING_PAGE_DESCRIPTION,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalItems,
      itemListElement: invoices.map((invoice, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * PATIENT_BILLING_PAGE_SIZE + index + 1,
        item: {
          "@type": "Invoice",
          identifier: invoice.id,
          name: `Medical consultation — ${invoice.doctorName}`,
          description: `${invoice.specialty} — ${invoice.date} — ${invoice.amount}`,
          paymentStatus:
            invoice.status === "SUCCEEDED" ? "PaymentComplete" : "PaymentFailed",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
