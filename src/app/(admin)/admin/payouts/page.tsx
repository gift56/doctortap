import { PageHeading } from "@/components/page-heading/page-heading";

export default function AdminPayoutsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-3 sm:p-6 lg:p-8">
      <PageHeading
        title="Platform payouts"
        description="Consolidated practitioner payables and escrow ledger tracking."
      />
    </div>
  );
}
