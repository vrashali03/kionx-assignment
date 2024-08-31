const axios = require("axios");

//Model import
const EthereumPrice = require("../models/ethereumPrice.model");

//function to add Ethereum Price
async function getEthereumPrice() {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`
    );
    const price = response.data.ethereum.inr;

    //Add the price in Database
    const ethereumPrice = new EthereumPrice({
      price: price,
      currency: "INR",
    });

    await ethereumPrice.save();
  } catch (error) {
    console.log("Error fetching Ethereum price:", error);
    return res.status(500).send({ message: "Error retrieving latest price" });
  }
}

module.exports = { getEthereumPrice };
