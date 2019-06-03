const Discord = require("discord.js");
const moment = require("moment")

module.exports.command = {
  name: "serverinfo",
  aliases: ["sinfo"],
  description: "A brief description of the server",
  category: "utility",
  usage: "serverinfo"
}

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setTitle("Server Information")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Created on", moment(message.guild.createdAt).format())
  .addField("You Joined", moment(message.member.joinedAt).format())
  .addField("Server region", message.guild.regioin)
  .addField("Guild Owner", message.guild.owner)
  .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverembed);

}
