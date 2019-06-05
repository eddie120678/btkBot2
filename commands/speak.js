const Discord = require("discord.js");

module.exports.command = {
  name: "speak",
  aliases: ["tell"],
  description: "tell a roll (like notify) that something is going down",
  category: "Moderation",
  usage: "speak @<role> message you want to say"
}

module.exports.run = async (bot, message, args) => {

  await message.delete()

  let role = message.mentions.roles.first() || message.guild.roles.find (r => r.name === args[0]);
  if(!role) return message.channel.send('sorry did not find the role you speak of!')
  let reasonSpeak =  args.slice(1).join(' ');


  role.members.forEach(m => {

    try{
      m.send(reasonSpeak)
    }catch(e){
        message.channel.send(`${m} has dm blocked`)
        console.log(e)
      }
    })


}
