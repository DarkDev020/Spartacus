const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "clearwarns",

    description: "Every 24 Hours you can claim free money!",

    usage: "~clearwarns",

    accessableby: "Members",

    aliases: ["cw", "Clrwarn", "clearwarn", "clrwarn", "cwrn"]
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
    if(!user) return msg.channel.send("Please mention a user to clear warns")

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("You need MANAGE_MESSAGES to clear warns, sorry!")

    let reason = args.join(" ");
    if(!reason === null) return msg.channel.send("Enter a reason to clear warns");

    let w = await db.fetch(`warns_${msg.guild.id}_${user.id}`)

    db.set(`warns_${msg.guild.id}_${user.id}`, 0)

    let warned = new Discord.MessageEmbed()
    .setTitle("Cleared Warnings")
    .addField("For", `${user}`)
    .addField("Reason", `${reason}`)
    .addField("Moderator", `${msg.author.tag}`)
    .addField("Cleared on", `${msg.createdAt}`)
    .addField("Current Warnings", `${w}`)



let g = msg.guild.channels.cache.find(channel => channel.name ==="moderationlogs")
if(!g) return msg.channel.send("Please make a channel called 'moderationlogs'")

    g.send(warned)
    msg.channel.send(`I have cleared warns for ${user}`)
    user.send(`You have been cleared of your warnings in the server: ${msg.guild.name}`)

  }}