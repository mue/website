'use client';

import { Button } from '@/components/ui/button';

type ExplorerPaginationProps = {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  isSearching: boolean;
  filteredCount: number;
};

export function ExplorerPagination({
  totalPages,
  currentPage,
  onChangePage,
  isSearching,
  filteredCount,
}: ExplorerPaginationProps) {
  if (filteredCount === 0 || totalPages <= 1 || isSearching) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChangePage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const showPage =
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1);

          const showEllipsis =
            (page === 2 && currentPage > 3) ||
            (page === totalPages - 1 && currentPage < totalPages - 2);

          if (showEllipsis) {
            return (
              <span key={page} className="px-2 text-muted-foreground">
                ...
              </span>
            );
          }

          if (!showPage) return null;

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => onChangePage(page)}
              className="min-w-[2.5rem]"
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChangePage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
