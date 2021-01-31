const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "addrank",

    description: "Every 24 Hours you can claim free money!",

    usage: "~addrank",

    accessableby: "Members",

    aliases: ["prm", "PRM", "PROMOTE", "Addrank", "AddRank", "ADDRANK", "ar"]
  },

  run: async (client, message, args) => {

  let user = message.mentions.members.first();
  if(!user) return message.channel.send("No can do, mention someone please.");  
  
  
  let blacklist = await db.fetch(`blacklist_${message.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${message.guild.id}`);

   if(message.author.id === blacklist){
        return message.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(message.guild.id === gbl) {
        return message.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }

  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("No can do, you need MANAGE_ROLES.")

  let ad = message.mentions.roles.first();
  if(!ad) return message.channel.send("Please mention a role to promote this user too!");

    let log = new Discord.MessageEmbed()
    .setTitle("Promoted User")
    .addField("User", `${user}`)
    .addField("Role", ad, true)
    .addField("Promoted on: ", `${message.createdAt}`)
    .addField("Promoted by: ", `${message.author}`)
    .setColor('RANDOM')

let g = message.guild.channels.cache.find(channel => channel.name ==="logs")
if(!g) return message.channel.send("Please make a channel called logs.")

message.channel.send(`:white_check_mark: | I have added the user: ${user} to the role ${ad}`)
g.send(log)
user.roles.add(ad)
}}