import "./pagination.css";

export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;

  const { page, totalPages } = meta;

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="pagination-btn"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
}
