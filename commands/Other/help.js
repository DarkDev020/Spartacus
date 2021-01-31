const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  config: {
    name: "help",

    description: "help cmds",

    usage: "~help",

    accessableby: "Members",

    aliases: ["Help", "h", "HLP"]
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

    let command = args.join(" ")

    let list = new Discord.MessageEmbed()
    .setTitle("Command Modules")
    .setDescription("The `USAGE`part is case sensitive")
    .addField("Configurations", 'Shows config commands | Usage: ~help config')
    .addField("Admin", 'Shows admin commands || Usage: ~help admin')
    .addField("Server Owner", 'Shows server owner only commands || Usage: ~help serverowner')
    .addField("Miscellaneous", `Shows commands in the other category || Usage: ~help misc`)
    .addField("Support Server", 'Coming soon')
    .setFooter('By: LetsExplain#1249 | Spartacus | @2021')
    .setColor('RANDOM')


    //////////////////////////////////////////////////////////////////////

    let admin = new Discord.MessageEmbed()
    .setTitle("Admin Commands")
    .setDescription("Ban, kick, addrank, removerank, lastmessage, warn")
    .setColor("RED")
    .setFooter("Spartacus | @2021 | Admin")

///////////////////////////////////////////////////////////////////////////

let ml = await db.fetch(`modlogs_${msg.guild.id}`)
let config = new Discord.MessageEmbed()
.setTitle("Configuration Commands")
.setDescription('setmodlogs, setprefix, setlogs, setannouncementchannel')
.setFooter(`Spartacus | @2021 | Configuration Commands`)

///////////////////////////////////////////////////////////////////////////

  
    let botowner = new Discord.MessageEmbed()
    .setTitle("Bot Owner Commands")
    .setDescription("gbl, rgbl, userbl, ruserbl")
    .setColor("BLACK")
    .setFooter("Spartacus | Bot Owner | @2021")

    ///////////////////////////////////////////////////////////////////////

    let so = new Discord.MessageEmbed()
    .setTitle("Server Owner Commands")
    .setDescription("blacklist, unblacklist")
    .setColor("WHITE")
    .setFooter("Spartacus | @2021 | Server Owner")

////////////////////////////////////////////////////////////////////////////

    let othe = new Discord.MessageEmbed()
    .setTitle("Miscellaneous Commands")
    .setDescription("rep, +rep, -rep, help")
    .setColor('GREEN')
    .setFooter("Spartacus | @2021 | Miscellaneous")

///////

    switch (command) {

      case "config":
      msg.channel.send(config)
      break;
      case "addrank":
      msg.channel.send("Usage: `~addrank @user @role` | Aliases: `ar, PRM, Promote` | Promotes user to mentioned rank")
      break;

      case "warn":
      msg.channel.send("Usage: `~warn @user reason | Aliases: wn, wrn, w` | Warns a user")
      case "removerank":
      msg.channel.send("Usage: `~removerank @user role` | Aliases: `rr, rrole, demote` | Removes a users role")
      break;

      case "rep":
      msg.channel.send("Usage: `~rep @user` | Aliases: `rp` | Shows community reputation. Can only be added by admins")
      break;

      
      case "+rep":
      msg.channel.send("Usage: `~+rep @user` | Adds reputation Kicks a user")
      break;

      case "kick":
      msg.channel.send("Usage: `~kick @user reason` | Aliases: `k, exile, yeet` | Kicks a user")
      break;

      case "lastmessage":
      msg.channel.send("Usage: `~lastmessage @user` | Aliases: `lm, lmsg` | Shows a mentioned users last message")
      break;
      
      case "ban":
      msg.channel.send("Usage: `~ban @user reason` | Aliases: `b, bn, yeetthechild` | Bans a user")
      break;

      case "-rep":
      msg.channel.send("Usage: `~-rep @user` | Aliases: `rrep, srep, nr` | Subtracts reputation points from a user")
      break;

      case "misc":
      msg.channel.send(othe)
      break;

      case "serverowner":
      msg.channel.send(so)
      break;

      case "admin":
      msg.channel.send(admin)
      break;

      case "botowner":
      if(msg.author.id !== '781409459804831746') return msg.channel.send("You can't see this.")
      msg.channel.send(botowner)
break;
      default: 
      msg.channel.send(list)
    }
  }

}
