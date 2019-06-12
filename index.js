const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone:true});
const config = require("./config.json");
const fs = require('fs');
bot.commands = new Discord.Collection();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Tutorial', {useNewUrlParser: true});
const Money = require('./models/money.js');

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    consol.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f,i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.command.name, props);
  });
});

bot.on('ready', async() => {

    // D.JS Client listeners
    bot.on('error', () => {}); // WS Errors can just be ignored
    bot.on('reconnecting', () => console.log('Reconnecting WS...'));
    bot.on('disconnect', () => {
      console.log('Disconnected, trying to restart...');
      process.exit();
    });
    // NodeJS process listeners
    process.on('unhandledRejection', console.error)
    process.on('warning', console.warn)

      console.log(`${bot.user.username} is online!`);

       bot.user.setActivity(`use ?help`); //sets the bot's activity this shows everyone the proper help command

});

bot.on('message', async(message) => {

  if(message.author.bot) return;
  // don't listen to other bots
  if(message.channel.type === 'dm') return;
  // don't listen to people dm'ing the bot


    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(message.content.startsWith(prefix)){
      let commandfile = bot.commands.get(cmd.slice(prefix.length));
      if(commandfile) commandfile.run(bot,message,args);
    } else{
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
})


bot.login(config.token); // this token needs to be kept secret
