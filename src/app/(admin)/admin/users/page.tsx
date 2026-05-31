import { PageHeading } from "@/components/page-heading/page-heading";

export default function AdminUsersPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-3 sm:p-6 lg:p-8">
      <PageHeading
        title="User directory"
        description="Manage patients, doctors, and system accounts."
      />
    </div>
  );
}
