const mongoose = require("mongoose");

const btkInfoSchema = mongoose.Schema({

  btkServer: String,
  btkName: String,
  btkID: String,
  btkRank: String,
  btkPower: String,
  btkAlliance: String

})

module.exports = mongoose.model("btkinfo", btkInfoSchema);
