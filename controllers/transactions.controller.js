//Module Imports
const axios = require("axios");
require("dotenv").config();

const Transaction = require("../models/transactions.model"); //Model Import

//Function to get Transactions of the input user address
async function getTransactions(req, res) {
  const { address } = req.body;

  //validation for address
  if (!address) {
    return res.status(400).send({
      Message: "Please enter user address!!",
    });
  }

  //fetaching data from the API
  try {
    const APIKEY = process.env.API_KEY;
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${APIKEY}`
    );

    const data = response.data;

    //Check if there are any transactions
    if (data.status !== "1" || !data.result.length) {
      return res.status(404).send({
        Message: "No transaction found for this address",
      });
    }

    const transactions = data.result;

    //Unique transactions create a temp array
    const uniqueTransactions = [];

    //Storing transactions in mongoDB
    for (const tnx of transactions) {
      const existingTransaction = await Transaction.findOne({ hash: tnx.hash });
      if (!existingTransaction) {
        uniqueTransactions.push({ ...tnx, address });
      }
    }

    if (uniqueTransactions.length > 0) {
      await Transaction.insertMany(uniqueTransactions);
    }

    return res.status(200).send({
      message: `${uniqueTransactions.length} new transactions were added.`,
      allTransactions: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(500)
      .send({ message: "Error occurred while fetching transactions." });
  }
}

module.exports = {
  getTransactions,
};
