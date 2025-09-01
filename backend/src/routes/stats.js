const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// --- Caching Strategy ---
let cache = {
  stats: null,
  lastFetched: 0,
};
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Invalidates the statistics cache.
 * This should be called whenever the underlying data changes (e.g., a new item is added).
 */
function invalidateStatsCache() {
  cache.stats = null;
  cache.lastFetched = 0;
}

async function readData() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

async function calculateStats() {
  console.log("Recalculating statistics...");
  const items = await readData();

  const totalItems = items.length;
  const categories = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const priceStats = items.reduce(
    (acc, item) => {
      acc.totalValue += item.price;
      if (item.price < acc.minPrice) acc.minPrice = item.price;
      if (item.price > acc.maxPrice) acc.maxPrice = item.price;
      return acc;
    },
    {
      totalValue: 0,
      minPrice: totalItems > 0 ? items[0].price : Infinity,
      maxPrice: totalItems > 0 ? items[0].price : -Infinity,
    }
  );

  const stats = {
    totalItems,
    categoryCounts: categories,
    price: {
      average: totalItems > 0 ? priceStats.totalValue / totalItems : 0,
      min: priceStats.minPrice === Infinity ? 0 : priceStats.minPrice,
      max: priceStats.maxPrice === -Infinity ? 0 : priceStats.maxPrice,
      totalValue: priceStats.totalValue,
    },
    lastCalculated: new Date().toISOString(),
  };

  // Update cache
  cache.stats = stats;
  cache.lastFetched = Date.now();

  return stats;
}

router.get("/", async (req, res, next) => {
  try {
    const now = Date.now();
    if (cache.stats && now - cache.lastFetched < CACHE_TTL_MS) {
      console.log("Serving stats from cache.");
      return res.json(cache.stats);
    }
    const stats = await calculateStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = { statsRouter: router, invalidateStatsCache };
