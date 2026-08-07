import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

// Builds page numbers with ellipses for large counts:
// 1 ... 4 5 [6] 7 8 ... 20 — instead of rendering every page.
function getPageNumbers(currentPage, totalPages) {
  const delta = 1;
  const range = [];
  const withDots = [];
  let last;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((page) => {
    if (last) {
      if (page - last === 2) withDots.push(last + 1);
      else if (page - last > 2) withDots.push("...");
    }
    withDots.push(page);
    last = page;
  });

  return withDots;
}

/**
 * Shared pagination control — used across shop, admin, and user tables.
 *
 * Required: currentPage, totalPages, onPageChange
 * Optional: totalItems + pageSize → shows "Showing X–Y of Z" above the nav
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const showSummary = totalItems !== undefined && pageSize !== undefined;
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  function goTo(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  }

  return (
    <div className="pagination-bar">
      {showSummary && (
        <p className="pagination-bar__summary">
          Showing {rangeStart}–{rangeEnd} of {totalItems}
        </p>
      )}

      <nav
        className="d-flex justify-content-center align-items-center gap-2 flex-wrap"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="pagination-bar__circle pagination-bar__circle--nav"
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className="pagination-bar__dots">
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`pagination-bar__circle ${
                page === currentPage ? "pagination-bar__circle--active" : ""
              }`}
              onClick={() => goTo(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          className="pagination-bar__circle pagination-bar__circle--nav"
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
