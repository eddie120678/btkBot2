const Discord = require("discord.js");
const Mongo = require("mongoose");
Mongo.connect('mongodb://localhost:27017/Tutorial', {useNewUrlParser: true});
const Money = require('../models/money.js');

module.exports.command = {
  name: "dice",
  aliases: ["wager","bet"],
  description: "place a bet against Bender",
  category: "Monetary",
  usage: "bet <amount>"
}

module.exports.run = async (bot, message, args) => {

  function diceRoll(){
    return Math.floor(Math.random() * 6 ) + 1
  }
  let myRoll = 0;
  let botRoll = 0;
  let wager = parseInt(args);
  if(Number.isInteger(wager)) {

    myRoll = diceRoll()
    botRoll = diceRoll()

    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
      if(err) console.log(err);


      if(!money) return message.channel.send("You don't have any money dummy!!")

      if(wager > money.money) return message.channel.send("You trying to stiff me!")
      let embed = new Discord.RichEmbed()
      .setTitle('🎲Hot 🎲 Shooter🎲')
      .setColor('RANDOM')
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(`🤑You wagered ${wager}🤑`)
      .addField(`Bender's Roll`, `was ${botRoll}`,true)
      .addField(`${message.author.username}`, ` roll was ${myRoll}`,false)
      if(myRoll > botRoll){
        wager *= 2
        money.money = money.money + wager
        money.save().catch(err => console.log(err))
        embed.setFooter(`You Win ${wager} coins`)
      }else{
        embed.setFooter(`Only you can lose ${wager} coins`)
        money.money = money.money - wager
        money.save().catch(err => console.log(err))
      }

      message.channel.send(embed)
  })}else{
    return message.channel.send("what are you doing")
    console.log(Number.isInteger(wager))
    console.log(wager)
  }
}
