const {
    version
} = require("../../package");

msToTime = async (duration) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24)

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${days} d ${hours} h ${minutes}min ${seconds} sec`
}

module.exports.info = {
    name: "stats",
    description: "Shows you stats about the bot"
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: "Bot Stats",
        fields: [{
                name: "Bot Stats",
                value: `Running for: **${await msToTime(client.uptime)}**\nRunning on **${version}**`
            },
            {
                name: "Command Stats",
                value: `**${client.messages}** Messages analyzed\n**${client.cmdsExecuted}** Commands executed`,
            },
            {
                name: "Discord Specs",
                value: `Serving **${client.guilds.cache.size}** Guilds\n**${Math.round(client.ws.ping)}** ms Latency to the Discord API `
            }
        ]
    }));
};