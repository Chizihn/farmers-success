import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";

// Props interface for type safety and clarity
interface PaginatorProps {
  // The full array of products to paginate
  products: Product[];

  // Number of items to display per page (default 12)
  itemsPerPage?: number;

  // Optional callback when page changes
  onPageChange?: (pageProducts: Product[]) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  products,
  itemsPerPage = 12,
  onPageChange,
}) => {
  // State to track current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Memoized function to slice products for current page
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  // Trigger page change callback whenever paginated products change
  useEffect(() => {
    onPageChange?.(paginatedProducts);
  }, [paginatedProducts, onPageChange]);

  // Navigate to next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // Generate page number buttons with intelligent display
  const pageNumbers = useMemo(() => {
    // Helper function to create range of numbers
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    // If total pages are 7 or less, show all page numbers
    if (totalPages <= 7) {
      return range(1, totalPages);
    }

    const pages: (number | string)[] = [];

    // Different pagination strategies based on current page
    if (currentPage <= 4) {
      // Show first 5 pages and last page with ellipsis
      pages.push(...range(1, 5), "...", totalPages);
    } else if (currentPage > totalPages - 4) {
      // Show first page, ellipsis, and last 5 pages
      pages.push(1, "...", ...range(totalPages - 4, totalPages));
    } else {
      // Show first page, ellipsis, surrounding pages, ellipsis, last page
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  }, [currentPage, totalPages]);

  // Don't render pagination if products fit on one page
  if (products.length <= itemsPerPage) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6 mb-4">
      {/* Previous Page Button */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-white border border-gray-300 
        disabled:opacity-50 disabled:cursor-not-allowed 
        hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Number Buttons */}
      <div className="flex space-x-2">
        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            // Ellipsis for skipped pages
            <span key={index} className="px-2 py-1 text-gray-500">
              ...
            </span>
          ) : (
            // Clickable page number buttons
            <button
              key={pageNum}
              onClick={() => setCurrentPage(Number(pageNum))}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentPage === pageNum
                  ? "bg-green-700 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      {/* Next Page Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-white border border-gray-300 
        disabled:opacity-50 disabled:cursor-not-allowed 
        hover:bg-gray-50 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Paginator;
