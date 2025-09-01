import React, { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(
    async ({ q = "", page = 1, limit = 20 } = {}, signal) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ q, page, limit });
        const res = await fetch(
          `http://localhost:3001/api/items?${params.toString()}`,
          { signal }
        );
        const json = await res.json();

        console.log("DATA: ", json);

        setItems(json.items || []);
        setMeta({
          total: json.totalItems || 0,
          page: json.page || 1,
          limit: json.limit || 20,
          totalPages: json.totalPages || 1,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchItemById = useCallback(async (id, signal) => {
    try {
      setLoading(true);
      setCurrentItem(null);
      const res = await fetch(`http://localhost:3001/api/items/${id}`, {
        signal,
      });

      if (!res.ok) {
        throw new Error("Item not found");
      }
      const json = await res.json();
      setCurrentItem(json);
    } catch (error) {
      setCurrentItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    items,
    meta,
    currentItem,
    loading,
    fetchItems,
    fetchItemById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
