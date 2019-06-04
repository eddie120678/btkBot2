const Discord = require("discord.js");

module.exports.command = {
  name: "setprefix",
  aliases: ["prefix"],
  description: "set the guilds prefix for commands",
  category: "Bot Owner",
  usage: "setprefix (prefix)"
}

module.exports.run = async (bot, message, args) => {
  if(message.author.id !== 460817804984057871) return message.reply("Only bot owners can perform this command!");

  let prefix = args.join(" ");
  if(!prefix) return message.reply("Please pick a prefix. It could be anything ANYTHING!!")

  bot.guildSettings.set(message.guild.id, prefix, "prefix");

  return message.channel.send(`New prefix is set to ${prefix}`);
}
