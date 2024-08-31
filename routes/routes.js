const express = require("express");
const Route = express.Router();

//controllers imports
const { getTransactions } = require("../controllers/transactions.controller");

Route.get("/getTransactions", getTransactions);

module.exports = Route;
