const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "gbl",

    description: "Global BL!",

    usage: "~gbl",

    accessableby: "BotOwner",

    aliases: ["GBL", "globalbl", "sban"]
  },

  run: async (bot, msg, args) => {
    let botadmin = db.fetch(`botadmin_${msg.author.id}`)
    if(!msg.author.id === botadmin) return;

    let id = args[0];

    if(!id) return msg.channel.send("Server ID please")


    
    let info = new Discord.MessageEmbed()
    .setTitle("Blacklisted Server")
    .addField('Guild ID', id, true)
    .addField('Reason', true)

let g = msg.guild.channels.cache.find(channel => channel.name ==="blacklistlogs")
if(!g) return msg.channel.send("Please make a channel called blacklistlogs.")

g.send(info)
db.set(`globalblacklist_${id}`, id)

  }}