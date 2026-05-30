import { HeartPulse, MapPin, Zap } from "lucide-react";

import { ValueCard } from "@/components/ui/value-card";

const VALUE_ITEMS = [
  {
    id: "efficiency",
    icon: Zap,
    iconClassName: "text-accent-primary",
    iconBgClassName: "bg-accent-primary/10",
    title: "EFFICIENCY:",
    description:
      "Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.",
  },
  {
    id: "convenience",
    icon: MapPin,
    iconClassName: "text-[#3b82f6]",
    iconBgClassName: "bg-[#3b82f6]/10",
    title: "CONVENIENCE:",
    description:
      "Access To A Network Of Trusted Healthcare Professionals In Your Area.",
  },
  {
    id: "personalization",
    icon: HeartPulse,
    iconClassName: "text-[#ef4444]",
    iconBgClassName: "bg-[#ef4444]/10",
    title: "PERSONALIZATION:",
    description:
      "Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.",
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-xl tracking-wider text-text-muted uppercase">
        WHY <span className="font-bold text-text-primary">CHOOSE US</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {VALUE_ITEMS.map((item) => (
          <ValueCard
            key={item.id}
            icon={item.icon}
            iconClassName={item.iconClassName}
            iconBgClassName={item.iconBgClassName}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
