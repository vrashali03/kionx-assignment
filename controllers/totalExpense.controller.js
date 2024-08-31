const axios = require("axios");
const Transaction = require("../models/transactions.model");
const EthereumPrice = require("../models/ethereumPrice.model");

async function getTotalExpense(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).send({
      Message: "Please enter user address!",
    });
  }
  try {
    const transactions = await Transaction.find({ address });

    if (!transactions.length) {
      return res.status(404).send({
        Message: "No transactions found for this address",
      });
    }

    //Calculate total Expense
    let totalExpenses = 0;
    transactions.forEach((tnx) => {
      const gasUsed = tnx.gasUsed;
      const gasPrice = tnx.gasPrice;
      const expense = (gasUsed * gasPrice) / 1e18;
      totalExpenses += expense;
    });

    const ethereumPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });
    const price = ethereumPrice ? ethereumPrice.price : null;

    if (!price) {
      return res.status(500).send({
        Message: "Failed to retrieve the current Ether price",
      });
    }

    return res.status(200).send({
      address: address,
      totalExpenses: totalExpenses,
      EthereumPrice: price,
    });
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    return res.status(500).send({
      message: "An error occurred while calculating expenses.",
    });
  }
}

module.exports = { getTotalExpense };
