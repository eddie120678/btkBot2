const Discord = require("discord.js");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Tutorial', {useNewUrlParser: true});
const Money = require('../models/money.js');

module.exports.command = {
  name: "coins",
  aliases: ["money","bal","balance"],
  description: "see how many coins you have",
  category: "games",
  usage: ""
}

module.exports.run = async (bot, message, args) => {

  await message.delete();

  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
    if(err) console.log(err);

    let embed = new Discord.RichEmbed()
    .setTitle("Coins")
    .setColor("#4000FF")
    .setThumbnail(message.author.displayAvatarURL);

    if(!money){
      embed.addField('Coins', '0', true);
      return message.channel.send(embed);

    }else {
      embed.addField('Coins', money.money, true);
      return message.channel.send(embed);
    }
  })

}
