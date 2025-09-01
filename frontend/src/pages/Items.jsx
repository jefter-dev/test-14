import React, { useEffect, useState, useCallback } from "react";
import { useData } from "../state/data-context";
import "./items-page.css";
import Loader from "../components/loader";
import ProductGrid from "../components/product-grid";
import Pagination from "../components/pagination";
import SearchInput from "../components/search-input";
import NoItemsFound from "../components/no-items-found";

function Items() {
  const { items, meta, fetchItems, loading } = useData();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(() => {
      fetchItems({ q: search, page, limit: 3 }, controller.signal).catch(
        console.error
      );
    }, 300);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [fetchItems, search, page]);

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title" data-text="PRODUCTS">
          PRODUCTS
        </h2>
        <p className="section-subtitle">
          Which type of gear are you looking for?
        </p>
        <SearchInput value={search} onChange={handleSearchChange} />
      </div>

      {loading ? (
        <Loader />
      ) : items.length > 0 ? (
        <>
          <ProductGrid items={items} />
          <Pagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      ) : (
        <NoItemsFound />
      )}
    </section>
  );
}

export default Items;
