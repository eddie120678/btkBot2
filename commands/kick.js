const Discord = require("discord.js");

module.exports.command = {
  name: "kick",
  aliases: ["k"],
  description: "to kick some mofo out the chat",
  category: "utility",
  usage: "kick @<someone>"
}

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("You don't have the Authority!");

    let member = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!member) return message.reply("this is an invalid user!");
    let kReason = args.join(" ").slice(22);
    if(!member.kickable) return message.reply("That person has more power than me I can't do it");
    let reason = args.slice(1).join(" ");
    if (!kReason) return message.channel.send('you forgot to tell me why you are doing this.')

    await member.kick().catch(error => {
      return message.reply("there was an error try again!")
    })
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Banned~")
    .setColor("#bc0000")
    .addField("Kicked User ", `${bUser} with ID ${bUser.id}`)
    .addField("Kicked by ", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked from ", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    return message.channel.send(`${member.user.tag} was kicked by ${message.author.tag}! Reason: ${reason}`);

}
