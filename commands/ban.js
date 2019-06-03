const Discord = require("discord.js");

module.exports.command = {
  name: "ban",
  aliases: ["banned"],
  description: "ban someone or some bot",
  category: "Moderation",
  usage: "ban @<someone> <for some reason>"
}

module.exports.run = async (bot, message, args) => {

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) );
  if(!bUser) return message.channel.send("Can't find user!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");
  if(!bReason) return message.channel.send("You forgot to enter a reason for the ban.")

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Banned~")
  .setColor("#bc0000")
  .addField("Ban User", `${bUser} with ID ${bUser.id}`)
  .addField("Banned by", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let banChannel = message.guild.channels.find(c => c.name === 'reports');
  if(!banChannel) return message.channel.send("Can't find reports channel.");

  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);

  return;

}
