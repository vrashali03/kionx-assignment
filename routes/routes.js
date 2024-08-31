const express = require("express");
const Route = express.Router();

//controllers imports
const { getTransactions } = require("../controllers/transactions.controller");
const { getTotalExpense } = require("../controllers/totalExpense.controller");

//Routes
Route.post("/getTransactions", getTransactions);
Route.get("/transactions/expense", getTotalExpense);

module.exports = Route;
