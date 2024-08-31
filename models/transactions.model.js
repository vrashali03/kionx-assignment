const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    blockNumber: Number,
    blockHash: String,
    timeStamp: Number,
    hash: String,
    nonce: Number,
    transactionIndex: Number,
    from: String,
    to: String,
    value: Number,
    gas: Number,
    gasPrice: Number,
    input: String,
    methodId: String,
    functionName: String,
    contractAddress: String,
    cumulativeGasUsed: Number,
    txreceipt_status: Number,
    gasUsed: Number,
    confirmations: Number,
    isError: Number,
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Tracsaction", transactionSchema);

module.exports = Transaction;
