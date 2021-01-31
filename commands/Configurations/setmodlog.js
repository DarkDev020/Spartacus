const Discord = require('discord.js')

const db = require('quick.db')

module.exports = {
  config: {
       name: "setmodlogs"

  },
  run: async(bot, msg, args) => {
    if(msg.author.id !== msg.guild.owner.id) return msg.channel.send("Your not the server owner, sorry!")

    let channel = args.join(" ")
    if(!channel) return msg.channel.send("Please provide a channel name.(E.g modlogs)")

    msg.channel.send(`:white_check_mark: | Modlogs is now set to: ${channel}`)

    db.set(`modlogs_${msg.guild.id}`, channel)
  }}
