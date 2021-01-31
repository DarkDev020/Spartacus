const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "announce", 
    aliases: ["an", "a", "pa", "Announce", "announcement"],
    usage: "~announce"
  
},

run: async(bot, msg, args) => {
  

  let blacklist = await db.fetch(`blacklist_${msg.author.id}`);
  let gbl = await db.fetch(`globalblacklist_${msg.guild.id}`);

   if(msg.author.id === blacklist){
        return msg.channel.send('**You are blacklisted. Please contact a bot administrator for questions.**')
   }
        if(msg.guild.id === gbl) {
        return msg.channel.send('**Your server id is on the blacklist, use *blappeal(Not working) if wanting it to be removed.**')
        }

if(!msg.member.hasPermission('MANAGE_SERVER')) return msg.channel.send("You need: `MANAGE_SERVER` to send announcements.")

let announcement = args.join(" ")
if(!announcement) return msg.channel.send("Please enter an announcement to announce.")

let announce = new Discord.MessageEmbed()
.setTitle("New Announcement")
.addField("Announced by", `${msg.author}`)
.addField("Announced on", `${msg.createdAt}`)
.addField("Announcement", `${announcement}`)
.setColor('RANDOM')
.setFooter(`Spartacus | @2021 | ${msg.guild.name}'s Announcement`)


let g = msg.guild.channels.cache.find(channel => channel.name ==="announcements")
if(!g) return msg.channel.send("Please make a channel called 'announcements")

g.send(announce)


}}