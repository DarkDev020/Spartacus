const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "removerank",

    description: "Every 24 Hours you can claim free money!",

    usage: "~removerank",

    accessableby: "Members",

    aliases: ["rr", "rrank", "demote"]
  },

  run: async (client, message, args) => {


  let blacklist = await db.fetch(`blacklist_${message.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${message.guild.id}`);

   if(message.author.id === blacklist){
        return message.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(message.guild.id === gbl) {
        return message.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }
  let user = message.mentions.members.first();
  if(!user) return message.channel.send("No can do, mention someone please.");  


  if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("No can do, you need MANAGE_ROLES.")

  let ad = message.mentions.roles.first();
  if(!ad) return message.channel.send("Please mention a role to remove this user from!");

    let log = new Discord.MessageEmbed()
    .setTitle("Ranked Removed")
    .addField("User", `${user}`)
    .addField("Role", ad, true)
    .addField("Removed on: ", `${message.createdAt}`)
    .addField("Removed by: ", `${message.author}`)
    .setColor('RANDOM')

let g = message.guild.channels.cache.find(channel => channel.name ==="logs")
if(!g) return message.channel.send("Please make a channel called logs.")

g.send(log)
user.roles.remove(ad)
}}