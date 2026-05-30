export type BillingInvoiceStatus = "SUCCEEDED" | "FAILED" | "REFUSED";

export interface BillingInvoice {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  amount: string;
  status: BillingInvoiceStatus;
}

export const MOCK_BILLING_INVOICES: BillingInvoice[] = [
  {
    id: "INV-2026-089",
    doctorName: "Dr. Ganesh Lama",
    specialty: "General Physician",
    date: "2026-04-20",
    amount: "NGN 1000.00",
    status: "SUCCEEDED",
  },
  {
    id: "INV-2026-041",
    doctorName: "Dr. Bandana Khanal",
    specialty: "Gynecologist",
    date: "2026-04-03",
    amount: "NGN 1000.00",
    status: "SUCCEEDED",
  },
  {
    id: "INV-2026-012",
    doctorName: "Dr. Anil Kumar Bhatta",
    specialty: "Dermatologist",
    date: "2026-03-22",
    amount: "NGN 1000.00",
    status: "SUCCEEDED",
  },
];

export const PATIENT_BILLING_PAGE_SIZE = 15;

export const BILLING_OUTSTANDING_BALANCE = "NGN 0.00";

export function parsePatientBillingPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const raw = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginatePatientBillingInvoices(
  invoices: BillingInvoice[],
  page: number,
  pageSize: number = PATIENT_BILLING_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(invoices.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: invoices.slice(start, start + pageSize),
    totalPages,
    currentPage: safePage,
    totalItems: invoices.length,
  };
}

function parseInvoiceAmount(amount: string): number {
  const numeric = Number.parseFloat(amount.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function computeTotalPaidMedicalFees(
  invoices: BillingInvoice[] = MOCK_BILLING_INVOICES,
): string {
  const total = invoices.reduce(
    (sum, invoice) => sum + parseInvoiceAmount(invoice.amount),
    0,
  );
  return `NGN ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatBillingInvoiceStatus(status: BillingInvoiceStatus): string {
  switch (status) {
    case "SUCCEEDED":
      return "Succeeded";
    case "FAILED":
      return "Failed";
    case "REFUSED":
      return "Refused";
  }
}
