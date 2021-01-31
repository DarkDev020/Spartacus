const db = require('quick.db')

module.exports = async(bot, message) => {

let pref = await db.fetch(`prefix_${message.guild.id}`)


    var prefix = pref;
    if (prefix === null) prefix = "~" //ange this if you would like

    if (message.author.bot || message.channel.type === "dm") return;



    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase();



    if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))

    if (commandfile) commandfile.run(bot, message, args)

}