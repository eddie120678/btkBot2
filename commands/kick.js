const Discord = require("discord.js");

module.exports.command = {
  name: "kick",
  aliases: ["k"],
  description: "to kick some mofo out the chat",
  category: "utility",
  usage: "kick @<someone>"
}

module.exports.run = (bot, message, args) => {

if(!message.member.roles.some(r => ["Admin","Officers"].includes(r.name))) return message.reply("You don't have the moderator role!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!member) return message.reply("this is an invalid user!");
    if(!member.kickable) return message.reply("That person has more power than me I can't do it");
    let reason = args.slice(1).join(" ");

    await member.kick().catch(error => {
      return message.reply("there was an error try again!")
    })
    return message.channel.send(`${member.user.tag} was kicked by ${message.author.tag}! Reason: ${reason}`);
}
