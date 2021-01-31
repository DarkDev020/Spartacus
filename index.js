const { Client, Collection } = require("discord.js");


 // Imports the Discord.Js Libary
const fs = require("fs");

const bot = new Client(); //Defines Block

["commands", "aliases"].forEach(x => bot[x] = new Collection());

["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('guildCreate', (guild) => {
  let embed = new Discord.MessageEmbed()
  .setTitle("New Server")
  .addField("Server Name", `${guild.name}`)

  bot.channels.get('804843735300833290').send(embed)
});

bot.login("TOKEN");

bot.afk = new Map();
