const Discord = require("discord.js");
const bot = require("../index");
const config = require("../config")
const Money = require("../models/money")

bot.on("message", async (message) => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toString().toLowerCase();

  let args = messageArray.slice(1);

  let command;

  if(bot.commands.has(cmd)){
    command = bot.commands.get(cmd)
  }else if(bot.aliases.has(cmd)){
    command = bot.commands.get(bot.aliases.get(cmd))
  }else if(message.content.startsWith(prefix)){
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
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
});
