const Discord = require("discord.js");

module.exports.command = {
  name: "coinflip",
  aliases: ["flip"],
  description: "flip a coin",
  category: "Fun & Games",
  usage: "coinflip"
}

module.exports.run = async (bot, message, args) => {

  await message.delete();

  let coin = 0;
  coin = Math.floor(Math.random() * 10);
  console.log('the coin is ', coin)
  if(coin > 4){
    return message.channel.send("The coin landed on HEADS!")
  }else{
    return message.channel.send("The coin landed on TAILS!")
  }
}
