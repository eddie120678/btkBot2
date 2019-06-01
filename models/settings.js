const mongoose = require("mongoose");

const guildSetSchema = mongoose.Schema({
  guildId: String,
  guildPrifix: String,
  guildOwnerId: String,
})
module.exports = mongoose.model("gSetting", guildSetSchema);
