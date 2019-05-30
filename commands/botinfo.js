const Discord = require("discord.js");

module.exports.command = {
  name: "botinfo",
  aliases: ["bi","info"],
  description: "A short description of the bot",
  category: "utility",
  usage: "botinfo"
}

module.exports.run = (bot, message, args) => {

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#15f153")
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username);
      botembed.addField("Created On", bot.user.createdAt);

      return message.channel.send(botembed);

}
