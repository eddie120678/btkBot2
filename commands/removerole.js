const Discord = require("discord.js");

module.exports.command = {
  name: "removerole",
  aliases: ["rrole"],
  description: "remove a role from a member",
  category: "Moderation",
  usage: "removerole @<someone> <role>"
}

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry I can't let you do that Dave!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find your target!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role.");
  let gRole = message.guild.roles.find(r => r.name === role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They dont have that role.");
  await(rMember.removeRole(gRole.id));

      // log the role in reports
      let reportChannel = message.guild.channels.find(c => c.name === 'reports');
      if(!reportChannel) message.channel.send("couldn't find reports channel");
      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Removed Role")
      .setColor("#e56b00")
      .addField('The Role', gRole)
      .addField('was taken from:', rMember)
      .addField('demoted by ', `${message.author}`)
      .addField("Time", message.createdAt)
      .setTimestamp();

      //send embed to reports
      message.delete().catch(O_o=>{});
      reportChannel.send(reportEmbed);

  try{
   await rMember.send(`You have lost your role ${gRole.name}`);
 }catch(e){
    message.channel.send(`BAMMM to <@${rMember.id}> have shamed the role ${gRole.name}. It has been removed. We tried to DM them but their DMs are locked.`)
  }
}
