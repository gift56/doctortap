"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface DoctorsPaginationToolbarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const pageButtonClass =
  "inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border-default bg-bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent-primary disabled:pointer-events-none disabled:opacity-40";
const activePageButtonClass =
  "border-accent-primary bg-accent-primary font-semibold text-white hover:border-accent-primary hover:bg-accent-primary";

export function DoctorsPaginationToolbar({
  currentPage,
  totalPages,
  onPageChange,
}: DoctorsPaginationToolbarProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="mt-12 py-4">
      <PaginationContent className="flex items-center justify-center gap-2">
        <PaginationItem>
          <button
            type="button"
            aria-label="Go to previous page"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(pageButtonClass, "gap-1 px-3")}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span>Prev</span>
          </button>
        </PaginationItem>

        {pages.map((pageNumber) => {
          const isActive = pageNumber === currentPage;

          return (
            <PaginationItem key={pageNumber}>
              <button
                type="button"
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  pageButtonClass,
                  isActive && activePageButtonClass,
                )}
              >
                {pageNumber}
              </button>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <button
            type="button"
            aria-label="Go to next page"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(pageButtonClass, "gap-1 px-3")}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
