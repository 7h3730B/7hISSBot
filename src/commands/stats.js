const {
    version
} = require("../../package");

module.exports.info = {
    name: "stats",
    description: "Shows you stats about the bot"
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: "Bot Stats",
        fields: [{
                name: "Bot Stats",
                value: `Running for: **${await client.msToTime(client.uptime)}**\nRunning on **${version}**`
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