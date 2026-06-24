const express = require('express');
const path = require('path');

const routerPublic = express.Router();

routerPublic.use(express.static(path.join(__dirname, '../public')));

module.exports = routerPublic;