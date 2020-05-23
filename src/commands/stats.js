const {
    version
} = require("../../package");
const si = require("systeminformation");

module.exports.info = {
    name: "stats",
    description: "Shows you stats about the bot"
};

module.exports.run = async (client, message, args) => {
    const mem = await si.mem();
    const cpu = await si.cpu();
    const cpuLoad = await si.currentLoad();
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
                name: "System",
                value: `Memory (binary): ${Math.round(mem.used / 1048576)} / ${Math.round(mem.total / 1048576)} MB\ncore(s): ${cpu.cores} at ${cpu.speed} GHz\nused: ${Math.round(cpuLoad.currentload, 4)} %`
            }
        ]
    }));
};