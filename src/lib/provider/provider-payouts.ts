export const PROVIDER_WITHDRAWABLE_BALANCE = "NGN 4,500.00";
export const PROVIDER_PENDING_ESCROW = "NGN 1,000.00";
export const PROVIDER_TOTAL_EARNINGS = "NGN 24,000.00";

export const PROVIDER_SETTLEMENT_BANK = {
  name: "Nepal Investment Mega Bank",
  maskedAccount: "****9921",
} as const;

export type ProviderPayoutStatus = "PAID" | "PROCESSING";

export interface ProviderPayoutLedgerEntry {
  reference: string;
  date: string;
  amount: string;
  status: ProviderPayoutStatus;
}

export const PROVIDER_PAYOUTS_PAGE_SIZE = 5;

export const MOCK_PROVIDER_PAYOUTS: ProviderPayoutLedgerEntry[] = [
  {
    reference: "PAY-9001-26",
    date: "2026-05-25",
    amount: "NGN 8,000.00",
    status: "PAID",
  },
  {
    reference: "PAY-7821-26",
    date: "2026-05-10",
    amount: "NGN 11,500.00",
    status: "PAID",
  },
  {
    reference: "PAY-0042-26",
    date: "2026-05-30",
    amount: "NGN 4,500.00",
    status: "PROCESSING",
  },
  {
    reference: "PAY-3310-26",
    date: "2026-05-18",
    amount: "NGN 6,250.00",
    status: "PAID",
  },
  {
    reference: "PAY-2298-26",
    date: "2026-05-02",
    amount: "NGN 3,750.00",
    status: "PAID",
  },
  {
    reference: "PAY-1187-26",
    date: "2026-04-28",
    amount: "NGN 9,200.00",
    status: "PROCESSING",
  },
  {
    reference: "PAY-5520-26",
    date: "2026-04-14",
    amount: "NGN 5,600.00",
    status: "PAID",
  },
  {
    reference: "PAY-4412-26",
    date: "2026-04-05",
    amount: "NGN 2,800.00",
    status: "PAID",
  },
  {
    reference: "PAY-3099-26",
    date: "2026-03-22",
    amount: "NGN 7,100.00",
    status: "PAID",
  },
  {
    reference: "PAY-2076-26",
    date: "2026-03-08",
    amount: "NGN 4,900.00",
    status: "PROCESSING",
  },
  {
    reference: "PAY-1564-26",
    date: "2026-02-19",
    amount: "NGN 10,300.00",
    status: "PAID",
  },
  {
    reference: "PAY-0891-26",
    date: "2026-02-01",
    amount: "NGN 3,200.00",
    status: "PAID",
  },
];

export function parseProviderPayoutsPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const raw = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateProviderPayouts(
  entries: ProviderPayoutLedgerEntry[],
  page: number,
  pageSize: number = PROVIDER_PAYOUTS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: entries.slice(start, start + pageSize),
    totalPages,
    currentPage: safePage,
    totalItems: entries.length,
  };
}

export function formatProviderPayoutStatus(status: ProviderPayoutStatus): string {
  return status === "PAID" ? "Paid" : "Processing";
}
