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
  }else if(cmd ==="kick"){
    if(!message.member.roles.some(r => ["Admin","Officers"].includes(r.name))) return message.reply("You don't have the moderator role!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!member) return message.reply("this is an invalid user!");
    if(!member.kickable) return message.reply("That person has more power than me I can't do it");
    let reason = args.slice(1).join(" ");

    await member.kick().catch(error => {
      return message.reply("there was an error try again!")
    })
    return message.channel.send(`${member.user.tag} was kicked by ${message.author.tag}! Reason: ${reason}`);
  }else if(cmd ==="ban"){
  if(!message.member.roles.some(r => ["Admin","Officers"].includes(r.name))) return message.reply("You don't have the moderator role!");

  let member = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) return message.reply(`this '${member}' is an invalid user!`);
  if(!member.bannable) return message.reply("That person has more power than me I can't do it");
  let reason = args.slice(1).join(" ");

  await member.ban().catch(error => {
    return message.reply("there was an error try again!")
  })
  return message.channel.send(`${member.user.tag} was banned by ${message.author.tag}! Reason: ${reason}`);
}
});

bot.login(config.token);
