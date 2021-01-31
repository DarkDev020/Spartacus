const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "warn",

    description: "Every 24 Hours you can claim free money!",

    usage: "~warn",

    accessableby: "Members",

    aliases: ["wrn", "Warn", "WaRn", "w", "wn"]
  },

  run: async (client, msg, args) => {

    

  
  let blacklist = await db.fetch(`blacklist_${msg.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${msg.guild.id}`);

   if(msg.author.id === blacklist){
        return msg.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(msg.guild.id === gbl) {
        return msg.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }
        
    let user = msg.mentions.members.first()
    if(!user) return msg.channel.send("Please mention a user to warn")

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("You need MANAGE_MESSAGES to warn someone, sorry!")

    let reason = args.join(" ")
    if(!reason) return msg.channel.send("Enter a reason to warn")

    let w = await db.fetch(`warns_${msg.guild.id}_${user.id}`)

    let warned = new Discord.MessageEmbed()
    .setTitle("Warned User")
    .addField("Warned", `${user}`)
    .addField("Reason", `${reason}`)
    .addField("Moderator", `${msg.author.tag}`)
    .addField("Warned on", `${msg.createdAt}`)
    .addField("Current Warnings", `${w}`)



let g = msg.guild.channels.cache.find(channel => channel.name ==="moderationlogs")
if(!g) return msg.channel.send("Please make a channel called 'moderationlogs'")

    db.add(`warns_${msg.guild.id}_${user.id}`, 1)

    g.send(warned)
    msg.channel.send("I have warned the user")
    user.send(`You have been warned for: ${reason} in the server: ${msg.guild.name}`)

  }}