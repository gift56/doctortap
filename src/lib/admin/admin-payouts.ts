export const ADMIN_GLOBAL_ESCROW_HOLDING = "NGN 125,000.00";
export const ADMIN_PENDING_APPROVAL_QUEUE = "NGN 18,500.00";
export const ADMIN_TOTAL_SETTLED_TRANSFERRED = "NGN 840,000.00";

export const ADMIN_PAYOUTS_PAGE_SIZE = 5;

export type AdminPayoutLedgerStatus = "PENDING" | "DISPATCHED" | "FAILED";

export interface AdminPayoutLedgerEntry {
  batchRef: string;
  beneficiary: string;
  date: string;
  amount: string;
  status: AdminPayoutLedgerStatus;
  bankName?: string;
  maskedAccount?: string;
  profileRef?: string;
}

export interface AdminPendingPayoutRequest {
  doctorName: string;
  amount: string;
  bankName: string;
  maskedAccount: string;
  profileRef: string;
}

export const MOCK_ADMIN_PENDING_PAYOUT: AdminPendingPayoutRequest = {
  doctorName: "Dr. Ram Nepal",
  amount: "NGN 4,500.00",
  bankName: "Nepal Investment Mega Bank",
  maskedAccount: "****9921",
  profileRef: "DOC-8821",
};

export const MOCK_ADMIN_PAYOUT_LEDGER: AdminPayoutLedgerEntry[] = [
  {
    batchRef: "TXN-ADMIN-905",
    beneficiary: "Dr. Ram Nepal",
    date: "2026-05-31",
    amount: "NGN 4,500.00",
    status: "PENDING",
    bankName: "Nepal Investment Mega Bank",
    maskedAccount: "****9921",
    profileRef: "DOC-8821",
  },
  {
    batchRef: "TXN-ADMIN-881",
    beneficiary: "Dr. Ram Nepal",
    date: "2026-05-28",
    amount: "NGN 8,000.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-812",
    beneficiary: "Dr. Anjali Sharma",
    date: "2026-05-24",
    amount: "NGN 14,000.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-799",
    beneficiary: "Dr. Bikram Shah",
    date: "2026-05-20",
    amount: "NGN 3,500.00",
    status: "FAILED",
  },
  {
    batchRef: "TXN-ADMIN-776",
    beneficiary: "Dr. Sunita Karki",
    date: "2026-05-18",
    amount: "NGN 6,200.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-754",
    beneficiary: "Dr. Prakash Thapa",
    date: "2026-05-15",
    amount: "NGN 9,750.00",
    status: "PENDING",
    bankName: "Nepal Investment Mega Bank",
    maskedAccount: "****4410",
    profileRef: "DOC-4410",
  },
  {
    batchRef: "TXN-ADMIN-731",
    beneficiary: "Dr. Meera Gurung",
    date: "2026-05-12",
    amount: "NGN 2,100.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-718",
    beneficiary: "Dr. Bikram Shah",
    date: "2026-05-08",
    amount: "NGN 5,400.00",
    status: "FAILED",
  },
  {
    batchRef: "TXN-ADMIN-702",
    beneficiary: "Dr. Anjali Sharma",
    date: "2026-05-04",
    amount: "NGN 11,250.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-688",
    beneficiary: "Dr. Ram Nepal",
    date: "2026-04-30",
    amount: "NGN 7,800.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-671",
    beneficiary: "Dr. Sunita Karki",
    date: "2026-04-26",
    amount: "NGN 4,900.00",
    status: "DISPATCHED",
  },
  {
    batchRef: "TXN-ADMIN-655",
    beneficiary: "Dr. Prakash Thapa",
    date: "2026-04-22",
    amount: "NGN 3,200.00",
    status: "FAILED",
  },
];

export function parseAdminPayoutsPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const raw = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateAdminPayouts(
  entries: AdminPayoutLedgerEntry[],
  page: number,
  pageSize: number = ADMIN_PAYOUTS_PAGE_SIZE,
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

export function formatAdminPayoutLedgerStatus(
  status: AdminPayoutLedgerStatus,
): string {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "DISPATCHED":
      return "Dispatched";
    case "FAILED":
      return "Failed";
  }
}

export function isAdminPayoutPending(entry: AdminPayoutLedgerEntry): boolean {
  return entry.status === "PENDING";
}
