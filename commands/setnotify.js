const Discord = require("discord.js");

module.exports.command = {
  name: "setnotify",
  aliases: ["notify"],
  description: "to switch on or off the role of Notify. can be used by anyone",
  category: "utility",
  usage: "setnotify"
}

module.exports.run = async (bot, message, args) => {

  // setnotify command allows individuals to be put on a notification roles
  // without the need for admin staff intervention

    let nMember = message.guild.member(message.author);
    let nRole = message.guild.roles.find(r => r.name === "Notify");

    if(!nMember.roles.has(nRole.id)){

        nMember.addRole(nRole.id);
        try {
          await message.author.send("You now have the Notify role and will be informed by me.");
        }catch(e){
          message.reply("Your DMs are locked")
        }
  }
      else {
        nMember.removeRole(nRole.id);
        try{
          await message.author.send("I didn't want to notify you anyways, coffin stuffer!");
        }catch(e){
          message.reply("Your DMs are locked");
        }
      }

}
