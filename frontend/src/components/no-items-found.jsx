import React from "react";
import "./no-items-found.css";

const NoResultsIcon = () => (
  <svg
    className="no-items-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

function NoItemsFound() {
  return (
    <div className="no-items-container">
      <NoResultsIcon />
      <h3 className="no-items-title" data-text="NO RESULTS">
        NO RESULTS
      </h3>
      <p className="no-items-message">
        Our scanners found no matching gear. Try adjusting your search query.
      </p>
    </div>
  );
}

export default NoItemsFound;
