const Discord = require("discord.js");
const Mongo = require("mongoose");
Mongo.connect('mongodb://localhost:27017/btkInfo', {useNewUrlParser: true});
const Btk = require('../models/btkinfo.js');

module.exports.command = {
  name: "addplayer",
  aliases: ["addplayerinfo"],
  description: "add player info from the game",
  category: "game",
  usage: "addplayer <server> <name> <playerID> <rank> <power> <alliance>"
}

module.exports.run = async (bot, message, args) => {

  await message.delete();

  if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("You don't have the Authority!");
  if(!args) return message.reply("what are you doing?")


  const newInfo = new Btk({
    btkServer: args[0],
    btkName: args[1],
    btkID: args[2],
    btkRank: args[3],
    btkPower: args[4],
    btkAlliance: args[5]

  })
    newInfo.save().catch(err => console.log(err));


    embed = new Discord.RichEmbed()
    .setTitle("New Player Made")
    .setColor("RANDOM")
    .addField('Name: ', newInfo.btkName ,true)
    .addField('ID: ', newInfo.btkID, true)
    .addField('Rank: ', newInfo.btkRank, true)
    .addField('Power: ', newInfo.btkPower, true)
    .addField("Alliance: ", newInfo.btkAlliance, true)
    .addField("Server: ", newInfo.btkServer, true)
    .setFooter('Use modplayer command to change anything');

    message.channel.send(embed);


}
