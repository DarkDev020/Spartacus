const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "afk",

    description: "Every 24 Hours you can claim free money!",

    usage: "~afk",

    accessableby: "Members",

    
  },

  run: async(client, message, args) => {
    
let reason = args.join(' ')
if(!reason) return message.channel.send("Please provide a reason for going afk");

let afk = new Discord.MessageEmbed()
.setTitle("New AFK User")
.addField("Username", `${message.author}`)
.addField("User ID", `${message.author.id}`)
.addField("Reason", reason, true)


switch (reason) {
     case "remove":
     message.member.setNickname(` ${message.author.username}`)
     message.channel.send("I have removed your afk status, " + message.author.tag)
     break;
} 

message.member.setNickname(`AFK | ${message.author.username}`)


let g = message.guild.channels.cache.find(channel => channel.name ==="afklogs")
if(!g) return message.channel.send("Please make a channel called 'afklogs'")

message.channel.send(`${message.author.tag} I have updated your status to AFK.`)


g.send(afk)


}}