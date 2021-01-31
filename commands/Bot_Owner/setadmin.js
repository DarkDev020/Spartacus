const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "setadmin",

  
},

run: async(bot, msg, args) => {

  if(!msg.author.id === '781409459804831746') return;

  let user = msg.mentions.members.first();
  if(!user) return msg.channel.send("No user, can't give admin")

  let logged = new Discord.MessageEmbed()
  .setTitle("New Bot Admin")
  .addField("User", `${user}`)
  .addField("User ID", `${user.id}`)
  .addField("Given by", `${msg.author}`)
  .addField("Given on", `${msg.createdAt}`)

let g = msg.guild.channels.cache.find(channel => channel.name ==="ownerlogs")
if(!g) return msg.channel.send("Please make a channel called ownerlogs.")

g.send(logged)
  db.set(`botadmin_${user.id}`, user.id)
}

}