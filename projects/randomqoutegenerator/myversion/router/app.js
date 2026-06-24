const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());

const PORT = 3000;

// Your own quotes
const quotes = require("./qoutes");

// Get random quote
app.get("/api/qoute", (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
});

// Optional: Get all quotes
app.get("/api/quotes", (req, res) => {
    res.json(quotes);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/qoute`);
});