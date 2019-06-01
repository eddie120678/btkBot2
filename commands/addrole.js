const Discord = require("discord.js");

module.exports.command = {
  name: "addrole",
  aliases: ["arole"],
  description: "add a single role to a member",
  category: "Moderation",
  usage: "addrole @<someone> <role>"
}

module.exports.run = async (bot, message, args) => {

      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry I can't let you do that Dave!");
      let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!rMember) return message.reply("Couldn't find your target!");
      let role = args.join(" ").slice(22);
      if(!role) return message.reply("Specify a role.");
      let gRole = message.guild.roles.find(r => r.name === role);
      if(!gRole) return message.reply("Couldn't find that role.");

      if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
      await(rMember.addRole(gRole.id));

      // log the role in reports
      let reportChannel = message.guild.channels.find(c => c.name === 'reports');
      if(!reportChannel) message.channel.send("couldn't find reports channel");
      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Add Role")
      .setColor("#e56b00")
      .addField("Role given to ", rMember)
      .addField("The role of ", gRole)
      .addField("Was granted by ", `${message.author}`)
      .addField("Time ", message.createdAt);

      //send embed to reports
      message.delete().catch(O_o=>{});
      reportChannel.send(reportEmbed);

      try{
       await rMember.send(`With great power comes the role ${gRole.name}`);

     }catch(e){
        message.channel.send(`Congrats, to <@${rMember.id}> have been given the role ${gRole.name}. Use it wisely. We tried to DM them but their DMs are locked.`)
      }
    }
  
