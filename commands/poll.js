const Discord = require("discord.js");

module.exports.command = {
  name: "poll",
  aliases: ["vote"],
  description: "take a vote on something",
  category: "utility",
  usage: "poll <describe what is to be polled>"
}

module.exports.run = async (bot, message, args) => {
  // this will contain some extra things

  //role Verification -- This will only run if a user has a certain role(optional)
  //if(!message.member.roles.find(r => r.name === 'roleName')) return message.channel.send('Please enter the role name correctly');

  // Permission Verification -- This will onl run if a user has a certain permission (optional)
  if(!message.member.hasPermission('ADMINISTRATOR'))  return message.channel.send('You can\'t tell me what to do boy. You need to be an ADMIN');

  // First, we check if the user had input
  if(!args[0]) return message.channel.send('Proper Usage: <prefix>poll question');

  // Time for the embed
  const embed = new Discord.RichEmbed()
  .setColor(0xffffff)
  .setFooter('React to vote.')
  .setDescription(args.join(' '))
  .setTitle(`Poll Created By ${message.author.username}`);

  //Finally, using await send the message
  let msg = await message.channel.send(embed);

  //react to the message
  await msg.react('❌'); // using await here will make sure the first one runs before the second
  await msg.react('✔');

  // Make sure you delete the original message
  message.delete({timeout: 1000}); // Theis waits 1 second before delete

  // we can add collectors later but that will limit the amount of time

}
