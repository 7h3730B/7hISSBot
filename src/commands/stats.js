const {
    version,
    dependencies
} = require("../../package");
module.exports.info = {
    name: "stats",
    description: "Shows you stats about the bot"
};

module.exports.run = async (client, message, args) => {
    let dependend = "NodeJS Version: " + process.version + "\n";
    Object.entries(dependencies).forEach((r) => {
        dependend += `~ [${r[0]}](https://npmjs.org/package/${r[0]})${r[1]}\n`;
    });
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
            },
            {
                name: "Dependencies",
                value: dependend.substr(0,1000)
            }
        ]
    }));
};