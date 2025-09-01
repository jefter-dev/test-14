import React from "react";
import SearchInput from "./search-input";

function SearchSection({ value, onChange }) {
  return (
    <div className="section-header">
      <h2 className="section-title" data-text="PRODUCTS">
        PRODUCTS
      </h2>
      <p className="section-subtitle">
        Which type of gear are you looking for?
      </p>
      <SearchInput value={value} onChange={onChange} />
    </div>
  );
}

export default React.memo(SearchSection);
