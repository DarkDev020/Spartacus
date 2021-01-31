const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "unbluser",

  
},

run: async(client, msg, args) => {
  
    let botadmin = db.fetch(`botadmin_${msg.author.id}`)
    if(!msg.author.id === botadmin) return;

    let id = args[0] || msg.mentions.members.first();

    if(!id) return msg.channel.send("User ID please").slice(22)

let reason = args.join(" ");
if(!reason) return;
    
    let info = new Discord.MessageEmbed()
    .setTitle("UnBlacklisted User")
    .addField('User ID', id, true)
    .addField('Reason', reason)

let g = msg.guild.channels.cache.find(channel => channel.name ==="blacklistlogs")
if(!g) return msg.channel.send("Please make a channel called blacklistlogs.")

g.send(info)
db.set(`blacklist_${id}`, 0)

  }
}