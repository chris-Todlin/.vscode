const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const app = express();
const PORT = 5000;

app.use(morgan('dev'));

/* =========================
   🔒 CORS CONFIGURATION
========================= */

const allowedOrigins = ["http://localhost:5500"];

app.use(cors());

app.use(express.json());

/* =========================
   💱 STATIC EXCHANGE RATES
   Base currency: USD
========================= */

const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1500,
  CAD: 1.35,
  JPY: 148
};

/* =========================
   📌 ROUTE SELECTION METHOD
   Example:
   /convert/USD/EUR/100
========================= */

app.get("/convert/:from/:to/:amount", (req, res) => {
  const { from, to, amount } = req.params;

  // Validate currencies
  if (!rates[from] || !rates[to]) {
    return res.status(400).json({
      error: "Invalid currency code"
    });
  }

  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    return res.status(400).json({
      error: "Amount must be a number"
    });
  }

  // Convert to USD first (base), then to target
  const amountInUSD = numericAmount / rates[from];
  const converted = amountInUSD * rates[to];

  res.json({
    from,
    to,
    originalAmount: numericAmount,
    convertedAmount: converted.toFixed(2)
  });
});

/* =========================
   ❌ CORS ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS policy blocked this request"
    });
  }
  next();
});

/* =========================
   🚀 START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});