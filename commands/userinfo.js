const Discord = require("discord.js");

module.exports.command = {
  name: "userinfo",
  aliases: ["user","who"],
  description: "information of tagged user or you",
  category: "utility",
  usage: "userinfo @<someone>"
}

module.exports.run = async (bot, message, args) => {

  let user = message.mentions.users.first()
  if(!user) return message.channel.send("I think you got dropped one too many times as a child. try @someone")
  let embed = new Discord.RichEmbed()
    .setTitle(`Info about ${user.tag}`)
    .setColor("RANDOM")
    .setThumbnail(user.avatarURL)
    .addField("Nickname",message.guild.member(user).displayName)
    .addField("User's ID", user.id)
    .addField("Current status", user.presence.status)
    .addField("Created on", user.createdAt)
    .addField("Roles", message.guild.member(user).roles.map(r => r).join(" , "))

  return message.channel.send(embed)
}
