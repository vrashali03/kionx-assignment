//ModuleImports
const express = require("express");

//File imports
const { dbConnection } = require("./config/mongo.config");
const Route = require("./routes/routes");
const { getEthereumPrice } = require("./controllers/ethereumPrice.controller");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use("/", Route);

//Get Ethereum Price after everry 10 min
setInterval(getEthereumPrice, 10 * 60 * 1000);

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`The server is working on PORT ${PORT}`);
});
