import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0,
}) => {
  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show truncated pagination
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page or less
  }

  return (
    <div className="px-6 pt-7 mb-6 border-t border-t-[#E9EAEB] bg-white">
      <div className="flex flex-col-reverse w-full items-center justify-between">
        {/* Items info */}
        <div className="text-sm font-medium text-[#535862] mt-4 place-self-end">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>

        {/* Pagination controls */}
        <div className="w-full">
          <div className="flex justify-between items-center gap-2">
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-150 ${
                currentPage === 1
                  ? "border-[#E9EAEB] text-[#535862] cursor-not-allowed opacity-50"
                  : "border-[#E9EAEB] text-[#535862] hover:bg-gray-50 hover:border-primary hover:text-primary"
              }`}
            >
              <IoChevronBack size={16} />
              <span>Previous</span>
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-4">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-[#535862]">
                      ...
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePageClick(page)}
                      className={`min-w-[40px] h-[40px] flex items-center justify-center text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
                        currentPage === page
                          ? "bg-[#EDF7FC] text-primary border border-primary"
                          : "text-[#535862] hover:bg-gray-200 hover:border-gray-400 border border-transparent"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-150 ${
                currentPage === totalPages
                  ? "border-[#E9EAEB] text-[#535862] cursor-not-allowed opacity-50"
                  : "border-[#E9EAEB] text-[#535862] hover:bg-gray-50 hover:border-primary hover:text-primary"
              }`}
            >
              <span>Next</span>
              <IoChevronForward size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
