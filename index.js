//ModuleImports
const express = require("express");

//File imports
const { dbConnection } = require("./config/mongo.config");
const Route = require("./routes/routes");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use("/", Route);

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`The server is working on PORT ${PORT}`);
});
