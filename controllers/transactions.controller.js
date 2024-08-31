const axios = require("axios");
require("dotenv").config();

const APIKEY = process.env.API_KEY;

async function getTransactions(req, res) {
  const response = await axios.get(
    `https://api.etherscan.io/api?module=account&action=txlist&address=0xce94e5621a5f7068253c42558c147480f38b5e0d&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${APIKEY}`
  );
  const data = response.data;
  res.status(200).send(data);
}

module.exports = {
  getTransactions,
};
