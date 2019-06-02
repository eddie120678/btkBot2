const Discord = require("discord.js");

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
  .setDescription("Server Information")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Created on", message.guild.createdAt)
  .addField("You Joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverembed);

}
