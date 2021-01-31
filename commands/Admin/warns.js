const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  config: {
    name: "warns",
    description: "Warns a user",

  },

run: async(client, msg, args) => {
    

  let blacklist = await db.fetch(`blacklist_${msg.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${msg.guild.id}`);

   if(msg.author.id === blacklist){
        return msg.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(msg.guild.id === gbl) {
        return msg.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }
        
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("You need `MANAGE_MESSAGEs` to view someones warn count, sorry!")



}}