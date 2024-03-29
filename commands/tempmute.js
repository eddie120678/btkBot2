const Discord = require("discord.js");
const ms = require("ms");

module.exports.command = {
  name: "tempmute",
  aliases: ["mute"],
  description: "mute a member temporarily",
  category: "Moderation",
  usage: "tempmute @<someone> <number of seconds> "
}

module.exports.run = async (bot, message, args) => {

  //?tempmute @user 1s/m/h/// DEBUG:

   let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!tomute) return message.reply("couldn't find user.");
   if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
   let muterole = message.guild.roles.find(r => r.name === 'muted');
   if(!muterole){
     try{
       muterole = await message.guild.createRole({
         name: "muted",
         color: "#000000",
         permissions:[]
       })
       message.guild.channels.forEach(async (channel, id) => {
         await channel.overwritePermissions(muterole, {
           SEND_MESSAGE: false,
           ADD_REACTIONS: false
         });
       });
     }catch(e){
       console.log(e.stack);
     }
   }
   //endof create roles
   let mutetime = args[1];
   if(!mutetime) return message.reply("You didn't specify a time!");

   await(tomute.addRole(muterole.id));
   message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

   setTimeout(function(){
     tomute.removeRole(muterole.id);
     message.channel.send(`<@${tomute.id}> has been unmuted`);
   }, ms(mutetime));

}
