const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "lastmessage",

    description: "Every 24 Hours you can claim free money!",

    usage: "~lastmessage",

    accessableby: "Members",

    aliases: ["lm"]
  },

  run: async(bot, message, args) => {

    

  let blacklist = await db.fetch(`blacklist_${message.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${message.guild.id}`);

   if(message.author.id === blacklist){
        return message.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(message.guild.id === gbl) {
        return message.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }

  let user = message.mentions.members.first();
  if(!user) return;

  message.channel.send(`Last message of ${user} was: ${user.lastMessage}`)
}}