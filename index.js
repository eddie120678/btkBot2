const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone:true});
const config = require("./config.json");

bot.on("ready", () => {
  console.log("Bot is online!");
  bot.user.setActivity("Developing")
});

bot.on("message", async (message) => {
  if(message.author.bot) return;
  let prefix = config.prefix;

  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let cmd = args.shift().tolowerCase();

  if(cmd ==="ping") {
    let botping = new Date() - message.createdAt
    let apiping = bot.ping

    return message.channel.send(`bot ping: ${botping}ms\nApi ping: ${apiping}ms`)
  }
});

bot.login(config.token);
