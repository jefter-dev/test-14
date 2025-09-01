const express = require("express");
const path = require("path");
const morgan = require("morgan");
const itemsRouter = require("./routes/items");
const { statsRouter } = require("./routes/stats");
const cors = require("cors");
const {
  fetchCookieData,
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/items", itemsRouter);
app.use("/api/stats", statsRouter);

// Route that uses the getCookie middleware
app.get("/api/cookie", fetchCookieData);

// Not Found
app.use(notFound);

// Error Handler
app.use(errorHandler);

app.listen(port, () =>
  console.log("Backend running on http://localhost:" + port)
);
