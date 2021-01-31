module.exports = async bot => {

    bot.user.setStatus("online");

    console.log(`[PromoBot] Logged in as ${bot.user.tag}!`);

    console.log('[PromoBot] By: LetsExplain#1249');

    console.log(`[PromoBot] Logged in as * [ " ${bot.user.username} " ] servers! [ " ${bot.guilds.cache.size} " ]`);

    console.log(`[PromoBot] Logged in as * [ " ${bot.user.username} " ] Users! [ " ${bot.users.cache.size} " ]`);

    console.log(`[PromoBot] Logged in as * [ " ${bot.user.username} " ] channels! [ " ${bot.channels.cache.size} " ]`);

    console.log("[PromoBot] Ticket System is now Online");

    console.log("[PromoBot] Developer System is now Online");

    console.log("[PromoBot] Command System is now Online");

    

    setInterval(function() {

        bot.user.setActivity(`Prefix: ~ | ${bot.users.cache.size} Users!`, {type: "WATCHING"})

        

    }, 10000)

}