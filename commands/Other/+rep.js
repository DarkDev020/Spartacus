const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "+rep",

    description: "Every 24 Hours you can claim free money!",

    usage: "~+rep",

    accessableby: "Members",

    aliases: ["rp", "Rep"]
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

 if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You need the `ADMINISTRATOR` permission to use this command");

  let users = message.mentions.members.first();
  if(!users) return message.channel.send("Please mention someone.");

   let rep = new Discord.MessageEmbed()
   .setTitle("Reputation Points")
   .addField("User", `${users}`)
   .addField("Points Added", `1`)


db.add(`points_${message.guild.id}_${users.id}`, 1)
message.channel.send(rep)
}}