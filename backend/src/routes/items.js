const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();
const { invalidateStatsCache } = require("./stats");

const DATA_PATH = path.join(__dirname, "../../../data/items.json");

// Utility to read data asynchronously
async function readData() {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

// Utility to write data asynchronously
async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/items with pagination and search
router.get("/", async (req, res, next) => {
  try {
    const data = await readData();
    const { limit = 20, page = 1, q } = req.query;

    let results = data;

    // Filter by "q" query
    if (q) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    const totalItems = results.length;

    // Convert page and limit to integers and apply pagination
    const pageInt = Math.max(1, parseInt(page));
    const limitInt = Math.max(1, parseInt(limit));
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = startIndex + limitInt;

    const paginatedResults = results.slice(startIndex, endIndex);

    // Return data with pagination metadata
    res.json({
      page: pageInt,
      limit: limitInt,
      totalItems,
      totalPages: Math.ceil(totalItems / limitInt),
      items: paginatedResults,
    });
  } catch (err) {
    if (err instanceof SyntaxError) {
      err.message = "Internal Server Error";
    }
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error("Item not found");
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    // TODO: Validate payload (intentionally omitted)
    const item = req.body;
    const data = await readData();
    item.id = Date.now();
    data.push(item);
    await writeData(data);
    invalidateStatsCache(); // Invalidate stats cache on new item creation
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
