const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "kick", 
    aliases: ["k", "KICK", "exile", "yeet"],
    usage: "~kick"
  
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
        
  let nouser = new Discord.MessageEmbed()
  .setTitle("No User")
  .setDescription("Please mention someone to kick.")
  .setColor('RED')

  let user = msg.mentions.members.first();
  if(!user) return msg.channel.send(nouser)

if(user.id !== msg.guild.owner) return msg.channel.send("I can't kick the server owner.")
let reason = args.join(" ").slice(22);
if(!reason) return msg.channel.send("Provide a reason please.")

  let kickembed = new Discord.MessageEmbed()
  .setTitle('Error')
  .setDescription('You do not have permissions to use this command. `KICK_MEMBERS``')
  .setColor('RED')


  let kicked = new Discord.MessageEmbed()
  .setTitle("Kicked User")
  .addField("User", `${user}`)
  .addField("User ID", `${user.id}`)
  .addField('Reason', reason, true)
  .addField("Moderator", `${msg.author}`)
  .addField("Kicked On", `${msg.createdAt}`)
  .setFooter("Spartacus | @2021")
  .setColor('GREEN')

if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send(kickembed)



let g = msg.guild.channels.cache.find(channel => channel.name ==="moderationlogs")
if(!g) return msg.channel.send("Please make a channel called 'moderationlogs'")

msg.guild.kick(user)
user.send(`You have been kicked for ${reason} in the server: ${msg.guild.name}`)

g.send(kicked)

}
}