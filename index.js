const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone:true});
const config = require("./config.json");

module.exports = bot;

const defaultsettings = require("./util/defaultsettings");

const {loadCommands, loadEvents} = require("./util/handler");
loadCommands();
loadEvents();

/***************************************************************
* Interval events at 12, 8 pm and 930 pm                       *
* to let people in chat that game events are happening         *
* currently have 3 checktimes however will probably change     *
* to a case switch later so that bot only checks time once per *
* minute instead of three.                                     *
***************************************************************/
setInterval(() => (checkTime(12, 0, "Mongolians are knocking on your door!")),60000); //check time every min if it is time to post message
setInterval(() => (checkTime(20, 00, "Kill Galdan")),60000);
setInterval(() => (checkTime(21, 30, "Check your cabinet and event")),60000);

// function for the interval gets hour and min and sends message to main channel

function checkTime(checkHour, checkMinute, whatToDo)// function for setInterval to check the time and send a message
{
var date = new Date();
if(date.getHours() === checkHour && date.getMinutes() === checkMinute)// check time against date
  {
  bot.guilds.forEach(g => {
    let channel =  g.channels.find(c => c.name === 'general');
    channel.send('@everyone ',whatToDo);// post message to channel
    })

  console.log("It's going down");
  }
  else
  {
    console.log("checked time " + date.getHours() + date.getMinutes() );
  }//if it is not time for event we will state the time
  return;
  }

bot.login(config.token);
