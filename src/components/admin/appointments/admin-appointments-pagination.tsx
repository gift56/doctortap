"use client";

import type { MouseEvent } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import type { AdminAppointmentFilterState } from "@/hooks/use-admin-appointment-filters";
import { buildAdminAppointmentFiltersQuery } from "@/lib/admin/parse-appointment-filters";
import { cn } from "@/lib/utils";

interface AdminAppointmentsPaginationProps {
  currentPage: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  total: number;
  filters: Pick<AdminAppointmentFilterState, "status" | "tier">;
  onPageNavigate?: () => void;
}

type PaginationPageItem = number | "ellipsis";

function buildPageHref(
  page: number,
  filters: AdminAppointmentsPaginationProps["filters"],
) {
  const query = buildAdminAppointmentFiltersQuery({ ...filters, page });
  return query
    ? `${ADMIN_ROUTES.appointments}?${query}`
    : ADMIN_ROUTES.appointments;
}

function getPaginationPageItems(
  currentPage: number,
  totalPages: number,
): PaginationPageItem[] {
  const items: PaginationPageItem[] = [];

  for (let page = 1; page <= totalPages; page += 1) {
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    ) {
      items.push(page);
      continue;
    }

    if (items[items.length - 1] !== "ellipsis") {
      items.push("ellipsis");
    }
  }

  return items;
}

export function AdminAppointmentsPagination({
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  total,
  filters,
  onPageNavigate,
}: AdminAppointmentsPaginationProps) {
  const pageItems = getPaginationPageItems(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    onPageNavigate?.();
    event.currentTarget.blur();
  };

  return (
    <div className="flex flex-col gap-4 border-t border-border-default bg-bg-base/30 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-text-secondary">
        {total === 0
          ? "Showing 0 of 0 appointments"
          : `Showing ${rangeStart}-${rangeEnd} of ${total} appointments`}
      </p>

      {totalPages > 1 ? (
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={isFirstPage ? undefined : buildPageHref(currentPage - 1, filters)}
                text="Prev"
                aria-disabled={isFirstPage}
                tabIndex={isFirstPage ? -1 : undefined}
                onClick={(event) => {
                  if (isFirstPage) {
                    event.preventDefault();
                    return;
                  }
                  handleNavigate(event);
                }}
                className={cn(isFirstPage && "pointer-events-none opacity-50")}
              />
            </PaginationItem>

            {pageItems.map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={buildPageHref(item, filters)}
                    isActive={item === currentPage}
                    onClick={handleNavigate}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                href={isLastPage ? undefined : buildPageHref(currentPage + 1, filters)}
                aria-disabled={isLastPage}
                tabIndex={isLastPage ? -1 : undefined}
                onClick={(event) => {
                  if (isLastPage) {
                    event.preventDefault();
                    return;
                  }
                  handleNavigate(event);
                }}
                className={cn(isLastPage && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
