"use client";

import { Search } from "lucide-react";

import { useDoctorFilters } from "@/components/public/doctors/doctor-filters-provider";

export function DoctorSearchInput() {
  const { search, setSearch } = useDoctorFilters();

  return (
    <label className="flex w-full max-w-md items-center gap-2 rounded-md border border-border-default bg-bg-surface px-3 py-2 transition-all focus-within:border-accent-primary">
      <Search className="h-4 w-4 shrink-0 text-text-muted" aria-hidden />
      <span className="sr-only">Search doctors</span>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name or specialty..."
        className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
