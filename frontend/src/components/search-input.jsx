import React from "react";
import "./search-input.css";

function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="search-input"
    />
  );
}

export default React.memo(SearchInput);
