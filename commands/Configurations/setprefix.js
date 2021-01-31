const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "setprefix",
    usage: "~setprefix",
    aliases: ["np", "sp", "newpref"]

  
},
run: async(bot, msg, args) => {
  if(msg.author.id !== msg.guild.owner.id) return msg.channel.send("No can do, only server owner can change the prefix.")


let newpref = args.join(" ");
if(!newpref) return msg.channel.send("Please state a new prefix.")

msg.channel.send(`Prefix was set to: ${newpref}`)
  db.set(`prefix_${msg.guild.id}`, newpref)
  
}}