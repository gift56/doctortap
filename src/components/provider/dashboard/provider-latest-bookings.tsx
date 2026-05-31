import { CalendarDays } from "lucide-react";

import { QueueRow } from "@/components/provider/dashboard/queue-row";
import { MOCK_PROVIDER_QUEUE_BOOKINGS } from "@/lib/provider/provider-dashboard";

export function ProviderLatestBookings() {
  return (
    <section className="mt-8 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 border-b border-border-default pb-4 text-sm font-bold text-text-primary">
        <CalendarDays className="h-4 w-4" aria-hidden />
        Latest Bookings
      </h2>

      <div className="space-y-4">
        {MOCK_PROVIDER_QUEUE_BOOKINGS.map((booking) => (
          <QueueRow key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
}
