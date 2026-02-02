'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Number of page buttons to show
    
    if (totalPages <= showPages) {
      // Show all pages if total is less than or equal to showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {hasPrevPage ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-black border border-[#EDEDED] hover:bg-[#FFFBF0] transition-colors"
          aria-label="Previous page"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 border border-[#EDEDED] cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="hidden md:flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={`${basePath}?page=${pageNum}`}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${
                isCurrentPage
                  ? 'bg-black text-white border-black'
                  : 'text-black border-[#EDEDED] hover:bg-[#FFFBF0]'
              }`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Mobile: Current page indicator */}
      <span className="md:hidden px-4 py-2 text-sm font-medium text-black">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      {hasNextPage ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-black border border-[#EDEDED] hover:bg-[#FFFBF0] transition-colors"
          aria-label="Next page"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-gray-400 border border-[#EDEDED] cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  );
}
