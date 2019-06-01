const Discord = require("discord.js");
const defaultsettings = require("../util/defaultsettings")

module.exports.command = {
  name: "changedb",
  aliases: ["cdb"],
  description: "Update and change the database",
  category: "Developer",
  usage: "changedb"
}

module.exports.run = async (bot, message, args) => {

  function createserver(guildid, object) {
    bot.guildSettings.ensure(guildid, object)
  }

  if(message.author.id !== message.guild.ownerID) return message.channel.send("Your not the boss of me!");

  bot.guildSettings.deleteAll(false)
  botguilds.forEach(guild => {
    createserver(guild.id, defaultsettings)
  })
  return message.reply("It is done.")
}
