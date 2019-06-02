const Discord = require("discord.js");

module.exports.command = {
  name: "speak",
  aliases: ["tell"],
  description: "tell a roll (like notify) that something is going down",
  category: "Moderatioin",
  usage: "speak @<role> message you want to say"
}

module.exports.run = async (bot, message, args) => {

  let role = message.guild.roles.find (r => r.name === args[0]);
  if(!role) return message.channel.send('sorry did not find the role you speak of!')
  let reasonSpeak =  args.slice(1).join(' ');


  role.members.forEach(m => {

    m.send(reasonSpeak)
    })


}
