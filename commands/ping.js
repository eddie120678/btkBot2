const Discord = require("discord.js");

module.exports.command = {
  name: "ping",
  aliases: ["p"],
  description: "shows the current bot's ping",
  category: "utility",
  usage: "ping"
}

module.exports.run = (bot, message, args) => {
      let botping =  message.createdAt - new Date()
      let apiping = bot.ping

      return message.channel.send(`bot ping: ${botping}ms\nApi ping: ${apiping}ms`)
}
