import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { cn } from "@/lib/utils";

interface ProviderPayoutsPaginationProps {
  currentPage: number;
  totalPages: number;
}

const pageButtonClass =
  "inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border-default bg-bg-surface px-3 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent-primary disabled:pointer-events-none disabled:opacity-40";
const activePageButtonClass =
  "border-accent-primary bg-accent-primary font-semibold text-white hover:border-accent-primary hover:bg-accent-primary";

function buildPageHref(page: number) {
  return page <= 1
    ? PROVIDER_ROUTES.payouts
    : `${PROVIDER_ROUTES.payouts}?page=${page}`;
}

export function ProviderPayoutsPagination({
  currentPage,
  totalPages,
}: ProviderPayoutsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="border-t border-border-default px-6 py-4">
      <PaginationContent className="flex items-center justify-center gap-2">
        <PaginationItem>
          {currentPage <= 1 ? (
            <span
              aria-disabled
              className={cn(pageButtonClass, "gap-1 px-3 opacity-40")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span>Prev</span>
            </span>
          ) : (
            <Link
              href={buildPageHref(currentPage - 1)}
              aria-label="Go to previous page"
              className={cn(pageButtonClass, "gap-1 px-3")}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              <span>Prev</span>
            </Link>
          )}
        </PaginationItem>

        {pages.map((pageNumber) => {
          const isActive = pageNumber === currentPage;

          return (
            <PaginationItem key={pageNumber}>
              {isActive ? (
                <span
                  aria-current="page"
                  aria-label={`Page ${pageNumber}`}
                  className={cn(pageButtonClass, activePageButtonClass)}
                >
                  {pageNumber}
                </span>
              ) : (
                <Link
                  href={buildPageHref(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  className={pageButtonClass}
                >
                  {pageNumber}
                </Link>
              )}
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {currentPage >= totalPages ? (
            <span
              aria-disabled
              className={cn(pageButtonClass, "gap-1 px-3 opacity-40")}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </span>
          ) : (
            <Link
              href={buildPageHref(currentPage + 1)}
              aria-label="Go to next page"
              className={cn(pageButtonClass, "gap-1 px-3")}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
