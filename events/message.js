const Discord = require("discord.js");
const bot = require("../index");
const config = require("../config")

bot.on("message", async (message) => {
  if(message.author.bot) return;
  let prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let cmd = args.shift().toLowerCase();

  let command;
  if(bot.commands.has(cmd)){
    command = bot.commands.get(cmd)
  }else if(bot.aliases.has(cmd)){
    command = bot.commands.get(bot.aliases.get(cmd))
  }

  try {
    command.run(bot, message, args);
  } catch (err) {
    console.log(err);
  }

});
