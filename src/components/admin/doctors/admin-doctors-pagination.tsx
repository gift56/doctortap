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
import type { AdminDoctorFilterState } from "@/hooks/use-admin-doctor-filters";
import { buildAdminDoctorFiltersQuery } from "@/lib/admin/parse-doctor-filters";
import { cn } from "@/lib/utils";

interface AdminDoctorsPaginationProps {
  currentPage: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  total: number;
  filters: Pick<AdminDoctorFilterState, "search" | "specialty" | "status">;
}

type PaginationPageItem = number | "ellipsis";

function buildPageHref(
  page: number,
  filters: AdminDoctorsPaginationProps["filters"],
) {
  const query = buildAdminDoctorFiltersQuery({ ...filters, page });
  return query ? `${ADMIN_ROUTES.doctors}?${query}` : ADMIN_ROUTES.doctors;
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

export function AdminDoctorsPagination({
  currentPage,
  totalPages,
  rangeStart,
  rangeEnd,
  total,
  filters,
}: AdminDoctorsPaginationProps) {
  const pageItems = getPaginationPageItems(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
  };

  return (
    <div className="flex flex-col gap-3 border-t border-border-default bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
      <p className="text-xs font-medium text-text-secondary">
        {total === 0
          ? "Showing 0 of 0 doctors"
          : `Showing ${rangeStart}-${rangeEnd} of ${total} doctors`}
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
