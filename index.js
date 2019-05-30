const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone:true});
const config = require("./config.json");
module.exports = bot;

const {loadCommands} = require("./util/handler");
loadCommands()

bot.on("ready", () => {
  console.log("Bot is online!");
  bot.user.setActivity("Developing")
});

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
//   if(cmd ==="ping") {

//   }else if(cmd ==="kick"){
//     
//   }else if(cmd ==="ban"){
//   if(!message.member.roles.some(r => ["Admin","Officers"].includes(r.name))) return message.reply("You don't have the moderator role!");
//
//   let member = message.mentions.members.first() || message.guild.members.get(args[0])
//   if (!member) return message.reply(`this '${member}' is an invalid user!`);
//   if(!member.bannable) return message.reply("That person has more power than me I can't do it");
//   let reason = args.slice(1).join(" ");
//
//   await member.ban().catch(error => {
//     return message.reply("there was an error try again!")
//   })
//   return message.channel.send(`${member.user.tag} was banned by ${message.author.tag}! Reason: ${reason}`);
// }
});

bot.login(config.token);
