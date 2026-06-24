/* This is the api not a controller */

const express = require("express");
const weatherCity = require("../controller/weather");

const weatherApi = express.Router();

// path to get the new weather application
weatherApi.get("/weather/:city",weatherCity);

module.exports = weatherApi;