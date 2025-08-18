// Pagination.jsx
"use client";
import colors from "@/theme/colors";

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = [];

  let start = Math.max(2, page - 2);
  let end = Math.min(totalPages - 1, page + 2);

  if (page <= 3) {
    start = 2;
    end = Math.min(5, totalPages - 1);
  }
  if (page >= totalPages - 2) {
    start = Math.max(totalPages - 4, 2);
    end = totalPages - 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mt-4 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md disabled:opacity-50"
        style={{
          backgroundColor: "#E5E7EB",
          color: "#374151",
        }}
      >
        Prev
      </button>

      {/* First Page (1) */}
      <button
        onClick={() => onPageChange(1)}
        className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-md"
        style={{
          backgroundColor: page === 1 ? colors.primary : "#E5E7EB",
          color: page === 1 ? colors.white : "#374151",
        }}
      >
        1
      </button>

      {/* Left Ellipsis */}
      {start > 2 && <span className="px-1 sm:px-2">...</span>}

      {/* Middle Pages */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-md"
          style={{
            backgroundColor: p === page ? colors.primary : "#E5E7EB",
            color: p === page ? colors.white : "#374151",
          }}
        >
          {p}
        </button>
      ))}

      {/* Right Ellipsis */}
      {end < totalPages - 1 && <span className="px-1 sm:px-2">...</span>}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-md"
          style={{
            backgroundColor: page === totalPages ? colors.primary : "#E5E7EB",
            color: page === totalPages ? colors.white : "#374151",
          }}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md disabled:opacity-50"
        style={{
          backgroundColor: "#E5E7EB",
          color: "#374151",
        }}
      >
        Next
      </button>
    </div>
  );
}
