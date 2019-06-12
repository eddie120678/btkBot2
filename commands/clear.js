const Discord = require("discord.js");

module.exports.command = {
  name: "clear",
  aliases: ["clr"],
  description: "remove messages from chat",
  category: "Moderation",
  usage: "clear <number of messages"
}

module.exports.run = (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("I don't go around telling you telling me what to do. So don't go around telling me I am telling you telling me what to do!");
  if(!args[0]) return message.channel.send("Did you want me to do something. You might want to put a 1 and a couple zeros in front of that");

  try{
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleard ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
  }
  catch(e){
    console.log(e)
  }

}
