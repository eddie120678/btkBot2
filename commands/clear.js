const Discord = require("discord.js");

module.exports.command = {
  name: "clear",
  aliases: ["clr"],
  description: "remove messages from chat",
  category: "Moderation",
  usage: "clear <number of messages"
}

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("oof");
  if(!args[0]) return message.channel.send("oof");
  message.channel.bulkDelete(args[0] + 1).then(() => {
    message.channel.send(`Cleard ${args[0]} messages.`).then(msg => msg.delete(5000));
  });

}
