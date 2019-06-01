const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone:true});
const config = require("./config.json");

module.exports = bot;

const defaultsettings = require("./util/defaultsettings");

const {loadCommands, loadEvents} = require("./util/handler");
loadCommands();
loadEvents();



bot.login(config.token);
