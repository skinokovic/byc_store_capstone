import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="d-flex justify-content-center align-items-center gap-2 py-4">
      <button
        type="button"
        className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: 32, height: 32 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`btn btn-sm rounded-circle d-flex align-items-center justify-content-center ${
            page === currentPage
              ? "border border-danger text-danger"
              : "btn-light"
          }`}
          style={{ width: 32, height: 32 }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: 32, height: 32 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;
