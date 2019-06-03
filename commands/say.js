const Discord = require("discord.js");

module.exports.command = {
  name: "say",
  aliases: [],
  description: "get bender to say something for you",
  category: "fun",
  usage: "say <message>"
}

module.exports.run = async (bot, message, args) => {
//!say Hi!
//Hi
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel("You can't tell me what to do!");
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
}
