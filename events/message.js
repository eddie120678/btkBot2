const Discord = require("discord.js");
const bot = require("../index");
const config = require("../config")
const Money = require("../models/money")

bot.on("message", async (message) => {
  if(message.author.bot) return;
  let prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/)
  let cmd = args.shift().toLowerCase();

  let command;
  if(bot.commands.has(cmd)){
    command = bot.commands.get(cmd)
  }else if(bot.aliases.has(cmd)){
    command = bot.commands.get(bot.aliases.get(cmd))
  }else{
    let coinstoadd = Math.ceil(Math.random() * 50);
    console.log(coinstoadd + ' coins');
    Money.findOne({
      userID: message.author.id,
      serverID: message.guild.id
    }, (err, money) => {
        if(err) console.log(err);
        if(!money){
          const newMoney = new Money({
            userID: message.author.id,
            userName: message.author.username,
            serverID: message.guild.id,
            money: coinstoadd
          })

          newMoney.save().catch(err => console.log(err));
        }else{
          money.money = money.money + coinstoadd;
          money.save().catch(err => console.log(err));
        }
      })
  }

  try {
    command.run(bot, message, args);
  } catch (err) {
    console.log(err);
  }

});
