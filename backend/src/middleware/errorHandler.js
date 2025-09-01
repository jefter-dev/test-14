const notFound = (req, res, next) => {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

const fetchCookieData = (req, res, next) => {
  try {
    const fakeCookie = "simulated-cookie-value";
    res.json({ cookie: fakeCookie });
  } catch (err) {
    next(err);
  }
};

module.exports = { fetchCookieData, errorHandler, notFound };
